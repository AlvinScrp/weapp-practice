const DataTypes = require('sequelize')
const db = require("./mysql-db")

module.exports = db.define("goods_carts",{
  id:{
    type:DataTypes.INTEGER(11),
    allowNull:false,
    primaryKey:true,
    autoIncrement:true
  },
  user_id:{
    type:DataTypes.INTEGER(20),
    allowNull:false
  },
  goods_id:{
    type:DataTypes.INTEGER(20),
    allowNull:false
  },
  goods_sku_id:{
    type:DataTypes.INTEGER(20),
    allowNull:false
  },
  goods_sku_desc:{
    type:DataTypes.TEXT('tiny'),
    allowNull:false
  },
  num:{
    type:DataTypes.INTEGER(4),//选了多少份
    allowNull:false
  }
},{
  freezeTableName:true,
  timestamps:true
});