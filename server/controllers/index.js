const defaultRouter = require("./default")
const userRouter = require("./user")

module.exports = app => {
  // 默认路由
  app.use(defaultRouter.routes()).use(defaultRouter.allowedMethods())
  // 用户路由
  app.use(userRouter.routes()).use(userRouter.allowedMethods())
}