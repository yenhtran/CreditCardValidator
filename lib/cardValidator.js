'use strict';

const _ = require('lodash');

class CardValidator {
/*
    Initilizes the card validator
    Parameter: String
    Returns: Credit Card object
*/
    constructor(number) {
        this.number = number;
    }

/*
    Checks for validate numbers that pass the Luhn 10 validation
    Parameters: None
    Returns: Boolean
*/
    luhn10Validate() {
        if (this.isValidLength(this.number)) {
            let numbers = this.number.split('').reverse(),
            		reducedEvenIndexes = this.findSum(this.convertStringsIntoInt(this.createEvenIndexes(numbers))),
            		reducedOddIndexes = this.findSum(this.convertStringsIntoInt(this.doubleIndexValues(this.createOddIndexes(numbers)))),
            		combinedSum = reducedEvenIndexes + reducedOddIndexes;

            return combinedSum % 10 === 0 ? true : false
        } else {
            return false;
        }
    }

/*
    Checks for validate numbers length between 13 and 19 digits
    Parameters: None
    Returns: Boolean
*/
    isValidLength(number) {
        let currentLength = number.length - 1;
        return currentLength >= 13 && currentLength <= 19 ? true : false
    }

/*
    Returns all the digits located in the even indexes
    Parameters: Array
    Return: Array
*/
    createEvenIndexes(numbers) {
        let evenIndexes = [];

        numbers.map(function(num, index) {
            if (index % 2 === 0) {
                evenIndexes.push(num)
            }
        });

        return evenIndexes.toString().replace(/,/g, '').split('');
    }

/*
    Returns all the digits located in the odd indexes
    Parameters: Array
    Return: Array
*/
    createOddIndexes(numbers) {
        let oddIndexes = [];

        numbers.map(function(num, index) {
            if (index % 2 !== 0) {
                oddIndexes.push(num)
            }
        });

        return oddIndexes.toString().replace(/,/g, '').split('');
    }

/*
    Doubles all the numbers in the array passed in
    Parameters: Array
    Return: Array
*/
    doubleIndexValues(numbers) {
        let newArr = [];

        numbers.map(function(num) {
            newArr.push((num *= 2));
        });

        return this.convertIntIntoStrings(newArr);
    }

/*
    Converts an array of integers into an array of strings
    Parameters: Array
    Return: Array
*/
    convertIntIntoStrings(numbers) {
        return numbers.toString().replace(/,/g, '').split('')
    }

/*
    Converts an array of strings into an array of integers
    Parameters: Array
    Return: Array
*/
    convertStringsIntoInt(numbers) {
        return numbers.map(function(num) {
            return parseInt(num)
        })
    }

/*
    Returns the sum of all the intergers in the array
    Parameters: Array
    Return: Integer
*/
    findSum(numbers) {
        return numbers.reduce(function(total, num) {
            return total + num
        }, 0);
    }
}

module.exports = CardValidator;
