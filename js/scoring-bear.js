var calculateBearTokenScoring0 = function() {

	let bearScoringValues = {
		'1': 4,
		'2': 11,
		'3': 19,
		'4': 27
	}

	let confirmedBearPairs = 0;

	let potentialTokenIDs = [];
	let usedTokenIDs = [];

	const tokenIDs = Object.keys(allPlacedTokens);
			
	for (const tokenID of tokenIDs) {

		potentialTokenIDs = [];

		if(allPlacedTokens[tokenID] == 'bear' && usedTokenIDs.indexOf(tokenID) == -1) {

			let neighbourTiles = neighbourTileIDs(tokenID);

			for (let i = 0; i < neighbourTiles.length; i++) {
				if(allPlacedTokens.hasOwnProperty(neighbourTiles[i])) {
					// The neighbouring tile exists and has a placed token on it!
					// Continue with the specified scoring process for this wildlife'
					if(allPlacedTokens[neighbourTiles[i]] == 'bear') {
						potentialTokenIDs.push(neighbourTiles[i]);
					}
				}
			}

			if(potentialTokenIDs.length == 1) {
				// Only one beighbouring bear means it only has the pair and could qualify for scoring!
				// Need to now make sure there's no bears touching the matched neighbour tile before locking it in for scoring

				let potentialBearPairNeighbourTiles = neighbourTileIDs(potentialTokenIDs[0]);
				for (let i = 0; i < potentialBearPairNeighbourTiles.length; i++) {
					if(allPlacedTokens.hasOwnProperty(potentialBearPairNeighbourTiles[i])) {
						// The neighbouring tile exists and has a placed token on it!
						// Continue with the specified scoring process for this wildlife'
	
						if(allPlacedTokens[potentialBearPairNeighbourTiles[i]] == 'bear') {
							potentialTokenIDs.push(potentialBearPairNeighbourTiles[i]);
						}
					}
				}
				if(potentialTokenIDs.length == 2) {
					if(confirmedBearPairs <= 4) confirmedBearPairs++;
				}
			}
			usedTokenIDs.push(...potentialTokenIDs);
		}
	}

	if(confirmedBearPairs != 0) {
		//tokenScoring.bear.totalScore = bearScoringValues[confirmedBearPairs];
		return bearScoringValues[confirmedBearPairs];
	}
	else {
		return 0;
	}
}

var calculateBearTokenScoring1 = function() {

	let bearScoringOfEachTriple = 10

	let confirmedBearTriples = 0;

	let unhandledTokenIDs = [];
	let usedTokenIDs = [];

	const tokenIDs = Object.keys(allPlacedTokens);
			
	for (const tokenID of tokenIDs) {

		unhandledTokenIDs = [];
		let groupCount = 0;

		if(allPlacedTokens[tokenID] == 'bear' && usedTokenIDs.indexOf(tokenID) == -1) {
			unhandledTokenIDs.push(tokenID);
			do {
				let siblingTokenID = unhandledTokenIDs.pop();
				groupCount += 1;
				usedTokenIDs.push(siblingTokenID);
				let neighbourTiles = neighbourTileIDs(siblingTokenID);

				for (let i = 0; i < neighbourTiles.length; i++) {
					if(allPlacedTokens.hasOwnProperty(neighbourTiles[i])) {
						// The neighbouring tile exists and has a placed token on it!
						// Continue with the specified scoring process for this wildlife'
						if(allPlacedTokens[neighbourTiles[i]] == 'bear' && usedTokenIDs.indexOf(neighbourTiles[i]) == -1) {
							unhandledTokenIDs.push(neighbourTiles[i]);
						}
					}
				}
			} while (unhandledTokenIDs.length > 0);

			if(groupCount == 3) {
				confirmedBearTriples += 1
			}
		}
	}
	return confirmedBearTriples * bearScoringOfEachTriple;
}