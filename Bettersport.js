import { matchRefresh } from "./MatchRefresh.js"

let shortObserverNode
let shortActive = false
let deepActive = false
let loopBlock = false
let nrMatches = 0

const deepObserving = () => {
	if (deepActive === false) {
		// Start observing
		deepObserver.observe(document.body, {
			//document.body is node target to observe
			//attributes: true,
			//characterData: true,
			childList: true, //This is a must have for the observer with subtree
			subtree: true, //Set to true if changes must also be observed in descendants.
		})
		deepActive = true
		//console.log("deep observing active")
	}
}

const deepObserver = new MutationObserver(() => {
	if (
		/* Not perfect, there can be a same number of matches on different tabs like Live or Played. 
		Solved by clickReset() */
		document.querySelectorAll(".event__match").length != nrMatches
	) {
		deepObserver.disconnect()
		//deepActive = false
		//console.log("deep observing NOT active")

		clickReset(".filters")
		shortObserverNode = document.getElementById("live-table")

		fullRefresh()
		shortObserving()
	}
})

const shortObserving = () => {
	if (shortActive === false) {
		shortObserver.observe(shortObserverNode, {
			childList: true,
			subtree: true,
		})
		shortActive = true
		//console.log("short observing active")
	}
}

const shortObserver = new MutationObserver((mutations) => {
	/* Checks for change of a subpage or show/hide of a league matches */
	if (document.querySelectorAll(".event__match").length != nrMatches) {
		loopBlock = true
		nrMatches = document.querySelectorAll(".event__match").length
		fullRefresh()
	}

	if (loopBlock) {
		return
	}

	/* Checking for started/resumed games after loading of the page */
	for (const mutation of mutations) {
		/* console.log(mutations.length)
		console.log(mutation) */

		if (mutation.addedNodes.length <= 0) {
			continue
		}

		if (
			mutation.target.textContent == 91 //? Is there better alternative?
		) {
			matchRefresh(mutation.target.closest(".event__match"))
			continue
		}

		if (!mutation.addedNodes[0].classList) {
			continue
		}

		if (
			mutation.addedNodes[0].classList.contains("event__stage")
			/* mutation.removedNodes[0].classList.contains("event__time") ||
			mutation.removedNodes[0].classList.contains("event__stage--pkv")  */
		) {
			matchRefresh(mutation.target, true) // refresh even not live match for PKV
			/* setTimeout(() => {
				matchRefresh(mutation.target)
			}, 1000) */
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
	if (!document.querySelector(selector)) {
		return
	}

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
	shortObserverNode.querySelector(".odds") ? (oddsPage = true) : undefined

	for (let i = 0; i < allMatches.length; i++) {
		if (
			/* Odds tab only -> blank div for keeping it pretty */
			oddsPage &&
			allMatches[i] &&
			!allMatches[i].querySelector(".icon--live") &&
			!allMatches[i].querySelector(".dummyLiveOdds")
		) {
			const iconBox = document.createElement("div")
			iconBox.className = "dummyLiveOdds"
			allMatches[i].appendChild(iconBox)
		}

		matchRefresh(allMatches[i])
	}
	unblock()
}

const unblock = () => {
	loopBlock = false
}

deepObserving()
