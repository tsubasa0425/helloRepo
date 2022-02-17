import{Form, Input, Button} from 'antd-mobile'
import styles from './login.css'

export default function LoginPage() {

    const onFinish =(values: {username:string, password:string})=>{
        console.log('接受到的数据为：',values)
    }

    return(
        <div className={styles.login}>
            <div className={styles.login_form_title}>欢迎登陆</div>
            <Form layout="horizontal" 
            className='login_form'
            onFinish={onFinish}
            name='login_form'
            footer={
                <div className={styles.login_form_footer}>
                <a className={styles.login_form_forget_psw} href="#" >忘记密码</a>
                <Button block type='submit' >登陆</Button>
                </div>
            }>
                <Form.Item name='username' label='用户名' rules={[{ required:true, message:'请输入用户名' }]}>
                    <Input placeholder="请输入用户名"></Input>
                </Form.Item>
                <Form.Item  name='password' label='密码' rules={[{ required:true, message:'请输入密码' }]}>
                    <Input type='password' placeholder="请输入密码" ></Input>
                </Form.Item>
            </Form>
        </div>
    )
}