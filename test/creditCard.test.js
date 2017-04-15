var expect = require('chai').expect,
    creditCards = require('../lib/creditCards.js');

describe('Card', function() {
    beforeEach(function() {
        let mockCard = new creditCards('Tom', 4111111111111111, 1000);
    });

    describe('#constructor', function() {
    	it('should return create a new credit card', function(){
    		expect(mockCard.name).to.be.equal('Tom');
    	})
    })
});
