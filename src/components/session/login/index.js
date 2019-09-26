import React from 'react';
import { Form, Icon, Input, Button, message, Checkbox } from 'antd';
import {Link} from 'react-router-dom';
import Header from '../../layout/header/HeaderWithoutLogin';
import { phone } from '../../../tools/rules';

import './index.css';

import * as userActions from '../../../actions/users';
import * as loginActions from '../../../actions/session/login';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'

const FormItem = Form.Item

class LoginForm extends React.PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('value is', values);
        if(values.accountable){
          message.success('登录成功!')
          localStorage.setItem('authId', 0)
          this.props.history.push('/')
          return true;
        }
        const {userList} = this.props.users.list
        this.props.actions.startLogin()
        values.password = values.password.trim()
        const user = userList.filter(user => (String(user.phone) === values.phone) && (String(user.password) === values.password))[0]
        this.props.actions.loginSuccess()
        if(user && user.id){
          message.success('登录成功!')
          localStorage.setItem('authId', user.id)
          this.props.history.push('/')
        }else{
          message.error('不存在该用户!')
        }
      }
    });
  }

  componentDidMount(){
    this.props.actions.getUsers()
  }
  render() {
    const {loading} = this.props.login
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='login'>
        <Header />
        <div className='login-area'>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: '请正确输入你的手机号', pattern: phone }],
              })(
                <Input prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入手机号" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请正确输入密码' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('accountable')(
                <Checkbox>无账号</Checkbox>
              )}
            </FormItem>
            <FormItem>
              <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
              <div className="personal-footer-component">
                  <span className='personal-login-footer'><span className='personal-login-noaccount'>无账号?</span>&nbsp;<span><Link to='/register'>注册</Link></span></span>
              </div>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

const WrappedLoginForm = Form.create()(LoginForm);
const mapStateToProps = (state, ownProps) => ({
  users: state.users,
  login: state.login
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}, loginActions, userActions), dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedLoginForm)
