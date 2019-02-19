import React, { Component } from 'react';
import logo from './logo.svg';
import './assets/style.css';
import Login from './Login';
import Header from './Header';
import PersonalPage from './PersonalPage';
import QRCode from "qrcode.react"
import { Router, Route, IndexRoute, browserHistory, Link, withRouter } from 'react-router';
let user;


class SchoolPage extends PersonalPage {
  constructor(props){
    super(props)
    console.log(this.props.location.pathname);
   this.getAccountById(props.params.id, "school");
    this.state.qrflg = false;
  }

  //編集ボタン
  buttonSetting(){
    browserHistory.push(`/settingschool/${this.state.currentAdminAccount.id}/`);
  }

  //QRコード化
  buttonShare(){
    this.setState({qrflg:!this.state.qrflg});
  }

  render() {
    return (
      <div>
        <Header/>
        <div>{this.state.loadedflg ? "保育園名:"+this.state.currentAdminAccount.info.schoolName:"loading"}</div>
        <div className="input-button" onClick={this.buttonSetting.bind(this)}>編集</div>
        <div className="input-button" onClick={this.buttonShare.bind(this)}>共有</div>
        <div>{this.state.qrflg ? <QRCode value={this.props.location.pathname} />:""}</div>
      </div>
    );
  }
}

export default SchoolPage;
