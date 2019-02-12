import React, { Component } from 'react';
import logo from './logo.svg';
import './assets/style.css';
import Login from './Login';
import Header from './Header';
import PersonalPage from './PersonalPage';
import QRCode from "qrcode.react"

let user;


//個人のページ　idによって管理する idとログイン用IDは分けるべきか？ 同じ名前でかぶる可能性がある
class Mypage extends PersonalPage {

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
    user = this.getList()[props.params.id];
//    this.getAccountById(props.params.id);
    this.getAccountById(0);
    //console.log(user);
  }

  //編集ボタン
  buttonSetting(){
    this.setState({
      settingFlg: !this.state.settingFlg,
    })
  }


  //QRコード化
  buttonShare(){

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
//ここから 2/12
        // <div>年齢 {user.age}</div>
        // <div>所在 {user.region}</div>
        <div className="input-button" onClick={this.buttonSetting.bind(this)}>編集</div>
        <div className="input-button" onClick={this.buttonShare.bind(this)}>共有</div>
        <div>{this.state.settingFlg ? <Setting/>:"aa"}</div>
        <QRCode value={this.props.location.pathname} />
      </div>
    );
  }
}

class Setting extends PersonalPage{

  constructor(props){
    //必ず一番最初に呼び出す　継承元のやつ
    super(props)

    this.state = {
      age: 7,
      settingFlg:false
    }
  }


  buttonSave(){
    let inputID = this.refs["input-ID"];
    let inputPW = this.refs["input-PW"];
    if(!inputID.value) return false;
    else if(!inputPW.value) return false;
    user.id = inputID.value;
    user.pw = inputPW.value;
    const list = this.getList();
    //まじっくなんばー IDいれたい
    list[1].id = inputID.value;
    list[1].pw = inputPW.value;
    this.setList(list);
    window.alert("保存しました");
  }

  render(){
    return(
      <div>
        ID<input type="text" className="input-text" ref = "input-ID"/><br/>
        PW<input type="text" className="input-text" ref = "input-PW"/><br/>
        <div className="input-button" onClick={this.buttonSave.bind(this)}>保存</div>
      </div>
    )
  }
}

//ひな形、たぶん使わない
class Myinfo {

}


export default Mypage;
export { Myinfo as Myinfo };
