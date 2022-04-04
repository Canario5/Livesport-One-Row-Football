import { nrMatches } from "/scripts/bettersport.js"

// Resets nrMatches and meets fullRefresh conditions with a change of a subpage
export const clickReset = (selector) => {
	if (!document.querySelector(selector)) return

	document.querySelector(selector).addEventListener("click", (event) => {
		// classes are from buttons inside div.filters
		if (
			event.target.classList.contains("filters__tab") ||
			event.target.classList.contains("calendar__navigation") ||
			event.target.classList.contains("calendar__day")
		) {
			nrMatches(true)
		}
	})
}
