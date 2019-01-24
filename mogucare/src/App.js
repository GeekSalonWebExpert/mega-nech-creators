import React, { Component } from 'react';
import logo from './logo.svg';
import './assets/style.css';

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

  render() {
    return (
      <div>
        <div id="header">
          <div class="inner">
            <h1>もぐけあ</h1>
            <div class="logo">
              <a href="index.html">MoGu Care</a>
            </div>
            <div class="headerInfo">
              モックアップバージョン
            </div>
            <ul id="topnav">
              <li class="active"><a href="index.html">トップページ<br/><span>Top</span></a></li>
              <li><a href="myPage.html">マイページ<br/><span>MyPage</span></a></li>
            </ul>
          </div>
        </div>
        <div>
          ベトナムに平和をもたらす
      </div>
      </div>
    );
  }
}

export default App;
