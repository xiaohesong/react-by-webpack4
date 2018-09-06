### 目录
  - [技术栈](#技术栈)
  - [基础环境](#基础环境)
  - [开发环境](#开发环境)
  - [正式环境](#正式环境)
  - [环境参数](#环境配置)
  - [页面效果](#目前效果)
  

---
<br>

### 技术栈
- react全家桶
  - react
  - redux
  - react-redux
  - react-router-dom
  - redux-saga
- antd
- typescript
- eslint

### 基础环境

- [node >= 7.1](https://github.com/GoogleChromeLabs/preload-webpack-plugin/issues/45#issuecomment-352523780)

### 开发环境

```shell
git clone git@github.com:xiaohesong/react-by-webpack4.git
cp example.env.development .env.development 
npm i && npm start
```

### 正式环境

```shell
npm run build && npm run pro
```

### 环境配置

支持配置环境变量

`.env`,`.env.development`, `.env.development.local`, `.env.production`, `.env.production.local`.

环境变量是以`XHS`开头.

`.env.development`
```file
XHS_NMAE='xiaohesong'
XHS_ID='xhs'
```

`app.js`
```js
...
console.log(process.env.XHS_NAME) //xiaohesong
...
```

> 如不想以`XHS`开头，可以在config/env下修改`NAMESPACE`.

目前使用到的优化有按需加载，webpack hash缓存.


### 目前效果

> 注册页面

![](https://github.com/xiaohesong/TIL/blob/master/assets/front-end/imgs/react-by-webpack4/register.jpeg)

> 登陆页面

![](https://github.com/xiaohesong/TIL/blob/master/assets/front-end/imgs/react-by-webpack4/login.jpeg)

> 播放页面

![](https://github.com/xiaohesong/TIL/blob/master/assets/front-end/imgs/react-by-webpack4/home.jpeg)

