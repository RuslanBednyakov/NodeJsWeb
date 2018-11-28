export default function (sequelize, DataTypes) {

    const User =  sequelize.define('User', {
      name: DataTypes.STRING,
      email:{
        type: DataTypes.STRING,
        field: 'email'
      },
      password:{
        type: DataTypes.STRING,
        field: 'password'
      },
      avatar:{
        type: DataTypes.STRING,
        field: 'avatar'
      },
    }, {
      tableName: 'users',
      timestamps: false
    })
  
    return User;
  
  }