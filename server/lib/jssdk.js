const request = require("request-promise")
// const request1 = require("request")
const sha1 = require('sha1')
// const path = require('path')

// let appId =  "wxf888fd237861dd4c"
// let appSecret =  "6ffaa7c89364a8964c035d3fa2d188c2"

// 必须使用微信认证过的服务号，才可以拉取用户基本信息（包括openId）
let appId =  "wxb0bbb77bb501cf0b"
let appSecret =  "5799760463be94afefffbedce05c80be"
//WeChat access_token API endpoint
const token_url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+appId+"&secret="+appSecret;
//WeChat jsapi_ticket API endpoint
const ticket_url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=";

async function getSignature(url){
  let nonceStr = Math.random().toString(36).substr(2, 15);
  let res = await request(token_url).catch(err=>console.log(err))
  if (!res){
    console.log('拉取token发生错误，可能需要检查公众号ip白名单');
    return null 
  }
  let data = JSON.parse(res);
  let access_token = data["access_token"];
  let res2 = await request(ticket_url+access_token).catch(err=>console.log(err))
  data = JSON.parse(res2);
  let ticket = data["ticket"];
  let timestamp = Date.now()
  
  let sha1 = createShaString(ticket,
    timestamp,
    nonceStr,
    url);
  return {
    appId:appId,
    timestamp,
    nonceStr,
    signature:sha1,
    url
  }
}

function createShaString(ticket,timestamp,nonce,url){
  var string1 = "jsapi_ticket="+ticket+"&noncestr="+nonce+"&timestamp="+timestamp+"&url="+url;
  console.log(string1);
  return sha1(string1);
}

function startGetOpenid(ctx){
  let redirectUrl = encodeURIComponent(`${ctx.request.origin}/apis/backend`)
  console.log('redirectUrl',redirectUrl);
  let targetUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
  ctx.status = 301;    
  ctx.redirect(targetUrl)
}

async function getAccessToken(code) {

  let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appId}&secret=${appSecret}&code=${code}&grant_type=authorization_code`;

  let res = await request(url)
  return {
    accessToken:res.access_token,
    openId:res.openid
  }
  // {"access_token":"39_QaX1un5VfzjlQ1QJ4PiJ9QNdft7imqVseaQSUGIJr5FpyO89Og3oGStFujUaOcTAjLqVLRBUA8qZtegdPo5a6A","expires_in":7200,"refresh_token":"39_Sax4_pleJ88MqnmrDksVoWjE1a-_DAIHCtT-bAUoAHDzD7APRJ4fTl61Z2X1UrM5t3uVxSxSFiQcwOHca2-snw","openid":"oKW_h5js3ECnQqezklWz391DivLE","scope":"snsapi_base"}
  // console.log(res);
}

async function getUserInfo(AccessToken, openId){

}


module.exports = {
  getSignature,
  startGetOpenid,
  getAccessToken
}
