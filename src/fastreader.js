
var element = `
<div id="fastbox">
  <input hidden id='fastbox_current' value='0' />
  <h1></h1>
</div>
`

var speed = 400

var interval = null

function inject_element() {
  $('body').append(element)
  $('#fastbox').css({
    "background-color": "rgba(255, 255, 255, 0.9)",
    "width": "100%",
    "height": "100%",
    "position": "fixed",
    "z-index": "1000000",
    "top": "0",
    "left": "0",
    "display": "flex",
    "opacity": 0
  })
  $('#fastbox h1').css({
    "margin": "auto",
    "font-family": "sans-serif",
  })
  $("#fastbox h1").text("Loading...")
  let p = new Promise((resolve, reject) => {
    $("#fastbox").animate({
      "opacity": 1,
    }, 500, resolve)
  })
  return p
}

function remove_element() {
  $("#fastbox").animate({
    "opacity": 0,
  }, 500, () => {
    $("#fastbox").remove()
  })
}

function show_text(text, current = 0) {
  console.log("Do show!")
  let time = 60*1000/Number(speed)
  let words = text.split(/[\s\n]/g)
  let skip = false
  let steps = 0
  let dotinterval = 2
  let p = new Promise((resolve, reject) => {
    interval = setInterval(() => {
      console.log("In Interval")
      if (current === words.length){
        clearInterval(interval);
        setTimeout(resolve, time*2)
        return;
      }
      if (skip){
        if(steps > dotinterval){
          skip = false;
          steps = 0;
        }else{
          steps += 1;
          return;
        }
      }
      if (words[current].match(/.*[.\?!,:].*/g)){
        skip = true;
      }
      while (true){
        if (current-1 < words.length){
          if (words[current] === " " || words[current] === ""){
            current += 1;
          }else{
            break;
          }
        }else{
          return;
        }
      }
      $('#fastbox h1').text(words[current])
      $('#fastbox_current')[0].value = current
      current += 1
    }, time)
  })
  return p
}




browser.runtime.onMessage.addListener((message) => {
  if (message == "stop") {
    clearInterval(interval)
    remove_element()
    return;
  }

  if (message == "Pause") {
    clearInterval(interval)
    return;
  }

  let selected_text = window.getSelection().toString()

  if (message == "Play") {
    start_text(selected_text, $('#fastbox_current')[0].value / 1)
    return
  }

  speed = message
  console.log(selected_text)
  inject_element().then(() => {
    console.log("Element injected")
    console.log("Start word viewer")
    start_text(selected_text)
  })
})

function start_text(selected_text, current = 0) {
  show_text(selected_text, current).then(() => {
    console.log("Done showing")
    remove_element()
    browser.runtime.sendMessage("stop");
  })
}
