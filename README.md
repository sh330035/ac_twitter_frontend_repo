# Twitter Vue Project

## ❖ 專案介紹：

本專案為前、後端分離之團隊開發專案，模擬簡易社群網站之開發。使用者可進行註冊、登入、登出、發文、回覆、追蹤、按讚、修改個人資料...等功能。並有管理者帳號，區別使用者與管理者之權限。

### 快速瀏覽專案
- 請進入網站： _[Twitter](https://sh330035.github.io/twitter-frontend/)_
- 前台測試帳號： account：user1 / password：12345678
- 後台測試帳號： account：root  / password：12345678


## ❖ 專案功能：

#### 一般使用者：
* 註冊 - 未擁有帳號之使用者，可註冊帳號 ( 帳號、信箱不可重複 )
* 登入、登出 - 可運用帳號及密碼，登入系統，登出系統 ( 認證隨登入登出改動 )
* 發送推文與回覆 - 可於頁面進行推文與回覆之發送，並頁面會隨即更新
* 修改資料 - 使用者可修改帳戶資料、自我介紹、照片及背景
* 使用者可追蹤他人 - 有頁面顯示追蹤與被追蹤之狀態
* 使用者可按推文讚 - 有頁面顯示使用者以按讚推文

#### 後台管理員：
* 後台管理員不可註冊 - 由後端直接寫入資料庫
* 管理員可由後台入口登入 ( 使用頁面與一般使用者不同 )
* 管理員可刪除推文
* 管理員可瀏覽使用者之各式數據 ( 僅能瀏覽 )

#### 使用技術：

* Vue.js 框架 - 拆分頁面元件 ( component )，有效管理程式碼
* Vuex 狀態管理 - 使用者權限認證，並可對整體頁面之連動性進行控制
* Vue router - 實現單頁式應用網站 ( SPA )，可提升使用者體驗，降低伺服器負擔
* API 串接 - 透過 API 與後端提取資料，並渲染畫面



## ❖ 如何使用

### Step 1 . Please clone the repository

```bash
git clone -b main https://github.com/sh330035/twitter-frontend
```

### Step 2 . Project Setup
- Install dependencies

```bash
npm install
```

- Note: You need to change the default API baseURL in `./src/utils/helper.js` if you want to user your own API server.     
    (若想連接本地端的資料庫，請在 `./src/utils/helper.js` 調整 baseURL 參數)
    
```JS
const baseURL = 'https://....' // modify this line
```

### Step 3. Project Run

- Run Server  (若資料載於 local，則需同時啟動後端伺服器)
```bash
cd twitter-frontend
```

```bash
npm run serve
```

- Open the browser and navigate to http://localhost:8080 👀  （打開瀏覽器並於 http://localhost:8080 查看）

## ❖ 相關連結
### 前端
- github：https://github.com/sh330035/twitter-frontend
- Github Page：https://sh330035.github.io/twitter-frontend/

### 後端
- github：https://github.com/jadokao/twitter-api-2020
- Heroku：https://alphitter-api-server.herokuapp.com/api/


## ❖ Team / 團隊成員
- [Dolly Chen](https://github.com/DollyChen-CYC)
- [David](https://github.com/sh330035)
- [WenTing](https://github.com/wentingliuu)
- [Ming](https://github.com/jadokao)
