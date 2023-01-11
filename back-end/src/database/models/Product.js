const ProductModel = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(4,2),
      allowNull: false,
    },
    urlImage: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: "url_image",
    },
  },
  {
    timestamps: false,
    underscored: true, 
    tableName: 'products'
  },
  )

  Product.associate = (models) => {
    Product.hasMany(models.SaleProduct, { foreignKey: 'id', as: 'product'} )
  }

  return Product;
}

module.exports = ProductModel;