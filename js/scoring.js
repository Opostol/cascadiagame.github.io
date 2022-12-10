
function calculateBearTokenScoring() {

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

let allElkTokens = [];
let usedElkTokenIDs = [];
let potentialElkLines = [];
let confirmedElkLines = [];

let potentialElkLineStartingTokens = {
	'E': [],
	'SE': [],
	'SW': []
}

let elkScoringValues = {
	'1': 2,
	'2': 5,
	'3': 9,
	'4': 13
}

function calculateElkTokenScoring() {
	let result = 0;
	const tokenIDs = Object.keys(allPlacedTokens);
	for (const tokenID of tokenIDs) {
		if(allPlacedTokens[tokenID] == 'elk') {
			allElkTokens.push(tokenID);
		}
	}
	

	if(allElkTokens.length != 0) {
		if(allElkTokens.length == 1) {
			usedElkTokenIDs.push(allElkTokens[0]);			
			confirmedElkLines.push(allElkTokens);
		} else {
			generateAllElkLines();
		}
	}

	if(confirmedElkLines.length > 0) {
		confirmedElkLines.sort(function (a, b) {
			return b.length - a.length;
		});

		for (let i = 0; i < confirmedElkLines.length; i++) {		
			
			let elkInLineNum = confirmedElkLines[i].length;
			result += elkScoringValues[elkInLineNum];
		}
	}
	return result;
}

let sharedElkTokenIDs = {};
let allLineDetails = {};

function generateAllElkLines(){

	// first remove all elk tokens just by themselves

	for (let i = allElkTokens.length - 1; i >= 0; i--) {

		let neighbouringElk = searchNeighbourTilesForWildlife(allElkTokens[i], 'elk');

		// no neibouring elk means the token is just by itself
		// add it as a separate run and add it's ID to the used tokens pool - also removing it from the allTokens variable
		if(neighbouringElk.length == 0) {			
			confirmedElkLines.push([allElkTokens[i]]);
			usedElkTokenIDs.push(allElkTokens[i]);			
			allElkTokens.splice(i,1);
		}
	}

	for (let i = 0; i < allElkTokens.length; i++) {
		let validStartingLineDirection = []
		validStartingLineDirection = checkValidStartingElkToken(allElkTokens[i]);
		if(validStartingLineDirection.length != 0) {
			for (let j = 0; j < validStartingLineDirection.length; j++) {				
				potentialElkLineStartingTokens[validStartingLineDirection[j]].push(allElkTokens[i]);
			}
		}
	}
		
	const allDirections = Object.keys(potentialElkLineStartingTokens);
	for (const currentDirection of allDirections) {
		for (let i = 0; i < potentialElkLineStartingTokens[currentDirection].length; i++) {
			let currentPotentialElkLine = [];
			currentPotentialElkLine = allElkTokensInLine(potentialElkLineStartingTokens[currentDirection][i], currentDirection);						
			potentialElkLines.push(currentPotentialElkLine);
		}
	}

	potentialElkLines.sort(function (a, b) {
		return b.length - a.length;
	});

	// Now check to see if the potential lines have any shared neighbours or not

	let checkedIndexCombos = [];
	let allSharedElkTokenLineNums = [];

	for (let i = potentialElkLines.length - 1; i >= 0; i--) {
		allLineDetails['line' + (i + 1)] = [...potentialElkLines[i]];
		for (let j = 0; j < potentialElkLines.length; j++) {
			let thisIndexCombo = `${i}-${j}`;
			let altIndexCombo = `${j}-${i}`;
						
			if(checkedIndexCombos.indexOf(thisIndexCombo) == -1 && checkedIndexCombos.indexOf(altIndexCombo) == -1 && i != j) {				
								
				checkedIndexCombos.push(thisIndexCombo);
				let sharedElkTokenDetected = false;
				sharedElkTokenDetected = potentialElkLines[i].some(r=> potentialElkLines[j].indexOf(r) >= 0);
				
				if(sharedElkTokenDetected)  {

					let matchedLineOne = `line${i + 1}`;
					let matchedLineTwo = `line${j + 1}`;

					allSharedElkTokenLineNums.push(matchedLineOne, matchedLineTwo);

					let thisSharedTile = returnDuplicates(potentialElkLines[i], potentialElkLines[j]);

					if(!sharedElkTokenIDs.hasOwnProperty(thisSharedTile)) {
						sharedElkTokenIDs[thisSharedTile] = {
							includedLines: []
						}
					}

					if(sharedElkTokenIDs[thisSharedTile].includedLines.indexOf(matchedLineOne) === -1) {						
						sharedElkTokenIDs[thisSharedTile].includedLines.push(matchedLineOne);
					}

					if(sharedElkTokenIDs[thisSharedTile].includedLines.indexOf(matchedLineTwo) === -1) {						
						sharedElkTokenIDs[thisSharedTile].includedLines.push(matchedLineTwo);
					}
				}
			}
		}
	}

	// let allSharedElkTokenLineNums = [];

	let sharedElkTokenLineNums = allSharedElkTokenLineNums.filter(onlyUnique);
	if(sharedElkTokenLineNums.length == 0) {
		for (let i = 0; i < potentialElkLines.length; i++) {
			processStandaloneElkLine(potentialElkLines[i]);
		}
	} else {

		if(sharedElkTokenLineNums.length != potentialElkLines.length) {
			sharedElkTokenLineNums.sort((a, b) => a - b);
			let sharedTilesLinesCombo = []
			const allLinesNum = Object.keys(allLineDetails);
			for (const thisLineNum of allLinesNum) {
				if(sharedElkTokenLineNums.indexOf(thisLineNum) == -1) {
					processStandaloneElkLine(allLineDetails[thisLineNum]);
					delete allLineDetails[thisLineNum];
				}
			}
		}

		let sharedTilesLinesCombo = []
		const allSharedTiles = Object.keys(sharedElkTokenIDs);
	
		for (const sharedTile of allSharedTiles) {
			let currentArray = [];
			for (let i = 0; i < sharedElkTokenIDs[sharedTile].includedLines.length; i++) {
							
				let sharedElkTokenIDsClone = sharedElkTokenIDs[sharedTile].includedLines.slice();
				sharedElkTokenIDsClone.splice(i,1);
							
				let matchedLinesConvertedToText = '';
				for (let j = 0; j < sharedElkTokenIDsClone.length; j++) {
					matchedLinesConvertedToText += sharedElkTokenIDsClone[j];
					if((j + 1) != sharedElkTokenIDsClone.length) {
						matchedLinesConvertedToText += '-';
					}
				}
				currentArray.push(`${matchedLinesConvertedToText}_${sharedTile}`);
			}
			sharedTilesLinesCombo.push(currentArray);
		}
			
		let allTileCombinations = allPossibleCases(sharedTilesLinesCombo);		
	
		let allPotentialLineCombinations = [];
		let allPotentialLineCombinationsScores = [];
	
		for (let i = 0; i < allTileCombinations.length; i++) {
			let copyOfLines = JSON.parse(JSON.stringify(allLineDetails));
			let thisTileCombination = allTileCombinations[i].split(' ');
			let currentLineCombination = [];
	
			for (let j = 0; j < thisTileCombination.length; j++) {
							
				let splitTileCombination = thisTileCombination[j].split('_');
				let linesToBeExcludedUnsplit = splitTileCombination[0].toString();
				let linesToBeExcluded = linesToBeExcludedUnsplit.split('-');
				let tileToRemove = splitTileCombination[1].toString();
				
				for (let k = 0; k < linesToBeExcluded.length; k++) {
					let thisLine = linesToBeExcluded[k].toString();
					let tileIndex = copyOfLines[thisLine].indexOf(tileToRemove);
								
					copyOfLines[thisLine][tileIndex] = 'undefined';
				}
			}
	
			let currentLineVariations = [];
			const allLines = Object.keys(copyOfLines);
			
			for (const thisLine of allLines) {
		
				let currentLineGroup = [];
				currentLineGroup[0] = [];
	
				for (let k = 0, l = 0; k < copyOfLines[thisLine].length; k++) {
					if(copyOfLines[thisLine][k] != 'undefined') {
						if(currentLineGroup[l].length == 4) {
							l++;
							currentLineGroup[l] = [];
						}
						currentLineGroup[l].push(copyOfLines[thisLine][k]);
					} else {
						if(currentLineGroup[l].length > 0) {
							l++;
							currentLineGroup[l] = [];
						}
					}
				}
	
				if(currentLineGroup.length != 0) {
					for (let l = currentLineGroup.length - 1; l >= 0; l--) {
						if(currentLineGroup[l].length == 0) {
							currentLineGroup.splice(l,1);
						}
					}			
										
					currentLineVariations.push(...currentLineGroup);
				}
			}
	
			let currentLineVariationScore = 0;
	
			for (let m = 0; m < currentLineVariations.length; m++) {
				currentLineVariationScore += elkScoringValues[currentLineVariations[m].length];
			}
	
			allPotentialLineCombinations.push(currentLineVariations);
			allPotentialLineCombinationsScores.push(currentLineVariationScore);
	
		} 
	
		let highestScoreIndex = indexOfMax(allPotentialLineCombinationsScores);
		confirmedElkLines.push(...allPotentialLineCombinations[highestScoreIndex]);

	}
}

function processStandaloneElkLine(thisElkLine) {

	if(thisElkLine.length <= 4) {
		confirmedElkLines.push(thisElkLine);
		usedElkTokenIDs.push(...thisElkLine);
	} else {
		var i,j,temparray,chunk = 4;
		for (i=0,j=thisElkLine.length; i<j; i+=chunk) {
			temparray = thisElkLine.slice(i,i+chunk);
			confirmedElkLines.push(temparray);
			usedElkTokenIDs.push(...temparray);
		}
	}

}

function checkValidStartingElkToken(thisID){
	

	let blankSides = [0, 4, 5];
	let lineCheckSides = [3, 1, 2];

	let validElkLineDirections = [];

	let splitTileID = thisID.split('-');

	let thisRow = parseInt(splitTileID[1]);
	let thisColumn = parseInt(splitTileID[3]);

	let rowColMapSet = thisRow % 2;
	if(rowColMapSet != 0) rowColMapSet = 1;

	for (let i = 0; i < blankSides.length; i++) {

		let thisDirection = linkedTileSides[blankSides[i]].direction;
		let thisOppositeDirection = linkedTileSides[lineCheckSides[i]].direction;

		let precedingRow = thisRow + linkedTileSides[blankSides[i]].rowColMapping[rowColMapSet].rowDif;				
		let precedingColumn = thisColumn + linkedTileSides[blankSides[i]].rowColMapping[rowColMapSet].colDif;				
		let precedingTileID = 'row-' + precedingRow + '-column-' + precedingColumn;

		let followingRow = thisRow + linkedTileSides[lineCheckSides[i]].rowColMapping[rowColMapSet].rowDif;				
		let followingColumn = thisColumn + linkedTileSides[lineCheckSides[i]].rowColMapping[rowColMapSet].colDif;				
		let followingTileID = 'row-' + followingRow + '-column-' + followingColumn;

		let validPrecedingTile = false;
		let validFollowingTile = false;

		if(allPlacedTokens.hasOwnProperty(precedingTileID)) {
			if(allPlacedTokens[precedingTileID] != 'elk') {				
				validPrecedingTile = true;
			}

		} else {
			validPrecedingTile = true;
		}

		if(allPlacedTokens.hasOwnProperty(followingTileID)) {	
			if(allPlacedTokens[followingTileID] == 'elk') {				
				validFollowingTile = true;
			}
		}

		if(validPrecedingTile && validFollowingTile) {			
			validElkLineDirections.push(thisOppositeDirection)
		}

	}
		
	if(validElkLineDirections.length != 0) {
		return validElkLineDirections;
	} else {
		return false;
	}
}

function allElkTokensInLine(startID, thisDirection) {
	

	let matchedLineIDs = [startID];

	let lastTokenID = startID;
	let nextTokenID = '';

	let lineExhausted = false;
	let elkLineLimit = 0;

	while (!lineExhausted) {
		nextTokenID = nextElkTokenInDirection(lastTokenID, thisDirection);		
		if(nextTokenID) {
			matchedLineIDs.push(nextTokenID);
			elkLineLimit++;
			lastTokenID = nextTokenID;
		} else {			
			lineExhausted = true;
		}
	}

	if(matchedLineIDs.length > 0) {
		for (let i = 0; i < matchedLineIDs.length; i++) {
			const element = matchedLineIDs[i];			
		}
	}

	return matchedLineIDs;
}


function getOppositeDirection(thisDirection) {
	let obj = arr.find(o => o.direction === thisDirection);
	return obj.oppositeDirection;
}

function calculateFoxTokenScoring() {
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
