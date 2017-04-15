'use strict'

const CreditCard = require('./creditCard.js'),
    	CardValidator = require('./cardValidator.js');

let accounts = [],
    transactionRequests = [];

exports.processTransactions = function(transactions) {
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
    return accounts;
}

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
