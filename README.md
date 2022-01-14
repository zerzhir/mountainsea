├─api
├─assets  //静态图片目录
├─components //公共组件目录
├─config //路由配置目录
├─core //启动加载文件
├─layouts //页面布局文件目录
├─locales 
├─router //路由实例化
├─server //接口地址配置/公共请求封装
├─store //状态管理
├─utils //辅助工具函数
└─views //页面目录
    ├─activity //活动
    ├─blindbox //盲盒
    ├─center //个人中心
    ├─collection //藏品
    ├─community //社区
    ├─exception //异常
    ├─index //首页
    ├─mall //市场
    ├─policy //隐私政策
    └─public 

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