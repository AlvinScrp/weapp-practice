const Koa = require('koa');
const app = new Koa();
const Router = require("@koa/router")
const getRawBody = require( 'raw-body')

const router = new Router()
router.all('/', ctx=>{
  ctx.status = 200
  ctx.body = 'ok'
})
// 微信支付成功通知接口
router.all('/apis/pay_notify', async ctx=>{
  var rawText = await getRawBody(ctx.req, {
      encoding: 'utf-8'
  });
  console.log('rawText',rawText);
  ctx.status = 200
  ctx.body = 'rawText\n'+rawText
})
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3009);