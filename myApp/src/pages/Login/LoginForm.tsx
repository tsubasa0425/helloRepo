import React, { useState } from 'react'
import{Form, Input, Button, Toast} from 'antd-mobile'
import styles from './login.css'

/**
 * 登录页面表单组件
 * 包括：输入用户名，输入密码，忘记密码，提交按钮
 */
const LoginForm = (props: { onFinish: ((values: any) => void)})=>{

    return(
        <div className={styles.login}>
            <Form layout="horizontal" 
            className='login_form'
            onFinish={props.onFinish} //提交表单并验证成功
            // onFinishFailed = {props.onFinishFailed} //提交表单但验证失败
            name='login_form'
            footer={
                <div className={styles.login_form_footer}>
                <a className={styles.login_form_forget_psw} href="#" >忘记密码</a>
                <Button block type='submit'>登陆</Button>
                </div>
            }>
                <Form.Item name='username' label='用户名' rules={[{ required:true, message:'请输入用户名' }]}>
                    <Input  placeholder="请输入用户名"></Input>
                </Form.Item>
                <Form.Item  name='password' label='密码' rules={[{ required:true, message:'请输入密码' }]}>
                    <Input type='password' placeholder="请输入密码" ></Input>
                </Form.Item>
            </Form>
        </div>
    )
}

export default LoginForm