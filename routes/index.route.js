// 1 请求并声明一个router
const Router = require('@koa/router') // 这里要用到koa-router 不记得名字 可以在npmjs.com 中查找
const router = new Router() // 创建一个router实例 --> router

// 2 配置路由
router
	.get('/', (ctx, next) => { // 访问根路径 /
		ctx.body = '我是一个服务器 更新了'; // 返回 'Hello World' // CTRL+S 保存文件
		// nodemon 知道了该更新 自动重启了服务器
	})

// 3 导出路由
module.exports = router.routes() // commonjs 规范 导出
