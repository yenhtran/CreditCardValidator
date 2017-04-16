'use strict';

const chai = require('chai'),
			expect = chai.expect,
    	CardValidator = require('../lib/CardValidator.js');

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