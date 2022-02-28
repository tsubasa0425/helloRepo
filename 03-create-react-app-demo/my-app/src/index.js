// 1.导入react
import React from "react";
import ReactDOM from "react-dom";

// 引入css
import './index.css'

// 2.创建react元素
const title = React.createElement("h1", null, "Hello React");

// 3.渲染react元素
ReactDOM.render(title, document.getElementById("root"));

// 使用JSX创建react元素
const Title = (
  <h1 className="title">
    Hello
    <span>你好</span>
  </h1>
)
/*
JSX注意点：
1. React元素的属性名使用驼峰命名法
2. 特殊属性名：class -> className、for -> htmlFor、tabindex -> tabIndex 。
3. 没有子节点的React元素可以用 /> 结束 。
4. 推荐：使用小括号包裹 JSX ，从而避免 JS 中的自动插入分号陷阱。
*/
ReactDOM.render(Title, document.getElementById("01"));


/********JSX中使用JavaScript表达式*********/
/* 嵌入JS表达式 */
/*
     数据存储在JS中
     语法：{ JavaScript表达式 } 
     注意：语法中是单大括号，不是双大括号！
*/
const name = 'Jack';
// 函数调用表达式
const sayHi = ()=>'Hi~'
const dv = <div>我是一个div</div>
const jsx_js = (
  <h1>
    Hello, {name}
    <p> {1} </p>
    <p> {'name'} </p>
    <p> {1+7} </p>
    <p> {3>5? '大于' : '小于等于'} </p> 
    <p> {sayHi()} </p>
    {dv}
  </h1>)
/*
注意点：
     单大括号中可以使用任意的 JavaScript 表达式
     JSX 自身也是 JS 表达式
     注意：JS 中的对象是一个例外，一般只会出现在 style 属性中
     注意：不能在{}中出现语句（比如：if/for 等）
*/
ReactDOM.render(jsx_js,document.getElementById('02'))



/* 条件渲染
     场景：loading效果
     条件渲染：根据条件渲染特定的 JSX 结构
     可以使用if/else或三元运算符或逻辑与运算符来实现
*/
const isLoading = true
const loadData = ()=>{
  if (isLoading) {
    return <div>Loading……</div>
  }
  return <div>数据加载完成，此处显示加载后的数据</div>
  // 三元表达式写法
  // isLoading ? (<div>Loading……</div>):(<div>数据加载完成，此处显示加载后的数据</div>)
}
const load = (
  <h2>
    条件渲染：
    {loadData()}
  </h2>
)
ReactDOM.render(load, document.getElementById('03'))


/** 逻辑 与 运算符 */
const And =  ()=>{
  // isloading=true时返回div，=false时返回null
  return isLoading && (<div>Loading……</div>)
}



/**
 * 列表渲染
 *  如果要渲染一组数据，应该使用数组的 map() 方法
 *  注意：渲染列表时应该添加 key 属性，key 属性的值要保证唯一
 *  原则：map() 遍历谁，就给谁添加 key 属性
 *  注意：尽量避免使用索引号作为 key
 */

// 歌曲列表
const songs =[
  {id:1, name:'痴心绝对'},
  {id:2, name:'像我这样的人'},
  {id:3, name:'南山南'}
]

const list = (
  <ul>
    {songs.map(item => <li key={item.id}>{item.name}</li>)}
  </ul>
)
ReactDOM.render(list,document.getElementById('04'))



/**
 * JSX的样式处理
 * 1.行内样式——style
 * 2.类名——className（推荐）
*/
// 行内样式
const style = (
  <h1 style={{color:'red', backgroundColor:'skyblue'}}>行内样式Sytle</h1>
)
ReactDOM.render(style,document.getElementById('05'))

// 类名
const classname = (
  <h1 className="className">类名Classname</h1>
)
ReactDOM.render(classname,document.getElementById('06'))