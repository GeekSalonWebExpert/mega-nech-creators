import React, { Component } from 'react';
//import logo from './logo.svg';
import './assets/style.css';
import Mypage from './Mypage';
import storage from './Mypage';
import Header from './Header';
import { Router, Route, IndexRoute, browserHistory, Link, withRouter } from 'react-router';

//ログイン処理のページ
class CommonPage extends Component {

  constructor(props){
    super(props)
    console.log(props.params.id);

  }

  setList(json) {
    localStorage["users"] = JSON.stringify(json);
  }

  getList() {
    return JSON.parse(localStorage["users"] || "[]");
  }


  render() {
    return (
      <div>
        <Header/>
        ろぐいんするのじゃ
        <div className="mypage-container" id="mypage-container">
           <div className="login-container">IDとパスワードを入力<br/>
           ID<input type="text" className="input-text" ref = "input-ID"/><br/>
           PW<input type="text" className="input-text" ref="input-PW"/>
           <div className="input-button" onClick={this.buttonLogin.bind(this)}>ログイン</div>
           <div className="input-button" onClick={this.addNewUser.bind(this)}>新規登録</div>
         </div>
        </div>
      </div>
    );
  }
}

// export default withRouter(Login);
export default CommonPage;
