(function() {
    var parseString = require('xml2js').parseString;
    var parseProcessors = require('xml2js/lib/processors');
    var builder = require('xmlbuilder');

    /**
     * Convert dashes to camel case
     */
    function dashToCamelCase(str) {
        return str.replace(/-([a-z])/g, function (match) {
            return match[1].toUpperCase();
        })
    }

    /**
     * Convert camel case to dashes
     */
    function camelCaseToDash(str) {
        return str.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2');
    }

    /**
     * Convert camel case to dashes with lower case
     */
    function camelCaseToDashLower(str) {
        return camelCaseToDash(str).toLowerCase();
    }

    /**
     * XmlParser
     * @param xml String
     * @constructor
     */
    function XmlParser(xml) {
        this.object = {};
        var that = this;
        parseString(xml, {
            tagNameProcessors: [dashToCamelCase],
            attrNameProcessors: [dashToCamelCase],
            valueProcessors: [parseProcessors.parseNumbers],
            attrValueProcessors: [parseProcessors.parseNumbers],
            explicitArray: false,
            charkey: "tagValue",
            mergeAttrs: true,
            normalizeTags: true
        }, function (err, result) {
            if (err) throw err;
            that.object = result;
        });
    }

    // Get parsed object
    XmlParser.prototype.get = function() {
        return this.object;
    };

    /**
     * XML Wrapper for request and response
     * @returns {{parseRequest: Function, buildResponse: Function}}
     * @constructor
     */
    function PaymentXmlWrapper () {
        return {
            parseRequest: function(req) {
                xml = new XmlParser(req.rawBody);
                return xml.get();
            },
            buildResponse: function(payment) {
                function setAttrs(xml, obj) {
                    var keys = Object.keys(obj);
                    for (var i = 0; i <= keys.length - 1; i++) {
                        var attrName = keys[i];
                        if (attrName != 'tagValue') {
                            xml.att(camelCaseToDashLower(attrName), obj[attrName]);
                        }
                    }
                }

                function build2(xml, obj, counter) {
                    if (!counter) {
                        counter = 0;
                    }
                    var keys = Object.keys(obj);
                    var tagName = keys[counter];
                    var element = obj[tagName];
                    if (element instanceof Array) {
                        for (var key = 0; key <= element.length - 1; key++) {
                            var child = {};
                            child[tagName] = element[key];
                            build2(xml, child);
                        }
                    } else {
                        var item = xml.ele(camelCaseToDashLower(tagName));
                        if (typeof element != 'object') {
                            item.txt(element);
                        } else {
                            // if element has attributes
                            if (element.tagValue) {
                                setAttrs(item, element);
                                item.txt(element.tagValue);
                            } else {
                                build2(item, element);
                            }
                        }
                    }
                    // go to next node
                    if (counter < keys.length - 1) {
                        build2(xml, obj, ++counter);
                    }
                }

                var xml = builder.create({
                    response: {}
                }, {encoding: 'UTF-8'});
                build2(xml, payment);
                return xml.end();
            }
        }
    }
    module.exports = PaymentXmlWrapper;
}).call(this);
