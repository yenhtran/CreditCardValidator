const   chalk = require('chalk'),
        clear = require('clear'),
        figlet = require('figlet'),
        fs = require('fs'),
        readline = require('readline'),
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

	processAccount(accountRequests);
	// return activity;
}

function processAccount(transactions) {
	//	loop through the process array
//		if first word is 'ADD'
//			take the next word (name) and check the accounts array to see if account exists
//				if account exists, return err 'account already exists'
//				if account does not exist, create new credit card (from Class)
//		if first word is 'CHARGE'
//			take the following word (name) and check the accounts array to see if account exists
//				if the account exists, debit the balance
//				if the account does not exist, return err 'account does not exist'
//		if first word is 'CREDIT'
//			take the following word (name) and check the accounts array to see if account exists
//				if the account exists, credit the balance
//				if the account does not exist, return err 'account does not exist'
}

readContent(function(err, content) {
	parseContent(content);

})


//STRUCTURE?
// bankAccounts = [
// 	{ name: 'Tom',
// 		accountNumber: 4111111111111111,
// 		balance: $1000
// 	},
// 	{ name: 'Lisa',
// 		accountNumber: 5454545454545454,
// 		balance: $3000
// 	},
// 	{ name: 'Quincy',
// 		accountNumber: 1234567890123456,
// 		balance: $2000
// 	}
// ]

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