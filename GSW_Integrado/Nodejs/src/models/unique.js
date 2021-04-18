var unique = function(input,parameter){

	var count = 0;
	var out = [];
	var output = [];

	for (var i = 0; i < input.length; i++) {
	    var unique = true;
	    for (var j = 0; j < out.length; j++) {
	        if ((input[i][parameter] == out[j][parameter])) {
	            unique = false;
	        }
	    }
	    if (unique) {
	        out.push(input[i]);
	        output.push(out[count][parameter]);
	        count++;
	    }
	}

	return output;	

}
module.exports = unique;
