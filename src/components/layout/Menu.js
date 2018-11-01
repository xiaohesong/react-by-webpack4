import React from 'react';
import {Menu, Icon} from 'antd'
import {Link} from 'react-router-dom'
import './Menu.css';

const menu = () => (
  <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
    <Menu.SubMenu key="sub1" title={<span><Icon type="appstore" /><span>Navigation Three</span></span>}>
      <Menu.Item key="1">
        <Icon type="user" />
        <Link to='/'><span className="nav-text">Home</span></Link>
      </Menu.Item>
    </Menu.SubMenu>
    <Menu.Item key="2">
      <Icon type="video-camera" />
      <Link to='/users'><span className="nav-text">用户</span></Link>
    </Menu.Item>
    <Menu.Item key="3">
      <Icon type="upload" />
      <Link to='/hello'><span className="nav-text">hello ts</span></Link>
    </Menu.Item>
    <Menu.Item key="4">
      <Icon type="user" />
      <span className="nav-text">nav 4</span>
    </Menu.Item>
  </Menu>
)

export default menu