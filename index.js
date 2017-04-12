'use strict';

var   chalk = require('chalk'),
        clear = require('clear'),
        figlet = require('figlet'),
        fs = require('fs'),
        readline = require('readline'),
        CreditCard = require('./creditCard.js'),
        CardValidator = require('./cardValidator.js'),
        bankAccounts =[],
        content;

// clear();
// console.log(
//     chalk.yellow(
//         figlet.textSync('Braintree Challenge', { horizontalLayout: 'full'})
//     )
// );

function readContent(callback) {
	fs.readFile('input.txt', 'utf8', function(err, content){
		if (err) return console.log(err);
		callback(null, content);
	});
}

function parseContent(data) {
	var processes = data.split('\n'),
			accountRequests = [];

	processes.forEach(function(action){
		accountRequests.push(action.split(' '));
	});

	processTransactions(accountRequests);
}

function foundAccount(name) {
	return bankAccounts.find(function(transaction) {
		return (transaction.name === name) ? true : false
	});
}

function processTransactions(transactions) {
		transactions.forEach(function(activity){
			var name = activity[1];

			if (activity[0] === 'Add') {
				var cardNumber = activity[2],
						cardLimit = parseInt(activity[3].slice(1)),
						cardValidator = new CardValidator(cardNumber).lunh10Validate();

				cardValidator ? bankAccounts.push(new CreditCard(name, cardNumber, cardLimit)) : 'error'

			} else {
				var currentCreditCard = foundAccount(name),
						amount = parseInt(activity[2].slice(1));

				if (!currentCreditCard) {
					return false;
				} else {
					if (activity[0] === 'Charge') {
						currentCreditCard.charge(amount)
					} else if (activity[0] === 'Credit') {
						currentCreditCard.credit(amount)
					}
				}
			};
	});
};

readContent(function(err, content) {
	parseContent(content);
})

//==== STDIN SPIKE (for later)
// rl.question('Ready to create credit card accounts?', function(answer){
//     console.log("Thank you for your feedback: " + answer);
//     rl.close();
// });
//
//=====Other option to readStream
// // const rl = readline.createInterface({
//     input: fs.createReadStream('input.txt')
// });
// rl.on('line', function(line){
// 	console.log('Line: ', line);
// });