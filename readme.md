#### 使用koa2 创建一个api服务器

---

 - 目标
   - crud 增删改查
   - 使用restful风格api
     - post 增加   create
     - del 删除
     - put 更新
     - get 查询

 - 和vue2 配合使用 

---

 - 1 创建package.json
 - 2 创建app.js

---

使用yarn 缓存好的模块进行安装, 默认查找版本号最接近的 复制到 node_modules文件夹
```cmd
yarn install --offline
```

Enable coding assistance for Node.js
 - webstorm 提示 为Node.js开启编码访问
 - 如果右下角提示错误
   - 请在package.json文件中 安装 "@types/node": "^16.11.7"

使用yarn缓存好的模块进行安装 加--cached就会使用缓存 --> 重用项目中某处已使用的最高版本
```cmd
yarn add @koa/router --cached
```

路由? 是什么
 - 一个path匹配一个处理行为的活动. 一一对应关系

URL 浏览器访问地址
/about 返回' Welcome to about us page'
/contact 返回' Welcome to contact us page'
其他path路径 返回'Hello World!'

即不同的path(path指路径) 返回不同的结果
```javascript
var url = req.url;
if(url ==='/about') {
    res.write(' Welcome to about us page'); 
    res.end(); 
 } else if(url ==='/contact') {
    res.write(' Welcome to contact us page'); 
    res.end(); 
 } else {
    res.write('Hello World!'); 
    res.end(); 
 }
```

使用nodemon 监视服务器更新 如果文件更改并保存了更改, 那么重启服务器
这将监视源中的任何更改并自动重新启动服务器。 非常适合开发。
```text
"watch": "nodemon app.js",
```

如何安装nodemon -g 即全局安装
```cmd 
npm install -g nodemon
```

Usage 使用方法


---

#### 拆分路由 不要什么都写在一个文件里 当前是api服务器

commonjs规范
CommonJS 规范是为了解决 JavaScript 的作用域问题而定义的模块形式，
可以使每个模块它自身的命名空间中执行。



---













