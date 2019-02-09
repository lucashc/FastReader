function change_state(new_state) {
  browser.storage.local.set({state: new_state});
}

browser.runtime.onMessage.addListener((message) => {
  if (message == "stop") {
    change_state(false);
  }
});
