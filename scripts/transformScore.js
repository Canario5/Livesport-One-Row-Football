import { initClasses } from "/scripts/initClasses.js"

export { transformScore }

const transformScore = (match, scoreNodes) => {
	const { homeClasses, awayClasses, colonClasses, editHalf } = initClasses()

	homeClasses.map((homeClass, i) =>
		match.querySelector(`:scope > ${homeClass}`)
			? scoreItem(homeClasses[i], awayClasses[i], colonClasses[i], editHalf[i])
			: undefined
	)

	function scoreItem(home, away, colonClass, editHalf) {
		const scoreHome = match.querySelector(home)
		const scoreAway = match.querySelector(away)
		const scoreColon = document.createElement("span")

		scoreNodes.append(scoreHome, scoreColon, scoreAway)

		scoreColon.className = colonClass
		scoreColon.textContent = ":"

		// prettier-ignore
		if (editHalf) {
			scoreHome.textContent = scoreHome.textContent.substring(0, scoreHome.textContent.length - 1)
			scoreAway.textContent = scoreAway.textContent.substring(1, scoreAway.textContent.length)
		}
	}

	if (scoreNodes.hasChildNodes()) {
		match.appendChild(scoreNodes)
	}
}
