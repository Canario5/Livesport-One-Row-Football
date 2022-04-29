import { matchRefresh } from "/scripts/matchRefresh.js"
import { keepOddsPretty } from "/scripts/keepOddsPretty.js"

const deepObserving = () => {
	deepObserver.observe(document.body, {
		childList: true,
		subtree: true,
	})
}

const deepObserver = new MutationObserver((mutations) => {
	if (document.querySelectorAll(".event__match").length) {
		deepObserver.disconnect()

		fullRefresh()
		shortObserving()
	}

	/* for (const mutation of mutations) {
		if (mutation.addedNodes.length <= 0) continue

		//TODO Is there better alternative?
		if (mutation.target.textContent == 91) {
			matchRefresh(mutation.target.closest(".event__match"))
			continue
		}

		if (!mutation.addedNodes[0].classList) continue

		if (mutation.addedNodes[0].classList.contains("event__stage")) {
			matchRefresh(mutation.target, true) // refresh all types of match (with not-live match as well) because of PKV starts
			continue
		}

		if (mutation.target.classList.contains("sportName")) {
			fullRefresh()
			break
		}
	} */
})

const shortObserving = () => {
	shortObserver.observe(document.getElementById("live-table"), {
		childList: true,
		subtree: true,
	})
}

const shortObserver = new MutationObserver((mutations) => {
	for (const mutation of mutations) {
		console.log(mutation)

		/* 	if (!mutation.addedNodes[0].classList) {
			console.log("bez classy přeskočen")
			continue
		} */

		if (!mutation.addedNodes[0] || !mutation.addedNodes[0].classList) continue
		console.log("pres filtr")
		/* 
		if (mutation.addedNodes[0].classList.contains(partAway)) console.log("poločas vložen") */

		/* if (mutation.addedNodes[0].classList.contains("event__stage")) {
			console.log("222")
			matchRefresh(mutation.target, true) // refresh all types of match (with not-live match as well) because of PKV starts
			continue
		} */

		if (
			mutation.addedNodes[0].classList.contains("event__stage") ||
			mutation.addedNodes[0].classList.contains("event__part--away")
		) {
			console.log("333")
			matchRefresh(mutation.target.closest(".event__match"), true) // refresh all types of match (with not-live match as well) because of PKV starts
			continue
		}

		if (mutation.target.classList.contains("sportName")) {
			console.log("444")
			fullRefresh()
			break
		}

		/* if (mutation.addedNodes[0].className.contains(partAway)) console.log("poločas vložen")
		if (mutation.addedNodes[0].classList.contains(extentedAway))
			console.log("prodloužení vloženo") */

		/* if (mutation.addedNodes[0]) {

		}  */

		/* if (mutation.addedNodes.length <= 0) continue

		//TODO Is there better alternative?
		if (mutation.target.textContent == 91) {
			matchRefresh(mutation.target.closest(".event__match"))
			continue
		}

		if (mutation.addedNodes[0].classList.contains("event__stage")) {
			console.log("333")
			matchRefresh(mutation.target, true) // refresh all types of match (with not-live match as well) because of PKV starts
			continue
		}

		if (mutation.target.classList.contains("sportName")) {
			console.log("444")
			fullRefresh()
			break
		} */
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
