'use strict';

var chalk = require('chalk'),
    clear = require('clear'),
    figlet = require('figlet'),
    fs = require('fs'),
    readline = require('readline'),
    CreditCard = require('./lib/creditCard.js'),
    CardValidator = require('./lib/cardValidator.js'),
    accounts = [],
    transactionRequests = [];

clear();
console.log(
    chalk.yellow(
        figlet.textSync('Braintree Challenge', { horizontalLayout: 'full'})
    )
);

function readContent(fileName, callback) {
    fs.readFile('./data/' + fileName, 'utf8', function(err, content) {
        if (err) return console.log(err);
        callback(null, content);
    });
}

function findAccount(name) {
    return accounts.find(function(account) {
        return (account.name === name) ? true : false
    });
}

function compare(card1, card2) {
    if (card1.name < card2.name)
        return -1;
    if (card1.name > card2.name)
        return 1;
    return 0;
}

function processTransactions(transactions) {
		const reName = /(?:\S+\s+){1}(\S+)/,
					reAction = /(^|\W)Add|Charge|Credit($|\W)/g,
					reCardNumber = /\d{1,16}/g,
					reCardLimit = /\$\d+/g,
					reAmount = /\$\d+/g;

    transactions.forEach(function(transaction) {
        let name = transaction.match(reName)[1],
            action = transaction.match(reAction)[0].trim();

        if (action === 'Add') {
            let cardNumber = transaction.match(reCardNumber)[0],
                cardLimit = parseInt(transaction.match(reCardLimit)[0].slice(1)),
                cardValidator = new CardValidator(cardNumber);

            cardValidator.lunh10Validate() ? accounts.push(new CreditCard(name, cardNumber, cardLimit)) : accounts.push(new CreditCard(name, 'error', ''))

        } else {

            if (findAccount(name)) {
                let currentCreditCard = findAccount(name),
                    amount = parseInt(transaction.match(reAmount)[0].slice(1)),
                    cardValidator = new CardValidator(currentCreditCard.cardNumber);

                if (action === 'Charge' && cardValidator.lunh10Validate()) {
                    currentCreditCard.charge(amount)
                } else if (action === 'Credit' && cardValidator.lunh10Validate()) {
                    currentCreditCard.credit(amount)
                }
            } else {
                return false;
            }
        };
    });
}

function generateSummary(accounts) {
    let userSummaries = [];

    accounts.sort(compare).forEach(function(account) {
        if (account.cardNumber !== 'error') {
            userSummaries.push('' + account.name + ': $' + account.balance + '');
        } else {
            userSummaries.push('' + account.name + ': ' + account.cardNumber + '');
        }
    });

    userSummaries.forEach(function(summary) {
        process.stdout.write(`${summary}` + '\n');
    });
}

function beginProgram(i) {
    process.stdout.write(`Please enter the transaction you would like to perform.\nEnter 'exit' to exit the program.\nEnter 'summary' to generate summary.\nEnter 'load <filename>' to run a file with transactions.`);
    process.stdout.write("   >   ");
}

process.stdin.on('data', function(data) {
    let response = data.toString().trim();

    if (response.match(/^load\W/)) {
    	let filePath = response.match(/^load\s(.*)/)[1].toString();

			readContent(filePath, function(err, content) {
				let transactions = content.split('\n');
			  processTransactions(transactions);
			  process.stdout.write(`==== SUMMARY ====\n`);
			  generateSummary(accounts);
			  process.exit();
			});
    }

    switch (response) {
    	case 'exit':
    		process.exit();
    		break;
    	case 'summary':
    		processTransactions(transactionRequests);
    		clear();
    		process.stdout.write(`==== SUMMARY ====\n`);
    		generateSummary(accounts);
    		process.exit();
    		break;
    	default:
    		transactionRequests.push(response);
    }
});

beginProgram(0);
