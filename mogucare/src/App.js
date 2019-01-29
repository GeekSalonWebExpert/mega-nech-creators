import React, { Component } from 'react';
import logo from './logo.svg';
import './assets/style.css';
import Mypage from './Mypage';
import Login from './Login';
import Header from './Header';
import {Router, Route, IndexRoute, browserHistory, Link, BrowserRouter } from 'react-router';

// const App = () => (
//     <BrowserRouter>
//     <div>
//       <Route exact path='/' component={App} />
//       <Route path='/login' component={Login} />
//       <Route path='/mypage/:id' component={Mypage} />
//     </div>
//   </BrowserRouter>
// )

//トップページ　名前変えるべき
class App extends Component {
  constructor(){
    super()
    this.state = {
      count: 0,
      menber: ["a", "b", "c"]
    }
  }

  componentDidMount(){
    console.log(this.refs)
  }

  render() {
    return (
      <div>
        <Header/>
        <div>
          ベトナムに平和をもたらす
        </div>
      </div>
    );
  }
}

//id付きでの移動例
// <Mypage test={12} />

export default App;
