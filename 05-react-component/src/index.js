import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 导入 Hello组件
import Hello from './Hello';

/**
 * 函数组件 
 * 
 * 使用 JS 的函数（或箭头函数）创建的组件
 *  约定1：函数名称必须以大写字母开头
 *  约定2：函数组件必须有返回值，表示该组件的结构
 *  如果返回值为 null，表示不渲染任何内容 */
function Hello_func() {
  return (
    <div>这是我的第一个函数组件</div>
  )
}
// 箭头函数写法
// const Hello = () => ( <div>这是我的第一个函数组件</div>)
function ReturnNull (){
  // 不渲染任何内容
  return null
}

//  渲染函数组件：用函数名作为组件标签名
//  组件标签可以是单标签也可以是双标签
ReactDOM.render(<Hello_func/> ,document.getElementById('01'))


/**
 * 类组件
 * 
 * 使用 ES6 的 class 创建的组件
 * 
 *  约定1：类名称也必须以大写字母开头
 *  约定2：类组件应该继承 React.Component 父类，从而可以使用父类中提供的方法或属性
 *  约定3：类组件必须提供 render() 方法
 *  约定4：render() 方法必须有返回值，表示该组件的结构 */

// 创建类组件
class Hello_class extends React.Component {
  render() {
    return (
      <div>这是我的第一个类组件</div>
    )
  }
}
ReactDOM.render(<Hello_class/>, document.getElementById('02'))



/**
 * 抽离组件到独立的JS文件中
 * 组件作为一个独立的个体，一般都会放到一个单独的 JS 文件中
 * 
 * 
 * 步骤：
 * 1. 创建Hello.js
 * 2. 在 Hello.js 中导入React
 * 3. 创建组件（函数 或 类）
 * 4. 在 Hello.js 中导出该组件
 * 5. 在 index.js 中导入 Hello 组件
 * 6. 渲染组件
 */

// 导入 Hello组件
// import Hello from './Hello';   导入语句要写在最前面，不然会报错

// 渲染组件
ReactDOM.render(<Hello/>, document.getElementById('03'))




/*
  React事件处理
   React 事件绑定语法与 DOM 事件语法相似
   语法：on+事件名称={事件处理程序}，比如：onClick={() => {}}
   注意：React 事件采用驼峰命名法，比如：onMouseEnter、onFocus
*/ 

//类组件绑定事件
class App extends React.Component {

  // 事件处理程序
  handleClick() {
    console.log('单击事件触发了')
  }

  render() {
    return (
      <button onClick={this.handleClick}>点我，点我</button>
    );
  }
}
ReactDOM.render(<App/>, document.getElementById('04'))

// 函数组件绑定事件
function App_func() {
  // 事件处理程序
  function handleClick() {
    console.log('函数组件中的事件绑定，单击事件触发了')
  }
  return (
    <button onClick={handleClick}>点我丫</button>
  )
}
ReactDOM.render(<App_func/>, document.getElementById('05'))




/*
  事件对象
   可以通过事件处理程序的参数获取到事件对象
   React 中的事件对象叫做：合成事件（对象）
   合成事件：兼容所有浏览器，无需担心跨浏览器兼容性问题
*/

class App_obj extends React.Component {
  handleClick(e) {
    // 阻止浏览器的默认行为
    e.preventDefault()
    console.log('a标签的单击事件触发了')
  }
  render() {
    return(
      <a href='http://www.bing.com' onClick={this.handleClick}>必应Bing，点击不会跳转</a>
    )
  }
}
ReactDOM.render(<App_obj/>, document.getElementById('06'))


/**
 * 有状态组件和无状态组件
 * 
 *  函数组件又叫做无状态组件，类组件又叫做有状态组件
 *  状态（state）即数据
 *  函数组件没有自己的状态，只负责数据展示（静）
 *  类组件有自己的状态，负责更新 UI，让页面“动” 起来
 * 
 * */


/** State的基本使用
 * 
 *  状态（state）即数据，是组件内部的私有数据，只能在组件内部使用
 *  state 的值是对象，表示一个组件中可以有多个数据
 * 获取状态：this.state
 */

class State_app extends React.Component {
  /*constructor() {
    // ES6 class 构造函数的要求：先写super()
    super()

    // 初始化State
    this.state = {
      count:0
    }
  }*/

  // 简化写法初始化state
  state = {
    count:0
  }

  onIncreament() {
    /* setState()修改状态 */
    /* 
       状态是可变的
       语法：this.setState({ 要修改的数据 })
       注意：不要直接修改 state 中的值，这是错误的！！！
       setState() 作用：1. 修改 state 2. 更新UI
       思想：数据驱动视图
    */
    this.setState({
      count: this.state.count + 1
    })
    // 错误！！
    // this.state.count += 1
  }
  render() {
    // 箭头函数中的this指向外部环境，此处为：render()方法
    // render()方法中的this是State_app这个对象
    return (
      <div>
        <h1>计数器：{this.state.count } </h1>
        <button onClick={ ()=>{this.onIncreament()} }>+1</button>
      </div>
    )
  }
}

ReactDOM.render(<State_app/>, document.getElementById('07'))


/** 
 * 事件绑定this指向
 * 
 * 1. 箭头函数
 *    利用箭头函数自身不绑定this的特点
 *    render() 方法中的 this 为组件实例，可以获取到 setState(
 * 
 * 2. Function.prototype.bind()
 *    利用ES5中的bind方法，将事件处理程序中的this与组件实例绑定到一起
 * 
 * 3. class 的实例方法 (推荐)
 *    利用箭头函数形式的class实例方法
 *    注意：该语法是实验性语法，但是，由于babel的存在可以直接使用
 * 
 */


class Hello_bind extends React.Component {
  constructor() {
    super()
    // 初始化state
    this.state = {
      count:0
    }
    // 将事件处理程序中的this与组件实例绑定到一起
    this.onIncreament = this.onIncreament.bind(this)
  }
  onIncreament() {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return (
      <div>
        <h3>计数器：{this.state.count}</h3>
        <button onClick={this.onIncreament}>+1</button>
      </div>
    );
  }
}
ReactDOM.render(<Hello_bind/>, document.getElementById('08'))




class State_class extends React.Component {
  state = {
    count:0
  }
  // 利用箭头函数形式的class实例方法
  onIncreament = () => {
    this.setState({count:this.state.count+1})
  }
  render() {
    return (
      <div>
        <h2>计数器：{this.state.count}</h2>
        <button onClick={this.onIncreament}>+1</button>
      </div>
    )
  }
}
ReactDOM.render(<State_class/>, document.getElementById('09'))


/** 表单处理
 * 
 * 1. 受控组件
 *    受控组件：其值受到 React 控制的表单元素
 *    包括：文本框、富文本框、下拉框、复选框
 *    步骤：
 *        1. 在 state 中添加一个状态，作为表单元素的value值（控制表单元素值的来源）
 *        2. 给表单元素绑定 change 事件，将 表单元素的值 设置为 state 的值（控制表单元素值的变化）
 * 
 * 2. 非受控组件
 *    说明：借助于 ref，使用原生 DOM 方式来获取表单元素值
 *    ref 的作用：获取 DOM 或组件

 */


// 操作文本框的值
class Input extends React.Component {
  state = {
    txt: ''
  }
  handleChange = (e)=>{
    this.setState({
      txt: e.target.value
    })
  }
  render() {
    return (
      <div>
        <input type="text" value={this.state.txt} onChange={this.handleChange} />
      </div>
    )
  }
}
ReactDOM.render(<Input/>, document.getElementById('10'))

// 受控组件示例
class Element extends React.Component {
  state = {
    txt:'',
    content:'',
    city: 'bj',
    ischecked: false
  }
/*
多表单元素优化步骤：
  1. 给表单元素添加name属性，名称与 state 相同
  2. 根据表单元素类型获取对应值
  3. 在 change 事件处理程序中通过 [name] 来修改对应的state
*/
  handleForm = e => {
    // 获取当前DOM对象
    const target = e.target
    // 根据类型获取值
    const value = target.type === 'checkbox'? target.checked : target.value
    // 获取name
    const name = target.name
    this.setState({
      [name]: value
    })
  }
  render() {
    return(
      <div>
        {/* 文本框 */}
        <input type='text' name='txt' value={this.state.txt} onChange={this.handleForm}/>
        <br/>

        {/* 富文本框 */}
        <textarea  name='content' value={this.state.content} onChange={this.handleForm}></textarea>
        <br/>

        {/* 下拉框 */}
        <select  name='city' value={this.state.city} onChange={this.handleFormy}>
          <option value='sh'>上海</option>
          <option value='bj'>北京</option>
          <option value='gz'>广州</option>
        </select>
        <br/>

        {/* 复选框 */}
        <input name='ischecked' type='checkbox' checked={this.state.ischecked} onChange={this.handleForm}></input>
      </div>
    )
  }
}
ReactDOM.render(<Element />, document.getElementById('11'))


// 非受控组件示例
class Un_element extends React.Component {
  constructor() {
    super()
    // 1. 调用 React.createRef() 方法创建一个 ref 对象
    this.txtRef = React.createRef()
  }
  getTxt = () =>{
    // 3. 通过 ref 对象获取到文本框的值
    console.log(this.txtRef.current.value)
  }
  render() {
    return (
      <div>
        {/* 2. 将创建好的 ref 对象添加到文本框中 */}
        <input type='text' ref={this.txtRef}></input>
        <button onClick={this.getTxt}>获取文本框的值</button>
      </div>
    )
  }
}
ReactDOM.render(<Un_element />, document.getElementById('12'))