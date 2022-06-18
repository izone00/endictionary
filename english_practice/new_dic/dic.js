// const search_btn = document.getElementById("search-btn")
// const search_text = document.getElementById("search-text")
// const word_con = document.getElementById("word_container")
// const pressEnter = document.getElementById("pressEnter")
// const createWordButten = document.getElementById("createWordButten")
//
// const word_en = document.getElementsByClassName("list1");

// word_en.addEventListener("keyup", function(event) {
//   if(event.keyCode === 13){
//     event.preventDefault();
//     createWordButten.click();
//   }
// })

//단어, 뜻을 클릭하면 그 칸의 html문서를 직접 수정해서 작동
function updateMeaning(w, m, wm) {
  //const word = document.getElementById(wm)
  const word = document.getElementsByClassName(wm)
  console.log(word[0])
  word[0].innerHTML = `
  <form action="/updateM" method="post">
    <input class="word_box" type="text" name="meaning" value="${m}" style="background-color : white">
    <input type="hidden" name="word" value="${w}">
  </form>`
}

function updateWord(origin) {
  const word = document.getElementById(origin)
  console.log(word)
  word.innerHTML = `
  <form action="/updateW" method="post">
    <input class="word_box" type="text" name="word" value="${origin}" style="background-color : white">
    <input type="hidden" name="origin" value="${origin}">
  </form>`
}
