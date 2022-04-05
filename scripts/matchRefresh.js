import { transformScore } from "/scripts/transformScore.js"

export { matchRefresh }

const matchRefresh = (match, everyMatch) => {
	if (
		match.querySelector(".icon--preview") ||
		match.querySelector(".event__resultBefore")
	) {
		return
	}

	let scoreNodes = document.createDocumentFragment()
	const eleScoreContainer = match.querySelector(".scoreContainer")

	/* For single match refresh with every match (not currently active included) */
	if (eleScoreContainer && everyMatch) {
		scoreNodes = eleScoreContainer
		return transformScore(match, scoreNodes)
	}

	/* For all matches refresh, but only live matches refreshed */
	if (eleScoreContainer && !everyMatch && match.classList.contains("event__match--live")) {
		scoreNodes = eleScoreContainer
		return transformScore(match, scoreNodes)
	}

	if (!eleScoreContainer) {
		const divScore = document.createElement("div")
		divScore.className = "scoreContainer"
		scoreNodes = scoreNodes.appendChild(divScore)
		return transformScore(match, scoreNodes)
	}
}
