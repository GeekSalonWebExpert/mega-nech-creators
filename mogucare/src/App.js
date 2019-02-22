import React, { Component } from 'react';
import logo from './logo.svg';
import './assets/style.css';
import Mypage from './Mypage';
import Login from './Login';
import Header from './Header';
import {Router, Route, IndexRoute, browserHistory, Link, BrowserRouter } from 'react-router';

// const App = () => (
//     <BrowserRouter>
//     <div>
//       <Route exact path='/' component={App} />
//       <Route path='/login' component={Login} />
//       <Route path='/mypage/:id' component={Mypage} />
//     </div>
//   </BrowserRouter>
// )

//トップページ　名前変えるべき
class App extends Component {
  constructor(){
    super()
    this.state = {
      tasks: [
        {
          id: 1,
          body: "とりあえず表示してみる"
        },
        {
          id: 2,
          body: "私たち、いずれ書き換えられる運命"
        }
      ]
    }
    this.changeText = this.changeText.bind(this)
    this.submitTask = this.submitTask.bind(this)
    this.fetchTasks = this.fetchTasks.bind(this)
  }

  componentDidMount(){
    console.log(this.refs)
  }

  componentWillMount(){
   this.fetchTasks()
 }

  fetchTasks(){
    fetch("http://localhost:3001/tasks") // データを取得しに行く
    .then( response => response.json() ) // json型のレスポンスをオブジェクトに変換する
    .then( json => { // オブジェクトに変換したレスポンスを受け取り、
      this.setState({ tasks: json }) // Stateを更新する
    })
  }

  changeText(e) {
     const inputText = e.target.value
     this.setState({ inputText: inputText })
     // console.dir(inputText);
   }

   submitTask() {
     fetch("http://localhost:3001/tasks", {
       method: "POST",
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({ body: this.state.inputText })
     })
     .then( this.fetchTasks )
   }

   putTask(taskId) {
     fetch("http://localhost:3001/tasks/"+taskId, {
       method: "PUT",
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({ body: "やったよ" })
     })
     .then( this.fetchTasks )
   }

   deleteTask(taskId) {
    fetch("http://localhost:3001/tasks/"+taskId, {
      method: "DELETE"
    })
    .then( this.fetchTasks )
  }

  render() {
    return (
      <div>
      <Header parentState={this.state} activeCategory={"top"} />
        <div>
          ベトナムに平和をもたらす
          </div>
          <div className="tasks">
              {
                this.state.tasks.map( task => {
                    return (
                      <div className="task" key={ task.id }>
                        { task.body }
                        <button className="put" onClick={ ()=>{ this.putTask(task.id) } }>put</button>
                        <button className="delete" onClick={ ()=>{ this.deleteTask(task.id) } }>delete</button>
                      </div>
                    )
                })
              }
          </div>
            <div id="task-form">
              <input type="text" onChange={ this.changeText }/>
              <button onClick={ this.submitTask }>submit</button>
            </div>

        </div>
    );
  }
}

//json-server 使用例


//id付きでの移動例
// <Mypage test={12} />

export default App;
