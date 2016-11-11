import React, {PropTypes} from 'react'
import {connect} from 'dva'
import {Card, Form, Input, Icon, Button, Checkbox, Spin} from 'antd'
import styles from './Login.less'

const FormItem = Form.Item

const Login = ({
  auth,
  dispatch,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  }
}) => {
  const {logining,username,password,remember} = auth
  function handleSubmit(e) {
    e.preventDefault();

    validateFields((errors) => {
      if (errors) {
        return
      }
      const fieldsValue = getFieldsValue()
      // const data = {
      //   ...getFieldsValue(),
      //   mark_at: fieldsValue['mark_at'].format(),
      //   is_public: fieldsValue["is_public"] ? 'y':'n',
      //   status: fieldsValue["status"] ? 'aa':'nn',
      //   key: item.key
      // }
      // onOk(data)
      dispatch({type: 'auth/login', payload: {
        username: fieldsValue['username'] || '',
        password: fieldsValue['password'] || '',
        remember: fieldsValue['remember'] || false
      }})
    })
  }

  return (
    <div className={styles.loginbg}>
      <Card title="测试平台" className={styles.logincls}>
        <Spin spinning={logining} tip='登陆中...'>
          <Form onSubmit={handleSubmit}>
            <FormItem>
              {getFieldDecorator('username', {
                initialValue: username,
                rules: [
                  {
                    required: true,
                    message: '用户名不能为空'
                  }
                ]
              })(
                <Input addonBefore={< Icon type = "user" />} placeholder="用户名"/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                initialValue: password,
                rules: [
                  {
                    required: true,
                    message: '密码不能为空'
                  }
                ]
              })(
                <Input addonBefore={< Icon type = "lock" />} type="password" placeholder="密码"/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: remember === 'true',
              })(
                <Checkbox>记住密码</Checkbox>
              )}
              <Button type="primary" htmlType="submit" className={styles.loginBtn}>
                登录
              </Button>
            </FormItem>
          </Form>
        </Spin>
      </Card>
    </div>
  )
}

Login.propTypes = {
  auth: PropTypes.object
};

function mapStateToProps({auth}) {
  return {auth}
}
export default connect(mapStateToProps)(Form.create()(Login))
