function start_fastreader() {
  console.log("Starting fastreader")
  browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, document.getElementById("speed").value)
  })
  document.getElementById("stop").disabled = false;
  document.getElementById("submit").disabled = true;
  // Running
  change_state(true);
}

function stop_fastreader() {
  console.log("Stopping fastreader")
  browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, "stop")
  })
  document.getElementById("stop").disabled = true;
  document.getElementById("submit").disabled = false;
  // Not running
  change_state(false);
}

document.getElementById("submit").addEventListener("click", start_fastreader)
document.getElementById("stop").addEventListener("click", stop_fastreader)

window.onload = () => {
  console.log("Retrieving state")
  // Retrieve state
  browser.storage.local.get({state: false}).then((result) => {
    if (result['state']) {
      console.log("Enabling stop")
      document.getElementById("stop").disabled = false;
      document.getElementById("submit").disabled = true;
    }else {
      console.log("Disabling stop")
      document.getElementById("stop").disabled = true;
      document.getElementById("submit").disabled = false;
    }
  })
}

function change_state(new_state) {
  browser.storage.local.set({state: new_state});
}

browser.runtime.onMessage.addListener((message) => {
  if (message == "stop") {
    document.getElementById("stop").disabled = true;
    document.getElementById("submit").disabled = false;
    change_state(false);
  }
})
