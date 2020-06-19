/*
* @Author: xunzou
 * @Date: 2020-06-18 16:09:03
 * @Desc: 按需加载react组件
 * @Last Modified by: ylq
 * @Last Modified time: 2020-06-19 09:51:22
 */
import React from 'react'
import Loadable from 'react-loadable'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


class Loading extends React.Component {
  //类似github页面加载的那个加载条
  componentWillMount(){
    NProgress.start()
  }
  componentWillUnmount(){
    NProgress.done()
  }
  render () {
    return (
      <div/>
    )
  }
}


export default function(component){
  return Loadable({
      loader: component,
      loading: Loading,
    })
}