// Function: indentifies the system's name.
async function sistema(input){
	var firstKey = Object.keys(input[0])[0];

	if (firstKey == '_id'){
		input.forEach(input => {input['sistema'] = 'Trello'});
	}
	else if (firstKey == 'id'){
		input.forEach(input => {input['sistema'] = 'Jira'});
	}
	return input;
}

const funcDados = async function(input){

let dados = require('../controller/public/'+input);

const FuncUnique = require("./unique");
const FuncUniqueDev = require("./devs_unique");

// Find the system of input data
dados = await sistema(dados)

//unifying keys
let sl = JSON.stringify(dados)
sl = sl.replace(/_id/g,'id');
sl = sl.replace(/userName/g,'first_name');
sl = sl.replace(/userLastName/g,'last_name');
sl = sl.replace(/userEmail/g,'email');
sl = sl.replace(/hours/g,'amountHours');
sl = sl.replace(/isFinished/g,'finished');
sl = JSON.parse(sl)

const dados_tratados = sl;

// removing duplicated values
var tbl_project = FuncUnique(sl,'project');
var tbl_status = FuncUnique(sl,'status');
var tbl_dev = FuncUniqueDev(sl);
var tbl_sistema = FuncUnique(sl,'sistema');

return {dados, tbl_project, tbl_status, tbl_dev, dados_tratados, tbl_sistema}

}
module.exports = funcDados;