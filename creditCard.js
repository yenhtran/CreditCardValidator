'use strict';

class CreditCard {
	constructor(name, cardNumber, cardLimit) {
			this.name = name;
			this.cardNumber = cardNumber;
			this.cardLimit = cardLimit;
			this.balance = 0;
	}

	charge(amount) {
		return this.balance += amount;
	}

	credit(amount) {
		return this.balance -= amount;
	}

	// isValidCard(cardNumber) {
	// 	var cardValidator = new CardValidator(cardNumber);
	// 	console.log(cardValidator.lunh10Validate(cardNumber));
	// }
}

module.exports = CreditCard;
