import React from 'react';
import ReactDOM from 'react-dom';

/**   需求分析
 * 1. 渲染评论列表（列表渲染）
 * 2. 没有评论数据时渲染：暂无评论（条件渲染）
 * 3. 获取评论信息，包括评论人和评论内容（受控组件）
 * 4. 发表评论，更新评论列表（setState()）
 * 
*/

/***    实现步骤
 * 1. 渲染评论列表
 *    ① 在 state 中初始化评论列表数据
 *    ② 使用数组的map方法遍历state中的列表数据
 *    ③ 给每个被遍历的li元素添加key属性
 * 2. 渲染暂无评论
 *    ① 判断列表数据的长度是否为0
 *    ② 如果为0，则渲染暂无评论
 * 3. 获取评论信息
 *    ① 使用受控组件方式处理表单元素
 * 4. 发表评论
 *    ① 给按钮绑定单击事件
 *    ② 在事件处理程序中，通过state获取评论信息
 *    ③ 将评论信息添加到state中，并调用 setState() 方法更新state
 *    ④ 边界情况：清空文本框
 *    ⑤ 边界情况：非空判断
 * 
*/


class Comment extends React.Component {
  // 初始化状态
  state = {
    comments:[
      {id:1, name:'Jack', content:'沙发！！！！'},
      {id:2, name:'Rose', content:'板凳！！！！'},
      {id:3, name:'Tom', content:'楼主好人'}
    ],

    // 评论人
    userName:'',

    // 评论内容
    userContent:''
  }
  // 渲染评论列表
  renderList() {
    if(this.state.comments.length === 0 ) {
      return <div className='no-comment'>暂无评论，快去评论吧！</div>
    }

    return (
      <ul>
        {this.state.comments.map(item=>(
          <li key = {item.id}>
          <h3>评论人：{item.name} </h3>
          <p>评论内容：{item.content} </p>
        </li>
        ))}
      </ul>
    )
  }

  // 处理表单元素值
  handleForm = e => {
    const { name, value} = e.target

    this.setState({
      [name]:value  
    })
  }

  //  发表评论
  addComment = ()=>{
    const {userName, userContent, comments} = this.state
    
    // 非空校验
    if (userName.trim() === '' || userContent.trim() === '') {
      alert('请输入评论人和评论内容')
      return
    } 

    const newComments = [{
      id: comments.length+1,
      name: userName,
      content: userContent
    }, ...comments]

    // 文本框的值如何清空？ 要清空文本框只需要将其对应的state清空即可
    this.setState({
      comments: newComments,
      userName:'',
      userContent:''
    })

    
  }


  render() {

    const { userName, userContent } = this.state

    return(
      <div className='comment'>
        <div>
          <input  name='userName' className='user' type='text' placeholder='请输入评论人' value={userName} onChange={this.handleForm}></input><br/>
          <textarea  name='userContent' className='content' cols='30' rows='10' placeholder='请输入评论内容' value={userContent} onChange={this.handleForm}></textarea><br/>
          <button onClick={this.addComment}>发表评论</button>
        </div>
        {/* 通过条件渲染决定渲染什么内容 */}
        { this.renderList() }
      </div>
      
    )
  }
}
ReactDOM.render(<Comment />, document.getElementById('root'))