export { initClasses }

const initClasses = () => {
	if (initClasses.value && Object.keys(initClasses.value).length > 0)
		return initClasses.value

	const homeClasses = [
		".event__score--home",
		".event__part--home.event__part--1",
		".event__part--home.event__part--2",
		".event__partScore--home",
	]
	const awayClasses = [
		".event__score--away",
		".event__part--away.event__part--1",
		".event__part--away.event__part--2",
		".event__partScore--away",
	]
	const colonClasses = [
		"scoreColon event__match--live event__score",
		"scoreColon event__part--1",
		"scoreColon event__part--2",
		"scoreColon event__partScore",
	]
	const editHalf = [false, true, false, false]

	initClasses.value = { homeClasses, awayClasses, colonClasses, editHalf }
	return initClasses.value
}
