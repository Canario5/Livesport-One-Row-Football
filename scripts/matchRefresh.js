import { transformScore } from "/scripts/transformScore.js"

export { matchRefresh }

const matchRefresh = (match, everyMatch) => {
	if (
		match.querySelector(".icon--preview") ||
		match.querySelector(".event__resultBefore")
	) {
		return
	}

	/* let scoreNodes */
	const eleScoreContainer = match.querySelector(".scoreContainer")
		? match.querySelector(".scoreContainer")
		: false

	if (!eleScoreContainer) {
		const scoreNodes = document.createElement("div")
		scoreNodes.className = "scoreContainer"
		/* scoreNodes = scoreNodes.appendChild(divScore) */
		return transformScore(match, scoreNodes)
	}

	/*	everyMatch for single match refresh (with not currently active included) 
		or only live match refreshed	*/
	if (eleScoreContainer && (everyMatch || match.classList.contains("event__match--live"))) {
		const scoreNodes = eleScoreContainer
		return transformScore(match, scoreNodes)
	}

	/* if (eleScoreContainer && !everyMatch && match.classList.contains("event__match--live")) {
		const scoreNodes = scoreNodes.appendChild(eleScoreContainer)

		return transformScore(match, scoreNodes)
	} */
}
