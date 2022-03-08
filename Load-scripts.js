//* Inject js
const eleScript = document.createElement("script")
eleScript.type = "module"
//"text/javascript"
eleScript.src = chrome.runtime.getURL("Bettersport.js")
//chrome-extension://<extension id>/main.css
eleScript.defer = true
document.body.insertBefore(eleScript, null)
