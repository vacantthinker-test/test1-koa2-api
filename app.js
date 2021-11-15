const Koa = require('koa')
const app = new Koa() // 创建一个koa 实例 --> app
const Router = require('@koa/router') // 这里要用到koa-router 不记得名字 可以在npmjs.com 中查找
const router = new Router() // 创建一个router实例 --> router
const bodyparser = require('koa-bodyparser')
const cors = require('@koa/cors')

// 模拟数据库
const users = [
	{id: 1, userName: 'John1', password: '111'},
	{id: 2, userName: 'John2', password: '112'},
	{id: 3, userName: 'John3', password: '113'}
]
// 模拟自增ID
let uid = users.length

// 配置路由 举例如下
router
	.get('/', (ctx, next) => { // 访问根路径 /
		ctx.body = '我是一个服务器 更新了'; // 返回 'Hello World' // CTRL+S 保存文件
		           // nodemon 知道了该更新 自动重启了服务器
	})
	.post('/users', (ctx, next) => {
		// 1 获取数据 解析参数 合成对象
		const {userName, password} = ctx.request.body
		const user = { id: ++uid, userName, password}
		// 2 存储
		users.push(user) // 添加的对象 属性顺序不对 会提示参数类型不对
		
		// 3 给浏览器发送响应 成功还是失败?
		ctx.response.type = 'json'
		if (user.id){
			ctx.response.body = {status: 200, message: 'success', id: user.id}
		}else {
			ctx.response.body = {status: 500, message: 'failure'}
		}
		
	})
	.get('/users/:id', (ctx, next)=>{
		const {id} = ctx.request.params
		const foundUser = users.filter(user => (+user.id) === (+id)) // filter返回一个数组
		
		ctx.type = 'json'
		// ctx.body = {status: 200, message: 'success', data: foundUser[0]}
		// 怎么能给密码这种危险的东西呢，NO
		ctx.body = foundUser.map(user=>({id: user.id, userName: user.userName}))[0]
	})
	.get('/users', (ctx, next) => { // 获取所有的user
		console.log('get /users 执行了')
		ctx.type = 'json'
		// 对数据进行一定的处理 password怎么能给? 当前可是get请求
		ctx.body = users.map(user=>({id: user.id, userName: user.userName}))
	})
	.put('/users/:id', (ctx, next) => {
		console.log('put')
		// 1获取参数
		const {id} = ctx.request.params
		const user = ctx.request.body
		console.log(id, user)
		
		// 2处理
		const foundUser = users.filter(user => (user.id+'') === id) // === 是全等判断 即类型和数据
		const foundIndex = users.indexOf(foundUser[0]) // 找到要删除User的index下标
		users[foundIndex] = user
		
		// 3响应
		console.log('users', users)
		ctx.type = 'json'
		ctx.body = {status: 200, message: 'success'}
	})
	.del('/users/:id', (ctx, next) => { // router.delete() 的别名，因为 delete 是一个保留字
		console.log('del',ctx.request.params);
		const {id} = ctx.request.params // 注意这里 http传输全名为 超文本传输协议 即它传输的都是文本
		
		// 数字 === 字符串 这么判断下来全是false
		const foundUser = users.filter(user => (user.id+'') === id) // === 是全等判断 即类型和数据
		const foundIndex = users.indexOf(foundUser[0]) // 找到要删除User的index下标
		const deletedUser = users.splice(foundIndex, 1)[0] // 使用splice删除该下标元素
		
		ctx.type = 'json'
		if (deletedUser.id === foundUser.id){
			console.log('del', `${id} 被删除了`) // 服务器没问题
			ctx.body = {status: '200', message: 'success'}
		}else {
			ctx.body = {status: '500', message: 'failure'}
		}
	})
	.all('/users/:id', (ctx, next) => {
		// ...
	});

// 加载路由 可以连续使用
app
	.use(cors())
	.use(bodyparser())
	.use(router.routes())
	// .use()
	// .use()

// 配置完成, 开启监听, 即启动服务器
const port = 3000
const hostname = 'localhost'
app.listen(port, hostname, ()=>{
	console.log(`服务器启动了... http://${hostname}:${port}`) // 内容匹配 服务器启动成功
})
