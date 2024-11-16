// the purpose of this class is to manipulate the DOM by evaluating the `Game` state
   class Player {
                constructor(name, cards) {
                    this.name = name;
                    this.cards = cards;
                }
            }

class BlackJackGameView {
    constructor(blackJackGameData) {
        this.blackJackGameData=blackJackGameData;
        document.getElementById("winner").style.display = "none";
    }

    clearGameOptions() {        
        document.getElementById("game-options").style.display = "";
    }


    createPlayersView() {
        const playersView = document.getElementById("players");
        // clear player's view
        playersView.innerHTML = "";

        // generate each player's view
        this.blackJackGameData.getPlayers().forEach(player => {
            const playerName = player.name;
            
            // create new web-elements for Player's view
            const div_player = document.createElement("div");
            const div_playerid = document.createElement("div");
            const div_hand = document.createElement("div");
            const div_points = document.createElement("div");

            // modify the state of newly created web-elements
            div_player.className = "player";
            div_points.className = "points";
            div_player.id = "player_" + playerName;
            div_points.id = "points_" + playerName;		
            div_hand.id = "hand_" + playerName;
            div_playerid.innerHTML = "Player " + playerName;

            // inject new web-elements into the DOM
            div_player.appendChild(div_playerid);
            div_player.appendChild(div_hand);
            div_player.appendChild(div_points);
            playersView.appendChild(div_player);
        });
    }

    updatePoints() {
        this.blackJackGameData.getPlayers().forEach(player => {
            const playerName = player.name;
            const points = player.getHandTotal();
            player.viewHand();
            document.getElementById("points_" + playerName).innerHTML = points;
        })
    }


    setNumberOfCardsOnScreen() {
        const deck = this.blackJackGameData.getDeck();
        const cards = deck.cards;
        const numberOfCards = cards.length;

        document.getElementById("deckcount").innerHTML = numberOfCards;
    }


    getWinner() {
        const player = this.blackJackGameData.getPlayer();
        const dealer = this.blackJackGameData.getDealer();
        const didPlayerBust = player.getHandTotal() > 21;
        const didDealerBust = dealer.getHandTotal() > 21;
        const didPlayerHave21 = player.getHandTotal() == 21;
        const didDealerHave21 = dealer.getHandTotal() == 21;
        const didPlayerWin = didPlayerHave21;
        return didPlayerWin ? player : dealer;
    }


    getLoser() {
        const player = this.blackJackGameData.getPlayer();
        const dealer = this.blackJackGameData.getDealer();
        const playerHand = player.getHandTotal();
        const dealerHand = dealer.getHandTotal();
        const didPlayerBust = playerHand > 21;
        const didDealerBust = dealerHand > 21;
        const didPlayerHave21 = playerHand == 21;
        const didDealerHave21 = dealerHand == 21;
        const playerWins = didPlayerHave21 || (didDealerBust && !didPlayerBust);
        if(!playerWins) {
            const dealerDelta = 21 - dealerHand;
            const playerDelta = 21 - playerHand;
            return dealerDelta < playerDelta ? dealer : player;
        }
        return playerWins ?  dealer : player;
    }

    checkAndUpdateWinner() {
        const winnerElement = document.getElementById("winner");
        winnerElement.innerHTML = this.getLoser() + " LOST";
        winnerElement.style.display = "inline-block";
        this.endGame()
    }

    endGame() {
        console.log("inside endgame method")
        document.getElementById("game-options").style.display = "none";
        document.getElementById("winner").innerHTML = "Winner: Player " + this.getWinner().name;
        document.getElementById("winner").style.display = "inline-block";

        console.log("dealer cards is::: " + this.blackJackGameData.getPlayers() + "\n deck : " + this.blackJackGameData.getDeck())
        this.create(this.blackJackGameData.getDealer());
    }

    removeActiveOnCurrentPlayer() {
        // remove active on current player
        const currentPlayer = this.blackJackGameData.getCurrentPlayer();
        const currentPlayerName = currentPlayer.name;
        const elementId = "player_" + currentPlayerName;        
        document.getElementById(elementId).classList.remove("active");
    }

    setActiveOnCurrentPlayer() {
        // add active on newly current player
        const currentPlayer = this.blackJackGameData.getCurrentPlayer();
        const currentPlayerName = currentPlayer.name;
        const elementId = "player_" + currentPlayerName;
        document.getElementById(elementId).classList.add("active");
    }


   create(player) {
        //  e.preventDefault();
          console.log("click")
          console.log("player card is :  " + player.cards)
          let name = player.name;
          let data= player.cards
          let jsonPlayer1 = new Player(name, data);
          let personData = JSON.stringify(jsonPlayer1);
          console.log("in create method: " + personData.data)

}
//          $.ajax({
//              type: "POST",
//              crossDomain: true,
//              headers: {
//                  'Accept': 'application/json',
//                  'Content-Type': 'application/json',
//                  'Access-Control-Allow-Origin': '*'
//              },
//              url: "/player-controller/create",
//              data: personData,
//              dataType: "JSON ",
//              success: function (response) {
//                  alert(JSON.stringify(response));
//              },
//              error: function () {
//                  alert('Error while request..');
//              }
//          });


}