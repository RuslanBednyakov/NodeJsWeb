export default function (sequelize, DataTypes) {

  const Session = sequelize.define('Session', {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true,
      field: 'sid'
    },
    data: DataTypes.STRING(50000)
  }, {
    tableName: 'sessions',
    timestamps: false
  })

  return Session;

}