function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
  
function digits(val, digits) {
    
    // Convert the number to binary string
    var val_binary_string = val.toString(2);
    
    var string_value = "";
    for (var i = 0; i < digits; i++) {
        string_value = string_value + "0000";
    }
    string_value = string_value + val_binary_string;    
    string_value = "1" + string_value.substring(string_value.length - (4 * digits), string_value.length);
    
    return parseInt(string_value, 2).toString(16).substring(1);   
}

exports.uuid1 = function() {
    
    // Get the current millis
    var msecs = Date.now();
    
    // Return the value
    return exports.uuid1_from_millis(msecs);
}

exports.uuid1_from_millis = function(millis) {
    
    // Convert millis to nanos
    var nanos = millis * 10000;
    
    // Add random nanoseconds
    var random_nanos = randomInt(0, 10000);
    nanos += random_nanos;
    
    // Convert the nanos to binary string
    var nanos_bin_string = nanos.toString(2);
    
    // Generate the base string
    var uuid_string = "";
    
    // Get firts block
    var msecs_binary_string_32 = nanos_bin_string.substring(0, nanos_bin_string.length - 32);
    uuid_string = uuid_string + digits(parseInt(msecs_binary_string_32, 2), 8) + "-";
    
    // Get second block
    var msecs_binary_string_16 = nanos_bin_string.substring(0, nanos_bin_string.length - 16);
    uuid_string = uuid_string + digits(parseInt(msecs_binary_string_16, 2), 4) + "-";
    
    // Get third block
    uuid_string = uuid_string + digits(parseInt(nanos_bin_string, 2), 4) + "-";
    
    // Get forth block
    uuid_string = uuid_string + digits(parseInt(nanos_bin_string, 2), 4) + "-";
    
    // Get ffith block
    uuid_string = uuid_string + digits(parseInt(nanos_bin_string, 2), 12);
    
    return uuid_string;
}

exports.max_uuid1 = function(millis) {
    
    // Convert millis to nanos
    var nanos = millis * 10000;
    
    // Add random nanoseconds
    var random_nanos = randomInt(0, 10000);
    nanos += random_nanos;
    
    // Convert the nanos to binary string
    var nanos_bin_string = nanos.toString(2);
    
    // Generate the base string
    var uuid_string = "";
    
    // Get firts block
    var msecs_binary_string_32 = nanos_bin_string.substring(0, nanos_bin_string.length - 32);
    uuid_string = uuid_string + digits(parseInt(msecs_binary_string_32, 2), 8) + "-";
    
    // Get second block
    var msecs_binary_string_16 = nanos_bin_string.substring(0, nanos_bin_string.length - 16);
    uuid_string = uuid_string + digits(parseInt(msecs_binary_string_16, 2), 4) + "-";
    
    // Get third block
    uuid_string = uuid_string + digits(parseInt(nanos_bin_string, 2), 4) + "-";
    
    // Get forth block
    uuid_string = uuid_string + "ffff" + "-";
    
    // Get fifth block
    uuid_string = uuid_string + "ffffffffffff";
    
    return uuid_string;
}

exports.min_uuid1 = function(millis) {
    
    // Convert millis to nanos
    var nanos = millis * 10000;
    
    // Add random nanoseconds
    var random_nanos = randomInt(0, 10000);
    nanos += random_nanos;
    
    // Convert the nanos to binary string
    var nanos_bin_string = nanos.toString(2);
    
    // Generate the base string
    var uuid_string = "";
    
    // Get firts block
    var msecs_binary_string_32 = nanos_bin_string.substring(0, nanos_bin_string.length - 32);
    uuid_string = uuid_string + digits(parseInt(msecs_binary_string_32, 2), 8) + "-";
    
    // Get second block
    var msecs_binary_string_16 = nanos_bin_string.substring(0, nanos_bin_string.length - 16);
    uuid_string = uuid_string + digits(parseInt(msecs_binary_string_16, 2), 4) + "-";
    
    // Get third block
    uuid_string = uuid_string + digits(parseInt(nanos_bin_string, 2), 4) + "-";
    
    // Get forth block
    uuid_string = uuid_string + "0000" + "-";
    
    // Get fifth block
    uuid_string = uuid_string + "000000000000";
    
    return uuid_string;
}