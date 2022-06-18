let myLeads = []
const inputEl = document.getElementById("input-el")
const save_bt = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const del_bt = document.getElementById("delete-btn")
const tap_bt = document.getElementById("tap-btn")

const leadFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if(leadFromLocalStorage){
  myLeads = leadFromLocalStorage;
  render(myLeads);
}


tap_bt.addEventListener("click", function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
  })


})

del_bt.addEventListener("dblclick", deleteStorage)
  function deleteStorage() {
      localStorage.clear();
      myLeads = []
      render(myLeads);
  }

save_bt.addEventListener("click",saveLead)
  function saveLead() {
    myLeads.push(inputEl.value);
    inputEl.value = ""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads);
    console.log(localStorage.getItem("myLeads"));
  }


function render(leads) {
  let listItems = ""
  for(let i = 0; i < leads.length; i++) {
    listItems += `
    <li>
      <a target = '_black' href = 'http://${leads[i]}'>
        ${leads[i]}
      </a>
    </li>`
  }
  ulEl.innerHTML = listItems
}
