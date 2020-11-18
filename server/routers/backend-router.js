const Router = require("@koa/router")
const jssdk = require('../lib/jssdk')

const router = new Router({
  prefix:"/apis/backend"
})

// router.use(weixinJSSDK({
//   appId: '', // [required] weixin-jssdk app id
//   secret: '', // weixin-jssdk secret
//   pathName: '/backend', // [optional] eg: http://imyourfather.com/jssdk
//   onError: (err, ctx, next) => {
//       console.error(err);
//       ctx.body = 'error';
//   },
// }));

// router.use(async (ctx, next)=>{
//   console.log(ctx.request);
//   var pkg = await wx.jssdk.getSignature(ctx.request.query.url);
//   ctx.jssdkConfig = pkg;
//   console.log('pkg',pkg);
//   await next()
// })

router.get("/", async function(ctx) {
  let {code} = ctx.request.query 
  console.log('code', code);
  if (!code){
    jssdk.startGetOpenid(ctx)
  }else{
    jssdk.getOauthAccessToken(code)
  }
  console.log(ctx.request.href);
  let jssdkConfigArgs = await jssdk.getSignature(ctx.request.href)

  await ctx.render('backend/index', {
    hi: new Date(),
    jssdkConfigArgs
  })
})



module.exports = router