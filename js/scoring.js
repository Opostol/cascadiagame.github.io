var scoringList = {
	bear: [
		{
			large: "img/scoring-goals/bear-large.jpg",
			small: "img/scoring-goals/bear-small.jpg",
			thumbnailsdesktop: "img/scoring-goals/bear-thumbnail-desktop.jpg",
			thumbnailsmobile: "img/scoring-goals/bear-thumbnail-tablet-mobile.jpg",
			tokenScoringDelegate: calculateBearTokenScoring0
		},
		{
			large: "img/scoring-goals/bear-large1.jpg",
			small: "img/scoring-goals/bear-small1.jpg",
			thumbnailsdesktop: "img/scoring-goals/bear-thumbnail-desktop1.jpg",
			thumbnailsmobile: "img/scoring-goals/bear-thumbnail-tablet-mobile1.jpg",
			tokenScoringDelegate: calculateBearTokenScoring1
		}
	],
	elk: [
		{
			large: "img/scoring-goals/elk-large.jpg",
			small: "img/scoring-goals/elk-small.jpg",
			thumbnailsdesktop: "img/scoring-goals/elk-thumbnail-desktop.jpg",
			thumbnailsmobile: "img/scoring-goals/elk-thumbnail-tablet-mobile.jpg",
			tokenScoringDelegate: calculateElkTokenScoring0
		}
	],
	fox: [
		{
			large: "img/scoring-goals/fox-large.jpg",
			small: "img/scoring-goals/fox-small.jpg",
			thumbnailsdesktop: "img/scoring-goals/fox-thumbnail-desktop.jpg",
			thumbnailsmobile: "img/scoring-goals/fox-thumbnail-tablet-mobile.jpg",
			tokenScoringDelegate: calculateFoxTokenScoring0
		}
	],
	hawk: [
		{
			large: "img/scoring-goals/hawk-large.jpg",
			small: "img/scoring-goals/hawk-small.jpg",
			thumbnailsdesktop: "img/scoring-goals/hawk-thumbnail-desktop.jpg",
			thumbnailsmobile: "img/scoring-goals/hawk-thumbnail-tablet-mobile.jpg",
			tokenScoringDelegate: calculateHawkTokenScoring0
		}
	],
	salmon: [
		{
			large: "img/scoring-goals/salmon-large.jpg",
			small: "img/scoring-goals/salmon-small.jpg",
			thumbnailsdesktop: "img/scoring-goals/salmon-thumbnail-desktop.jpg",
			thumbnailsmobile: "img/scoring-goals/salmon-thumbnail-tablet-mobile.jpg",
			tokenScoringDelegate: calculateSalmonTokenScoring0
		}
	]
};

let tokenScoring = {
	bear: {totalScore: 0, pickedScoring: 0},
	elk: {totalScore: 0, pickedScoring: 0},
	fox: {totalScore: 0, pickedScoring: 0},
	hawk: {totalScore: 0, pickedScoring: 0},
	salmon: {totalScore: 0, pickedScoring: 0}
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function randomizeScores() {
	tokenScoring.bear.pickedScoring = getRandomInt(scoringList.bear.length);
	tokenScoring.elk.pickedScoring = getRandomInt(scoringList.elk.length);
	tokenScoring.fox.pickedScoring = getRandomInt(scoringList.fox.length);
	tokenScoring.hawk.pickedScoring = getRandomInt(scoringList.hawk.length);
	tokenScoring.salmon.pickedScoring = getRandomInt(scoringList.salmon.length);
}

function setupScoringGoals() {
	
	$('#bear-showWildlifeScoringModal').attr('src', scoringList.bear[tokenScoring.bear.pickedScoring].small);
	$('#elk-showWildlifeScoringModal').attr('src', scoringList.elk[tokenScoring.elk.pickedScoring].small);
	$('#fox-showWildlifeScoringModal').attr('src', scoringList.fox[tokenScoring.fox.pickedScoring].small);
	$('#hawk-showWildlifeScoringModal').attr('src', scoringList.hawk[tokenScoring.hawk.pickedScoring].small);
	$('#salmon-showWildlifeScoringModal').attr('src', scoringList.salmon[tokenScoring.salmon.pickedScoring].small);

	$('#bear-FinalScoringModalTrigger .goalScoringThumbnail').attr('src', scoringList.bear[tokenScoring.bear.pickedScoring].thumbnailsdesktop);
	$('#elk-FinalScoringModalTrigger .goalScoringThumbnail').attr('src', scoringList.elk[tokenScoring.elk.pickedScoring].thumbnailsdesktop);
	$('#fox-FinalScoringModalTrigger .goalScoringThumbnail').attr('src', scoringList.fox[tokenScoring.fox.pickedScoring].thumbnailsdesktop);
	$('#hawk-FinalScoringModalTrigger .goalScoringThumbnail').attr('src', scoringList.hawk[tokenScoring.hawk.pickedScoring].thumbnailsdesktop);
	$('#salmon-FinalScoringModalTrigger .goalScoringThumbnail').attr('src', scoringList.salmon[tokenScoring.salmon.pickedScoring].thumbnailsdesktop);
	
	$('#bear-mobileFinalScoringModalTrigger .mobileGoalScoringThumbnail').attr('src', scoringList.bear[tokenScoring.bear.pickedScoring].thumbnailsmobile);
	$('#elk-mobileFinalScoringModalTrigger .mobileGoalScoringThumbnail').attr('src', scoringList.elk[tokenScoring.elk.pickedScoring].thumbnailsmobile);
	$('#fox-mobileFinalScoringModalTrigger .mobileGoalScoringThumbnail').attr('src', scoringList.fox[tokenScoring.fox.pickedScoring].thumbnailsmobile);
	$('#hawk-mobileFinalScoringModalTrigger .mobileGoalScoringThumbnail').attr('src', scoringList.hawk[tokenScoring.hawk.pickedScoring].thumbnailsmobile);
	$('#salmon-mobileFinalScoringModalTrigger .mobileGoalScoringThumbnail').attr('src', scoringList.salmon[tokenScoring.salmon.pickedScoring].thumbnailsmobile);

	$('#bear-ScoringModalTrigger .goalScoringThumbnail').attr('src', scoringList.bear[tokenScoring.bear.pickedScoring].thumbnailsdesktop);
	$('#elk-ScoringModalTrigger .goalScoringThumbnail').attr('src', scoringList.elk[tokenScoring.elk.pickedScoring].thumbnailsdesktop);
	$('#fox-ScoringModalTrigger .goalScoringThumbnail').attr('src', scoringList.fox[tokenScoring.fox.pickedScoring].thumbnailsdesktop);
	$('#hawk-ScoringModalTrigger .goalScoringThumbnail').attr('src', scoringList.hawk[tokenScoring.hawk.pickedScoring].thumbnailsdesktop);
	$('#salmon-ScoringModalTrigger .goalScoringThumbnail').attr('src', scoringList.salmon[tokenScoring.salmon.pickedScoring].thumbnailsdesktop);

	$('#quickViewTabletGoalLayerList li:nth-of-type(1) img').attr('src', scoringList.bear[tokenScoring.bear.pickedScoring].large);
	$('#quickViewTabletGoalLayerList li:nth-of-type(2) img').attr('src', scoringList.elk[tokenScoring.elk.pickedScoring].large);
	$('#quickViewTabletGoalLayerList li:nth-of-type(3) img').attr('src', scoringList.fox[tokenScoring.fox.pickedScoring].large);
	$('#quickViewTabletGoalLayerList li:nth-of-type(4) img').attr('src', scoringList.hawk[tokenScoring.hawk.pickedScoring].large);
	$('#quickViewTabletGoalLayerList li:nth-of-type(5) img').attr('src', scoringList.salmon[tokenScoring.salmon.pickedScoring].large);
	
	$('#quickViewGoalImg-bear').attr('src', scoringList.bear[tokenScoring.bear.pickedScoring].large);
	$('#quickViewGoalImg-elk').attr('src', scoringList.elk[tokenScoring.elk.pickedScoring].large);
	$('#quickViewGoalImg-fox').attr('src', scoringList.fox[tokenScoring.fox.pickedScoring].large);
	$('#quickViewGoalImg-hawk').attr('src', scoringList.hawk[tokenScoring.hawk.pickedScoring].large);
	$('#quickViewGoalImg-salmon').attr('src', scoringList.salmon[tokenScoring.salmon.pickedScoring].large);
	
	$('#bearScoringModal img').attr('src', scoringList.bear[tokenScoring.bear.pickedScoring].large);
	$('#elkScoringModal img').attr('src', scoringList.elk[tokenScoring.elk.pickedScoring].large);
	$('#foxScoringModal img').attr('src', scoringList.fox[tokenScoring.fox.pickedScoring].large);
	$('#hawkScoringModal img').attr('src', scoringList.hawk[tokenScoring.hawk.pickedScoring].large);
	$('#salmonScoringModal img').attr('src', scoringList.salmon[tokenScoring.salmon.pickedScoring].large);
	
	
}


function setupFinalScoring() {

	$('#natureTokensScoringInput').html(natureCubesNum);

	$('#mapHiddenOverlay .mapTileContainer .placedWildlifeToken').each(function(){
		let tokenWildlife = $(this).attr('wildlife');
		$(this).attr('src', `img/tokens/${tokenWildlife}.png`);
	})

	checkForBlanks();
	processPlacedTilesAndTokens();

	tokenScoring.bear.totalScore = scoringList.bear[tokenScoring.bear.pickedScoring].tokenScoringDelegate();
	tokenScoring.elk.totalScore = scoringList.elk[tokenScoring.elk.pickedScoring].tokenScoringDelegate();
	tokenScoring.fox.totalScore = scoringList.fox[tokenScoring.fox.pickedScoring].tokenScoringDelegate();
	tokenScoring.hawk.totalScore = scoringList.hawk[tokenScoring.hawk.pickedScoring].tokenScoringDelegate();
	tokenScoring.salmon.totalScore = scoringList.salmon[tokenScoring.salmon.pickedScoring].tokenScoringDelegate();

	const allWildlife = Object.keys(tokenScoring);

	for (const currentWildlife of allWildlife) {
		$('#wildlifeScoringTable.finalScoringTable .scoreCell #' + currentWildlife + '-wildlifeScoringInput').html(tokenScoring[currentWildlife].totalScore);

		$('#tileTokenContainer.finalScoring .finalScoringItem #' + currentWildlife + '-individualWildlifeScoringInput .individualPointsNum').html(tokenScoring[currentWildlife].totalScore);
		if(tokenScoring[currentWildlife].totalScore == 1) {
			$('#tileTokenContainer.finalScoring .finalScoringItem #' + currentWildlife + '-individualWildlifeScoringInput .pluralPoints').hide();
		} else {
			$('#tileTokenContainer.finalScoring .finalScoringItem #' + currentWildlife + '-individualWildlifeScoringInput .pluralPoints').show();
		}
		
	}

	updateAllSubtotals();
	
}

