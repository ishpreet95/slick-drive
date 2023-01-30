const { DataTypes } = require("sequelize");

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
        allowNull: true, // change this in the future
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      underscored: true,
    }
  );
  return File;
};
