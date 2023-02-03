const { DataTypes } = require("sequelize");
const db = require("../models/index.js");

module.exports = (sequelize, Sequelize) => {
  const File = sequelize.define(
    "file",
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
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parentFolder: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
  File.associate = (models) => {
    File.belongsTo(models.Folder, {
      foreignKey: "parentFolder",
      as: "parentFolder",
    });
  };
  File.associate = (models) => {
    File.belongsTo(models.User, {
      foreignKey: "owner",
      as: "owner",
    });
  };
  return File;
};
