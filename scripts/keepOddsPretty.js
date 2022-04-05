export { keepOddsPretty }

/* Odds tab only -> added blank div for keeping it pretty */
const keepOddsPretty = (match) => {
	if (
		match &&
		!match.querySelector("svg[data-bookmaker-id]") &&
		!match.querySelector(".dummyLiveOdds")
	) {
		const iconBox = document.createElement("div")
		iconBox.className = "dummyLiveOdds"
		match.appendChild(iconBox)
	}
}
