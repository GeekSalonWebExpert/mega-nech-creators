import React from 'react';
//import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Mypage from './Mypage';
import Login from './Login';
import Header from './Header';
import * as serviceWorker from './serviceWorker';
import { Router, Route, IndexRoute, browserHistory, Link , BrowserRouter} from 'react-router';
import { render } from "react-dom";
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
render((
  //<BrowserRouter>
  <Router history={browserHistory}>
    <Route path="/" component={App}/>
    <Route path="/Header/" component={Header}/>
    <Route path="/login/" component={Login}/>
    <Route path="/login/mypage/:id/" component={Mypage}/>
  </Router>
  //</BrowserRouter>

),document.getElementById("root"))

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// )
