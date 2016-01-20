var random = require('./random');
var repeat = require('repeat-string');

function digits(value, bytes) {
    
    // Generate the mask to select the less significative bits
    var mask = parseInt(repeat('1', bytes * 4), 2);
    
    // Generate a secondary mask used to fill with zeros from the left    
    var secondMask = parseInt('1' + repeat('0', bytes * 4), 2);
    
    return ((value & mask) | secondMask).toString(16).substring(1);
}

function getTimeBasedBlocks(millis) {
    
    // Convert millis to nanos
    var nanos = millis * 10000;
    
    // Add random nanoseconds
    var randomNanos = random.randomInt(0, 10000);
    nanos += randomNanos;
    
    // Convert the nanos to binary string
    var nanosBinString = nanos.toString(2);
    
    // Get firts block
    var timeBasedBlockValue = digits(parseInt(nanosBinString.substring(0, nanosBinString.length - 32), 2), 8);
    timeBasedBlockValue += '-';
    
    // Get second block
    timeBasedBlockValue += digits(parseInt(nanosBinString.substring(0, nanosBinString.length - 16), 2), 4);
    timeBasedBlockValue += '-';
    
    // Get third block: Random part
    timeBasedBlockValue += digits(parseInt(nanosBinString, 2), 4);
    
    return timeBasedBlockValue;
}

exports.UUID1 = function() {
    
    // Get the current millis
    var millis = Date.now();
    
    // Return the value
    return exports.fromMillisUUID1(millis);
}

exports.fromMillisUUID1 = function(millis) {
    
    // Generate the time based blocks
    var uuidString = getTimeBasedBlocks(millis);
    uuidString += '-';

    // Convert millis to nanos
    var nanos = millis * 10000;
    
    // Add random nanoseconds
    var randomNanos = random.randomInt(0, 10000);
    nanos += randomNanos;
    
    // Convert the nanos to binary string
    var nanosBinString = nanos.toString(2);
    
    // Get forth block
    uuidString += digits(parseInt(nanosBinString, 2), 4);
    uuidString += '-';
    
    // Get ffith block
    uuidString += digits(parseInt(nanosBinString, 2), 12);
    
    return uuidString;
}

exports.maxUUID1 = function(millis) {
    
    // Generate the time based blocks
    var uuidString = getTimeBasedBlocks(millis);
    
    // Add the forth and fifth blocks
    uuidString += '-ffff-ffffffffffff';
    
    return uuidString;
}

exports.minUUID1 = function(millis) {
    
    // Generate the time based blocks
    var uuidString = getTimeBasedBlocks(millis);
    
    // Add the forth and fifth blocks
    uuidString += '-0000-000000000000';
    
    return uuidString;
}