import React, { Component } from 'react';
import logo from './logo.svg';
import './assets/style.css';
import Mypage from './Mypage'
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
class App extends Component {

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
        <div id="header">
          <div className="inner">
            <h1>もぐけあ</h1>
            <div className="logo">
              <a href="index.html">MoGu Care</a>
            </div>
            <div className="headerInfo">
              モックアップバージョン
            </div>
            <ul id="topnav">
              <li className="active"><Link to={"/"}>トップページ<br/><span>Top</span></Link></li>
              <li><Link to={"/login/"}>マイページ<br/><span>MyPage</span></Link></li>
            </ul>
          </div>
        </div>
        <div onClick={this.countUp}>
          ベトナムに平和をもたらす
        </div>
        <Mypage test={12} />
      </div>
    );
  }
}

export default App;
