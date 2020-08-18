const DataTypes = require( 'sequelize' )//修改类型名称从Sequelize变成DataTypes
const db = require("./mysql-db")

module.exports = db.define('goods', {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,// 是否允许为空
    primaryKey: true, // 是否主键
    autoIncrement: true,// 是否自增
  },
  spu_no: {//商品编号
    type: DataTypes.STRING(50),//DataTypes.UUID,
    allowNull: false//DataTypes.UUIDV4
  },
  goods_name: {//商品名称
    type: DataTypes.TEXT("tiny"),
    allowNull: false
  },
  start_price: {//起始售价，最低价
    type: DataTypes.DECIMAL(9,2),
    allowNull: false
  },
  category_id: {//分类id
    type: DataTypes.INTEGER(20),
    allowNull: false
  },
  brand_id: {//品牌id
    type: DataTypes.INTEGER(20),
    allowNull: false
  }
},{
	freezeTableName: true, 
  timestamps: true
})

