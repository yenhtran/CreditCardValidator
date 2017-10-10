'use strict';

const chai = require('chai'),
    expect = chai.expect,
    CreditCards = require('../lib/creditCard.js');

describe('Card', function() {
    let mockCard;

    beforeEach(function() {
        mockCard = new CreditCards('Drogon', 4111111111111111, 1000);
    });

    describe('#constructor', function() {

        it('should create a new credit card for a given name, card number, and limit', function() {
            expect(mockCard.name).to.be.equal('Drogon');
            expect(mockCard.cardNumber).to.be.equal(4111111111111111);
            expect(mockCard.cardLimit).to.be.equal(1000);
        });

        it('New cards start with a $0 balance', function() {
            expect(mockCard.balance).to.be.equal(0);
        });
    });

    describe('#charge', function() {
        it('should increase the balance of the card by the amount specified', function() {
            mockCard.charge(100);
            mockCard.charge(500);
            expect(mockCard.balance).to.be.equal(600);
        });

        it('should not charge the card if the amount raises the balance over the limit ', function() {
            mockCard.charge(900);
            mockCard.charge(500);
            expect(mockCard.balance).to.not.equal(1400);
        });
    });

    describe('#credit', function() {
        it('should decrease the balance of the card by the amount specified', function() {
            mockCard.charge(600)
            mockCard.credit(300);
            expect(mockCard.balance).to.equal(300);
        });

        it('should create a negative balance when credits would drop the balance below $0 by the amount specified', function() {
            mockCard.credit(600);
            mockCard.credit(500);
            expect(mockCard.balance).to.equal(-1100);
        })
    });

    describe('#checkCreditLimit', function() {
        it('should return true if the balance and the amount being charged is less than the card balance', function() {
            expect(mockCard.checkCreditLimit(500)).to.equal(true);
        });
    });

    describe('#checkCreditLimit', function() {
        it('should return false if the balance and the amount being charged is less than the card balance', function() {
            expect(mockCard.checkCreditLimit(1100)).to.equal(false);
        });
    });
});
