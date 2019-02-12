import React, { Component } from 'react';
//import logo from './logo.svg';
import './assets/style.css';
import Mypage from './Mypage';
import Header from './Header';
import { Router, Route, IndexRoute, browserHistory, Link, withRouter } from 'react-router';

let user = {
  id:"未設定",
  pw:"未設定",
  firstName: "未設定",
  familyName:"未設定",
  age:"未設定",
  school:"未設定",
  remark:" "
}

//ログイン処理のページ
class PersonalPage extends Component {

  constructor(props){
    super(props)
    // console.log(props.params.id);
    this.state = {
      loadedflg:false,
      settingFlg:false,
      // inputTextID:"",
      // inputTextPW:"",
      currentAccount:{
        id: 1,
        name:"aaa",
        pw:"fff"
      },
      tasks: [
        {
          id: 1,
          body: "とりあえず表示してみる"
        },
        {
          id: 2,
          body: "私たち、いずれ書き換えられる運命"
        }
      ],
      accounts: [
        {
          id: 1,
          accountName:"おちを。",
          passWord:"にんげんだもの",
          info: {
            firstName:"satoru",
            familyName:"ochi",
            age:5,
            address:"japan-tokyo",
            school:"お花畑保育園",
            class:"ひまわり組",
            remark:"３時間に一回発狂する病気です。"
          }
        }
      ]
    }
    this.changeText = this.changeText.bind(this)
    this.changeTextID = this.changeTextID.bind(this)
    this.changeTextPW = this.changeTextPW.bind(this)
    this.submitTask = this.submitTask.bind(this)
    this.fetchTasks = this.fetchTasks.bind(this)
    this.getTask = this.getTask.bind(this)
    this.submitAccount = this.submitAccount.bind(this)
    this.fetchAccounts = this.fetchAccounts.bind(this)
    this.getAccount = this.getAccount.bind(this)
    this.getAccountById = this.getAccountById.bind(this)
  }

  setList(json) {
    localStorage["users"] = JSON.stringify(json);
  }

  getList() {
    return JSON.parse(localStorage["users"] || "[]");
  }

  componentWillMount(){
   this.fetchTasks()
 }

  fetchTasks(){
    this.setState({
      loadedflg: false,
    })
    fetch("http://localhost:3001/tasks") // データを取得しに行く
    .then( response => response.json() ) // json型のレスポンスをオブジェクトに変換する
    .then( json => { // オブジェクトに変換したレスポンスを受け取り、
      this.setState({
        loadedflg: true,
      })
      this.setState({ tasks: json }) // Stateを更新する
    })
  }

  changeText(e) {
     const inputText = e.target.value
     this.setState({ inputText: inputText })
     console.dir(inputText);
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

   getTask(taskId) {
     fetch("http://localhost:3001/tasks?id="+taskId, {
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
       console.log(data[0].body);
     })
   }

   deleteTask(taskId) {
    fetch("http://localhost:3001/tasks/"+taskId, {
      method: "DELETE"
    })
    .then( this.fetchTasks )
  }

////アカウント

  fetchAccounts(){
    this.setState({
      loadedflg: false,
    })
    fetch("http://localhost:3001/accounts") // データを取得しに行く
    .then( response => response.json() ) // json型のレスポンスをオブジェクトに変換する
    .then( json => { // オブジェクトに変換したレスポンスを受け取り、
      this.setState({
        loadedflg: true,
      })
      this.setState({ tasks: json }) // Stateを更新する
    })
  }

//ダサい　引数でやりたいけど、とりあえず…
  changeTextID(e) {
     const inputText = e.target.value
     this.setState({ inputTextID: inputText })
     console.dir(inputText);
   }
   changeTextPW(e) {
      const inputText = e.target.value
      this.setState({ inputTextPW: inputText })
      console.dir(inputText);
    }

   submitAccount() {
     fetch("http://localhost:3001/accounts", {
       method: "POST",
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({ name: this.state.inputText }),
       body: JSON.stringify({ pw: this.state.inputText })
     })
     .then( this.fetchAccounts )
   }

   putAccount(accountName) {
     fetch("http://localhost:3001/accounts/"+accountName, {
       method: "PUT",
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({ name: "あああ" })
     })
     .then( this.fetchAccounts )
   }

   getAccount(accountName) {
     fetch("http://localhost:3001/accounts?name="+accountName, {
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
       return data[0].pw;
     })
   }

   //idを使ってアカウント情報を入手　ログイン時、QRコードからの遷移のみ使用
   getAccountById(id) {
     fetch("http://localhost:3001/accounts?id="+id, {
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
       // if(!data[0]){
       //   return;
       // }
       this.setState({ currentAccount: data[0] });
       console.log(this.state.currentAccount);
     })
   }


   deleteAccount(accountName) {
    fetch("http://localhost:3001/tasks/"+accountName, {
      method: "DELETE"
    })
    .then( this.fetchAccounts )
  }


  render() {
    return (
      <div>
      </div>
    );
  }
}

// export default withRouter(Login);
export default PersonalPage;
