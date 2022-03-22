//*CSS file loading
;(() => {
	const linkGlobalCSS = document.createElement("link")
	linkGlobalCSS.type = "text/css"
	linkGlobalCSS.href = chrome.runtime.getURL("Bettersport-global.css")
	//chrome-extension://<extension id>/main.css
	linkGlobalCSS.rel = "stylesheet"
	document.documentElement.insertBefore(linkGlobalCSS, null)
})()
