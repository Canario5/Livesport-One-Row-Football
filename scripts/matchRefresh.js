import { initClasses } from "/scripts/initClasses.js"

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
		scoreInit(match, scoreNodes)
	}

	/* For all matches refresh, but only live matches refreshed */
	if (eleScoreContainer && !everyMatch && match.classList.contains("event__match--live")) {
		scoreNodes = eleScoreContainer
		scoreInit(match, scoreNodes)
	}

	if (!eleScoreContainer) {
		const divScore = document.createElement("div")
		divScore.className = "scoreContainer"
		scoreNodes = scoreNodes.appendChild(divScore)
		scoreInit(match, scoreNodes)
	}

	if (scoreNodes) {
		match.appendChild(scoreNodes)
	}
}

const scoreInit = (match, scoreNodes) => {
	const { homeClasses, awayClasses, colonClasses, editHalf } = initClasses()

	// prettier-ignore
	homeClasses.map((homeClass, i) =>
		match.querySelector(`:scope > ${homeClass}`)
			? transformScore(homeClasses, awayClasses[i], colonClasses[i], editHalf[i], match, scoreNodes)
			: undefined
	)
}

const transformScore = (home, away, colonClass, editHalf, match, scoreNodes) => {
	const scoreHome = match.querySelector(home)
	const scoreAway = match.querySelector(away)
	const scoreColon = document.createElement("span")

	scoreNodes.appendChild(scoreHome)
	scoreNodes.appendChild(scoreColon)
	scoreNodes.appendChild(scoreAway)

	scoreColon.className = colonClass
	scoreColon.textContent = ":"

	// prettier-ignore
	if (editHalf) {
		scoreHome.textContent = scoreHome.textContent.substring(0, scoreHome.textContent.length - 1)
		scoreAway.textContent = scoreAway.textContent.substring(1, scoreAway.textContent.length)
	}
}
