/******
 * 1.页面存放目录为views
 * 2.生成的路由name为目录层级名连以_,例如:console_user_index
 * 3.生成的路由path为目录层级名连以/,例如:console/user/index
 * 4.非末级目录路由组件统一为RouteView
 * 5.非末级目录生成独立路由
 * 6.路由层级以目录层级为准
 * 7.页面文件名采用驼峰命名,不得包含_
 ******/
const Glob = require('glob')
const pify = require('pify')
const path = require('path')
const fs = require('fs')
const glob = pify(Glob)
const _  = require("lodash")
const staticDir = ['exception', 'public'] //过滤静态单页,不需自动生成的路由目录
generateRoutes = async () => {
	const files = {};
	let pages = await glob(`**/*`, {
		cwd: path.resolve(process.cwd(), './src/views'),
		ignore: ['**/*.test.*', '**/*.spec.*', '**/-*.*']
	});
	pages.forEach((f) => {
		const key = f.replace(/\.(js|vue)$/, '').replace(/\/{2,}/g, '/').replace(/\//g, '_')
		if (!files[key] && staticDir.indexOf(f.split('/')[0]) === -1) {
			files[key] = f
		}
	})
	return createRoutes(files, path.resolve(process.cwd(), './src'), 'views')
}

function filterName(routes){
	routes.forEach(item=>{
		if(item.component === 'RouteView'){
			delete item.name
			filterName(item.children)
		}
	})
	return routes
}
function createRoutes(files, srcDir, pagesDir) {
	let routes = []
	let requireComponent = []
	
	Object.keys(files).forEach((key) => {
		const file = files[key]
		let route = {
			name: key,
			path: `/${file.replace(/\.vue$/, '')}`,
			component: `${_.upperFirst(_.camelCase(key))}`
		}
		if (!/\.vue$/.test(file)) {
			if(file.split('/').length === 1){
				route.component = 'PageView'
			}else{
				route.component = 'RouteView'
			}
			if(Object.keys(files).some(item=>item=== key+'_index')){
				route.redirect = `/${file.replace(/\.vue$/, '')}/index`
				//route.component = `${_.upperFirst(_.camelCase(key))}Index`
			}
			
			route.children = []
		}else{
			
			requireComponent.push(`import ${_.upperFirst(_.camelCase(key))} from '@/views/${file}'`)
		}
		routes.push(route)
	})
	let routesData = []
	routes.forEach((route) => {
		const routeLevel = route.name.split('_').length
		routes.forEach((item) => {
			const itemLevel = item.name.split('_').length
			if (item.name.startsWith(route.name) && (itemLevel - routeLevel === 1)) {
				route.children.push(item);
				if (!routesData.some(item => item.name === route.name) && routeLevel === 1) {
					routesData.push(route)
				}
			}
		})
	})
	
	return {
		'routes': routesData,
		'requireComponent': requireComponent
	}
}
module.exports.creatRouter = (flag = false) => {
	if (flag) return
	generateRoutes().then(res => {
		let string = `/* eslint-disable */\n`
		string += `import RouteView from '@/layouts/RouteView' \n`
		string += `import PageView from '@/layouts/PageView' \n`
		res.requireComponent.forEach(item => {
		            string += `${item}\n`
		})
		const routes = filterName(res.routes)
		string += `export const routes = ${JSON.stringify(routes, null, 2)}`
		.replace(/"component": "(\w+?)"/g, `"component": $1`)
		.replace(/"(\w+?)":/g, '$1:')
		fs.writeFile(path.resolve(process.cwd(), './src/router/routes.js'), string, (file) => {
			// console.log('路由文件生成完毕')
		})
	})
}
