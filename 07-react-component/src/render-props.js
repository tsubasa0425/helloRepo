import React from "react";
import reactDom from "react-dom";

/** 组件复用
 * 处理方式：复用相似的功能（联想函数封装）
 * 复用什么？1. state 2. 操作state的方法 （组件状态逻辑 ）
 * 
 * 两种方式：1. render props模式 2. 高阶组件（HOC）
 * 注意：这两种方式不是新的API，而是利用React自身特点的编码技巧，演化而成的固定模式（写法）
 * 
 */



/** render props模式
 * 
 * 
 * 思路分析
 * 思路：将要复用的state和操作state的方法封装到一个组件中
 * 问题1：如何拿到该组件中复用的state？
 *      在使用组件时，添加一个值为函数的prop，通过 函数参数 来获取（需要组件内部实现）
 * 问题2：如何渲染任意的UI？
 *      使用该函数的返回值作为要渲染的UI内容（需要组件内部实现）
 */

// 创建Mouse组件
class Mouse extends React.Component {
    // 鼠标位置state
    state = {
        x: 0,
        y: 0
    }

    // 鼠标移动事件的事件处理程序
    handleMouseMove = e =>{
        this.setState({
            x: e.clientX,
            y: e.clientY
        })
    }

    // 监听鼠标移动事件
    componentDidMount() {
        window.addEventListener('mousemove', this.handleMouseMove)
    }
}

class Mouse_App extends React.Component {
    render() {
        return(
            <div>
                <h1>render props 模式</h1>
                <Mouse />
            </div>
        )
    }
}
