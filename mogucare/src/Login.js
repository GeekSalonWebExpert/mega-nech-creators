import React, { Component } from 'react';
import logo from './logo.svg';
import './assets/style.css';
import Mypage from './Mypage'
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
class Login extends Component {

  constructor(){
    super()
    this.state = {
      count: 0,
      menber: ["a", "b", "c"]
    }
  }

  countUp(){
    this.setState({
      count: this.state.count + 1,
    })
    this.state.menber.push("d")

  }

  componentDidMount(){
    console.log(this.refs)

  }


  render() {
    return (
      <div>
        おまえのページだぜ
        <div class="mypage-container" id="mypage-container">
           <div class="login-container">IDとパスワードを入力<br/>
           ID<input type="text" class="input-text" id="input-ID"/><br/>
           PW<input type="text" class="input-text" id="input-PW"/>
           <div class="input-button" id="login-button">ログイン</div>
           <div class="input-button" id="addNewUser-button">新規登録</div>
         </div>
        </div>
      </div>
    );
  }
}

export default Login;
