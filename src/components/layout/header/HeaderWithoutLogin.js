import React from 'react'
import PersonalLogo from './logo.jpg'
import './HeaderWithoutLogin.css';

const header = () => (
  <div className='personal-header-without-login'>
    <div className='personal-header-info'>
      <div className='personal-logo'>
        <img src={PersonalLogo} alt='personal logo'></img>
      </div>
      <div className='header-info-des' style={{top: 3}}>
        <b style={{fontSize: 18, marginLeft: 20,color: '#ccc',fontWeight: 'normal'}}>|</b>
        <b style={{fontSize: 18, marginLeft: 20,color: '#fff'}}>个人的头部信息</b>
      </div>
    </div>
  </div>
)

export default header
