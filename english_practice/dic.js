const search_btn = document.getElementById("search-btn")
const search_text = document.getElementById("search-text")


search_text.addEventListener("keyup", function(event) {
  if(event.keyCode === 13){
    event.preventDefault();
    search_btn.click();
  }
})

function search_word() {
  word_list.push(search_text.value);

  localStorage.setItem(key,"value")
}

function render() {

}
