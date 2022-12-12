function calculateHawkTokenScoring() {
	let hawkScoringValues = {
		'0': 0,
		'1': 2,
		'2': 5,
		'3': 8,
		'4': 11,
		'5': 14,
		'6': 18,
		'7': 22,
		'8': 26
	}
	
	const tokenIDs = Object.keys(allPlacedTokens);

	let numIsolatedHawks = 0;
			
	for (const tokenID of tokenIDs) {

		if(allPlacedTokens[tokenID] == 'hawk') {
			
			let neighbourTiles = neighbourTileIDs(tokenID);

			let neighbouringHawks = false;

			for (let i = 0; i < neighbourTiles.length; i++) {
				if(allPlacedTokens.hasOwnProperty(neighbourTiles[i])) {
					if(allPlacedTokens[neighbourTiles[i]] == 'hawk') {
						neighbouringHawks = true;
					}
				}
			}
			if(!neighbouringHawks) {
				numIsolatedHawks++;
			}
			
		}
	}

	if(numIsolatedHawks > 8) numIsolatedHawks = 8;

	return hawkScoringValues[numIsolatedHawks];
}