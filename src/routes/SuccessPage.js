import React from "react"
import UserItem from "../components/UserItem"
import { Button } from "antd-mobile"
import {routerRedux} from 'dva/router'
import {connect } from 'dva'

class SuccessPage extends React.Component {
    constructor(props){
        super(props)
        this.dispatch = this.props.dispatch
    }
    handleClick = ()=>{
        // console.log('返回')
        // console.log(this.props.login.first)
        this.dispatch(routerRedux.push('/login'))
    }
    // let name = location.query.username
    // let name='Jack'
    render(){
        return (
            <div>
                <UserItem username={this.props.login.username} />
                <Button block 
                style={{
                    backgroundColor:"#1890FF",
                    color:"#FFF",
                    width:"330px",
                    height:"47px",
                    "--border-radius":"8px",
                    fontSize:"14px",
                    margin:"335px auto"
                }}
                onClick={this.handleClick}>返回登陆</Button>
            </div>
        )
    }
}

export default connect(({login})=>({login}))(SuccessPage)