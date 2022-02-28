import React from "react";
import styles from './warn.css'

// 登录提示窗口
const WarnMsg =()=>{
        return(
            <div className={styles.warn}>
                <div className={styles.warn_title}>登录提示窗口</div>
                <div className={styles.warn_content}>
                    <div>1.用户名不能超过10位</div>
                    <div>2.密码一定大于6位</div>
                </div>
            </div>
        )
}
export default WarnMsg