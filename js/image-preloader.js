function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
}

preload([
    'img/scoring/bearScore.jpg',
    'img/scoring/elkScore.jpg',
    'img/scoring/foxScore.jpg',
    'img/scoring/hawkScore.jpg',
    'img/scoring/salmonScore.jpg',
    'img/scoring/full-scoring-table.jpg',    
    'img/scoring-goals/bear-small.jpg',  
    'img/scoring-goals/bear-small1.jpg',
    'img/scoring-goals/bear-large.jpg',
    'img/scoring-goals/bear-large1.jpg',
    'img/scoring-goals/bear-mobile-end-scoring.jpg',    
    'img/scoring-goals/bear-thumbnail-desktop.jpg',    
    'img/scoring-goals/bear-thumbnail-desktop1.jpg',    
    'img/scoring-goals/bear-thumbnail-tablet-mobile.jpg',
    'img/scoring-goals/bear-thumbnail-tablet-mobile1.jpg',
    'img/scoring-goals/elk-small.jpg',
    'img/scoring-goals/elk-large.jpg',
    'img/scoring-goals/elk-mobile-end-scoring.jpg',    
    'img/scoring-goals/elk-thumbnail-desktop.jpg',    
    'img/scoring-goals/elk-thumbnail-tablet-mobile.jpg',
    'img/scoring-goals/fox-small.jpg',
    'img/scoring-goals/fox-large.jpg',
    'img/scoring-goals/fox-mobile-end-scoring.jpg',    
    'img/scoring-goals/fox-thumbnail-desktop.jpg',    
    'img/scoring-goals/fox-thumbnail-tablet-mobile.jpg',
    'img/scoring-goals/hawk-small.jpg',
    'img/scoring-goals/hawk-large.jpg',
    'img/scoring-goals/hawk-mobile-end-scoring.jpg',    
    'img/scoring-goals/hawk-thumbnail-desktop.jpg',    
    'img/scoring-goals/hawk-thumbnail-tablet-mobile.jpg',
    'img/scoring-goals/salmon-small.jpg',
    'img/scoring-goals/salmon-large.jpg',
    'img/scoring-goals/salmon-mobile-end-scoring.jpg',    
    'img/scoring-goals/salmon-thumbnail-desktop.jpg',    
    'img/scoring-goals/salmon-thumbnail-tablet-mobile.jpg',
    'img/tiles/desert.png',
    'img/tiles/desert+lake.png',
    'img/tiles/desert+swamp.png',
    'img/tiles/forest.png',
    'img/tiles/forest+desert.png',
    'img/tiles/forest+lake.png',
    'img/tiles/forest+swamp.png',
    'img/tiles/lake.png',
    'img/tiles/lake+mountain.png',
    'img/tiles/mountain.png',
    'img/tiles/mountain+desert.png',
    'img/tiles/mountain+forest.png',
    'img/tiles/mountain+swamp.png',
    'img/tiles/swamp.png',
    'img/tiles/swamp+lake.png',
    'img/tokens/bear.png',
    'img/tokens/bearActive.png',
    'img/tokens/bearInactive.png',
    'img/tokens/elk.png',
    'img/tokens/elkActive.png',
    'img/tokens/elkInactive.png',
    'img/tokens/fox.png',
    'img/tokens/foxActive.png',
    'img/tokens/foxInactive.png',
    'img/tokens/hawk.png',
    'img/tokens/hawkActive.png',
    'img/tokens/hawkInactive.png',
    'img/tokens/salmon.png',
    'img/tokens/salmonActive.png',
    'img/tokens/salmonInactive.png',
    'img/tokens/nature-token.png',
    'img/arrow.png',
    'img/blank-map.jpg',
    'img/buttonBackground.jpg',
    'img/closed-yeti-hand-tile-removal.png',
    'img/closed-yeti-hand-token-removal.png',
    'img/cross.png',
    'img/keyboard-keys-move.png',
    'img/keyboard-keys-rotate.png',
    'img/kickstarter.jpg',
    'img/mobileScoringGoal-active.png',
    'img/mobileScoringGoal-hover.png',
    'img/mobileScoringGoal-transparentLayer.png',
    'img/open-yeti-hand-tile-removal.png',
    'img/open-yeti-hand-token-removal.png',
    'img/potentialPlacement.png',
    'img/removedTile.png',
    'img/scoringGoal-active.png',
    'img/scoringGoal-hover.png',
    'img/scoringGoal-transparentLayer.png',
    'img/selectedTile.png',
    'img/tileOutline.png',
    'img/tilePlacementCancel.png',
    'img/tilePlacementConfirm.png',
    'img/tilePlacementRotateClockwise.png',
    'img/tilePlacementRotateCounterClockwise.png',
    'img/tileTokenOutline.png',
    'img/title-endGame.png',
    'img/title-main.png',
    'img/title-mobile.png',
    'img/woodCircle.png',
    'img/zoomIn.png',
    'img/zoomIn-inactive.png',
    'img/zoomOut.png',
    'img/zoomOut-inactive.png'
]);