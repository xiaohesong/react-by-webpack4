import React from 'react';
import {withRouter} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className='status-404-content'>
    <div><h1 className="status-404">404</h1></div>
    <div className='status-404-notice'><span>抱歉，你访问的页面不存在</span></div>
  </div>
)

export default withRouter(NotFound)
