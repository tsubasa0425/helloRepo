import { connect } from "dva";
import React from "react";
import styles from './CountPage.css'
class CountPage extends React.Component {
    render() {

        const { dispatch , count } = this.props
        console.log(count)

        return(
            <div className={styles.normal}>
                <div className={styles.record}>Highest Reacord: {count.record}</div>
                <div className={styles.current}>{count.current}</div>
                <div className={styles.button}>
                    {/* 通过 + 发送 action */}
                    <button 
                        onClick={()=>{ dispatch({type: 'count/add'}) }}
                    >+</button> 
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { count: state }
} //获取state

export default connect(mapStateToProps)(CountPage)