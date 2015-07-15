薪資導向落點建議-UI
===


## 落點分析後端運算
**本專案只有網頁介面，需以另一個後端API專案配合**

PredictionAPI <https://github.com/CHU-TDAP/PredictionAPI>

若您有自行架設後端的話，請更改`/dest/js/send-predict-data.js`的`var basePredictSystemUrl = "<您的後端網址>"`


## 檔案規劃
    
```text
root ─┬─ bower_components (請不要變動此檔案)
      ├─ node_modules (請不要變動此檔案)
      ├─ src (原始檔案)
      │  └─ scss (網頁外觀專用檔案)
      │  
      └─ dest (最後發布網站用的資料夾)
         ├─ assets (外部函式庫資源)
         ├─ css (請不要變動此檔案)
         ├─ images
         ├─ js
         ├─ demo (測試專用的檔案)
         └─ index.html (主要頁面)
```

### 注意！無論如何請不要更動以下資料夾！

以下為自動產生的檔案，請不要直接修改，請參考以下說明。

* `css`: 要修改網頁外觀，請改`sass`資料夾
* `node_modules`
* `bower_components`

## 開發/維護此專案
### 1. 安裝Node.JS
#### Mac OSX
    brew install node

### 2. 安裝相關套件

    [sudo] npm install -g grunt-cli
    [sudo] npm install -g bower
    npm install && bower install

### 3. 啟動自動化工具

    grunt

啟動後會監視專案內的`.html`,`.scss`檔案，一有任何變動將會

* grunt-sass: 將scss檔轉換成給瀏覽器解讀用的css檔
* livereload: 呼叫瀏覽器自動重新整理

#### 瀏覽器plugin安裝
[LiveReload - browser extensions](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-)

支援主流瀏覽器: Firefox, Chrome, Safari

## 關於
介面設計: 元兒～

### 有採用的資源如下
* 前端Framework: [Foundation](http://foundation.zurb.com/)
* [JQuery 2.1](https://jquery.com/)
* [JQuery.floatThead](http://mkoryak.github.io/floatThead/)
* [jxnblk/loading](https://github.com/jxnblk/loading)
