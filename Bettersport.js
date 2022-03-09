import { matchRefresh } from "./MatchRefresh.js"

let loopBlock = false
let nrMatches = 0

const deepObserving = () => {
	deepObserver.observe(document.body, {
		childList: true,
		subtree: true,
	})
}

const deepObserver = new MutationObserver(() => {
	if (document.querySelectorAll(".event__match").length !== nrMatches) {
		deepObserver.disconnect()
		clickReset(".filters")

		fullRefresh()
		shortObserving()
	}
})

const shortObserving = () => {
	shortObserver.observe(document.getElementById("live-table"), {
		childList: true,
		subtree: true,
	})
}

const shortObserver = new MutationObserver((mutations) => {
	/* Not perfect, there can be a same number of matches on different tabs like Live or Played. 
	Solved by clickReset() */
	if (document.querySelectorAll(".event__match").length != nrMatches) {
		loopBlock = true
		nrMatches = document.querySelectorAll(".event__match").length
		fullRefresh()
	}

	if (loopBlock) return

	/* Checking for started/resumed games after loading of the page */
	for (const mutation of mutations) {
		if (mutation.addedNodes.length <= 0) continue

		//? Is there better alternative?
		if (mutation.target.textContent == 91) {
			matchRefresh(mutation.target.closest(".event__match"))
			continue
		}

		if (!mutation.addedNodes[0].classList) continue

		if (mutation.addedNodes[0].classList.contains("event__stage")) {
			matchRefresh(mutation.target, true) // refresh all types of match (with not-live match as well) because of PKV
		}
		//TODO When a user is logged this is not needed. Local storage should work fine for that.
		if (mutation.target.classList.contains("sportName")) {
			loopBlock = true
			fullRefresh()
			break
		}
	}
})

const clickReset = (selector) => {
	if (!document.querySelector(selector)) return

	document.querySelector(selector).addEventListener("click", (event) => {
		if (
			event.target.classList.contains("filters__tab") ||
			event.target.classList.contains("calendar__navigation") ||
			event.target.classList.contains("calendar__day")
		) {
			nrMatches = 0
		}
	})
}

const fullRefresh = () => {
	const allMatches = document.querySelectorAll(".event__match")

	/* Check if its Odds subPage*/
	let oddsPage
	document.querySelector(".event.odds") ? (oddsPage = true) : undefined

	for (let i = 0; i < allMatches.length; i++) {
		if (
			/* Odds tab only -> blank div for keeping it pretty */
			oddsPage &&
			allMatches[i] &&
			!allMatches[i].querySelector("svg[data-bookmaker-id]") &&
			!allMatches[i].querySelector(".dummyLiveOdds")
		) {
			const iconBox = document.createElement("div")
			iconBox.className = "dummyLiveOdds"
			allMatches[i].appendChild(iconBox)
		}

		matchRefresh(allMatches[i])
	}

	loopBlock = false
}

deepObserving()
