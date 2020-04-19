// GAME CONTROLLER *******************************************************************************************
var gameController = (function() {

	var colours = ["#F4F307", "#0744F4", "#0EA412", "#F7200B", "#FB9805", "#9B13C7", "#92460A", "#979196", "#FD0484"];
	var text = ["yellow", "blue", "green", "orange", "purple", "grey", "brown", "red", "pink"];
	var colour;
	
	
	
		//Colour grid created
	
		//shuffle arrays
		function shuffleArray(array) {
			for (var i = array.length - 1; i > 0; i--) {
				var j = Math.floor(Math.random() * (i + 1));
				var temp = array[i];
				array[i] = array[j];
				array[j] = temp;
			}
		}
	
	
		function makeNewArray(array, array2) {
			var roundArray = [];
			for(var i = 0; i < array.length; i++) {
			roundArray.push( {
				name: array[i],
				colour: array2[i]		
			})	
			} return roundArray;
		}
	
	
		// Colour selected + Changed
		function chooseColour(){
				var i = randomNumber(colours);
				colour = colours[i];	
		}
	
		//set the colour name so can check if user clicks on correct answer
		function setColourName(colour){
			if(colour === "#F4F307") {
				colourName = "yellow"
			} else if(colour === "#0744F4") {
				colourName = "blue"
			} else if(colour === "#0EA412") {
				colourName = "green"
			} else if(colour === "#FB9805"){
				colourName = "orange"
			} else if(colour === "#9B13C7"){
				colourName = "purple";
			} else if(colour === "#979196"){
				colourName = "grey";
			} else if(colour === "#92460A"){
				colourName = "brown";
			} else if(colour === "#F7200B"){
				colourName = "red";
			} else if(colour === "#FD0484"){
				colourName = "pink";
			} return colourName;
		};
	
		function setTargetColour() {
			$("#colourbox").css("background-color", colour)
		}
	
		//create random number
		function randomNumber(array){
		return Math.floor(Math.random() * array.length);
		}
	
		//no of rounds updated
		function gameLength() {
		var selected = $("#length-select").find(":selected").text();
		if(selected === "Short (5 rounds)") {
		noOfRounds = 5;
		} else if(selected === "Medium (10 rounds)"){
		noOfRounds = 10;
		} else {
		noOfRounds = 15;
		}
		};
	
	
		//apply random colour and text
		function changeColour(array, array2) {
			array.forEach(function(value, i) {
				$("#" + i).css("color", value).text(array2[i])
			})
		};
	
	
	
		// Create round function 
	
		return {
			mixColourGrid: function() {
				shuffleArray(colours);
				shuffleArray(text);
				return makeNewArray(text, colours);
			},
			applyMixedGrid: function() {
				changeColour(colours, text);
			},
			pickColour: function() {
				var i = randomNumber(colours);
				return colours[i];
			},
			noOfRounds: function() {
				return gameLength();
			},
			pickRoundColour: function() {
				return chooseColour();
			},
			targetColour: function() {
				setTargetColour();
			},
			targetColourName: function() {
				return setColourName(colour);
			}
	
		}
	
	})();
	
	
	// USER INTERFACE CONTROLLER **********************************************************************************************************
	var userInterfaceController = (function() {
	
		var colourGrid = $("#bottom-game-display");
		var initialDisplay = $(".initial-display")
				
	
		//Colour grid shows
		function displayGrid(){
			$(colourGrid).removeClass("displayNone")
			$(initialDisplay).css({"display": "none"});
		}
	
		function noGrid() {
			$(colourGrid).addClass("displayNone")
		}
	
		function noSelector() {
			$("#selector > label").addClass("displayNone");
			$("#selector > select").addClass("displayNone");
		}
	
		function noRules() {
			$(".rules").addClass("displayNone");
		}
	
		function displayTimer() {
			$("#timer").removeClass("displayNone");
		}
	
		function noTimer() {
			$("#timer").addClass("displayNone");
		}
	
		function displayScore() {
			$("#score-to-beat").removeClass("displayNone")
			$("#target").css({"color": "inherit"})
		}
	
		function noScore() {
			$("#score-to-beat").addClass("displayNone")
		}
	
		function noPlayBTN() {
			$("#play-btn").css({"display":"none"});
		}
		function displayTargetColour() {
			$("#colourbox").removeClass("displayNone");
			$(".colourbox-container").css({"display":"flex"})
		}
		function noTargetColour() {
			// $("#colourbox").addClass("displayNone");
			$("#colourbox").css({"background-color":"black"})
		}
	
		function dispChangePlayerMsg() {
			$(".change-player-message").css({"display": "flex"});

		}
		function noChangePlayerMsg() {
			$(".change-player-message").css({"display": "none"});
		}
	
	
		return {
			showGrid: function() {
				displayGrid();
			},
			hideGrid: function() {
				noGrid();
			},
			hideSelector: function() {
				noSelector();
			},
			hideRules: function() {
				noRules();
			},
			showTimer: function() {
				displayTimer();
			},
			hideTimer: function() {
				noTimer();
			},
			showScore: function() {
				displayScore();
			},
			hideScore: function() {
				noScore();
			},
			hidePlayBTN: function() {
				noPlayBTN();
			},
			showTargetColour: function() {
				displayTargetColour();
			},
			hideTargetColour: function() {
				noTargetColour();
			},
			addPlayer1Score: function(id, time) { 
				$(id).text(time);
			},
			showChangePlayerMsg: function() {
				dispChangePlayerMsg();
				$("#player-1-score").text(player1Time)	
			},
			hideChangePlayerMsg: function() {
				noChangePlayerMsg();
			},
			showGameOver: function(player1Time, player2Time) {
				$(".game-over-display").removeClass("displayNone");
				if(player1Time < player2Time) {
					if(player2Time - player1Time === 1) {
						$("#winner").text("Player one wins by " + (player2Time - player1Time) + " second!")
					} else {
						$("#winner").text("Player one wins by " + (player2Time - player1Time) + " seconds!")
					}
				} else if(player2Time < player1Time){
					if(player1Time - player2Time === 1) {
						$("#winner").text("Player two wins by " + (player1Time - player2Time) + " second!")
					} else {
						$("#winner").text("Player two wins by " + (player1Time - player2Time) + " seconds!")
					}
				} else {
					$("#winner").text("It's a draw folks!")
			}
				// $("#player-1-score").text(player1Time)
				// $("#player-2-score").text(player2Time)
			}
		}
	
	})();
	
	
	// GLOBAL APP CONTROLLER **************************************************************************************************************
	var controller = (function(gmCtrl, UICtrl) {
	
		var wrongAnswers = 0;
		var round = 0;
		var player1Time;
		var player2Time;
		var startTime;
		var endTime;
		var numberOfRounds;
	
		function timer() {
			startTime = $.now();
			var i = 1;
			interval = setInterval(function () {
				$("#timer").html(i + "s");
				i++;
				}, 1000);
	/*		$("#play2").on("click", function() {
				i = 0;
			})*/
		};
		
		function getTime(){
			return Math.floor((endTime - startTime)/1000);
		}
	
	
		function checkAnswer(i){
			if($(i).text() !== colourName){
				wrongAnswers += 1;
			} 
		}
		
		function newRound(){
				//randomise grid
				gmCtrl.mixColourGrid();
				gmCtrl.applyMixedGrid();
				//choose and show round coloour
				gmCtrl.pickRoundColour();
				colour = gmCtrl.targetColour();
				colourName = gmCtrl.targetColourName();
				UICtrl.showTargetColour();
		}
	
		function addEventListeners(id) {
		$(id).on("click", function() {
			checkAnswer(id);
			newRound();
			round += 1;
			if(round === noOfRounds) {
				endTime = $.now();
				if(player1Time) {
					player2Time = getTime() + (wrongAnswers * 5);
					clearInterval(interval);
					gameOver();
				} else {
					player1Time = getTime() + (wrongAnswers * 5);
					clearInterval(interval);
					UICtrl.addPlayer1Score("#player-1-score", player1Time)
					changePlayer();
	
					//changePlayer();
				}		
			}
			});
		}
	
	
		//GAME OVER FUNCTION
		function gameOver() {
			// colour-grid + displayNone
			UICtrl.hideGrid();
			// timer + displayNone
			UICtrl.hideTimer();
			// score-to-beat + displayNone
			UICtrl.hideScore();
			//hide colour-box
			UICtrl.hideTargetColour();
			// end of game message show
			UICtrl.showGameOver(player1Time, player2Time);
			//add event listener on play again btn
			$("#play-again-btn").on("click", function() {
				location.reload();
			});
	
	
		}
		
		
		// !!!end of player 1 go function!!!!
		function changePlayer() {
			// colour-grid + displayNone
			UICtrl.hideGrid();
			// timer + displayNone
			UICtrl.hideTimer();
			// score-to-beat + displayNone
			UICtrl.hideScore();
			//hide colour-box
			UICtrl.hideTargetColour();
			// end of player 1 html - displayNone
			UICtrl.showChangePlayerMsg();
			// show player 2 start button
			UICtrl.showBtn2();
			// change html to show player 1 time
			UICtrl.addPlayer1Score("#player-1-time", player1Time);
		}	
		
	
		return {
			
			//add event listener to play button
			initiate: function() {
	
				$("#play-btn").on("click", function() {
					//hide rules, selector
					UICtrl.hideRules();
					UICtrl.hideSelector();
					//randomise grid
					gmCtrl.mixColourGrid();
					gmCtrl.applyMixedGrid();
					//display grid (randomised)
					UICtrl.showGrid();
					//display score + timer	
					UICtrl.showScore();
					UICtrl.showTimer();
					//hide play btn
					UICtrl.hidePlayBTN();
					//choose and show round coloour
					gmCtrl.pickRoundColour();
					colour = gmCtrl.targetColour();
					colourName = gmCtrl.targetColourName();
					UICtrl.showTargetColour();
					//start timer
					timer();
					//game length?
					gmCtrl.noOfRounds();
	
	
			})
	
				$("#play2Btn").on("click", function() {
					// set round, start time, end time, and wrong answers to 0 
					wrongAnswers = 0;
					round = 0;
					startTime = 0;
					endTime = 0;
					//timer
					timer();
					//new round
					newRound();
					//display target colour
					UICtrl.showTargetColour();
					//display timer
					UICtrl.showTimer();
					//display score to beat
					UICtrl.showScore()
					if (player1Time) {
						$('#player1score').text(player1Time)
					};
					//display grid
					UICtrl.showGrid();
					//hide change player msg
					UICtrl.hideChangePlayerMsg();
	
	
				})
	
				addEventListeners("#0");
				addEventListeners("#1");
				addEventListeners("#2");
				addEventListeners("#3");
				addEventListeners("#4");
				addEventListeners("#5");
				addEventListeners("#6");
				addEventListeners("#7");
				addEventListeners("#8");
			},
	
	
		}
	
	
	})(gameController, userInterfaceController);

		
	
	controller.initiate();

	