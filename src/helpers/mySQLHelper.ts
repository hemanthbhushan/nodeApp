import { Sequelize } from 'sequelize';

class MySQLHelper {
    constructor() {
    }
    public async connectMySQLDB() {
        const sequelize = new Sequelize(
            'testing',
            'root',
            'password',
            {
                host: 'localhost',
                dialect: 'mysql'
            }
        );

        sequelize.authenticate().then(() => {
            console.log('Connection has been established successfully.');
        }).catch((error) => {
            console.error('Unable to connect to the database: ', error);
        });
    }
}

export default new MySQLHelper();