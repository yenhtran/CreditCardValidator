'use strict';

const chai = require('chai'),
			expect = chai.expect,
			should = chai.should(),
			spies = require('chai-spies'),
			processor = require('../index.js'),
    	CreditCards = require('../lib/creditCard.js'),
    	CardValidator = require('../lib/CardValidator.js');

chai.use(spies);

describe('Card', function() {
		let mockCard;

		beforeEach(function() {
    		mockCard = new CreditCards('Tom', 4111111111111111, 1000);
    });

    describe('#constructor', function() {

    	it('should create a new credit card for a given name, card number, and limit', function() {
    		expect(mockCard.name).to.be.equal('Tom');
    		expect(mockCard.cardNumber).to.be.equal(4111111111111111);
    		expect(mockCard.cardLimit).to.be.equal(1000);
    	});

    	it('New cards start with a $0 balance', function(){
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

describe('CardValidator', function(){
	let mockCardValidator;

	beforeEach(function() {
    	mockCardValidator = new CardValidator('123');
  });

	describe('#lunh10Validate', function() {
		it('should return true if the number passes the Lunh 10 Algorithm', function() {
    		let mockCardValidator = new CardValidator('5454545454545454')
    		expect(mockCardValidator.lunh10Validate()).to.be.equal(true);
    });

    it('should return false if the number does not passes the Lunh 10 Algorithm', function() {
    		let mockCardValidator = new CardValidator('1234567890123456');
    		expect(mockCardValidator.lunh10Validate()).to.be.equal(false);
    });
	});

	describe('#isValidLength', function() {
		it('should return true if the length of the number is between 13 and 16 digits', function() {
    		expect(mockCardValidator.isValidLength('12345678987656')).to.be.equal(true);
    });

		it('should return false if the length of the number is not between 13 and 16 digits', function() {
    		expect(mockCardValidator.isValidLength('54')).to.be.equal(false);
    		expect(mockCardValidator.isValidLength('545454545454545454')).to.be.equal(false);
    });
	});

	describe('#createEvenIndexes', function() {
		it('should return an array of even-indexed numbers ', function() {
    		expect(mockCardValidator.createEvenIndexes([1,2,3,4,5,6,7,8,9,8,7,6,5,6])).to.be.eql(['1','3','5','7','9','7','5']);
    });
	});

	describe('#createOddIndexes', function() {
		it('should return an array of even-indexed numbers ', function() {
    		expect(mockCardValidator.createEvenIndexes([1,2,3,4,5,6,7,8,9,8,7,6,5,6])).to.be.eql(['1','3','5','7','9','7','5']);
    });
	});

	describe('#doubleIndexValues', function() {
		it('should return an array where all the values are doubled', function() {
    		expect(mockCardValidator.doubleIndexValues([1,2,3,4])).to.be.eql(['2','4','6','8']);
		});
	});

	describe('#convertIntIntoStrings', function() {
		it('should return an array of string', function() {
    		expect(mockCardValidator.convertIntIntoStrings([1,2,3,4])).to.be.eql(['1','2','3','4']);
		});
	});

	describe('#convertStringsIntoInt', function() {
		it('should return an array of integers', function() {
    		expect(mockCardValidator.convertStringsIntoInt(['1','2','3','4'])).to.be.eql([1,2,3,4]);
		});
	});

	describe('#findSum', function() {
		it('should sum up all the numbers in an array', function() {
    		expect(mockCardValidator.findSum([1,2,3,4,5])).to.be.eql(15);
		});
	});
});











