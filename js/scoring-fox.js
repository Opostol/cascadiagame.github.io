
var calculateFoxTokenScoring0 = function() {
	let result = 0;
	let foxScoringValues = {
		'1': 1,
		'2': 2,
		'3': 3,
		'4': 4,
		'5': 5
	}
	
	const tokenIDs = Object.keys(allPlacedTokens);
			
	for (const tokenID of tokenIDs) {

		if(allPlacedTokens[tokenID] == 'fox') {
			
			let neighbourTiles = neighbourTileIDs(tokenID);

			let allNeighbouringWildlife = [];

			for (let i = 0; i < neighbourTiles.length; i++) {

				if(allPlacedTokens.hasOwnProperty(neighbourTiles[i])) {
					allNeighbouringWildlife.push(allPlacedTokens[neighbourTiles[i]]);
				}
			}

			if(allNeighbouringWildlife.length != 0) {
				for (let j = 0; j < allNeighbouringWildlife.length; j++) {
				}
	
				let uniqueWildlife = allNeighbouringWildlife.filter(onlyUnique);
	
				let numUniqueWildlife = uniqueWildlife.length;
				
				result += foxScoringValues[numUniqueWildlife];
			}

		}
	}
	return result;
}
