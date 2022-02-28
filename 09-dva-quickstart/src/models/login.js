export default {
    namespace: 'login',
    state:{
        username:'',
        password:'',
        success: false,
        first: true
    },
    reducers:{
        /**
         * 检查用户名和密码格式
         * 用户名不超过10位，密码一定大于6位 
         */
        check(state, action) {
            const {login} = action
            console.log(login)
            if(login.username.length <= 10 && login.password.length > 6){
                return {
                    username:login.username,
                    password:login.password,
                    success: true,
                    first:true
                }
            }else {
                console.log('错啦！')
                return {
                    first:false
                }
            }
        }
    }
}