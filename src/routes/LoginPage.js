import React from "react";
import {Form, Button, Input} from 'antd-mobile'
import { routerRedux } from 'dva/router'
import { connect } from "dva";
import WarnMsg from "../components/WarnMsg";
import styles from './LoginPage.css'

class LoginPage extends React.Component {

    constructor(props){
        super(props)
        this.handleFinish=this.handleFinish.bind(this)
        this.dispatch = this.props.dispatch
    }
    handleFinish (values){
        // console.log(values)
        this.dispatch({
            type: 'login/check',
            payload:{
                username:values.username,
                password:values.password
            }
        })
        if(this.props.login.success) {
            // console.log("登录成功")
            this.LoginSuccess()
        } 
    }

    LoginSuccess = ()=>{
        this.dispatch(routerRedux.push({
            pathname:'/success',
            query:{
                username:this.props.login.username
            }
        }))
    }
    
    render(){
        if(this.props.login.first){
            return(
                <div>
                    <div className={styles.login_form_title}>欢迎登陆</div>
                    <div className={styles.login}>
                        <Form layout="horizontal" 
                        className='login_form'
                        onFinish={this.handleFinish} //提交表单并验证成功
                        name='login_form'
                        footer={
                            <div className={styles.login_form_footer}>
                            <a className={styles.login_form_forget_psw} href='#/login' >忘记密码</a>
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
                </div>
            )
        } else {
            return(
                <div>
                    <WarnMsg />
                    <div className={styles.login}>
                        <Form layout="horizontal" 
                        className='login_form'
                        onFinish={this.handleFinish} //提交表单并验证成功
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
                </div>
            )
        }
    }
}


export default connect(({ login })=>{
    // console.log('login', login)
    return ({
    login
})})(LoginPage)