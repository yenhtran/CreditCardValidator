const   chalk = require('chalk'),
        clear = require('clear'),
        figlet = require('figlet'),
        fs = require('fs'),
        readline = require('readline');

clear();
console.log(
    chalk.yellow(
        figlet.textSync('Braintree Challenge', { horizontalLayout: 'full'})
    )
);

const rl = readline.createInterface({
    input: fs.createReadStream('input.txt')
});


rl.on('line', function(line){
	console.log('Line: ', line);
});


//==== STDIN SPIKE (for later)
// rl.question('Ready to create credit card accounts?', function(answer){
//     console.log("Thank you for your feedback: " + answer);
//     rl.close();
// });