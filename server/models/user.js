module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Business, {
      foreignKey: 'userId',
      as: 'businesses'
    });
    User.hasMany(models.Review, {
      foreignKey: 'userId',
      as: 'reviews'
    });
  };
  return User;
};
