/*
* @Author: xunzou
 * @Date: 2020-06-19 10:37:42
 * @Desc: login
 * @Last Modified by: ylq
 * @Last Modified time: 2020-06-23 17:41:16
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
  
  /**
   * 设置当前用户
   *
   * @author xunzou
   * @param {*} data
   * @returns
   * @memberof AuthService
   */
  setUser(data){
    return axios({
      method:'post',
      url: '/user/setuser',
      data
    })
  }
  
  /**
   *  获取当前用户所有身份
   *
   * @author xunzou
   * @param {*} data
   * @returns
   * @memberof AuthService
   */
  getUserRoles(data){
    return axios({
      method:'post',
      url: '/user/getuser',
      data
    })
  }
  /**
   * 获取用户权限
   *
   * @author xunzou
   * @param {*} data
   * @returns
   * @memberof User
   */
  getPers (data) {
    return axios({
      method:'post',
      url: '/user/pers',
      data,
    })
  }
}

// 实例化后导出，全局单例
export default new AuthService()
