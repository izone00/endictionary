const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

let app = http.createServer((request,response) => {
    const _url = request.url;
    const queryData = url.parse(_url, true).query //_url의 query 객체 반환
    const pathname = url.parse(_url,true).pathname;

    let word = queryData.word; //url의 query객체에서 word를 가져온다
    let style = fs.readFileSync("dictionary_style.css", "utf8")//비동기방식으로 css파일내용 저장
    let search = searchbar();
    let nav = navbar();
    let menu = menubar();
    let script = fs.readFileSync("dic.js","utf8");//단어수정에 쓰이는 스크립트
    let wordlist =""
    let html = ""

    //단어 리스트 출력
    if(pathname === '/'){
        fs.readdir('word/',(err, files) => {
          if (word) {wordlist = getSearchedWord(word);}//검색된 word가 있을때 word를 가장 앞에 추가
          wordlist += getWordList(files);//이후 word들을 순서대로 추가
          html = `<!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <style>
                  ${style}
                </style>
                <title>사전</title>
              </head>
              <body>
                ${search}
                ${nav}
                <div id="word_container">${wordlist}</div>
                ${menu}
                <script>${script}</script>
              </body>
            </html>`
            response.writeHead(200);
            response.end(html);
        })
    }
    // 새로운 단어 입력 
    else if(pathname === "/create") {
      let wordinfo = ""
      request.on('data', (data) => {
        wordinfo = data.toString('utf8');
      })
      request.on('end', () => {
        let post = qs.parse(wordinfo);
        fs.writeFile(`word/${post.word}`,`${post.meaning}`, () => {
          response.writeHead(302, {Location: `/?word=${post.word}`});
          response.end('success');
         })
      })
    }
    // 한글 뜻 수정
    else if(pathname === "/updateM") {
      let wordinfo = ""
      request.on('data', data => {
        wordinfo = data.toString('utf8');
      })
      request.on('end', () => {
        let post = qs.parse(wordinfo);
        fs.writeFile(`word/${post.word}`,`${post.meaning}`, () => {
          response.writeHead(302, {Location: `/?word=${post.word}`});
          response.end('success');
        })
      })
    }
    // 영어 단어 수정
    else if(pathname === "/updateW") {
      let wordinfo = ""
      request.on('data', data => {
        wordinfo = data.toString('utf8');
      })
      request.on('end', () => {
        let post = qs.parse(wordinfo);
        fs.rename(`word/${post.origin}`,`word/${post.word}`, () => {
          response.writeHead(302, {Location: `/?word=${post.word}`});
          response.end('success');
        })
      })
    } 
    //단어 삭제
    else if(pathname === "/delete") {
      let wordinfo = ""
      request.on('data', (data) => {
        wordinfo = data.toString('utf8');
      })
      request.on('end', () => {
        let post = qs.parse(wordinfo);
        fs.unlinkSync(`word/${post.word}`)
          response.writeHead(302, {Location: `/`});
          response.end('success');
      })
    }
    // 잘못된 주소
    else {
      response.writeHead(404);
      response.end("Not found");
    }

});
app.listen(3000);

//검색창
function searchbar(){
  return `<div><form class="search_bar" action="/" method="get">
      <input class="searchbox" id="search-text" type="text" name="word" placeholder="write a word">
      <button id="search-btn" >+</button>
  </form></div>`
}
//내비게이션
function navbar(){
  return `<div class="nav_bar">
    <div class="navbox"><input type="checkbox" class="checkbox" name="">all</div>
    <div class="navbox"><input type="checkbox" class="checkbox" name="">know</div>
    <div class="navbox"><input type="checkbox" class="checkbox" name="">unknown</div>
  </div>`
}
//각 단어 템플릿 
function wordTemplate(en, kor) {
  console.log('en : ' + en + '  kor : ' + kor)//////////////////////////////
  return `
  <div class='list1'><div class='centerborder' id="${en}">
    <button class='word_box' type="button" onclick="updateWord('${en}')">
      ${en}
    </button>
  </div></div>
  <div class="list2 ${en}_${kor}">
    <button class='word_box' type="button" onclick="updateMeaning('${en}','${kor}','${en}_${kor}')">
      ${kor}
    </button>
  </div>
  <form class="modify_button" action="/delete" method="post">
    <input type="hidden" name="word" value="${en}">
    <button class="delete_button" type="submit">X</button>
  </form>`
}// ``안에 변수 넣을 때 html이 화이트스페이스를 구분자로 인식하면서 오류발생!!! ""사용해야함
//각 단어 템플릿 합치기
function getWordList(files){
  var wordlist = ''
  files.forEach(file => {
    var des = fs.readFileSync(`word/${file}`, "utf8")
    wordlist += wordTemplate(file, des);
  })
  return wordlist;
}
//단어 검색 및 추가 //존재하면 맨 위에 추가 없는면 create창 띄우기
function getSearchedWord(word){
  if(fs.existsSync(`word/${word}`)) {
    var des = fs.readFileSync(`word/${word}`, "utf8")
    return wordTemplate(word, des)
  } else {
    return `
    <div class='list1'><div class='centerborder' id="${word}">
      <button class='word_box' type="button" onclick="updateWord('${word}')">
        ${word}
      </button>
    </div></div>
    <div class='list2'>
    <form action="/create" method="post">
      <input type="hidden" name="word" value="${word}">
      <input class="word_box" type="text" name="meaning" autofocus>
    </form>
    </div>
    <div></div>`//칸 맞출려고 넣은 div 의미없음
  }
}
//하단 메뉴
function menubar(){
  return `<div class="menu_bar">
    <div class="menubox">
      <button type="button" class="menu_button"><a href="/">1</a></button>
    </div>
    <div class="menubox">
      <button type="button" class="menu_button">2</button>
    </div>
    <div class="menubox">
      <button type="button" class="menu_button">3</button>
    </div>
  </div>`
}
