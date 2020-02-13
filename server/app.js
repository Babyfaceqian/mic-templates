import Koa from 'koa';
const app = new Koa();
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import cors from 'koa-cors';

async function start() {
  try {
    app.use(cors({
      origin: function (ctx) {
        return ""; // 替换域名
      },
      // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
      // maxAge: 5,
      credentials: true, // 如果客户端开启 credential，则要设置为 true
      // allowMethods: ['GET', 'POST', 'DELETE'],
      // allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    }))
    app.use(logger())
    app.use(bodyParser());
    const router = require('./router/router')()
    app.use(router.routes())
      .use(router.allowedMethods());

    app.listen(3000);
  } catch (e) {
    console.log(e)
  }
}
start();