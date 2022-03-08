let scoreNodes

export const matchRefresh = (match, notActiveToo) => {
	if (match.querySelector(".icon--preview") || match.querySelector(".event__resultBefore")) {
		return
	}

	scoreNodes = document.createDocumentFragment()
	const eleScoreContainer = match.querySelector(".scoreContainer")

	/* Creation of Score Container */
	if (!eleScoreContainer) {
		const divScore = document.createElement("div")
		divScore.className = "scoreContainer"
		scoreNodes = scoreNodes.appendChild(divScore)
		scoreInit(match)
	} else if (notActiveToo && eleScoreContainer) {
		/* For single match refresh */
		scoreNodes = eleScoreContainer
		scoreInit(match)
	} else if (eleScoreContainer && match.classList.contains("event__match--live")) {
		/* For all matches refresh; not active matches skipped though */
		scoreNodes = eleScoreContainer
		scoreInit(match)
	}

	if (scoreNodes) {
		match.appendChild(scoreNodes)
	}
}

/* scoreClasses */
const homeClass = [
	".event__score--home",
	".event__part--home.event__part--1",
	".event__part--home.event__part--2",
	".event__partScore--home",
]
const awayClass = [
	".event__score--away",
	".event__part--away.event__part--1",
	".event__part--away.event__part--2",
	".event__partScore--away",
]
const colonClass = [
	"scoreColon event__match--live event__score",
	"scoreColon event__part--1",
	"scoreColon event__part--2",
	"scoreColon event__partScore",
]
const editHalf = [false, true, false, false]

const scoreInit = (match) => {
	homeClass.map((homeClass, i) =>
		match.querySelector(`:scope > ${homeClass}`)
			? transformScore(match, homeClass, awayClass[i], colonClass[i], editHalf[i])
			: undefined
	)
}

const transformScore = (match, home, away, colonClass, halfEdit) => {
	const scoreHome = match.querySelector(home)
	const scoreAway = match.querySelector(away)
	const scoreColon = document.createElement("span")

	scoreNodes.appendChild(scoreHome)
	scoreNodes.appendChild(scoreColon)
	scoreNodes.appendChild(scoreAway)

	scoreColon.className = colonClass
	scoreColon.textContent = ":"

	if (halfEdit) {
		scoreHome.textContent = scoreHome.textContent.substring(0, scoreHome.textContent.length - 1)
		scoreAway.textContent = scoreAway.textContent.substring(1, scoreAway.textContent.length)
	}
}
