// the purpose of this class is to mediate the behaviors of `GameData` and `GameView`
class BlackJackGame {


    startblackjack() {
        this.blackJackGameData = new BlackJackGameStateLogger();
        this.blackJackGameDataView = new BlackJackGameView(this.blackJackGameData);

        this.blackJackGameDataView.createPlayersView();
        this.blackJackGameData.play();
        this.blackJackGameDataView.clearGameOptions();
        this.blackJackGameDataView.setNumberOfCardsOnScreen();
        this.blackJackGameDataView.setActiveOnCurrentPlayer();
    }

    hit() {
        if( !this.blackJackGameData.isCurrentPlayerDealer()||(this.blackJackGameData.isCurrentPlayerDealer() && this.blackJackGameData.getCurrentPlayer().getHandTotal() <=16)) {
            this.blackJackGameData.hit();
        }
        this.blackJackGameDataView.updatePoints();
        this.blackJackGameDataView.setNumberOfCardsOnScreen();
        this.blackJackGameDataView.checkAndUpdateWinner();
        this.blackJackGameDataView.setActiveOnCurrentPlayer();
    }

    stay() {
        this.blackJackGameDataView.removeActiveOnCurrentPlayer();
        this.blackJackGameData.setCurrentPlayer();
        this.blackJackGameDataView.setActiveOnCurrentPlayer();
        if(this.blackJackGameData.isCurrentPlayerDealer()) {
            this.blackJackGameDataView.checkAndUpdateWinner();
        }
    }
}