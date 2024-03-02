const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BlockingTable', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    hotelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Hotels',
        key: 'id'
      }
    },
    checkInDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    checkOutDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'BlockingTable',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "BlockingTable_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "prevent_double_bookings",
        fields: [
          { name: "hotelId" },
        ]
      },
    ]
  });
};
