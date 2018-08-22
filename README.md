### development

```shell
git clone git@github.com:xiaohesong/react-by-webpack4.git
npm i && npm start
```

### production

```shell
npm run build && npm run pro
```

### env

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


