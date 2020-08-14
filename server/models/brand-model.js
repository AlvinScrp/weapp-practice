const DataTypes = require( 'sequelize' )
const db = require("./mysql-db")

module.exports = db.define('brand', {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,// 是否允许为空
    primaryKey: true, // 是否主键
    autoIncrement: true,// 是否自增
  },
  brand_name: {//品牌名称
    type: DataTypes.STRING(50),
    allowNull: false
  }
},{
  // tableName: 'brand'
	freezeTableName: true, //强制表名称等于模型名称
  timestamps: true
})