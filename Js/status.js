let fs = require('fs');
const path = require('path');
//let rawdata = fs.readFileSync(__dirname + '/../Dev/accounts.json'); //let rawdata = fs.readFileSync('accounts.json');
let find = __dirname + '/../Stats';
module.exports = function status() {
    fs.readdir(find, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        let encrypt = []; let index=0;
        files.forEach(function (file) {
            //console.log(`file name : ${file}`);
            let rawdata = fs.readFileSync(__dirname + `/../Stats/${file}`); 
            let data = JSON.parse(rawdata);
            //console.log(data['vac_banned']); //int 0-> nope; 1-> VACED
            //console.log(data['account_id']); //long -: ID
            //console.log(data['penalty_seconds']); //null else something
            //console.log(data['penalty_reason']); //null else something
            //console.log(data['player_level']); //int 1 2 3 4 5 ...
            //console.log(data['ranking']); //null else something?
            let pr2count = data['player_level'] >= 2 ? 1 : 0;
            let cdcount = data['penalty_seconds'] == null ? 0 : 1;
            encrypt[index++]={
                "username": `${file.slice(0,file.length-5)}`,
                "vac": data['vac_banned'],
                "pr2": pr2count,
                "cd": cdcount,
                "cd_reason": data['penalty_reason'],
                "rank": data['ranking'],
                "privaterank": data['player_level'],
                "account_id": data['account_id']
            };
        });
        fs.writeFile((__dirname + `/../cashe.json`), JSON.stringify(encrypt, null, 2), { flag: 'w' }, function (err) {
            if (err) throw err;
        });
    
    });
}


/*
fs.writeFile((__dirname + `/../Stats/${myArgs[0]}.json`), JSON.stringify(response, null, 2), { flag: 'w' }, function (err) {
		if (err) throw err;
	});
*/