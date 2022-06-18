const http = require('http');
const fs = require('fs');
const url = require('url');


var app = http.createServer(function(request,response){
    var _url = request.url;//
    var queryData = url.parse(_url,true).query;
    var pathname = url.parse(_url,true).pathname;
    var title = queryData.id;

    template = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="dictionary_style.css?7">
        <script src="https://kit.fontawesome.com/f7adf773fa.js" crossorigin="anonymous"></script>
        <title>사전</title>
      </head>
      <body>
        <!-- 검색 -->
        <div class="search_bar">
            <input class="searchbox" id="search-text" type="text" placeholder="write a word">
            <button id="search-btn" onclick="search_word()">+</button>
        </div>
        <!-- 조건 -->
        <div class="nav_bar">
          <div class="navbox"><input type="checkbox" class="checkbox" name="">all</div>
          <div class="navbox"><input type="checkbox" class="checkbox" name="">know</div>
          <div class="navbox"><input type="checkbox" class="checkbox" name="">unknown</div>
        </div>
        <!-- 목록 -->
        <div class="word_container">
            <div class="list1">
              <div class="leftborder">
                exemple
              </div>
            </div>
            <div class="list2">
              예시
            </div>
        </div>
        <!-- 메뉴 -->
        <div class="menu_bar">
          <div class="menubox">
            <button type="button" class="menu_button"><a href="dictionary.php"><i class="fa-solid fa-book-bookmark"></i></a></button>
          </div>
          <div class="menubox">
            <button type="button" class="menu_button"><a href="index_en.php"><i class="fa-solid fa-q"></i></a></button>
          </div>
          <div class="menubox">
            <button type="button" class="menu_button"><a href="http://www.google.com"><i class="fa-solid fa-bars"></i></a></button>
          </div>
        </div>
        <script src="dic.js"></script>
      </body>
    </html>
`
    response.writeHead(200);
    response.end(template)
});

app.listen(3000);
