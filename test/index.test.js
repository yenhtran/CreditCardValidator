'use strict';

const chai = require('chai'),
			expect = chai.expect,
			creditCardProcessor = require('../lib/creditCardProcessor.js');

describe('creditCardProcessor', function() {
	describe('#processTransactions', function() {

		describe('ADD', function() {
			let transactions,
					accounts;

			beforeEach(function() {
				transactions = ['Add Tom 4111111111111111 $1000', 'Add Lisa 5454545454545454 $3000', 'Add Quincy 1234567890123456 $2000'],
				accounts = creditCardProcessor.processTransactions(transactions);
			});

			it('should create a credit card if the card number passes luhn 10 validation.', function() {
				expect(accounts[0].cardNumber).to.equal('4111111111111111');
				expect(accounts[1].cardNumber).to.equal('5454545454545454');
			});

			it('should return a credit card of the card number "error" if it does not pass Luhn 10 validation.', function() {
				expect(accounts[2].cardNumber).to.equal('error');
			});
		});

		describe('CHARGE', function() {

			it('should increase the balance of the card associated with the provided name by the amount specified.', function() {
				let transactions = ['Add Tom 4111111111111111 $1000', 'Add Lisa 5454545454545454 $3000', 'Add Quincy 1234567890123456 $2000', 'Charge Tom $800', 'Charge Lisa $7'],
				accounts = creditCardProcessor.processTransactions(transactions);

				expect(accounts).to.have.deep.property('[0].balance', 800);
				expect(accounts).to.have.deep.property('[1].balance', 7);
			});

			it('should ignore charges that would raise the balance over the limit as if they were declined', function() {
				let transactions = ['Add Tom 4111111111111111 $1000', 'Add Lisa 5454545454545454 $3000', 'Add Quincy 1234567890123456 $2000', 'Charge Tom $800', 'Charge Tom $500'],
				accounts = creditCardProcessor.processTransactions(transactions);

				expect(accounts).to.not.have.deep.property('[0].balance', 1300);
			});

			it('should ignore charges against Luhn 10 invalid cards.', function() {
				let transactions = ['Add Tom 4111111111111111 $1000', 'Add Lisa 5454545454545454 $3000', 'Add Quincy 1234567890123456 $2000', 'Charge Quincy $100'],
				accounts = creditCardProcessor.processTransactions(transactions);

				expect(accounts).to.have.deep.property('[2].balance', 0);
			});
		});

		describe('CREDIT', function() {

			beforeEach(function() {
				let transactions = [],
				accounts = [];
			})

			it('should decrease the balance of the card associated with the provided name by the amount specified.', function() {
				let transactions = ['Add Tom 4111111111111111 $1000', 'Add Lisa 5454545454545454 $3000', 'Add Quincy 1234567890123456 $2000', 'Charge Lisa $100', 'Credit Lisa $20'],
				accounts = creditCardProcessor.processTransactions(transactions);

				expect(accounts).to.have.deep.property('[1].balance', 80);
			});

			it('should create a negative balance when the balance drops below $0.', function() {
				let transactions = ['Add Tom 4111111111111111 $1000', 'Add Lisa 5454545454545454 $3000', 'Add Quincy 1234567890123456 $2000', 'Credit Lisa $100'],
				accounts = creditCardProcessor.processTransactions(transactions);

				expect(accounts).to.have.deep.property('[1].balance', -100);
			});

			it('should ignore credits against Luhn 10 invalid cards', function() {
				let transactions = ['Add Tom 4111111111111111 $1000', 'Add Lisa 5454545454545454 $3000', 'Add Quincy 1234567890123456 $2000', 'Credit Quincy $100'],
				accounts = creditCardProcessor.processTransactions(transactions);

				expect(accounts).to.have.deep.property('[2].balance', 0);
			});

		});

	});
});











