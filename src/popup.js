function send_message(message) {
  browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, message)
  })
}

function stop_go_state(stop, submit) {
  document.getElementById("stop").disabled = stop
  document.getElementById("submit").value = submit
  change_submit(submit)
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
  const message = value == 'Start'
        ? document.getElementById("speed").value : value

  message_state(message, false, value == 'Pause' ? 'Play' : 'Pause',
                true)
}

function stop_fastreader() {
  console.log("Stopping fastreader")
  message_state("stop", true, 'Start', false)
}

document.getElementById("submit").addEventListener("click", start_pause_fastreader)
document.getElementById("stop").addEventListener("click", stop_fastreader)

window.onload = () => {
  console.log("Retrieving state")
  browser.storage.local.get({submit: 'Start'}).then((result) => {
    // document.getElementById("note").innerText = result['submit'];
    document.getElementById("submit").value = result['submit'];
  })

  // Retrieve state
  browser.storage.local.get({state: false}).then((result) => {
    if (result['state']) {
      console.log("Enabling stop")
      document.getElementById("stop").disabled = false;
    }else {
      console.log("Disabling stop")
      document.getElementById("stop").disabled = true;
    }
  })
}

function set_storage(name, value) {
  browser.storage.local.set({name: value});
}

function change_state(new_state) {
  browser.storage.local.set({state: new_state});
}

function change_submit(new_submit) {
  browser.storage.local.set({submit: new_submit});
}

browser.runtime.onMessage.addListener((message) => {
  if (message == "stop") {
    document.getElementById("stop").disabled = true;
    document.getElementById("submit").disabled = false;
    change_state(false);
  }
})
