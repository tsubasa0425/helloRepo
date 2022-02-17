import { Redirect } from "umi"
export default (props: any) => {
    const isLogin = true
    if(isLogin) {
        return(
            <div> 
                {/* <h1>Header</h1> */}
                {props.children}
                {/* <h2>Footer</h2> */}
            </div>
        )
    } else {
        alert('您没有登录')
        return <Redirect to='/'></Redirect>
    }
}