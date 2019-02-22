import React, { Component } from 'react';
import logo from './logo.svg';
import './assets/style.css';
import Mypage from './Mypage';
import Login from './Login';
import {Router, Route, IndexRoute, browserHistory, Link } from 'react-router';

//ヘッダー　すべてのページで読み込む　あとで引数から現在のページをハイライトする
class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
    console.log(props);
  }

  render() {
    return (
      <div>
        <div id="header">
          <div className="inner">
            <h1>もぐけあ</h1>
            <div className="logo">
              <a><Link to={"/"}>MoGu Care</Link></a>
            </div>
            <div className="headerInfo">
              モックアップバージョン
            </div>
            <ul id="topnav">
              <li className={this.props.activeCategory === "top" && "active"}><Link to={"/"}>トップページ<br/><span>Top</span></Link></li>
              <li className={this.props.activeCategory === "login" && "active"}><Link to={"/login/"}>ログイン<br/><span>Login</span></Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
