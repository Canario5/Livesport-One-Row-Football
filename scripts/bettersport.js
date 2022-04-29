import { matchRefresh } from "/scripts/matchRefresh.js"
import { keepOddsPretty } from "/scripts/keepOddsPretty.js"

const deepObserving = () => {
	deepObserver.observe(document.body, {
		childList: true,
		subtree: true,
	})
}

const deepObserver = new MutationObserver((mutations) => {
	for (const mutation of mutations) {
		if (!mutation.addedNodes[0] || !mutation.addedNodes[0].classList) continue

		if (
			mutation.addedNodes[0].classList.contains("event__stage") ||
			mutation.addedNodes[0].classList.contains("event__part--away")
		) {
			console.log("333")
			const everyMatch = true // refresh not-live match as well (because of PKV, delayed starts etc.)
			matchRefresh(mutation.target.closest(".event__match"), everyMatch)
			continue
		}

		if (mutation.target.classList.contains("sportName")) {
			console.log("444")
			fullRefresh()
			break
		}
	}
})

const fullRefresh = () => {
	const oddsPage = document.querySelector(".event.odds") ? true : false

	const allMatches = document.querySelectorAll(".event__match").forEach((match) => {
		if (oddsPage) keepOddsPretty(match)

		matchRefresh(match)
	})
}

deepObserving()
fullRefresh()
