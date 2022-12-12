

let usedSalmonTokenIDs = [];
let potentialSalmonTokenIDs = [];
let confirmedSalmonRuns = [];
	
function calculateSalmonTokenScoring() {
	let result = 0;
	let salmonScoringValues = {
		'1': 2,
		'2': 4,
		'3': 7,
		'4': 11,
		'5': 15,
		'6': 20,
		'7': 26
	}

	const tokenIDs = Object.keys(allPlacedTokens);

	let allSalmonTileIDs = [];
			
	for (const tokenID of tokenIDs) {
		
		if(allPlacedTokens[tokenID] == 'salmon') {
			allSalmonTileIDs.push(tokenID);
		}
	}

	let validSalmonTiles = []

	for (let i = 0; i < allSalmonTileIDs.length; i++) {
		let neighbouringSalmon = searchNeighbourTilesForWildlife(allSalmonTileIDs[i], 'salmon');
		if(neighbouringSalmon.length <= 2) {
			validSalmonTiles.push(allSalmonTileIDs[i]);
		} else {
			usedSalmonTokenIDs.push(allSalmonTileIDs[i]);	
		}
	}

	for (let j = 0; j < validSalmonTiles.length; j++) {

		potentialSalmonTokenIDs = [];

		if(usedSalmonTokenIDs.indexOf(validSalmonTiles[j]) == -1) {

			let potentialNeighbourSalmon = searchNeighbourTilesForWildlife(validSalmonTiles[j], 'salmon');
			let confirmedNeighbourSalmon = [];
			
			for (let k = 0; k < potentialNeighbourSalmon.length; k++) {
				if(usedSalmonTokenIDs.indexOf(potentialNeighbourSalmon[k]) == -1) {
					confirmedNeighbourSalmon.push(potentialNeighbourSalmon[k]);
				}
			}
	
			if(confirmedNeighbourSalmon.length == 2) {
				let tilesToCheck = [validSalmonTiles[j]];
				tilesToCheck.push(...confirmedNeighbourSalmon);
	
				let firstNeighbourTiles = neighbourTileIDs(confirmedNeighbourSalmon[0]);
				let secondNeighbourTiles = neighbourTileIDs(confirmedNeighbourSalmon[1]);
	
				if(firstNeighbourTiles.indexOf(confirmedNeighbourSalmon[1]) === -1 && secondNeighbourTiles.indexOf(confirmedNeighbourSalmon[0]) === -1) {
					// perform a run forwards and backwards!!
					let forwardsAndBackwardsSalmonRunIDs = forwardsAndBackwardsSalmonRun(validSalmonTiles[j], confirmedNeighbourSalmon);
	
					potentialSalmonTokenIDs.push(...forwardsAndBackwardsSalmonRunIDs);
						
				} else {
					// since all tokens with 3 or more neighbours have been removed - if this criteria of the loop is met it HAS to be a valid triangle formation
					potentialSalmonTokenIDs.push(...tilesToCheck);
					usedSalmonTokenIDs.push(...tilesToCheck);	
				}
				
			} else if(confirmedNeighbourSalmon.length < 2) {
				potentialSalmonTokenIDs.push(validSalmonTiles[j]);
				let salmonRunIDs = salmonTokensInRun(validSalmonTiles[j], 'salmon');
				potentialSalmonTokenIDs.push(...salmonRunIDs);
	
			}
			confirmedSalmonRuns.push(potentialSalmonTokenIDs);
		}
	}

	confirmedSalmonRuns.sort(function (a, b) {
		return b.length - a.length;
	});

	for (let i = 0; i < confirmedSalmonRuns.length; i++) {
		let uniqueSalmonIDs = confirmedSalmonRuns[i].filter(onlyUnique);
		let salmonInRunNum = uniqueSalmonIDs.length;
		if(salmonInRunNum > 7) salmonInRunNum = 7;
		result += salmonScoringValues[salmonInRunNum];
	}
	return result;
}

let currentSalmonRunIDs = [];
let forwardsAndBackwardsSalmonRunIDs = [];

function forwardsAndBackwardsSalmonRun(firstTile, startingTiles){
	forwardsAndBackwardsSalmonRunIDs = [];
	
	let nextWildlifeToken = '';
	
	forwardsAndBackwardsSalmonRunIDs = [firstTile];
	usedSalmonTokenIDs.push(firstTile);	
	
	for (let i = 0; i < startingTiles.length; i++) {

		let nextTokenID = startingTiles[i];
		forwardsAndBackwardsSalmonRunIDs.push(startingTiles[i]);
		usedSalmonTokenIDs.push(startingTiles[i]);	

		let forwardsBackwardsSalmonRunEnded = false;

		while (!forwardsBackwardsSalmonRunEnded) {

			let result = searchNeighbourTilesForWildlife(nextTokenID, 'salmon');

			for (let i = result.length - 1; i >= 0; i--) {
				// Because the previous tile in the run would also be included as part of this function - we can go ahead and remove it
				if(usedSalmonTokenIDs.indexOf(result[i]) !== -1) {
					result.splice(i,1);
				}
			}
			if(result.length == 1) {
				forwardsAndBackwardsSalmonRunIDs.push(result[0]);
				usedSalmonTokenIDs.push(result[0]);
				nextTokenID = result[0];
			} else {
				forwardsBackwardsSalmonRunEnded = true;
			}

		}
	}
	return forwardsAndBackwardsSalmonRunIDs;
}

function salmonTokensInRun(startID, thisWildlife) {
	
	currentSalmonRunIDs = []

	let nextWildlifeToken = '';
	let nextTokenID = startID;

	currentSalmonRunIDs = [startID];
	usedSalmonTokenIDs.push(startID);	

	let salmonRunEnded = false;

	while (!salmonRunEnded) {

		let result = searchNeighbourTilesForWildlife(nextTokenID, thisWildlife);

		for (let i = result.length - 1; i >= 0; i--) {
			// Because the previous tile in the run would also be included as part of this function - we can go ahead and remove it
			if(usedSalmonTokenIDs.indexOf(result[i]) !== -1) {
				result.splice(i,1);
			}
		}

		if(result.length == 1) {
			currentSalmonRunIDs.push(result[0]);
			usedSalmonTokenIDs.push(result[0]);
			nextTokenID = result[0];
		} else {
			salmonRunEnded = true;
		}
	}

	return currentSalmonRunIDs;
}
