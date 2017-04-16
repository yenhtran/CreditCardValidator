# Braintree Code Challenge

Submission by YEN TRAN

## An overview of my design decisions

The program is designed to be Object Oriented by implementing both CreditCard and CardValidator classes. The CreditCard class is responsible for creation of new credit cards, charging, crediting, and checking credit limits. With the CardValidator class, its main functionality is to check for valid card numbers- specifically the Luhn 10 Algorithm. Other components of the program include a credit card processor that processes transactions and generates the summary, with the the program kicking off with the index.js file.

## Why I picked JavaScript as my programming language

I chose to write the program in JavaScript and Node.js since it's the language I am most familiar with and use at work. In addition, I enjoy JavaScript because it allows me to write an application in one language through an entire stack.

## Setup Instructions

1. Navigate to root directory and install node packages:

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
