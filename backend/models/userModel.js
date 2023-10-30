import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class  User extends Model {}

User.init({
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY
    },
    address: {
        type: DataTypes.STRING
    }    
},{
    sequelize,
    modelName: 'user',
    timestamps: false
})

export default User;