'use strict'

const fs = require('fs'),
			CreditCard = require('./creditCard.js'),
            CardValidator = require('./cardValidator.js'),
            reName = /(?:\S+\s+){1}(\S+)/i,
			reAction = /(^|\W)Add|Charge|Credit($|\W)/gi,
			reCardNumber = /\d{1,16}/g,
			reCardLimit = /\$\d+/g,
			reAmount = /\$\d+/g;

let accounts = [];

/*
    Processes all the transaction requests
    Parameters: Array of strings
    Returns: Array of credit card instances
*/
exports.processTransactions = function(transactions) {
    transactions.forEach(function(transaction) {
        let name = transaction.match(reName)[1],
            action = transaction.match(reAction)[0].trim();

        if ((action === 'Add' || action === 'add' || action === 'ADD') && !findAccount(name)) {
            let cardNumber = transaction.match(reCardNumber)[0],
                cardLimit = parseInt(transaction.match(reCardLimit)[0].slice(1)),
                cardValidator = new CardValidator(cardNumber);

            cardValidator.luhn10Validate() ? accounts.push(new CreditCard(name, cardNumber, cardLimit)) : accounts.push(new CreditCard(name, 'error', ''))

        } else {
            if (findAccount(name)) {
                let currentCreditCard = findAccount(name),
                    amount = parseInt(transaction.match(reAmount)[0].slice(1)),
                    cardValidator = new CardValidator(currentCreditCard.cardNumber);

                if ((action === 'Charge' || action === 'charge' || action === 'CHARGE')  && cardValidator.luhn10Validate()) {
                    currentCreditCard.charge(amount)
                } else if ((action === 'Credit' || action === 'credit' || action === 'credit')  && cardValidator.luhn10Validate()) {
                    currentCreditCard.credit(amount)
                }
            } else {
                return false;
            }
        };
    });
    return accounts;
}

/*
    Alphabetize/summarizes all the current accounts
    Parameters: Array of credit card objects
    Returns: STDOUT summary
*/
exports.generateSummary = function(accounts) {
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

/*
    Called from the STDIN listener to read contents from the terminal
    Parameter: File name entered in the terminal
    Parameter: Callback
*/
exports.readContent = function(fileName, callback) {
    fs.readFile('./data/' + fileName, 'utf8', function(err, content) {
        if (err) return console.log(err);
        callback(null, content);
    });
}

/*
    Searches for existing accounts and returns true if the account is found
    Parameter: String
    Returns: Boolean
*/
function findAccount(name) {
    return accounts.find(function(account) {
        return (account.name === name) ? true : false
    });
}

/*
    Helper function to help alphabetize accounts
    Parameter: Object (credit card)
    Parameter: Object (credit card)
    Returns: Boolean
*/
function compare(card1, card2) {
    if (card1.name < card2.name)
        return -1;
    if (card1.name > card2.name)
        return 1;
    return 0;
}
