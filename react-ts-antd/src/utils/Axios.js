/*
* @Author: ylq
 * @Date: 2020-06-17 14:58:03
 * @Desc: Axios 
 * @Last Modified by: ylq
 * @Last Modified time: 2020-06-23 17:13:28
 */

import axios from 'axios'
import qs from 'qs'
import { isAuth} from './Session'

import config from './Config'
import { logout ,_setCookie } from './Session'



// --阻止重复发送请求----------------------------------------------------------------------------------
let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken;
let removePending = (ever) => {
    for(let p in pending){
      let apiIndex = ever.params && ever.params.apiindex
      let u = ever.url + '&' + ever.method
      if(apiIndex){
        u+= ('&' + apiIndex)
      }
      if(pending[p].u === u) { //当当前请求在数组中存在时执行函数体
          pending[p].f(); //执行取消操作
          pending.splice(p, 1); //把这条记录从数组中移除
      }
    }
}
// --阻止重复发送请求----------------------------------------------------------------------------------


// --formData 格式----------------------------------------------------------------------------------
let fdHeaders = {
  // formData 格式
  'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
}
// json格式 payload
// let jsonHeaders = {
//   'Content-type': 'application/json',
//   'X-Requested-With': 'XMLHttpRequest',
// }
// --formData 格式----------------------------------------------------------------------------------

// --创建一个新的axios实例----------------------------------------------------------------------------------
let http = axios.create({
  baseURL: '/api/',
  headers: fdHeaders,
  withCredentials: false,
  // transformRequest: [function (md, headers) {
  //   // 可以对md做任何操作
  //   console.log(md)
  //   md = {data:md}
  //   console.log(md)
  //   return md;
  // }],
  
  transformRequest: [(data) => {
    let td = 'data=' + encodeURIComponent(JSON.stringify(data))
    console.log(td);
    return td
  }],
  paramsSerializer: function (params) {
    // params = {data: params}
    return qs.stringify(params, { arrayFormat: 'brackets' })
    // return params
  },
  // 用于对相应数据进行处理
  // 它会通过then或者catch
  transformResponse: [function (data) {
    // 可以对data做任何操作
    // console.log(50,typeof data)
    data = JSON.parse(data)
    
    // return JSON.parse(data);
    let head = data.head
    let err = null
    if (head && head.s !== 0) {
      err = {msg:head.des,code:head.s}
    }
    let paging = null;
    let result = data.body
    if(result && result.page_info){
      paging = result.page_info;
      result = result.list;
    }
    let myData = {
      error: err || null,
      paging,
      result: result || null
    }
    return myData;
  }],

})
// --创建一个新的axios实例----------------------------------------------------------------------------------


// --添加请求拦截器----------------------------------------------------------------------------------
http.interceptors.request.use(config => {
  // loading
  // 发送请求类型，默认改为post
  // config.mt ? config.method = config.mt : config.method = 'POST';
  // 发送数据格式 json  如果需要form/data 增加hdt 属性，值为fd
  // if (config.hdt === 'json') { config.headers = jsonHeaders };
  // 获取token
  // let token = storage.getItem(con.TOKEN) || null;
  let token = isAuth()
  if (token) {
    config.headers['Access-Token'] = token
  }
  // console.log(token)
  // 提交数据格式转化
  // console.log(config)
  // ------------------------------------------------------------------------------------
  removePending(config); //在一个ajax发送前执行一下取消操作
  config.cancelToken = new cancelToken((c)=>{
    let apiIndex = config.params && config.params.apiindex
     // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
     let u = config.url + '&' + config.method
     if(apiIndex){
      u+= ('&' + apiIndex)
     }
     console.log(u)
     pending.push({ u, f: c });  
  });
  // ------------------------------------------------------------------------------------
  return config
}, err => {
  return Promise.reject(err)
})
// --添加请求拦截器----------------------------------------------------------------------------------

// --添加响应拦截器----------------------------------------------------------------------------------
http.interceptors.response.use(response => {
  // ------------------------------------------------------------------------------------------
  removePending(response.config);  //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
  // -------------------------------------------------------------------------------------------
  let rd = response.data;
  console.log(97,rd)
  if(rd.error && rd.error.code === 2010){
    // storage.removeItem(con.TOKEN)
    // router.replace({
    //   path: '/login',
    //   query: { back: router.currentRoute.fullPath }
    // })
    window.location.href = '/login'
    logout()
  } else {
    // 存储当前时间
    // storage.setItem(con.LAST_LOGIN_TIME, Date.now())
    _setCookie(config.LAST_LOGIN_TIME, Date.now() + 1000 * 60 *60);
    return rd
  }

}, error => {
  console.log('error',error)
  // console.log(error.response)
  return Promise.reject(error)
})
// --添加响应拦截器----------------------------------------------------------------------------------


// --导出为插件----------------------------------------------------------------------------------

// --导出axios----------------------------------------------------------------------------------
export { http as axios };