const inputID = document.getElementById("input-ID");
const inputPW = document.getElementById("input-PW");
var inputID2 = null;
var inputPW2 = null;
var inputAge = null;

let user = {
  id:"未設定",
  pw:"未設定",
  age:"未設定",
}

let currentUser = user;
let currentNum = -1;

const storage = {
  setList: function(json) {
    localStorage["users"] = JSON.stringify(json);
  },

  getList: function() {
    return JSON.parse(localStorage["users"] || "[]");
  }
}

window.onload = function() {
  // updateView();
  document.getElementById("login-button").addEventListener("click", login);
  document.getElementById("addNewUser-button").addEventListener("click", addNewUser);
}

//ログイン
const login = function(){
  if(!inputID.value) return false;
  else if(!inputPW.value) return false;

  const list = storage.getList()
  let flg = false;
  list.forEach((user, i)=>{
    if(inputID.value == user.id && inputPW.value == user.pw){
      flg = true;
      currentUser = user;
      currentNum = i;
    }
  })

  //ログイン成功
  if(flg){
    const mypageContainer = document.getElementById("mypage-container");
    const fragment = document.createDocumentFragment();
    const info = (()=>{
      const info = document.createElement("div");

      info.className = "info";
      info.insertAdjacentHTML("beforeend",
        ` <div class="text">こんにちは${currentUser.id}さん<br>
          ～あなたの情報～<br>
          年齢${currentUser.age}</div>
          <div class="input-button" id="setting-button">編集</div>`
      )
      return info
    })()
    
    fragment.appendChild(info);
    mypageContainer.textContent = ""
    mypageContainer.appendChild(fragment)
    document.getElementById("setting-button").addEventListener("click", setting);
  //ログイン失敗
  }else{
    window.alert("IDまたはパスワードが違います");
  }
}

//新規登録
const addNewUser = function(){
  if(!inputID.value) return false;
  else if(!inputPW.value) return false;
  user.id = inputID.value;
  user.pw = inputPW.value;
  const list = storage.getList();
  list.push(user);
  storage.setList(list);
  // updateView()
  window.alert("登録しました");
}

//編集
const setting = function(){
  const mypageContainer = document.getElementById("mypage-container");
  const fragment = document.createDocumentFragment();
  const info = document.createElement("div");
  info.className = "info";
  info.insertAdjacentHTML("beforeend",
    `へんしゅう<br>
      ID <input type="text" class="input-text" id="input-ID2"><br>
      PW <input type="text" class="input-text" id="input-PW2"><br>
      年齢<input type="text" class="input-text" id="input-age"></div>
      <a href="myPage.html"><div class="input-button" onclick="save(${currentNum})">保存する</div></a>`
  )
  fragment.appendChild(info);
  mypageContainer.textContent = ""
  mypageContainer.appendChild(fragment)
  inputID2 = document.getElementById("input-ID2");
  inputPW2 = document.getElementById("input-PW2");
  inputAge = document.getElementById("input-age");
  inputID2.value = currentUser.id;
  inputPW2.value = currentUser.pw;
  inputAge.value = currentUser.age;
}

const save = function(key){
  const list = storage.getList();
  list[key].age = inputAge.value;
  storage.setList(list);
}
