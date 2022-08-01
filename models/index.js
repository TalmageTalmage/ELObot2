'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};


const sequelize = new Sequelize('serverelo_development', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0, idle: 10000,
  },
  define: {
    timestamps: false
  },
});

const tableModel = {};

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);

    db[model.name] = model;
    tableModel[model.name] = model;
  });

Object.getOwnPropertyNames(db).forEach(modelName => {
  const currentModel = db[modelName];
  Object.getOwnPropertyNames(currentModel.rawAttributes).forEach(attributeName => {
    if (
      Object.prototype.hasOwnProperty.call(
        currentModel.rawAttributes[attributeName],
        'references'
      ) &&
      Object.prototype.hasOwnProperty.call(
        currentModel.rawAttributes[attributeName].references,
        'model'
      ) &&
      Object.prototype.hasOwnProperty.call(
        currentModel.rawAttributes[attributeName].references,
        'key'
      )
    ) {
      if (
        !(
          currentModel.rawAttributes[attributeName].references.model &&
          currentModel.rawAttributes[attributeName].references.key
        )
      ) {
        console.log(
          `*SKIPPED* ${modelName} ${attributeName} references a model ${currentModel.rawAttributes[attributeName].references.model} with key ${currentModel.rawAttributes[attributeName].references.key}`
        );
        return;
      }

      console.log(
        `${modelName} ${attributeName} references a model ${currentModel.rawAttributes[attributeName].references.model} with key ${currentModel.rawAttributes[attributeName].references.key}`
      );
      const referencedTable =
        tableModel[currentModel.rawAttributes[attributeName].references.model];

      currentModel.belongsTo(referencedTable, { foreignKey: attributeName });
      referencedTable.hasMany(currentModel, { foreignKey: attributeName });

    }
  });
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

