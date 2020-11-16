const Router = require("@koa/router")
const { wechat: Koa3Wechat } = require('koa3-wechat');
// const debug = require("debug")('app:server:wechat')

const config = {
    origin: 'gh_258cc5932139',
    appId: 'wxf888fd237861dd4c',
    appSecret: '6ffaa7c89364a8964c035d3fa2d188c2',
    encodingAESKey: 'sgpc6KQQifgYRmApeea9Uoac28kUNX9HPol56CkBChB',
    token: 'yishulun2005'
}

class WechatMessageHandler {
    constructor() {
        this.router = new Router({
            prefix: "/apis/mp"
        })
        this.registerServices();
    }

    registerServices() {
        var router = this.router;
        this.msgHandler = new Koa3Wechat({
            token: config.token,
            appid: config.appId,
            encodingAESKey: config.encodingAESKey
        })
        // for receive xml message from wechat server.
        router.all('/msg', this.msgHandler.middleware(this.processWechatMessage.bind(this)));
    }

    async processWechatMessage(ctx) {
        // 微信输入信息都在this.weixin上
        var message = ctx.weixin;
        console.log("message", message)
        ctx.body = ''
    }

}

let handler = new WechatMessageHandler()
module.exports = handler.router