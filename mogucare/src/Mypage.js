import React, { Component } from 'react';
import logo from './logo.svg';
import './assets/style.css';
import Login from './Login';
import Header from './Header';
import CommonPage from './CommonPage';

let user;

//JSON形式でストレージにアクセスするオブジェクト
const storage = {
  setList: function(json) {
    localStorage["users"] = JSON.stringify(json);
  },
  getList: function() {
    return JSON.parse(localStorage["users"] || "[]");
  }
}


//個人のページ　idによって管理する idとログイン用IDは分けるべきか？ 同じ名前でかぶる可能性がある
class Mypage extends CommonPage {

//props:params:id
//propsとは…　urlのなかで宣言できるやつ？ idとして使う
  constructor(props){
    //必ず一番最初に呼び出す　継承元のやつ
    super(props)
    console.log(props.params.id);

    //会員ナンバー（仮）からユーザーを同定
      //user オブジェクト自体を渡したほうが軽そう
    //console.log(storage.getList()[props.params.id]);
    user = this.getList()[props.params.id];
    //console.log(user);

    this.state = {
      age: 7,
      settingFlg:false
    }
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
        <div>{user.id}</div>
        <div>年齢 {user.age}</div>
        <div>所在 {user.region}</div>
        <div className="input-button" onClick={this.buttonSetting.bind(this)}>編集</div>
        <div className="input-button" onClick={this.buttonShare.bind(this)}>共有</div>
        <div>{this.state.settingFlg ? <Setting/>:"aa"}</div>
      </div>
    );
  }
}

class Setting extends CommonPage{

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
export {storage as storage};
