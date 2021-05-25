// chamando as funções:
const FuncUnique = require("./unique");
const FuncUniqueDev = require("./devs_unique");

// Find the system of input
function sistema(input){
	var firstKey = Object.keys(input[0])[0];

	if (firstKey == '_id'){
		input.forEach(input => {input['sistema'] = 'Trello'});
	}
	else if (firstKey == 'id'){
		input.forEach(input => {input['sistema'] = 'Jira'});
	}
	return input;
}

// Dados
let dadosjira = require('../app/dadosJSON/jira.json')
dadosjira = sistema(dadosjira)

let dadostrello = require('../app/dadosJSON/trello.json')
dadostrello = sistema(dadostrello)

const dados = dadostrello.concat(dadosjira)

//Unificando os dados dos 2 arquivos
let sl = JSON.stringify(dados)
sl = sl.replace(/_id/g,'id');
sl = sl.replace(/userName/g,'first_name');
sl = sl.replace(/userLastName/g,'last_name');
sl = sl.replace(/userEmail/g,'email');
sl = sl.replace(/hours/g,'amountHours');
sl = sl.replace(/isFinished/g,'finished');
sl = JSON.parse(sl)

const dados_tratados = sl;

// Buscando todos os projetos existentes:
var tbl_project = FuncUnique(sl,'project');

// Buscando todos os status existetes:
var tbl_status = FuncUnique(sl,'status');

// Buscando todos os usuários existentes:  
var tbl_dev = FuncUniqueDev(sl);

// Buscando todos os projetos sistemas:
var tbl_sistema = FuncUnique(sl,'sistema');

module.exports = {dados, tbl_project, tbl_status, tbl_dev, dados_tratados, tbl_sistema}
