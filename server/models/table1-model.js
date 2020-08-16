const DataTypes = require( 'sequelize' )
const db = require("./mysql-db")

module.exports = db.define('table1', {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,// 是否允许为空
    primaryKey: true, // 是否主键
    autoIncrement: true,// 是否自增
  },
  no:{
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4 // 或 DataTypes.UUIDV1
  },
  title: {
    type: DataTypes.TEXT("tiny"),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  registerTime: {
    type: DataTypes.DATEONLY,
    defaultValue:DataTypes.NOW,
    allowNull: false
  },
  isMale:{//是否为男，布尔
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  age:{
    type:DataTypes.INTEGER,
    defaultValue:0
  },
  num:{
    type:DataTypes.BIGINT(11),
    defaultValue:0
  },
  percent:{
    type:DataTypes.DOUBLE,
    defaultValue:0.0
  },
  money:{
    type:DataTypes.DECIMAL(10,2),
    defaultValue:'0.0'
  },
  field1:{
    type:DataTypes.JSON,
    defaultValue:'{}'
  }
},{
  tableName: 'table1',
	freezeTableName: true, //强制表名称等于模型名称
  timestamps: true
})