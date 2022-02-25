import React from "react";
import styles from './useritem.css'
/**
 * 登陆成功后，页面返回 头像+用户名 的组件
 */
const UserItem = (props:{username:string}) => {
        return(
            <div className={styles.user_item}>
                <div className={styles.user_img}></div>
                <div className={styles.user_info}>
                    Hi！{props.username}
                    <span>登录成功</span>
                </div>
            </div>
        )
}
export default UserItem