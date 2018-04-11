var scores, roundScore, activePlayer, gamePlaying, modal, span;

modal = document.getElementById('myModal');
span = document.getElementsByClassName("close")[0];

modal.style.display = "block";

span.onclick = function() {
	modal.style.display = "none";
}

window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}

init();

var myValue;
var input = document.getElementById("score");
input.addEventListener("keyup", function(event){
	if(event.keyCode === 13){
		myValue = document.getElementById("score").value;
		if(myValue !== "") {
			document.getElementById("score").style.display = "none";
			document.querySelector(".showScore").innerHTML = "<h2>Final Score: " + myValue + "</h2>";
			document.querySelector(".showScore").style.display = "block";
		} else {
			myValue = 100;
			document.getElementById("score").style.display = "none";
			document.querySelector(".showScore").innerHTML = "<h2>Final Score: " + myValue + "</h2>";
			document.querySelector(".showScore").style.display = "block";
		}
	}
});

document.querySelector(".btn-roll").addEventListener("click", function() {
	if (gamePlaying) {

		var dice = Math.floor(Math.random() * 6) + 1;

		/*Display the result */

		var diceDOM = document.querySelector(".dice");
		diceDOM.style.display = "block";
		diceDOM.src = "dice-" + dice + '.png';

		if(dice > 1) {
			roundScore += dice;
			document.querySelector("#current-" + activePlayer).textContent = roundScore;
		} else {
			nextPlayer();
		}
	}

});

document.querySelector(".btn-hold").addEventListener("click", function() {
	
	if(gamePlaying) {

		scores[activePlayer] += roundScore;

	// Update the UI
	
	document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

	if(scores[activePlayer] >=  myValue) {
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

function nextPlayer() {
	roundScore = 0;
	document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
	document.querySelector("#current-" + activePlayer).textContent = roundScore;
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // Ternary
		document.querySelector(".player-" + activePlayer + "-panel").classList.add("active");
		document.querySelector(".dice").style.display = "none";
	}

	document.querySelector(".btn-new").addEventListener("click", init);

	function init() {
		scores = [0, 0];
		roundScore = 0;
		activePlayer = 0;
		gamePlaying = true;

		document.getElementById("score").style.display = "block";
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