import React, { Component } from 'react';
import logo from './logo.svg';
import './assets/style.css';

class Mypage extends Component {

//props:params:id
  constructor(props){
    super(props)
    console.log(props)
    this.state = {
      age: 7
    }
  }

  countUp(){
    this.setState({
      count: this.state.count + 1,
    })
    this.state.menber.push("d")
  }

  render() {
    let data = [{name:"ochi",age:23},{name:"hiroyuki",age:29}]
    let listHTML = []
    data.forEach(d=>{ listHTML.push(<div key={d.name}>{d.name}</div>) })

    return (
      <div>
        <div>{this.state.age} さい</div>
        <div>{this.state.age < 7 ? "ゆり" : "すみれ"}組</div>
        <div>{listHTML}</div>
      </div>
    );
  }
}

class Myinfo {

}


export default Mypage;
export { Myinfo as Myinfo };
