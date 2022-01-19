├─config near 配置文件再这里 <br> 
├─src <br>
&emsp;├─api <br>
&emsp;├─assets  //静态图片目录<br>
&emsp;├─components //公共组件目录<br>
&emsp;├─config //路由配置目录<br>
&emsp;├─core //启动加载文件<br>
&emsp;├─layouts //页面布局文件目录<br>
&emsp;├─locales <br>
&emsp;├─router //路由实例化<br>
&emsp;├─server //接口地址配置/公共请求封装<br>
&emsp;├─store //状态管理<br>
&emsp;├─utils //辅助工具函数<br>
&emsp;└─views //页面目录<br>

- 安装依赖
```
yarn install
```

- 本地启动
```
yarn run serve
```

- 打生产包
```
yarn run build
```

- 部署方式

打包后将 /dist 目录下文件传入服务器网站配置的目录
