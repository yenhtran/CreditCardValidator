# Simple Credit Card Number Validator

## Purpose

A program that will add new credit card accounts, process charges and credits against them, and display summary information.



## Requirements:

- The program can accept input from two sources: a filename passed in command line arguments and STDIN. For example, on Linux or OSX both './myprogram input.txt' and './myprogram < input.txt' should work.
- The program accepts three input commands passed with space delimited arguments.
- "Add" will create a new credit card for a given name, card number, and limit.
   - Card numbers should be validated using Luhn 10
   - New cards start with a $0 balance
- "Charge" will increase the balance of the card associated with the provided name by the amount specified
   - Charges that would raise the balance over the limit are ignored as if they
     were declined
   - Charges against Luhn 10 invalid cards are ignored
- "Credit" will decrease the balance of the card associated with the provided name by the amount specified
   - Credits that would drop the balance below $0 will create a negative balance
   - Credits against Luhn 10 invalid cards are ignored
- When all input has been read and processed, a summary will be generated.
    - The summary includes the name of each person followed by a colon and balance
    - The names should be displayed alphabetically
    - Display "error" instead of the balance if the credit card number does not pass Luhn 10

## Input Assumptions:

- All input will be valid -- there's no need to check for illegal characters or malformed commands.
- All input will be space delimited
- Credit card numbers may vary in length up to 19 characters
- Credit card numbers will always be numeric
- Amounts will always be prefixed with "$" and will be in whole dollars (no decimals)

## Example Input:

```
Add Drogon 4111111111111111 $1000
Add Viserion 5454545454545454 $3000
Add Rhaegal 1234567890123456 $2000
Charge Drogon $500
Charge Drogon $800
Charge Viserion $7
Credit Viserion $100
Credit Rhaegal $200
```

## Example Output:

```
Drogon: $-93
Viserion: error
Rhaegal: $500
```

## Setup Instructions

1. Navigate to root directory and install node dependencies packages:

   ```sh
   npm install
   ```

2. Start the program:

   ```sh
   npm start
   ```

  If you plan to load a file as an input parameter, please place the file in the 'data' directory.

3. Running tests

   ```sh
   npm test
   ```
