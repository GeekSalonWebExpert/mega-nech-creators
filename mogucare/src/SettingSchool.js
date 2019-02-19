import React, { Component } from 'react';
import logo from './logo.svg';
import './assets/style.css';
import Login from './Login';
import Header from './Header';
import PersonalPage from './PersonalPage';
import { Router, Route, IndexRoute, browserHistory, Link, withRouter } from 'react-router';
import QRCode from "qrcode.react"

let user;


//個人のページ　idによって管理する idとログイン用IDは分けるべきか？ 同じ名前でかぶる可能性がある
class SettingSchool extends PersonalPage {
//props:params:id
//propsとは…　urlのなかで宣言できるやつ？ idとして使う
  constructor(props){
    //必ず一番最初に呼び出す　継承元のやつ
    super(props)
//    console.log(props.params.id);
    console.log(this.props.location.pathname);
    //会員ナンバー（仮）からユーザーを同定
      //user オブジェクト自体を渡したほうが軽そう
    //console.log(storage.getList()[props.params.id]);
    //user = this.getList()[props.params.id];
   this.getAccountById(props.params.id,"school");
    // this.getAccountById(0);
    // console.log(this.state.currentAccount);
    //console.log(user);
  }

  //変更を保存
  buttonSave(){
    this.putAccount(this.props.params.id, "parent");
  }

  //マイページへ戻る
  buttonReturn(){
    browserHistory.push(`/schoolpage/${this.state.currentAdminAccount.id}/`);
  }


  render() {
    // let data = [{name:"ochi",age:23},{name:"hiroyuki",age:29}]
    // let listHTML = []
    // data.forEach(d=>{ listHTML.push(<div key={d.name}>{d.name}</div>) })

    // <div>{this.state.age} さい</div>
    // <div>{this.state.age < 7 ? "ゆり" : "すみれ"}組</div>
    // <div>{this.props.test}</div>
    // <div>{listHTML}</div>

    return (
      <div>
        <Header/>
        <div>{this.state.loadedflg ? "保育園名:"+this.state.currentAdminAccount.info.firstName:"loading"}
          <input type="text" className="input-text"  onChange={(e) => this.onChangeInfo(e, 'firstName')}/><br/></div>
        <div>{this.state.loadedflg ? "住所:"+this.state.currentAdminAccount.info.address:"loading"}</div>
          <input type="text" className="input-text"  onChange={(e) => this.onChangeInfo(e, 'address')}/><br/>
        <div>{this.state.loadedflg ? "備考:"+this.state.currentAdminAccount.info.remark:"loading"}</div>
          <input type="text" className="input-text"  onChange={(e) => this.onChangeInfo(e, 'remark')}/><br/>
        <div className="input-button" onClick={this.buttonSave.bind(this)}>保存</div>
        <div className="input-button" onClick={this.buttonReturn.bind(this)}>保育園ページへ戻る</div>
      </div>
    );
  }
}

export default SettingSchool;
