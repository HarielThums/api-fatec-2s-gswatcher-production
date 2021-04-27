export default{
    retornarArquivo:() => {
        'use strict';

        // const fs = require('fs');
        // console.log('teste');

        // let data = fs.readFileSync('../data/jira.json');
        // let student = JSON.parse(data);
        // console.log(student);
        // 'use strict';

        let jsonData = require('../data/jira.json');

        // console.log(jsonData);
        return jsonData;
    }
}


// 'use strict';

// const fs = require('fs');
// console.log('teste');

// let data = fs.readFileSync('../data/jira.json');
// let student = JSON.parse(data);
// console.log(student);