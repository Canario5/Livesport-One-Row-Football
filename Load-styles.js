//*CSS file loading
;(() => {
	const linkCSS = document.createElement("link")
	linkCSS.type = "text/css"
	linkCSS.href = chrome.runtime.getURL("Bettersport.css")
	//chrome-extension://<extension id>/main.css
	linkCSS.rel = "stylesheet"
	document.documentElement.insertBefore(linkCSS, null)
})()
