import React from 'react';
import {Layout, Avatar} from 'antd';
import Logo from './logo.jpg';
import {Link} from 'react-router-dom';
import './index.css';

const {Header} = Layout

const UserList = ['You', '张三', '李四', 'Xiaohesong', '小宋'];
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

export default class Shower extends React.PureComponent {
  state = {
    user: UserList[0],
    color: colorList[0],
  };

  render() {
    return(
      <Header className='header'>
        <Link to='/'><img src={Logo} alt=""/></Link>
        <Avatar 
          onClick={this.changeUser}  
          className='header-avatar' 
          style={{ backgroundColor: this.state.color }} 
          size="large"
          alt='so beautiful'
        >
          {this.state.user}
        </Avatar>
      </Header>
    )
  }

  changeUser = () => {
    const index = UserList.indexOf(this.state.user);
    this.setState({
      user: index < UserList.length - 1 ? UserList[index + 1] : UserList[0],
      color: index < colorList.length - 1 ? colorList[index + 1] : colorList[0],
    });
  }
}