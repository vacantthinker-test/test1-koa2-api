// 1 请求并声明一个koa实例 命名app
const Koa = require('koa')
const app = new Koa() // 创建一个koa 实例 --> app

// 2 请求并声明一个koa-body parser实例
const bodyparser = require('koa-bodyparser')
// 3 请求并声明一个cors实例
const cors = require('@koa/cors')

// 4 请求路由模块
const indexRoutes = require('./routes/index.route')
const usersRoutes = require('./routes/users.route')

// 5 配置koa实例 app
app
	.use(cors()) // 配置跨域 是否允许 当前配置 允许所有其他域访问
	.use(bodyparser()) // 配置request.body 解析
	.use(indexRoutes)  // 配置index路由
	.use(usersRoutes) // 配置users路由

// 6 配置完成, 开启监听, 即启动服务器
const port = 3000
const hostname = 'localhost'
app.listen(port, hostname, () => {
	console.log(`服务器启动了... http://${hostname}:${port}`) // 内容匹配 服务器启动成功
})

// 1 2 3 4 5 6 按步骤写代码
