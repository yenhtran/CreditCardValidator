'use strict';

var _ = require('lodash');

class CardValidator {
    constructor(number) {
        this.number = number;
    }

    lunh10Validate() {
        if (this.isValidLength(this.number)) {
            var numbers = this.number.split('').reverse(),
            		reducedEvenIndexes = this.findSum(this.convertStringsIntoInt(this.createEvenIndexes(numbers))),
            		reducedOddIndexes = this.findSum(this.convertStringsIntoInt(this.doubleIndexValues(this.createOddIndexes(numbers)))),
            		combinedSum = reducedEvenIndexes + reducedOddIndexes;

            return combinedSum % 10 === 0 ? true : false
        } else {
            return false;
        }
    }

    isValidLength(number) {
        var currentLength = number.length - 1;

        return currentLength >= 13 && currentLength <= 16 ? true : false
    }

    createEvenIndexes(array) {
        var evenIndexes = [];

        array.map(function(num, index) {
            if (index % 2 === 0) {
                evenIndexes.push(num)
            }
        });

        return evenIndexes.toString().replace(/,/g, '').split('');
    }

    createOddIndexes(array) {
        var oddIndexes = [];

        array.map(function(num, index) {
            if (index % 2 !== 0) {
                oddIndexes.push(num)
            }
        });

        return oddIndexes.toString().replace(/,/g, '').split('');
    }

    doubleIndexValues(array) {
        var newArr = [];

        array.map(function(num) {
            newArr.push((num *= 2));
        });

        return this.convertIntIntoStrings(newArr);
    }

    convertIntIntoStrings(arr) {
        return arr.toString().replace(/,/g, '').split('')
    }

    convertStringsIntoInt(arr) {
    		// console.log(arr);
        return arr.map(function(num) {
            return parseInt(num)
        })
    }

    findSum(arr) {
        return arr.reduce(function(total, num) {
            return total + num
        }, 0);
    }
}

module.exports = CardValidator;
