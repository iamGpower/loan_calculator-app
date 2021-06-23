const spinner = document.getElementById('loading');
const resultsCard = document.getElementById('results');

document.getElementById('loan-form').addEventListener('submit', function (e) {
	resultsCard.style.display = 'none';
	spinner.style.display = 'block';
	// clearError();
	setTimeout(generateResult, 2000);
	e.preventDefault();
});

function generateResult() {
	// capturing UI elements
	const amount = document.getElementById('amount');
	const interest = document.getElementById('interest');
	const years = document.getElementById('years');
	const monthlyPayment = document.getElementById('monthly-payment');
	const totalPayment = document.getElementById('total-payment');
	const totalInterest = document.getElementById('total-interest');

	const principal = parseFloat(amount.value);
	const generatedInterest = parseFloat(interest.value) / 100 / 12;
	const generatedPayments = parseFloat(years.value) * 12;

	// Compute monthly payment
	const x = Math.pow(1 + generatedInterest, generatedPayments);
	const monthly = (principal * x * generatedInterest) / (x - 1);

	if (isFinite(monthly)) {
		monthlyPayment.value = monthly.toFixed(2);
		totalPayment.value = (monthly * generatedPayments).toFixed(2);
		totalInterest.value = (monthly * generatedPayments - principal).toFixed(2);
		const showInfo = document.createElement('div');
		showInfo.className = 'alert alert-info';

		showInfo.appendChild(
			document.createTextNode(
				`Loan Amount of N${amount.value} with interest of ${interest.value}% at a period of ${years.value} years`,
			),
		);

		// Get elements
		const resultsDiv = document.querySelector('#results');
		const resultsHeading = document.querySelector('.title');
		resultsDiv.insertBefore(showInfo, resultsHeading);

		amount.value = '';
		interest.value = '';
		years.value = '';

		resultsCard.style.display = 'block';
		spinner.style.display = 'none';
	} else {
		displayError('Please check the input figures');
		resultsCard.style.display = 'none';
		spinner.style.display = 'none';
		// console.log('Please check the input figures');
	}
	// console.log(generateInterest);
}

function displayError(message) {
	const errorDisplay = document.createElement('div');
	errorDisplay.className = 'alert alert-danger';

	errorDisplay.appendChild(document.createTextNode(message));

	// Get elements
	const card = document.querySelector('.card');
	const heading = document.querySelector('.heading');
	card.insertBefore(errorDisplay, heading);

	// clear error after 4sec
	setTimeout(clearError, 2000);

	function clearError() {
		errorDisplay.remove();
	}
}
