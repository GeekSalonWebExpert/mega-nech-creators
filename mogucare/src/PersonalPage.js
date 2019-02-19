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
    //とりあえずのロードの時間差対策用フラグ
      //ロードが終わるとtrue、ログインボタンが使用可能、個人情報が表示される、編集ボタンが使用可能
      loadedflg:false,
      //マイページの編集ボタンが押される毎に反転、設定画面の表示　使わなくなった、後で消す
      settingFlg:false,
      // inputTextID:"",
      // inputTextPW:"",
      currentAccount:{
        id: 1,
        accountName:"Loading",
        passWord:"Loading",
        info: {
          firstName:"未設定",
          familyName:"未設定",
          age:"未設定",
          address:"未設定",
          school:"未設定",
          class:"未設定",
          remark:"未設定"
        }
      },
      currentAdminAccount:{
        id:1,
        accountName:"Loading",
        passWord:"Loading",
        info:{
          schoolName:"未設定",
          combinationID:["未設定"],
          classes:["未設定"],
          address:"未設定",
          remark:"未設定"
        }
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
      ],
      adminAccounts: [
        {
          id:1,
          accountName:"geeksalon",
          passWord:"geek",
          info:{
            schoolName:"geeksalon",
            combinationID:["combi1"],
            classes:["ios組", "web組", "unity組"],
            address:"japan-tokyo",
            remark:"3カ月で成果を出します"
          }
        }
      ],
      combinations:[
        {
          id: "combi1",
          list: [0,2,5]
        },
        {
          id: "combi2",
          list: [1,2,3]
        }
      ]
    }

    this.changeText = this.changeText.bind(this)
    this.changeTextID = this.changeTextID.bind(this)
    this.changeTextPW = this.changeTextPW.bind(this)
    this.changeInfo = this.onChangeInfo.bind(this)
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
      this.setState({ accounts: json }) // Stateを更新する
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

    onChangeInfo(e, key) {
       const inputText = e.target.value;
       this.state.currentAccount["info"][key] = inputText;
       console.log(this.state.currentAccount.info[key]);
       //this.setState({ currentAccount: inputText })
       //console.dir(inputText);
     }

//type はparent or school の文字列
   submitAccount(type="parent") {
     let name="";
     let currentType="";
     if(type=="parent"){
        name="accounts";
        currentType="currentAccount";
     }else if(type=="school"){
       name="adminAccounts";
       currentType="currentAdminAccount";
     }

     this.setState({
       loadedflg: false,
     })
     fetch("http://localhost:3001/"+name, {
       method: "POST",
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({ accountName: this.state.inputTextID,
                              passWord: this.state.inputTextPW,
                              info : this.state[currentType].info})
     })
     .then(()=>{
       this.setState({
         loadedflg: true,
       })
     })
   }

   putAccount(id, type="parent") {
     let name="";
     let currentType="";
     if(type=="parent"){
        name="accounts";
        currentType="currentAccount";
     }else if(type=="school"){
       name="adminAccounts";
       currentType="currentAdminAccount";
     }

     fetch("http://localhost:3001/"+name+"/"+id, {
       method: "PUT",
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({ accountName: this.state[currentType].accountName,
                              passWord: this.state[currentType].passWord,
                              info : this.state[currentType].info})
     })
     .then( this.fetchAccounts )
   }

   getAccount(accountName, type) {
     let name="";
     let currentType="";
     if(type=="parent"){
        name="accounts";
        currentType="currentAccount";
     }else if(type=="school"){
       name="adminAccounts";
       currentType="currentAdminAccount";
     }
     fetch("http://localhost:3001/"+name+"?accountName="+accountName, {
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
       return data[0].passWord;
     })
   }

   //idを使ってアカウント情報を入手　ログイン時、QRコードからの遷移のみ使用
   getAccountById(id, type="parent") {
     let name="";
     let currentType="";
     if(type=="parent"){
        name="accounts";
        currentType="currentAccount";
     }else if(type=="school"){
       name="adminAccounts";
       currentType="currentAdminAccount";
     }
     this.setState({
       loadedflg: false,
     })
     fetch("http://localhost:3001/"+name+"?id="+id, {
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
       if(type=="parent"){
         this.setState({ currentAccount: data[0] });
       }else if(type=="school"){
         this.setState({ currentAdminAccount: data[0] });
       }
       // console.log(this.state.currentAccount);
       this.setState({
         loadedflg: true,
       })
     })
   }


   deleteAccount(accountName) {
    fetch("http://localhost:3001/accounts/"+accountName, {
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
