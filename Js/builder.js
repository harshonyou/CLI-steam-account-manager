var myArgs = process.argv.slice(2);
console.log(`[\"${myArgs[0]}\",\"${"*".repeat(myArgs[1].length)}\"]`); 

var Steam = require('steam'),
    steamClient = new Steam.SteamClient(),
    steamUser = new Steam.SteamUser(steamClient),
    steamGC = new Steam.SteamGameCoordinator(steamClient, 730),
    csgo = require('csgo'),
	CSGO = new csgo.CSGOClient(steamUser, steamGC, false),
	fs = require('fs');




steamClient.connect();
steamClient.on('connected', () => {
	console.log("[STEAM] Successfully connected.");
	steamUser.logOn({
		account_name: myArgs[0],			
		password: myArgs[1]	
	});
});

steamClient.on('logOnResponse', (response) => {
	if (response.eresult == Steam.EResult.OK) {
		console.log("[STEAM] Successfully logged in.");
		CSGO.launch();
		CSGO.matchmakingStatsRequest();
		(function task() { 
			setTimeout(function() { 
				console.log("Disconnected [Reason: Took way too much time]");
				process.exit(0);
			}, 8000); 
		 })()
	} else if (response.eresult == Steam.EResult.TwoFactorCodeMismatch) {
		console.log("[STEAM] Steam guard two factor code mismatch. Try again.");
	} else {
		console.log("[STEAM] Failed to login. Error number:", response.eresult);
	}
});

CSGO.on('matchmakingStatsData',(response) => {
		//console.log(response); __dirname + `/../Stats/${id}.json`
	fs.writeFile((__dirname + `/../Stats/${myArgs[0]}.json`), JSON.stringify(response, null, 2), { flag: 'w' }, function (err) {
		if (err) throw err;
		console.log("Account Successfully Downloaded!");
		CSGO.exit();
		process.exit(0);
	});
})

steamClient.on('error', function(err) {
	console.error('An error happened!');
	process.exit(0);
});
