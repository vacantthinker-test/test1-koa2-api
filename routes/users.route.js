// 1 请求并声明一个router
const Router = require('@koa/router') // 这里要用到koa-router 不记得名字 可以在npmjs.com 中查找
const router = new Router() // 创建一个router实例 --> router

// 模拟数据库
// 数据结构 就三个属性 id userName password
const state = {
	users: []
}
const users = [
	{id: 1, userName: 'John1', password: '111'},
	{id: 2, userName: 'John2', password: '112'},
	{id: 3, userName: 'John3', password: '113'}
]
state.users = users

// 模拟自增ID
let uid = users.length

// 2 配置路由
router.post('/users', (ctx, next) => {
	// 1 获取数据 解析参数 合成对象
	const {userName, password} = ctx.request.body
	const user = { id: ++uid, userName, password}
	// 2 存储
	state.users.push(user) // 添加的对象 属性顺序不对 会提示参数类型不对
	
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
		console.log(`${id} user 获取中...`)
		const foundUser = state.users.filter(user => (+user.id) === (+id)) // filter返回一个数组
		
		ctx.type = 'json'
		// ctx.body = {status: 200, message: 'success', data: foundUser[0]}
		// 怎么能给密码这种危险的东西呢，NO
		ctx.body = foundUser.map(user=>({id: user.id, userName: user.userName}))[0]
	})
	.get('/users', (ctx, next) => { // 获取所有的user
		console.log('get /users 执行了')
		ctx.type = 'json'
		// 对数据进行一定的处理 password怎么能给? 当前可是get请求
		ctx.body = state.users.map(user=>({id: user.id, userName: user.userName}))
	})
	.put('/users/:id', (ctx, next) => {
		console.log('put')
		// 1获取参数
		const {id} = ctx.request.params
		const user = ctx.request.body
		console.log(id, user)
		
		// 2处理
		const foundUser = state.users.filter(user => (user.id+'') === id) // === 是全等判断 即类型和数据
		const foundIndex = state.users.indexOf(foundUser[0]) // 找到要删除User的index下标
		state.users[foundIndex] = user
		
		// 3响应
		console.log('users', state.users)
		ctx.type = 'json'
		ctx.body = {status: 200, message: 'success'}
	})
	.del('/users/:id', (ctx, next) => { // router.delete() 的别名，因为 delete 是一个保留字
		console.log('del',ctx.request.params);
		const {id} = ctx.request.params // 注意这里 http传输全名为 超文本传输协议 即它传输的都是文本
		
		// 数字 === 字符串 这么判断下来全是false
		const foundUser = state.users.filter(user => (user.id+'') === id) // === 是全等判断 即类型和数据
		const foundIndex = state.users.indexOf(foundUser[0]) // 找到要删除User的index下标
		const deletedUser = state.users.splice(foundIndex, 1)[0] // 使用splice删除该下标元素
		
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

// 3 导出路由
module.exports = router.routes() // 直接导出routes 方便直接使用
