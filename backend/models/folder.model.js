const DataTypes = require("sequelize");
const db = require("../models/index.js");

module.exports = (sequelize, Sequelize) => {
  const Folder = sequelize.define(
    "folder",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parentFolder: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      owner: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      underscored: true,
    }
  );
  Folder.associate = (models) => {
    Folder.belongsTo(models.User, {
      foreignKey: "owner",
      as: "owner",
    });
    Folder.belongsTo(models.Folder, {
      foreignKey: "parentFolder",
      as: "parentFolder",
    });
  };
  return Folder;
};
