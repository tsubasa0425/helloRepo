import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
// 导入prop-types包
import PropTypes from 'prop-types'

// 导入图片资源
import img from './images/cat.png'

/** 组件通讯
 * 
 * 组件是独立且封闭的单元，默认情况下，只能使用组件自己的数据。在组件化过程中，我们将一个完整的功能拆分成多个组件，
 * 以更好的完成整个应用的功能。而在这个过程中，多个组件之间不可避免的要共享某些数据。为了实现这些功能，就需要打破组
 * 件的独立封闭性，让其与外界沟通。这个过程就是组件通讯。
*/

/*
  props
  
   组件是封闭的，要接收外部数据应该通过 props 来实现
   props的作用：接收传递给组件的数据
   传递数据：给组件标签添加属性
   接收数据：函数组件通过参数props接收数据，类组件通过 this.props 接收数据

  props特点
  1. 可以给组件传递任意类型的数据
  2. props 是只读的对象，只能读取属性的值，无法修改对象
  3. 注意：使用类组件时，如果写了构造函数，应该将 props 传递给 super()，否则，无法在构造函数中获取到 props！

*/

// 2 接收数据（函数）
const Hello_func = (props)=>{
  console.log(props)
  return (
    <div>
      <h1>props: {props.name} </h1>
    </div>
  )
}

// 2 接收数据（类）
class Hello_class extends React.Component {
  constructor(props) {
    // 推荐奖props传递给父类构造函数
    super(props)
    console.log(this.props)
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h1>props:{this.props.name} </h1>
        {this.props.tag}
      </div>
    )
  }
}
// 1 传递数据
ReactDOM.render(<Hello_class name='rose' 
age={19} 
tag={<p>这是一个p标签</p>} 
fn={()=>{console.log('这是个函数')}} 
color={['red','green']}/>, document.getElementById('root'))







/***      组件通讯的三种方式
 * 
 * 1. 父组件 -> 子组件
 * 2. 子组件 -> 父组件
 * 3. 兄弟组件
 * 
 */


/*
  父组件传递数据给子组件
  1. 父组件提供要传递的state数据
  2. 给子组件标签添加属性，值为 state 中的数据
  3. 子组件中通过 props 接收父组件中传递的数据
*/

// 父组件
class Parent extends React.Component {
  state  = {
    lastName:'王'
  }
  render() {
    return(
      <div className='parent'>
        父组件：
        <Child lastName={this.state.lastName} />
      </div>
    )
  }
}
// 子组件
class Child extends React.Component {
  constructor(props) {
    super(props)
    console.log('子组件：',props)
  }
  render() {
    return (
      <div className='child'>
        <p>子组件，接收到父组件的数据：{this.props.lastName}</p>
      </div>
    )
  }
}
ReactDOM.render(<Parent/>, document.getElementById('01'))


/*
  子组件传递数据给父组件
  思路：利用回调函数，父组件提供回调，子组件调用，将要传递的数据作为回调函数的参数。
  1. 父组件提供一个回调函数（用于接收数据）
  2. 将该函数作为属性的值，传递给子组件、
  3. 子组件通过 props 调用回调函数
  4. 将子组件的数据作为参数传递给回调函数
*/

// 父组件
class Mother extends React.Component {
  state  ={
    parentMsg:''
  }
  // 提供回调函数：用来接收数据
  getChildMsg = data =>{
    console.log('接受到子组件中传递过来的数据：',data)
    this.setState({
      parentMsg:data
    })
  }


  render() {
    return(
      <div className='mother'>
        父组件：{this.state.parentMsg}
        <Son  getMsg={this.getChildMsg}/>
      </div>
    )
  }
}
// 子组件
class Son extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      msg:'刷抖音'
    }
  }
  handleClick = ()=> {
    // 子组件调用父组件中传递过来的回调函数
    this.props.getMsg(this.state.msg)
  }
  render() {
    return (
      <div className='son'>
        子组件：
        <button onClick={this.handleClick}>点我，给父组件传递数据</button>
      </div>
    )
  }
}
ReactDOM.render(<Mother/>, document.getElementById('02'))

/*
  兄弟组件
   将共享状态提升到最近的公共父组件中，由公共父组件管理这个状态
   思想：状态提升
   公共父组件职责：1. 提供共享状态 2. 提供操作共享状态的方法
   要通讯的子组件只需通过 props 接收状态或操作状态的方法
*/

// 父组件
class Counter extends React.Component {
  state = {
    count:0
  }
  // 提供修改状态的方法
  addCount = ()=>{
    this.setState({
      count: this.state.count+1
    })
  }
  render() {
    return (
      <div>
        <Child1 count={this.state.count} />
        <Child2 addCount = {this.addCount}/>
      </div>
    );
  }
}

const Child1 = (props)=>{
  return <h1>计数器：{props.count}</h1>
}
const Child2 = (props)=>{
  const handleClick = ()=>{
    props.addCount()
  } 
  return <button onClick={handleClick}>+1</button>
}

ReactDOM.render(<Counter/>, document.getElementById('03'))



/*
  Context
  思考：App 组件要传递数据给 Child 组件，该如何处理？
  ● 更好的姿势：使用 Context
  ● 作用：跨组件传递数据（比如：主题、语言等）

  总结
  1. 如果两个组件是远方亲戚（比如，嵌套多层）可以使用Context实现组件通讯
  2. Context提供了两个组件：Provider 和 Consumer
  3. Provider组件：用来提供数据
  4. Consumer组件：用来消费数据
*/ 


// 1.调用 React. createContext() 创建 Provider（提供数据） 和 Consumer（消费数据） 两个组件
const {Provider, Consumer} = React.createContext()
// 4. 调用 Consumer 组件接收数据

class App extends React.Component {
  render() {
    return (
      // // 3. 设置 value 属性，表示要传递的数据
      <Provider value='pink'>  
        {/* 2. 使用 Provider 组件作为父节点 */}
        <div className='app'>
          <Node />
        </div>
      </Provider>
    )
  }
}

const Node = props =>{
  return (
    <div className='node'>
      <SubNode />
    </div>
  )
}

const SubNode = props =>{
  return (
    <div className='subnode'>
      <Childs />
    </div>
  )
}

const Childs = props =>{
  return (
    <div className='childs'>
      <Consumer>
        {
          data => <span>我是子节点 --{data}</span>
        }
      </Consumer>
    </div>
  )
}
ReactDOM.render(<App/>, document.getElementById('04'))





/****************Props深入************** */

/*** 1.children属性
 * ● children 属性：表示组件标签的子节点。当组件标签有子节点时，props 就会有该属性
 * ● children 属性与普通的props一样，值可以是任意值（文本、React元素、组件，甚至是函数）
 */
const Children = props => {
 
  console.log(props)
  return (
    <div>
      <h1>组件标签的子节点：{props.children}</h1>
      {/* <h1>函数子节点要调用：{props.children()}</h1> */}
    </div>
  )
} 
// children为文本节点
// ReactDOM.render(<Children>我是子节点</Children>, document.getElementById('05'))

// children为：jsx或组件
ReactDOM.render(
  <Children>
    <p>我是子节点，一个p标签</p>
  </Children>, 
  document.getElementById('06')
)

// children为：函数
// ReactDOM.render(
//   <Children>
//     {
//       ()=>console.log('这是一个函数子节点')
//     }
//   </Children>, 
//   document.getElementById('07')
// )


/*** 2.props校验
 * ● 对于组件来说，props 是外来的，无法保证组件使用者传入什么格式的数据
 * ● 如果传入的数据格式不对，可能会导致组件内部报错
 * ● 关键问题：组件的使用者不知道明确的错误原因
 * ● props 校验：允许在创建组件的时候，就指定 props 的类型、格式等
 * ● 作用：捕获使用组件时因为props导致的错误，给出明确的错误提示，增加组件的健壮性
 * 
 * --------------约束规则
 * 1. 常见类型：array、bool、func、number、object、string
 * 2. React元素类型：element
 * 3. 必填项：isRequired
 * 4. 特定结构的对象：shape({ })
 */

const Pt = props => {
  const arr = props.colors
  const lis = arr.map((item, index)=><li key={index}>{item}</li> )
  return <ul>{lis}</ul>
}

// 添加props校验
App.propTypes = {
  colors: PropTypes.array
}

ReactDOM.render(<Pt colors={['red','blue','green']} />, document.getElementById('08'))


const PT = ()=>{
  return(
    <div>
      <h3>props校验：</h3>
    </div>
  )
}
/*
添加props校验
  属性 a 的类型：       数值（number）
  属性fn的类型：        函数（func）并且必填
  属性tag的类型：       React元素（element）
  属性filter的类型：    对象（{area: '上海', price:1999}）
*/
PT.propTypes = {
  a: PropTypes.number,
  fn:PropTypes.func.isRequired,
  tag:PropTypes.element,
  filter:PropTypes.shape({
    area:PropTypes.string,
    price:PropTypes.number
  })
}

/*** 3.props的默认值
 * ● 场景：分页组件 → 每页显示条数
 * ● 作用：给 props 设置默认值，在未传入 props 时生效
 */
 
const Defualt = (props)=>{
  console.log(props)
  return (
    <div>
      <h4>此处展示props的默认值：{props.pageSize}</h4>
    </div>
  )
}

// 添加props默认值
Defualt.defaultProps = {
  pageSize:10
}
ReactDOM.render(<Defualt  pageSize={20} />, document.getElementById('09'))



/**       组件生命周期
 * 组件的生命周期：组件从被创建到挂载到页面中运行，再到组件不用时卸载的过程
 * 生命周期的每个阶段总是伴随着一些方法调用，这些方法就是生命周期的钩子函数。
 * ● 只有 类组件 才有生命周期。
 */

class Life extends React.Component {
  constructor(props) {
    super(props)

    /** 常用于：初始化state、为事件处理程序绑定this
     * 触发时机：创建组件时，最先执行
     */
    this.state = {
      count:0
    }
    console.warn('生命周期钩子函数：constructor')
  }

  // 打豆豆
  handleClick = ()=>{
    this.setState({
      count: this.state.count+1
    })
  }

  render(){
    /** 常用于：渲染UI（注意：不能调用setState()）
     * 触发时机：每次组件渲染都会触发
     */
    console.warn('生命周期钩子函数：render')
    return(
      <div>
        {
          this.state.count > 3
          ? <p>豆豆被打死啦！</p>
          : <CountDou count={this.state.count}/>
        }
        <button id='btn' onClick={this.handleClick} >打豆豆</button>
      </div>
    )
  }
  componentDidMount() {
    /** 常用于：发送ajax请求、DOM操作
     * 触发时机：组件挂载（完成DOM渲染）后
     */
    console.warn('生命周期钩子函数：componentDidMount')
  }
}

class CountDou extends React.Component {

  componentDidMount(){
    // 开启定时器
    this.timeId = setInterval(()=>{
      console.log('定时器正在执行')
    }, 1000)
  }

  render() {
    console.warn('--子组件--生命周期钩子函数：render')
    return(
      <h3 id='title'>统计打豆豆的次数：{this.props.count}</h3>
    )
  }
  // 注意：如果要调用 setState() 更新状态，必须要放在一个 if 条件中
  // 如果直接调用 setState() 更新状态，也会导致递归更新！！！
  // componentDidUpdate() -> setState() -> render() -> componentDidUpdate().......
  componentDidUpdate(prevProps) {
    console.warn('--子组件--生命周期钩子函数：componentDidUpdate')
    // 获取DOM
    const title = document.getElementById('title')
    console.log(title.innerHTML)
    
    
    // 正确调用setState():
    // 比较更新前后的props是否相同，来决定是否重新渲染组件
    console.log('上一次的props：', prevProps, ',当前的props：', this.props)
    if(prevProps.count !== this.props.count) {
      this.setState({
        count:this.props.count
      })
      // 发送ajax请求的代码
    }
  }
  
  componentWillUnmount(){
    /** 执行清理工作（比如清理定时器等）
     * 触发时机：组件卸载（从页面中消失）
     */
    console.warn('--子组件--生命周期钩子函数：componentWillUnmount')

    // 清理定时器
    clearInterval(this.timeId)
  }
}
ReactDOM.render(<Life  />, document.getElementById('10'))





/***********             组件复用
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
  render() {
    // return null
    return this.props.render(this.state)
  }
}

class MouseApp extends React.Component {
  render() {
      return(
          <div>
              <h1>render props 模式</h1>
              <Mouse render={(mouse) => {
                return <p>鼠标位置: {mouse.x},{mouse.y}</p>
              }} />
              {/* 猫捉老鼠 */}
              <Mouse render={ mouse =>{
                return <img src={img} alt='猫' style={{
                  position:'absolute',
                  top: mouse.y - 126,
                  left:mouse.x - 164,
                }} />
              }} />
          </div>
      )
  }
}
ReactDOM.render(<MouseApp />, document.getElementById('11'))