const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id"
    },
    playerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "playerId",
      references: {
        key: "id",
        model: "players_model"
      }
    },
    matchId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "matchId",
      references: {
        key: "id",
        model: "matches_model"
      }
    },
    team: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "team"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "created_at"
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "updated_at"
    }
  };
  const options = {
    tableName: "matchPlayer",
    comment: "",
    indexes: [{
      name: "playerId",
      unique: false,
      type: "BTREE",
      fields: ["playerId"]
    }, {
      name: "matchId",
      unique: false,
      type: "BTREE",
      fields: ["matchId"]
    }]
  };
  const MatchPlayerModel = sequelize.define("matchPlayer_model", attributes, options);
  return MatchPlayerModel;
};