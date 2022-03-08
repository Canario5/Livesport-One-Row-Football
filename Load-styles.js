//* Inject css file with no reload flicker, more: https://stackoverflow.com/a/9639899
const linkCSS = document.createElement("link")
linkCSS.type = "text/css"
linkCSS.href = chrome.runtime.getURL("Bettersport.css")
//chrome-extension://<extension id>/main.css
linkCSS.rel = "stylesheet"
document.documentElement.insertBefore(linkCSS, null)

const linkGlobalCSS = document.createElement("link")
linkGlobalCSS.type = "text/css"
linkGlobalCSS.href = chrome.runtime.getURL("Bettersport-global.css")
linkGlobalCSS.rel = "stylesheet"
document.documentElement.appendChild(linkGlobalCSS)
