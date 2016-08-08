var express = require('express');
var bodyParser = require('body-parser'); // Required if we need to use HTTP query or post parameters

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')); //serve static content

// Homepage
app.get('/', function(req, res) {
	res.set('Content-Type', 'text/html');
	return res.sendFile(__dirname + '/public/index.html');
});

app.get('/retirement', function(req, res) {
	res.set('Content-Type', 'text/html');
	return res.sendFile(__dirname + '/public/retirement.html');
});

// Route for determining how much money user needs for retirement
app.post('/retirement', function(req, res) {

				// es7... doesn't work on heroku T.T 
	// const {
	// 	annualIncome,
	// 	age,
	// 	lifeExpectancy,
	// 	ageOfRetirement,
	// 	inflation,
	// 	wageIncrease,
	// 	avgAnnualReturn
	// } = req.body;

	const annualIncome = req.body.annualIncome;
	const age = req.body.age;
	const lifeExpectancy = req.body.lifeExpectancy;
	const ageOfRetirement = req.body.ageOfRetirement;
	const inflation = req.body.inflation;
	const wageIncrease = req.body.wageIncrease;
	const avgAnnualReturn = req.body.avgAnnualReturn;

	/***** Some helper variables *****/
	const inflationPlusWageIncrease = 
		inflation / 100 + wageIncrease / 100;
	const sum_inflation_wageIncrase_avgAnnualReturn =
		inflationPlusWageIncrease + avgAnnualReturn / 100;
	const yearsUntilRetirement =
		ageOfRetirement - age;
	/*********************************/

	// How much you need to earn by retirement to maintain your lifestyle
	const earnByRetirement = 
		annualIncome * 
		Math.pow((1 + inflationPlusWageIncrease), yearsUntilRetirement) *
		.80;

	// How much money you need in your retirement fund
	const neededInRetirementFund = 
		earnByRetirement *
		(
			(
				Math.pow((1 + inflationPlusWageIncrease), lifeExpectancy - ageOfRetirement) - 1
			) / inflationPlusWageIncrease
		);

	// How much you need to save each year
	const saveEachYear = 
		neededInRetirementFund * sum_inflation_wageIncrase_avgAnnualReturn / 
		(Math.pow(1 + sum_inflation_wageIncrase_avgAnnualReturn, yearsUntilRetirement) - 1);

	// Percentage of your income
	const percentOfIncome = 
		(saveEachYear / annualIncome * 100)

	res.send({
		earnByRetirement,
		neededInRetirementFund,
		saveEachYear,
		percentOfIncome
	});
});

app.listen(process.env.PORT || 3000);