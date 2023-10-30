import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('crud', 'username', 'password', {
    dialect: 'sqlite',
    storage: './dev.sqlite',
}) 
  
export default sequelize;