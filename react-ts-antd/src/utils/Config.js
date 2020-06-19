/*
* @Author: xunzou
 * @Date: 2018-09-21 09:49:27
 * @Desc: 网站配置
 * @Last Modified by: ylq
 * @Last Modified time: 2020-06-17 17:51:20
 */
//  应用前缀名：避免同一个IP:PORT下，LocalStorage Key 同名造成冲突
const prefix = 'JWBCRM_'
const base = {
  prefix,
  SITENAME: '管理后台',
  VERSION: 'V0.0.1',
  ACCOUNT: prefix + 'APP_NAME', //  账户名 字段名
  PASSWORD: prefix + 'APP_PASSOWRD', //  密码 名
  RMP: prefix + 'APP_RMP', //  记住密码
  TOKEN: prefix + 'SESSION_KEY', //  TOKEN 字段名
  LOGIN_STATUS: prefix + 'LOGIN_STATUS', //  登陆状态
  LAST_LOGIN_TIME: prefix + 'LAST_LOGIN_TIME', //  最近一次登陆成功的时间戳 字段名
  MAX_LOGIN_AGE: 7.2 * 1000 * 1000,  //  登录的过期时间，默认：2小时
}

export default base
