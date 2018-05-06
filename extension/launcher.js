browser.browserAction.onClicked.addListener((tab) => {
    console.log("Action clicked")
    let url = browser.extension.getURL("/index.html");
    let window = browser.windows.create({
        "url": [url],
        "width": 600,
        "height": 600,
        "titlePreface": "FastReader: "
    })
    window.then((success) => {
        console.log("Window loaded")
    })
});