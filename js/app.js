var scores, roundScore, activePlayer, gamePlaying, modal, span, diceDOM;

modal = document.getElementById('myModal');
span = document.getElementsByClassName("close")[0];

modal.style.display = "block";

span.onclick = function() {
	modal.style.display = "none";
};

window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
};

init(); // Start the game

/**
 * Final Score Area
 */

var finalScore;
var input = document.getElementById("score");
input.addEventListener("keyup", function(event){
	if(event.keyCode === 13){
		finalScore = document.getElementById("score").value;
		if(finalScore === "") {
			finalScore = 100;
	}
		document.getElementById("score").style.display = "none";
		document.querySelector(".showScore").innerHTML = "<h2>Final Score: " + finalScore + "</h2>";
		document.querySelector(".showScore").style.display = "block";	
	}
});

/**
 * Roll Dice
 */

document.querySelector(".btn-roll").addEventListener("click", function() {
	if (gamePlaying && finalScore !== 0) {
		document.querySelector(".player-" + activePlayer + "-panel").classList.remove("shake");
		var dice = Math.floor(Math.random() * 6) + 1;
		/*Display the dice */
		diceDOM = document.querySelector(".dice");
		diceDOM.style.display = "block";
		diceDOM.src = "img/" + "dice-" + dice + '.png';
		diceDOM.alt = "dice-" + dice;
		if(dice > 1) {
			roundScore += dice;
			document.querySelector("#current-" + activePlayer).textContent = roundScore;
		} else {
			document.querySelector(".player-" + activePlayer + "-panel").classList.add("shake");
			nextPlayer();
		}
	}
});

/**
 * Hold
 */

document.querySelector(".btn-hold").addEventListener("click", function() {
	
	if(gamePlaying && finalScore !==0) {
		scores[activePlayer] += roundScore;
		
	document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

	// Check for Win
	if(scores[activePlayer] >=  finalScore) {
		document.querySelector("#name-" + activePlayer).textContent = "Winner!";
		document.querySelector(".dice").style.display = "none";
		document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
		document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
		gamePlaying = false;
	} else {
		nextPlayer();
	}
}
});

/**
 * Next Player DOM 
 */

function nextPlayer() {
	roundScore = 0;
	document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");	
	document.querySelector("#current-" + activePlayer).textContent = roundScore;
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		document.querySelector(".player-" + activePlayer + "-panel").classList.add("active");
		if(diceDOM.alt !== 'dice-1'){
		document.querySelector(".dice").style.display = "none";
		}
	}
	
	/**
	 * Restart 
	 * Call the init function.
	 */

	document.querySelector(".btn-new").addEventListener("click", init);

	/**
	 * Game Initiliazing 
	 */

	function init() {
		scores = [0, 0];
		roundScore = 0;
		activePlayer = 0;
		gamePlaying = true;
		finalScore = 0;
		if(finalScore === undefined) {
			finalScore = 0;
		}

		document.getElementById("score").style.display = "block";
		document.getElementById("score").value = "";
		document.querySelector(".showScore").style.display = "none";
		document.querySelector(".dice").style.display = "none";
		document.getElementById("score-0").textContent = "0";
		document.getElementById("score-1").textContent = "0"; 
		document.getElementById("current-0").textContent = "0"; 
		document.getElementById("current-1").textContent = "0";
		document.getElementById("name-0").textContent = "Player 1";
		document.getElementById("name-1").textContent = "Player 2";
		document.querySelector(".player-0-panel").classList.remove("winner");
		document.querySelector(".player-1-panel").classList.remove("winner");
		document.querySelector(".player-0-panel").classList.remove("active");
		document.querySelector(".player-0-panel").classList.add("active");
		document.querySelector(".player-1-panel").classList.remove("active");
	}