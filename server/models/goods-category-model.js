const DataTypes = require( 'sequelize' )
const db = require("./mysql-db")
// "生活方式","文创好物","创意玩具","微瑕特卖","宫廷服饰","甄选珠宝","宫廷美玉"

module.exports = db.define('goods_category', {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,// 是否允许为空
    primaryKey: true, // 是否主键
    autoIncrement: true,// 是否自增
  },
  category_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
},{
	freezeTableName: true, 
  timestamps: true
})