import React, { Component } from 'react';
import logo from './logo.svg';
import './assets/style.css';
import Mypage from './Mypage';
import Header from './Header';
import { Router, Route, IndexRoute, browserHistory, Link, withRouter } from 'react-router';

//JSON形式でストレージにアクセスするオブジェクト
const storage = {
  setList: function(json) {
    localStorage["users"] = JSON.stringify(json);
  },
  getList: function() {
    return JSON.parse(localStorage["users"] || "[]");
  }
}

let user = {
  id:"未設定",
  pw:"未設定",
  age:"未設定",
}

let currentUser = user;
let currentNum = -1;

//ログイン処理のページ
class Login extends Component {

  constructor(props){
    super(props)
    this.state = {
      count: 0,
      menber: ["a", "b", "c"]
    }
  }


  buttonLogin(){
    console.log("ろぐいん");
    console.log(this.refs["input-ID"].value);
    console.log(this.refs["input-PW"].value);
    //value でよくね？気が向いたら直す
    let inputID = this.refs["input-ID"];
    let inputPW = this.refs["input-PW"];
    if(!inputID.value) return false;
    else if(!inputPW.value) return false;

    const list = storage.getList();
    let flg = false;
    list.forEach((user, i)=>{
      if(inputID.value == user.id && inputPW.value == user.pw){
        flg = true;
        currentUser = user;
        currentNum = i;
      }
    })

    //ログイン成功
    if(flg){
      window.alert("ろぐいん");
      //mypageに移動
      this.props.history.push('/mypage');
      //ログイン失敗
    }else{
      window.alert("IDまたはパスワードが違います");
    }

  }

  addNewUser(){
    console.log("しんきとうろく");
    //value でよくね？気が向いたら直す
    let inputID = this.refs["input-ID"];
    let inputPW = this.refs["input-PW"];
    if(!inputID.value) return false;
    else if(!inputPW.value) return false;
    user.id = inputID.value;
    user.pw = inputPW.value;
    const list = storage.getList();
    list.push(user);
    storage.setList(list);
    window.alert("登録しました");
  }

  componentDidMount(){
    //refs とは…　htmlぽい記述内で宣言するやつ
    //document.getElementByIdみたいなやつ
    console.log(this.refs);

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
export default Login;
