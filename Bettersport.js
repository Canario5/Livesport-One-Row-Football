import { matchRefresh } from "./MatchRefresh.js" // rearanging matches
import { clickReset } from "./ClickReset.js" // helps with moving between subpages (All, Odds, Played...)

export const nrMatches = (reset) => {
	const nr = reset ? 0 : document.querySelectorAll(".event__match").length
	return nr
}

const deepObserving = () => {
	deepObserver.observe(document.body, {
		childList: true,
		subtree: true,
	})
}

const deepObserver = new MutationObserver(() => {
	if (document.querySelectorAll(".event__match").length) {
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
	Solved by clickReset.js */
	if (document.querySelectorAll(".event__match").length !== nrMatches()) {
		fullRefresh()
	}

	/* Checking for started/resumed games after loading of the page */
	for (const mutation of mutations) {
		if (mutation.addedNodes.length <= 0) continue

		//TODO Is there better alternative?
		if (mutation.target.textContent == 91) {
			matchRefresh(mutation.target.closest(".event__match"))
			continue
		}

		if (!mutation.addedNodes[0].classList) continue

		if (mutation.addedNodes[0].classList.contains("event__stage")) {
			matchRefresh(mutation.target, true) // refresh all types of match (with not-live match as well) because of PKV starts
		}

		// When a user is not logged !localStorage.hasOwnProperty("lsid_id")
		if (mutation.target.classList.contains("sportName")) {
			fullRefresh()
			break
		}
	}
})

const fullRefresh = () => {
	const allMatches = document.querySelectorAll(".event__match")

	/* Check if its Odds subPage*/
	const oddsPage = document.querySelector(".event.odds") ? true : false

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
}

deepObserving()
