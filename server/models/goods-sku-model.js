const DataTypes = require( 'sequelize' )//修改类型名称从Sequelize变成DataTypes
const db = require("./mysql-db")

module.exports = db.define('goods_sku', {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,// 是否允许为空
    primaryKey: true, // 是否主键
    autoIncrement: true,// 是否自增
  },
  goods_id: {
    type: DataTypes.INTEGER(20),
    allowNull: false
  },
  goods_attr_path: {//规格搭配路径，例如"1,3"
    type: DataTypes.STRING(255),
    allowNull: false
  },
  price: {//售价，单位分
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stock: {//库存
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{
	freezeTableName: true, 
  timestamps: true
})

