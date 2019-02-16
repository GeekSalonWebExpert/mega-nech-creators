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
class Setting extends PersonalPage {
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
   this.getAccountById(props.params.id);
    // this.getAccountById(0);
    // console.log(this.state.currentAccount);
    //console.log(user);
  }

  //変更を保存
  buttonSave(){
    this.putAccount(this.props.params.id);
  }

  //マイページへ戻る
  buttonReturn(){
    browserHistory.push(`/mypage/${this.state.currentAccount.id}/`);
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
        <div>{this.state.loadedflg ? "名前:"+this.state.currentAccount.info.firstName:"loading"}
          <input type="text" className="input-text"  onChange={(e) => this.onChangeInfo(e, 'firstName')}/><br/></div>
        <div>{this.state.loadedflg ? "苗字:"+this.state.currentAccount.info.familyName:"loading"}</div>
          <input type="text" className="input-text"  onChange={(e) => this.onChangeInfo(e, 'familyName')}/><br/>
        <div>{this.state.loadedflg ? "年齢:"+this.state.currentAccount.info.age:"loading"}</div>
          <input type="text" className="input-text"  onChange={(e) => this.onChangeInfo(e, 'age')}/><br/>
        <div>{this.state.loadedflg ? "住所:"+this.state.currentAccount.info.address:"loading"}</div>
          <input type="text" className="input-text"  onChange={(e) => this.onChangeInfo(e, 'address')}/><br/>
        <div>{this.state.loadedflg ? "保育園:"+this.state.currentAccount.info.school:"loading"}</div>
          <input type="text" className="input-text"  onChange={(e) => this.onChangeInfo(e, 'school')}/><br/>
        <div>{this.state.loadedflg ? "クラス:"+this.state.currentAccount.info.class:"loading"}</div>
          <input type="text" className="input-text"  onChange={(e) => this.onChangeInfo(e, 'class')}/><br/>
        <div>{this.state.loadedflg ? "備考:"+this.state.currentAccount.info.remark:"loading"}</div>
          <input type="text" className="input-text"  onChange={(e) => this.onChangeInfo(e, 'remark')}/><br/>
        <div className="input-button" onClick={this.buttonSave.bind(this)}>保存</div>
        <div className="input-button" onClick={this.buttonReturn.bind(this)}>マイページへ戻る</div>
      </div>
    );
  }
}

export default Setting;
