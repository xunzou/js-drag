import React from 'react'
import { Link } from 'react-router-dom'

const DashboardPage = () => (
  <section>
    <h1>Dashboard</h1>
    <p>这是一个首页</p>
    <Link to="/posts" className="button">
      查看文章
    </Link>
  </section>
)

export default DashboardPage