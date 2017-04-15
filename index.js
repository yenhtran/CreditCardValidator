'use strict';

const chalk = require('chalk'),
    clear = require('clear'),
    figlet = require('figlet'),
    fs = require('fs'),
    readline = require('readline'),
    CreditCard = require('./lib/creditCard.js'),
    CardValidator = require('./lib/cardValidator.js'),
    processor = require('./lib/processor.js');

let transactionRequests = [],
		accounts = [];

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
			  accounts = processor.processTransactions(transactions);
			  process.stdout.write(`==== SUMMARY ====\n`);
			  processor.generateSummary(accounts);
			  process.exit();
			});
    }

    switch (response) {
    	case 'exit':
    		process.exit();
    		break;
    	case 'summary':
    		accounts = processor.processTransactions(transactionRequests);
    		process.stdout.write(`==== SUMMARY ====\n`);
    		processor.generateSummary(accounts);
    		process.exit();
    		break;
    	default:
    		transactionRequests.push(response);
    }
});

beginProgram(0);
