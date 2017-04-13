'use strict';

var chalk = require('chalk'),
    clear = require('clear'),
    figlet = require('figlet'),
    fs = require('fs'),
    readline = require('readline'),
    CreditCard = require('./creditCard.js'),
    CardValidator = require('./cardValidator.js'),
    accounts = [],
    content;

// clear();
// console.log(
//     chalk.yellow(
//         figlet.textSync('Braintree Challenge', { horizontalLayout: 'full'})
//     )
// );

function readContent(callback) {
    fs.readFile('input.txt', 'utf8', function(err, content) {
        if (err) return console.log(err);
        callback(null, content);
    });
}

function parseData(data) {
    var transactions = data.split('\n');
    // transactionRequest(transactions);
    processTransactions(transactions);
}

// function transactionRequest(transactions) {
// 	// console.log('TRANSACTIONS: ', transactions);
// 	transactions.forEach(function(transaction){
// 		var userForm = {};

// 		userForm.name = transaction.match(/(?:\S+\s+){1}(\S+)/)[1];
// 		userForm.action = transaction.match(/(^|\W)Add|Charge|Credit($|\W)/g)[0];
// 		userForm.cardNumber = (transaction.match(/\d{1,16}/g)[0]) ? transaction.match(/\d{1,16}/g)[0] : false
// 		console.log(userForm);
// 	})
// }

function findAccount(name) {
    return accounts.find(function(account) {
        return (account.name === name) ? true : false
    });
}

function processTransactions(transactions) {
    transactions.forEach(function(transaction) {
        var name = transaction.match(/(?:\S+\s+){1}(\S+)/)[1],
        		action = transaction.match(/(^|\W)Add|Charge|Credit($|\W)/g)[0];

        if (action === 'Add') {
            var cardNumber = transaction.match(/\d{1,16}/g)[0],
            		cardLimit =  parseInt(transaction.match(/\$\d+/g)[0].slice(1)),
            		cardValidator = new CardValidator(cardNumber);

            cardValidator.lunh10Validate() ? accounts.push(new CreditCard(name, cardNumber, cardLimit)) : accounts.push(name + '-error')

        } else {

        	if (findAccount(name)) {
            var currentCreditCard = findAccount(name),
                amount = parseInt(transaction.match(/\$\d+/g)[0].slice(1)),
                cardValidator = new CardValidator(currentCreditCard.cardNumber);

            if (action === 'Charge' && cardValidator.lunh10Validate()) {
                currentCreditCard.charge(amount)
            } else if (action === 'Credit ' && cardValidator.lunh10Validate()) {
                currentCreditCard.credit(amount)
            }
        	} else {
        		return false;
        	}
        };
    });
    produceSummary(accounts);
}

function produceSummary(accounts) {
	console.log(accounts);
}

readContent(function(err, content) {
    parseData(content);
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
