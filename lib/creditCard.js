'use strict';

class CreditCard {
/*
    Initilizes the credit card
    Parameter: String (name)
    Parameter: String (cardNumber)
    Parameter: Integer (cardLimit)
*/
    constructor(name, cardNumber, cardLimit) {
        this.name = name;
        this.cardNumber = cardNumber;
        this.cardLimit = cardLimit;
        this.balance = 0;
    }

/*
    Checks for valid credit limit, then charges the credit card
    Parameter: Integer
    Retuns: Integer/Boolean
*/
    charge(amount) {
    	return (this.checkCreditLimit(amount)) ? this.balance += amount : false
    }

/*
    Credits the credit card
    Parameter: Integer
    Retuns: Integer
*/
    credit(amount) {
      return this.balance -= amount;
    }

/*
    Logic to check for if the amount charge is under the credit limit
    Parameter: Integer
    Retuns: Boolean
*/
    checkCreditLimit(amount) {
    	return this.balance + amount < this.cardLimit ? true : false
    }
}

module.exports = CreditCard;
