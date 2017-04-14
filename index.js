'use strict';

var chalk = require('chalk'),
    clear = require('clear'),
    figlet = require('figlet'),
    fs = require('fs'),
    readline = require('readline'),
    CreditCard = require('./creditCard.js'),
    CardValidator = require('./cardValidator.js'),
    accounts = [],
    transactionRequests = [];

// clear();
// console.log(
//     chalk.yellow(
//         figlet.textSync('Braintree Challenge', { horizontalLayout: 'full'})
//     )
// );

function readContent(fileName, callback) {
    fs.readFile(fileName, 'utf8', function(err, content) {
        if (err) return console.log(err);
        callback(null, content);
    });
}

function findAccount(name) {
    return accounts.find(function(account) {
        return (account.name === name) ? true : false
    });
}

function processTransactions(transactions) {
    transactions.forEach(function(transaction) {
        var name = transaction.match(/(?:\S+\s+){1}(\S+)/)[1],
            action = transaction.match(/(^|\W)Add|Charge|Credit($|\W)/g)[0].trim();

        if (action === 'Add') {
            var cardNumber = transaction.match(/\d{1,16}/g)[0],
                cardLimit = parseInt(transaction.match(/\$\d+/g)[0].slice(1)),
                cardValidator = new CardValidator(cardNumber);

            cardValidator.lunh10Validate() ? accounts.push(new CreditCard(name, cardNumber, cardLimit)) : accounts.push(new CreditCard(name, 'error', ''))

        } else {

            if (findAccount(name)) {
                var currentCreditCard = findAccount(name),
                    amount = parseInt(transaction.match(/\$\d+/g)[0].slice(1)),
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

function compare(card1, card2) {
    if (card1.name < card2.name)
        return -1;
    if (card1.name > card2.name)
        return 1;
    return 0;
}

function generateSummary(accounts) {
    var userSummaries = [];

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
    process.stdout.write(`Please enter the transaction you would like to perform.\nType 'exit' to exit the program.\nType 'summary' to generate summary.`);
    process.stdout.write("   >   ");
}

process.stdin.on('data', function(data) {
    var response = data.toString().trim();

    if (response.match(/^load\W/)) {
    	var filePath = response.match(/(?<=load\s).*$/);

    	readContent(filePath);
    }
    switch (response) {
    	case 'exit':
    		process.exit();
    		break;
    	case 'summary':
    		processTransactions(transactionRequests);
    		clear();
    		generateSummary(accounts);
    		process.exit();
    		break;
    	case 'load':
    		process.stdout.write(`${response}` + '\n');
    		process.exit();
    		break;
    	default:
    		transactionRequests.push(response);
    }
});

beginProgram(0);
