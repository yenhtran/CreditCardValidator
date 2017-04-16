'use strict';

const chalk = require('chalk'),
    clear = require('clear'),
    figlet = require('figlet'),
    readline = require('readline'),
    CreditCard = require('./lib/creditCard.js'),
    CardValidator = require('./lib/cardValidator.js'),
    creditCardProcessor = require('./lib/creditCardProcessor.js'),
    reLoad = /^load\W/,
		reFileName = /^load\s(.*)/;

let transactionRequests = [],
		accounts = [];

clear();
console.log(
    chalk.yellow(
        figlet.textSync('Braintree Challenge', { horizontalLayout: 'full'})
    )
);

process.stdin.on('data', function(data) {
    let response = data.toString().trim();

    if (response.match(reLoad)) {
    	let filePath = response.match(reFileName)[1].toString();

			creditCardProcessor.readContent(filePath, function(err, content) {
				let transactions = content.split('\n');
			  accounts = creditCardProcessor.processTransactions(transactions);
			  process.stdout.write(`==== SUMMARY ====\n`);
			  creditCardProcessor.generateSummary(accounts);
			  process.exit();
			});
    }

    switch (response) {
    	case 'exit':
    		process.exit();
    		break;
    	case 'summary':
    		accounts = creditCardProcessor.processTransactions(transactionRequests);
    		process.stdout.write(`==== SUMMARY ====\n`);
    		creditCardProcessor.generateSummary(accounts);
    		process.exit();
    		break;
    	default:
    		transactionRequests.push(response);
    }
});

function beginProgram(i) {
    process.stdout.write(`Please enter the transaction you would like to perform.\nFormat of entries should be:\n    Create New Accounts: Add <Name> <Card Number> <Credit limit>\n    Charge/Credit Accounts: <ACTION> <Name> <Amount>\nEnter 'exit' to exit the program.\nEnter 'summary' to generate summary.\nEnter 'load <filename>' to run a file with transactions.`);
    process.stdout.write("   >   ");
}

beginProgram(0);
