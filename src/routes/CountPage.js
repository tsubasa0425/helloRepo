import { connect } from "dva";
import React from "react";
import styles from './CountPage.css'
class CountPage extends React.Component {
    render() {

        const { dispatch } = this.props

        return(
            <div className={styles.normal}>
                <div className={styles.record}>Highest Reacord: 1</div>
                <div className={styles.current}>2</div>
                <div className={styles.button}>
                    <button onClick={()=>{}}>+</button>
                </div>
            </div>
        )
    }
}

export default connect()(CountPage)