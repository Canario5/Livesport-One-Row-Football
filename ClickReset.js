import { nrMatches } from "./Bettersport.js"

// Resets nrMatches and meets fullRefresh conditions with a change of a subpage
export const clickReset = (selector) => {
	console.log("KLIK,KLAK")
	if (!document.querySelector(selector)) return

	document.querySelector(selector).addEventListener("click", (event) => {
		console.log("LOLO")
		if (
			event.target.classList.contains("filters__tab") ||
			event.target.classList.contains("calendar__navigation") ||
			event.target.classList.contains("calendar__day")
		) {
			nrMatches(true)
		}
	})
}
