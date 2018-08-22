import React from 'react'
import {Link} from 'react-router-dom'
import {post} from '../../../tools/request';
import { Form, Input, Tooltip, Icon, Select, Button, message } from 'antd';
import HeaderWithoutLogin from '../../layout/header/HeaderWithoutLogin'
import {phone} from  '../../../tools/rules';
import '../login/index.css'

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

class RegistrationForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        post(`users`, values).then(data => {
          if(data.id){
            this.props.history.push('/login')
          }else{
            message.error('失败')
          }
          
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
      </Select>
    );

    return (
      <div className='register'>
        <HeaderWithoutLogin />
        <div className='register-area'>
          <Form onSubmit={this.handleSubmit} className='personal-register-form' style={{marginLeft: -50}}>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  用户名&nbsp;
                  <Tooltip title="你的名称">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              )}
            >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入你的昵称!', whitespace: true }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="手机号"
            >
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: '请正确输入你的手机号!', pattern: phone }],
              })(
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="E-mail"
            >
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: '请正确输入你的邮箱!',
                }, {
                  required: false, message: '请正确输入你的邮箱!',
                }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Password"
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: '请正确输入你的密码!',
                }],
              })(
                <Input type='password'/>
              )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">注册</Button>
              <div className="personal-footer-component">
                  <span className='personal-login-footer'><span className='personal-login-noaccount'>已有账号?</span> <span><Link to='/login'>立即登录</Link></span></span>
              </div>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default WrappedRegistrationForm
