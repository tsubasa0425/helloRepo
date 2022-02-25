import React from "react";
import UserItem from "./UserItem";
import { Button } from "antd-mobile";
import { history } from "umi";

export default function SuccessPage() {
    const handleClick = ()=>{
        history.goBack()
    }
    let {username} = history.location.query
    return (
        <div>
            <UserItem username={username} />
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
            onClick={handleClick}>返回登陆</Button>
        </div>
    
    )
}