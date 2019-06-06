## 简单说明

当前技术栈使用的babel是7以前的版本，若要使用7以后的版本，请移步至[babel7 分支](https://github.com/xiaohesong/react-by-webpack4/tree/babel7)


### 目录
  - [技术栈](#技术栈)
  - [基础环境](#基础环境)
  - [开发环境](#开发环境)
  - [正式环境](#正式环境)
  - [环境参数](#环境配置)
  - [页面效果](#目前效果)
  

---

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

- port
  支持自定义端口
  
  例如`.env.development`配置`XHS_PORT=8888`，如果不配置则默认是`3000`端口.
  
### 开发环境
<details>
  <summary>点击展开</summary>
  
  ```shell
  git clone git@github.com:xiaohesong/react-by-webpack4.git
  cp example.env.development .env.development 
  npm i && npm start
  ```
</details>

### 正式环境

<details>
  <summary>点击展开</summary>
  
  
  ```shell
  npm run build && npm run pro
  ```
</details>

### 环境配置
<details>
  <summary>点击展开</summary>
  
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
</details>


### 目前效果

<details>
  <summary>点击展开</summary>
  
  > 注册页面

  ![](https://github.com/xiaohesong/TIL/blob/master/assets/front-end/imgs/react-by-webpack4/register.jpeg)

  > 登陆页面

  ![](https://github.com/xiaohesong/TIL/blob/master/assets/front-end/imgs/react-by-webpack4/login.jpeg)

  > 播放页面

  ![](https://github.com/xiaohesong/TIL/blob/master/assets/front-end/imgs/react-by-webpack4/home.jpeg)


</details>
