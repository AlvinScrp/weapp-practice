const DataTypes = require( 'sequelize' )//修改类型名称从Sequelize变成DataTypes
const db = require("./mysql-db")
// "生活方式","文创好物","创意玩具","微瑕特卖","宫廷服饰","甄选珠宝","宫廷美玉"

// https://gitee.com/rixingyike/my-images/raw/master/yishulun/20200814230735.png
// https://gitee.com/rixingyike/my-images/raw/master/yishulun/20200814230726.png
// https://gitee.com/rixingyike/my-images/raw/master/yishulun/20200814230740.png
module.exports = db.define('goods_info', {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,// 是否允许为空
    primaryKey: true, // 是否主键
    autoIncrement: true,// 是否自增
  },
  goods_id: {//商品id
    type: DataTypes.INTEGER(20),
    allowNull: false
  },
  kind: {//内容类型
    type: DataTypes.INTEGER(4),
    allowNull: false
  },
  content: {//内容
    type: DataTypes.TEXT("tiny"),
    allowNull: false
  }
},{
	freezeTableName: true, 
  timestamps: true
})