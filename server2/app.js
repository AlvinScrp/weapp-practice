const Koa = require('koa')
const app = new Koa();
const Router = require("@koa/router")
const getRawBody = require( 'raw-body')

const router = new Router()
router.all('/apis/', ctx=>{
  ctx.status = 200
  ctx.body = 'ok'
})
// 微信支付成功通知接口
router.all('/apis/pay_notify', async ctx=>{
  var rawText = await getRawBody(ctx.req, {
      encoding: 'utf-8'
  });
  console.log('rawText',rawText);
  const xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  <xml>
    <return_code>SUCCESS</return_code>
    <return_msg>OK</return_msg>
  </xml>`
  ctx.status = 200
  ctx.body = xml
})
router.all('/apis/pay_notify2', async ctx=>{
  var rawText = await getRawBody(ctx.req, {
      encoding: 'utf-8'
  });
  console.log('rawText',rawText);
  ctx.status = 200
  ctx.body = 'success'
})
app.use(router.routes())
app.use(router.allowedMethods())

const mpRouter = require("./mp-router")
app.use(mpRouter.routes())
app.use(mpRouter.allowedMethods())

app.listen(3009);