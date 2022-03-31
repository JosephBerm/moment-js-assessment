//TODO Question 1

function formatAnyInputToStandardDate(input) {
	let arr;
	let m = moment();
	if (input.includes("/")) {
		arr = input.toString().split("/");
		if (arr[0] > 12 && arr[1] <= 12) {
			setDate(m, arr[0], arr[1] - 1, arr[2]);
		} else if (arr[0] <= 12 && arr[1] > 12) {
			setDate(m, arr[1], arr[0] - 1, arr[2]);
		} else {
			setDate(m, arr[1], arr[0] - 1, arr[2]);
		}
	} else if (input.includes("Q")) {
		arr = input.toString().split(" ");
		if (arr[0] === "Q1") {
			m.quarter(0);
			setQuarterDates(m, arr[2]);
		} else if (arr[0] === "Q2") {
			m.quarter(1);
			setQuarterDates(m, arr[2]);
		} else if (arr[0] === "Q3") {
			m.quarter(2);
			setQuarterDates(m, arr[2]);
		} else if (arr[0] === "Q4") {
			m.quarter(3);
			setQuarterDates(m, arr[2]);
		} else {
			console.error("Invalid Quarter");
		}
		//set year = arr2[arr2.length - 1]
	} else if (input.includes(",")) {
		arr = input.toString().split(" ");
		setDate(m, arr[1], arr[2] + 1, arr[3]);
	} else {
		throw Error("Invalid Input");
	}

	return m.format("L");
}

function setDate(m, date, month, year) {
	m.date(date);
	m.month(month);
	m.year(year);
}

function setQuarterDates(m, year) {
	m.month(m.month() + 1);
	m.date(1);
	m.year(year);
}

// console.log(formatAnyInputToStandardDate("13/02/2022"));
// console.log(formatAnyInputToStandardDate("03/04/2022"));
// console.log(formatAnyInputToStandardDate("Q1 of 2021"));
// console.log(formatAnyInputToStandardDate("Tue, 22 Feb 2022"));

//TODO Question 2

function getFirstMondayOfYear(year) {
	let m = moment().year(year).month(0).date(1).day(8);
	if (m.date() > 7) m.day(-6);

	return m.format("L");
}

// console.log("First Monday falls on", getFirstMondayOfYear(2021));

//TODO Question 3

function getLastMondayOfYear(year) {
	if (year < 1100) throw Error("Year too low. Limit Year: 1100");
	let m = moment().year(year).month(11).date(24);
	let lastMonday;
	for (let i = m.date(); i <= 31; i++) {
		m.date(i);
		if (m.day() === 1) {
			lastMonday = moment(m);
		}
	}
	return lastMonday.format("L");
}

// console.log("Last Monday falls on", getLastMondayOfYear(1776));
// console.log("Last Monday falls on", getLastMondayOfYear(2022));

//TODO Question 4

function differenceBetweenTwoDatesAndTime(date1, time1, date2, time2) {
	if (!date1 || !date2 || !time1 || !time2) throw Error("Missing Input");
	if (!time1.includes(":") || !time2.includes(":"))
		throw Error("Improper Time Format.");

	//Formatting the dates to standard format
	date1 = formatAnyInputToStandardDate(date1);
	date2 = formatAnyInputToStandardDate(date2);

	//creating a moment out of these formatted dates
	let m1 = moment(formatDateForMomentInput(date1)).utc();
	let m2 = moment(formatDateForMomentInput(date2)).utc();

	time1 = time1.split(":");
	time2 = time2.split(":");

	m1.hour(time1[0]);
	m1.minute(time1[1]);

	m2.hour(time2[0]);
	m2.minute(time2[1]);

	let yearDif = Math.floor(moment.duration(Math.abs(m1.diff(m2))).asYears());

	let monthDif = Math.floor(
		moment
			.duration(Math.abs(m1.diff(m2)))
			.subtract(yearDif, "year")
			.asMonths()
	);

	let daysDif = Math.floor(
		moment
			.duration(Math.abs(m1.diff(m2)))
			.subtract(yearDif, "year")
			.subtract(monthDif, "month")
			.asDays()
	);

	let hoursDif = Math.floor(
		moment
			.duration(Math.abs(m1.diff(m2)))
			.subtract(yearDif, "year")
			.subtract(monthDif, "month")
			.subtract(daysDif, "day")
			.asHours()
	);

	let minutesDif = Math.floor(
		moment
			.duration(Math.abs(m1.diff(m2)))
			.subtract(yearDif, "year")
			.subtract(monthDif, "month")
			.subtract(daysDif, "day")
			.subtract(hoursDif, "hours")
			.asMinutes()
	);

	return `${yearDif} Year(s), ${monthDif} Month(s), ${daysDif} Day(s), ${hoursDif} Hour(s), and ${minutesDif} Minute(s)`;
}

function formatDateForMomentInput(date) {
	date = date.split("/");
	return `${date[2]}-${date[0]}-${date[1]}`;
}

// console.log(
// 	"Difference Between Dates:\n" +
// 		differenceBetweenTwoDatesAndTime(
// 			"03/01/2022",
// 			"13:03",
// 			"03/01/2022",
// 			"15:04"
// 		)
// );

//TODO Question 5

function closestDateToRightNow() {
	const date1 = randomDate();
	const date2 = randomDate();
	let m1 = moment(date1);
	let m2 = moment(date2);
	let distanceFromDate1 = Math.abs(moment().diff(m1));
	let distanceFromDate2 = Math.abs(moment().diff(m2));

	console.log("Date 1:", m1.format("L"));
	console.log("Date 2:", m2.format("L"));

	if (distanceFromDate1 > distanceFromDate2) {
		return `Closest date: ${m2.format("L")}`;
	}
	return `Closest date: ${m1.format("L")}`;
}

function randomDate() {
	let month, date, year;
	var largerMonths = [1, 3, 5, 7, 8, 10, 12];
	month = getRandomArbitrary(1, 12);
	if (month === 2) {
		date = getRandomArbitrary(1, 28);
	} else if (largerMonths.indexOf(month) !== -1) {
		date = getRandomArbitrary(1, 31);
	} else {
		date = getRandomArbitrary(1, 30);
	}
	year = getRandomArbitrary(2000, 2050);
	return `${year}-${formatStandard(month)}-${formatStandard(date)}`;
}
function formatStandard(input) {
	return input.toLocaleString("en-US", {
		minimumIntegerDigits: 2,
		useGrouping: false,
	});
}
function getRandomArbitrary(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

// console.log(closestDateToRightNow());

//TODO Question 6

function countdownToNextFIFAWorldCupLOCAL() {
	//FIFA World Cup starts November 11, 2021 @5:00am
	let worldCupDate = moment("2022-11-21 05:00");
	let thisMorning = moment();
	thisMorning.hour(8);
	thisMorning.minute(0);
	thisMorning.second(0);

	let monthDif = Math.floor(
		moment.duration(Math.abs(thisMorning.diff(worldCupDate))).asMonths()
	);

	let daysDif = Math.floor(
		moment
			.duration(Math.abs(thisMorning.diff(worldCupDate)))
			.subtract(monthDif, "month")
			.asDays()
	);

	let hoursDif = Math.floor(
		moment
			.duration(Math.abs(thisMorning.diff(worldCupDate)))
			.subtract(monthDif, "month")
			.subtract(daysDif, "day")
			.asHours()
	);

	//8:00 -> 5:00 === 21 hours && (no minutes and seconds)

	return `${monthDif} Month(s), ${
		daysDif - 1
	} Day(s), ${hoursDif} Hour(s), ${0} Minute(s), and ${0} Seconds(s)`;
}
// console.log(
// 	"CountDown to World Cup (Local Time):\n" +
// 		countdownToNextFIFAWorldCupLOCAL()
// );

//TODO Question 7

function countdownToNextFIFAWorldCupQATAR() {
	//FIFA World Cup starts November 11, 2021 @5:00am
	let worldCupDate = moment("2022-11-21 05:00").utcOffset(3);
	let thisMorning = moment().utcOffset(3).hour(8).startOf("hour");

	let monthDif = Math.floor(
		moment.duration(Math.abs(thisMorning.diff(worldCupDate))).asMonths()
	);

	let daysDif = Math.floor(
		moment
			.duration(Math.abs(thisMorning.diff(worldCupDate)))
			.subtract(monthDif, "month")
			.asDays()
	);

	let hoursDif = Math.floor(
		moment
			.duration(Math.abs(thisMorning.diff(worldCupDate)))
			.subtract(monthDif, "month")
			.subtract(daysDif, "day")
			.asHours()
	);

	//8:00 -> 5:00 === 21 hours && (no minutes and seconds)

	return `${monthDif} Month(s), ${
		daysDif - 1
	} Day(s), ${hoursDif} Hour(s), ${0} Minute(s), and ${0} Seconds(s)`;
}
// console.log(
// 	"CountDown to World Cup (Qatar Local Time):\n" +
// 		countdownToNextFIFAWorldCupQATAR()
// );

//TODO Question 8

function timezoneHourDifference(dateAndTime, timezone1, timezone2) {
	const m1 = moment(dateAndTime, "MM/DD/YYYY h:mmA").tz(timezone1);
	const m2 = moment(dateAndTime, "MM/DD/YYYY h:mmA").tz(timezone2);

	return Math.abs(m1.hour() - m2.hour());
}

// console.log(
// 	"TimeZone Hour Difference",
// 	timezoneHourDifference(
// 		"03/02/2022 03:45pm",
// 		"America/Los_Angeles",
// 		"Asia/Shanghai"
// 	)
// );

// console.log(
// 	"TimeZone Hour Difference",
// 	timezoneHourDifference(
// 		"03/22/2022 03:45pm",
// 		"America/Los_Angeles",
// 		"Asia/Shanghai"
// 	)
// );

//TODO Question 9

function getAllSpecificDays(year, month, dayOfWeek) {
	var days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	if (days.indexOf(dayOfWeek) === -1) throw Error("Invalid Day of Week.");
	if (typeof year !== "number" || typeof month !== "number")
		throw Error("Invalid Input.");
	if (month > 12 || month <= 0) throw Error("Invalid Month");

	let m = moment()
		.year(year)
		.month(month - 1)
		.startOf("month");

	let dayNumber = days.indexOf(dayOfWeek);
	let collectedDates = [];

	for (let i = 1; i <= m.daysInMonth(); i++) {
		m.date(i);
		if (m.day() === dayNumber) {
			collectedDates.push(m.format("L"));
		}
	}

	return collectedDates;
}
// console.log(getAllSpecificDays(2022, 3, "Tuesday"));

//TODO Question 10
function getWeekOfYear(date) {
	date = formatAnyInputToStandardDate(date);
	let overSpill = false;
	date = date.toString().split("/");
	date[0] = Number(date[0]) + 1;
	let leap = moment().year(date[2]);

	if (date[1] > 29 && date[0] === 2 && leap.isLeapYear())
		throw Error("February only has 29 days.");
	else if (date[1] > 28 && date[0] === 2 && !leap.isLeapYear())
		throw Error("February only has 28 days.");

	if (date[0] === 13) {
		date[0] = 1;
		date[2] = Number(date[2]) + 1;
		overSpill = true;
	}

	date = date.join("/");
	date = formatAnyInputToStandardDate(date);
	let feb1 = moment().month(1).startOf("month");
	let givenDate = moment(formatDateForMomentInput(date));
	let dateGivenWeek;
	if (overSpill) dateGivenWeek = givenDate.week() + 53;
	else {
		dateGivenWeek = givenDate.week();
	}
	let febWeek = feb1.week();

	return dateGivenWeek - febWeek + 1;
}

// console.log("Week", getWeekOfYear("12/29/2022"));
// console.log("Week", getWeekOfYear("03/01/2022"));
