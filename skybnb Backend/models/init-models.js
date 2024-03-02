var DataTypes = require("sequelize").DataTypes;
var _BlockingTable = require("./BlockingTable");
var _Bookings = require("./Bookings");
var _Hotels = require("./Hotels");
var _Users = require("./Users");

function initModels(sequelize) {
  var BlockingTable = _BlockingTable(sequelize, DataTypes);
  var Bookings = _Bookings(sequelize, DataTypes);
  var Hotels = _Hotels(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);

  BlockingTable.belongsTo(Hotels, { as: "hotel", foreignKey: "hotelId" });
  Hotels.hasMany(BlockingTable, { as: "BlockingTables", foreignKey: "hotelId" });
  Bookings.belongsTo(Hotels, { as: "hotel", foreignKey: "hotelId" });
  Hotels.hasMany(Bookings, { as: "Bookings", foreignKey: "hotelId" });
  BlockingTable.belongsTo(Users, { as: "user", foreignKey: "userId" });
  Users.hasMany(BlockingTable, { as: "BlockingTables", foreignKey: "userId" });
  Bookings.belongsTo(Users, { as: "user", foreignKey: "userId" });
  Users.hasMany(Bookings, { as: "Bookings", foreignKey: "userId" });

  return {
    BlockingTable,
    Bookings,
    Hotels,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
