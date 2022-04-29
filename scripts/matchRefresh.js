import { transformScore } from "/scripts/transformScore.js"

export { matchRefresh }

const matchRefresh = (match, everyMatch) => {
	if (
		match.querySelector(".icon--preview") ||
		match.querySelector(".event__resultBefore")
	) {
		return
	}

	const eleScoreContainer = match.querySelector(".scoreContainer")
		? match.querySelector(".scoreContainer")
		: false

	if (!eleScoreContainer) {
		const scoreNodes = document.createElement("div")
		scoreNodes.className = "scoreContainer"
		return transformScore(match, scoreNodes)
	}

	/*	everyMatch refresh even not currently active match */
	if (eleScoreContainer && (everyMatch || match.classList.contains("event__match--live"))) {
		const scoreNodes = eleScoreContainer
		return transformScore(match, scoreNodes)
	}
}
