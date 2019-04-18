function send_message(message) {
  browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, message)
  })
}

function stop_go_state(stop, submit) {
  document.getElementById("stop").disabled = stop
  document.getElementById("submit").value = submit
}

function message_state(message, stop, submit, state) {
  send_message(message)
  stop_go_state(stop, submit)

  // Running
  change_state(state)
}

function start_pause_fastreader() {
  console.log("Starting fastreader")
  const value = document.getElementById("submit").value
  const pause = value == 'Pause'
  const message = value == 'Start'
        ? document.getElementById("speed").value : value

  message_state(message, false, pause ? 'Play' : 'Pause',
                 !pause)
}

function stop_fastreader() {
  console.log("Stopping fastreader")
  message_state("stop", true, 'Start', false)
}

document.getElementById("submit").addEventListener("click", start_pause_fastreader)
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
