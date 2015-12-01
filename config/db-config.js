var config = {
    mysql: {
        host: 'localhost',
        user: 'root',
        username: 'root',
        password: '',
        database: 'node',
        dialect: 'mysql'
    },
    mssql: {
        host: '192.168.144.16', // for sequilize config
        server: '192.168.144.16',
        port: '1433', // Default port
        user: 'admin_elsom',
        password: 'asuJAE53367',
        database: 'elsom',
        dialect: 'mssql',
        dialectOptions: {
            instanceName: 'FIRST'
        }
    },
    elsom: {
        host: '192.168.144.16', // for sequilize config
        server: '192.168.144.16',
        user: 'admin_elsom',
        password: 'asuJAE53367',
        database: 'elsom',
        dialect: 'mssql',
        port: '1433', // Default port
        define: {
            timestamps: false
        },
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        dialectOptions: {
            options: {
                tdsVersion: '7_3_A'
            }
        }
    }
};
module.exports = config;