// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  
  // normal 
  // db.collection('message').add({
  //   data: {
  //     room: '100000',
  //     user: 'weapp',
  //     text: 'message' + Math.random() * 1000
  //   }
  // })

  // 开始事务
  const transaction = await db.startTransaction()
  // 等待操作完成
  await transaction.collection('message').add({
    data: {
      room: '100000',
      user: 'weapp',
      text: 'message' + Math.random() * 1000
    }
  })
  // 提交事务
  await transaction.commit()
  // await transaction.rollback()
}