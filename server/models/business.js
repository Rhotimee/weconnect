module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Business name exists'
      }
    },
    details: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    businessImage: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    }

  });
  Business.associate = (models) => {
    // associations can be defined here
    Business.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'business_owner'
    });
    Business.hasMany(models.Review, {
      foreignKey: 'businessId'
    });
  };

  return Business;
};
