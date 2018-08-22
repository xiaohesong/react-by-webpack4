import React from 'react'
import {Link} from 'react-router-dom'
import { Form, Input, Tooltip, Icon, Select, Button } from 'antd';
import HeaderWithoutLogin from '../../layout/header/HeaderWithoutLogin'

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
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
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
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="手机号"
            >
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: '请正确输入你的手机号!' }],
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
