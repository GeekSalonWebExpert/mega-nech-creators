import React, { Component } from 'react';
//import logo from './logo.svg';
import './assets/style.css';
import Mypage from './Mypage';
import Header from './Header';
import { Router, Route, IndexRoute, browserHistory, Link, withRouter } from 'react-router';
import PersonalPage from './PersonalPage';

let user = {
  id:"未設定",
  pw:"未設定",
  firstName: "未設定",
  familyName:"未設定",
  age:"未設定",
  school:"未設定",
  remark:" "
}

let currentUser = user;
let currentNum = -1;

//ログイン処理のページ
class Login extends PersonalPage {

  constructor(props){
    super(props)
    this.state = this.state || {}
    this.state.originalProperty = true
  }

  buttonLogin(){
    //value でよくね？気が向いたら直す
    let inputID = this.refs["input-ID"];
    let inputPW = this.refs["input-PW"];
    if(!inputID.value) return false;
    else if(!inputPW.value) return false;

    const list = this.getList()
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
      //window.alert("ろぐいん");
      //mypageに移動
      browserHistory.push(`/mypage/${currentNum}/`);
      //this.props.history.push('/mypage');

    //ログイン失敗
    }else{
      window.alert("IDまたはパスワードが違います");
    }
  }

  //IDかぶりではじく処理をあとで追加する
  addNewUser(){
    //console.log("しんきとうろく");
    //value でよくね？気が向いたら直す
    // console.log(this.state.tasks);
    this.getTask(8);
    return
    let inputID = this.refs["input-ID"];
    let inputPW = this.refs["input-PW"];
    if(!inputID.value) return false;
    else if(!inputPW.value) return false;
    user.id = inputID.value;
    user.pw = inputPW.value;
    const list = this.getList();
    list.push(user);
    this.setList(list);
    window.alert("登録しました");
  }

//サーバーを通じてのログイン
  buttonLoginSever() {
    let accountName = this.state.inputTextID;
    fetch("http://localhost:3001/accounts?accountName="+accountName, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response)=>{
      return response.json()
    })
    .then(data=>{
      if(!data[0]){
        return;
      }
      if(this.state.inputTextPW == data[0].passWord){
        browserHistory.push(`/mypage/${data[0].id}/`);
      }
    })
  }

  //管理者ユーザーとしてログイン
  buttonAdminLoginSever(){
    let accountName = this.state.inputTextID;
    fetch("http://localhost:3001/adminAccounts?accountName="+accountName, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response)=>{
      return response.json()
    })
    .then(data=>{
      if(!data[0]){
        return;
      }
      if(this.state.inputTextPW == data[0].passWord){
        browserHistory.push(`/schoolpage/${data[0].id}/`);
      }
    })
  }

  //新規ユーザーをアップロード
  addNewUserSever(){
    this.submitAccount("parent");
  }

  //新規管理者ユーザーをアップロード
  addNewAdminUserSever(){
    this.submitAccount("school");
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
           ID<input type="text" className="input-text" ref = "input-ID" onChange={ this.changeTextID }/><br/>
           PW<input type="text" className="input-text" ref="input-PW" onChange={ this.changeTextPW }/>
           <div>{this.state.loadedflg ?
             <div className="input-button" onClick={this.buttonLoginSever.bind(this)}>保護者としてログイン</div>
           :"loading"}</div>
           <div>{this.state.loadedflg ?
             <div className="input-button" onClick={this.buttonAdminLoginSever.bind(this)}>保育園管理者ログイン</div>
           :"loading"}</div>
           <div>{this.state.loadedflg ?
             <div className="input-button" onClick={this.addNewUserSever.bind(this)}>保護者として新規登録</div>
           :"loading"}</div>
           <div>{this.state.loadedflg ?
             <div className="input-button" onClick={this.addNewAdminUserSever.bind(this)}>保育園管理者として新規登録</div>
           :"loading"}</div>
         </div>
        </div>
      </div>
    );
  }
}

// export default withRouter(Login);
export default Login;
