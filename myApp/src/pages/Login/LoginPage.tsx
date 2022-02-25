import React from "react";
import LoginForm from "./LoginForm";
import styles from './login.css'
import WarnMsg from "./WarnMsg";
import {history} from 'umi'


// 表单提交数据格式
type loginForm = {username:string, password:string};


class LoginPage extends React.Component {
    state:{first:Boolean, username:string, password:string} = {
        // 是否第一次登录
        first: true,
        username: '',
        password:''
    }
    /**
     * 检查用户名和密码格式
     * 用户名不超过10位，密码一定大于6位
     * @param values 
     */
    handleFinish = (values:loginForm)=>{
        // console.log(values)
        if(values.username.length <= 10 && values.password.length > 6){
            this.setState({username: values.username, password:values.password})
            history.push({
                pathname:'/success',
                query: {
                    // 要传的参数
                    username:this.state.username
                }
            })
        }
        this.setState({first:false})
    }

    render(): React.ReactNode {
        if(this.state.first){
            return(
            <div>
                <div className={styles.login_form_title}>欢迎登陆</div>
                <LoginForm onFinish={this.handleFinish}/>
            </div>
            )
        } else {
            return (
                <div>
                    <WarnMsg/>
                    <LoginForm onFinish={this.handleFinish} />
                </div>
            )
        }
    }
   
}

export default LoginPage