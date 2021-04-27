
var devs_unique = function(input){

	var count = 0;
	var out = [];
	var output = [];

	for (var i = 0, l = input.length; i < l; i++) {
	    var unique = true;
	    for (var j = 0, k = out.length; j < k; j++) {
	        if ((input[i].user.id == out[j].user.id)) {
	            unique = false;
	        }
	    }
	    if (unique) {
	        out.push(input[i]);
	        output.push(out[count].user);
	        count++;
	    }
	}

	return output;	

}
module.exports = devs_unique;
