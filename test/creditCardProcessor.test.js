'use strict';

const chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    creditCardProcessor = require('../lib/creditCardProcessor.js');

describe('creditCardProcessor', function() {
    describe('#processTransactions', function() {
        let transactions;
        let accounts;

        beforeEach(function() {
            transactions = [
                'Add Drogon 4111111111111111 $1000',
                'Add Viserion 5454545454545454 $3000',
                'Add Rhaegal 1234567890123456 $2000',
                'Add John 4012000033330026 $5000',
                'Add Daenerys 373235387881015 $4000'
            ];
        });

        afterEach(function() {
            transactions = [];
            accounts = [];
        });

        describe('ADD', function() {

            it('should create a credit card if the card number passes luhn 10 validation.', function() {
                accounts = creditCardProcessor.processTransactions(transactions);

                expect(accounts[0].cardNumber).to.equal('4111111111111111');
                expect(accounts[1].cardNumber).to.equal('5454545454545454');
            });

            it('should return a credit card of the card number "error" if it does not pass Luhn 10 validation.', function() {
                accounts = creditCardProcessor.processTransactions(transactions);

                expect(accounts[2].cardNumber).to.equal('error');
            });
        });

        describe('CHARGE', function() {

            it('should increase the balance of the card associated with the provided name by the amount specified.', function() {
                transactions.push('Charge Drogon $800');
                transactions.push('Charge Viserion $7');
                accounts = creditCardProcessor.processTransactions(transactions);

                expect(accounts).to.have.deep.property('[0].balance', 800);
                expect(accounts).to.have.deep.property('[1].balance', 7);
            });

            it('should ignore charges that would raise the balance over the limit as if they were declined', function() {
                transactions.push('Charge Drogon $800');
                transactions.push('Charge Viserion $7');
                accounts = creditCardProcessor.processTransactions(transactions);

                expect(accounts).to.not.have.deep.property('[0].balance', 1300);
            });

            it('should ignore charges against Luhn 10 invalid cards.', function() {
                transactions.push('Charge Rhaegal $100');
                accounts = creditCardProcessor.processTransactions(transactions);

                expect(accounts).to.have.deep.property('[2].balance', 0);
            });
        });

        describe('CREDIT', function() {

            it('should decrease the balance of the card associated with the provided name by the amount specified.', function() {
                transactions.push('Charge Daenerys $100');
                transactions.push('Credit Daenerys $20');
                accounts = creditCardProcessor.processTransactions(transactions);

                expect(accounts).to.have.deep.property('[4].balance', 80);
            });

            it('should create a negative balance when the balance drops below $0.', function() {
                transactions.push('Credit John $100');
                accounts = creditCardProcessor.processTransactions(transactions);

                expect(accounts).to.have.deep.property('[3].balance', -100);
            });

            it('should ignore credits against Luhn 10 invalid cards', function() {
                transactions.push('Credit Rhaegal $100');
                accounts = creditCardProcessor.processTransactions(transactions);

                expect(accounts).to.have.deep.property('[2].balance', 0);
            });
        });
    });
});
