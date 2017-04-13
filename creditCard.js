'use strict';

class CreditCard {
    constructor(name, cardNumber, cardLimit) {
        this.name = name;
        this.cardNumber = cardNumber;
        this.cardLimit = cardLimit;
        this.balance = 0;
    }

    charge(amount) {
    	return (this.checkCreditLimit(amount)) ? this.balance += amount : false
    }

    credit(amount) {
      return this.balance -= amount;
    }

    checkCreditLimit(amount) {
    	return this.balance + amount < this.cardLimit ? true : false
    }
}

module.exports = CreditCard;
