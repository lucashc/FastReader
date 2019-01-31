// browser.browserAction.onClicked.addListener((tab) => {
//   console.log("Action clicked, sending event")
//   browser.tabs.sendMessage(tab.id, "run");
// })

function start_fastreader() {
  console.log("Starting fastreader")
  browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, document.getElementById("speed").value)
  })
  document.getElementById("stop").disabled = false;
  document.getElementById("submit").disabled = true;
}

function stop_fastreader() {
  console.log("Stopping fastreader")
  browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, "stop")
  })
  document.getElementById("stop").disabled = true;
  document.getElementById("submit").disabled = false;
}

document.getElementById("submit").addEventListener("click", start_fastreader)
document.getElementById("stop").addEventListener("click", stop_fastreader)
