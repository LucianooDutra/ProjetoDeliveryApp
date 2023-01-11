const SaleModel = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
      foreignKey: true,
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "seller_id",
      foreignKey: true,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(9,2),
      allowNull: false,
      field: "total_price",
    },
    deliveryAddress: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "delivery_address",
    },
    deliveryNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "delivery_number",
    },
    saleDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      field: "sale_date",
    },
    status: {
      type: DataTypes.STRING(50),
    },
  },
  {
    timestamps: false,
    underscored: true, 
    tableName: 'sales'
  },
  )

  Sale.associate = (models) => {
    Sale.hasMany(models.SaleProduct, { foreignKey: 'id', as: 'sale' })
    Sale.belongsTo(models.User, { foreignKey: 'userId', as: 'user'} )
    Sale.belongsTo(models.User, { foreignKey: 'sellerId', as: 'seller'} )
  }

  return Sale;
}

module.exports = SaleModel;