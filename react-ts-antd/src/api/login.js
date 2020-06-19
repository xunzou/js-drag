/*
* @Author: xunzou
 * @Date: 2020-06-19 10:37:42
 * @Desc: login
 * @Last Modified by: ylq
 * @Last Modified time: 2020-06-19 14:50:08
 */
import { axios } from '../utils/Axios'
/**
 * 用户认证所用到的 API
 * @class AuthService
 */
class AuthService {

  /**
   * 登录
   * @param  {String} userData.LoginName
   * @param  {String} userData.Password
   * @return {Object} userData
   */
  signIn (userData) {
    return axios({
      method:'post',
      url: '/user/logon',
      data: userData
    })
  }

  /**
   * 注销登录
   * @return {Promise}
   */
  logout () {
    return axios({
      url: '/user/exit',
      method:'post',
    })
  }
}

// 实例化后导出，全局单例
export default new AuthService()
