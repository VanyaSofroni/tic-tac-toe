'use strict';

(function () {

  var gameContainer = document.querySelector('.game');
  var cells = document.querySelectorAll('.game-item');
  var reset = document.querySelector('.reset-game');
  var message = document.querySelector('.game-message');

  var player = 'X';
  var stepCount = 0;
  var isWinner = false;
  var winCombinations = [
      [1, 2, 3],
      [1, 4, 7],
      [1, 5, 9],
      [2, 5, 8],
      [3, 6, 9],
      [3, 5, 7],
      [4, 5, 6],
      [7, 8, 9]
    ];

  var dataX = [];
  var dataO = [];

  var changePlayer = function() {
    player === 'X' ? (player = 'O') : (player = 'X')
  };

  var currentStep = function(target) {
    var num = +target.getAttribute('data-cell');

    if (!target.textContent) {
    
      if (isWinner) return

      target.innerText = player;    
      player === 'X' ? dataX.push(num) && target.classList.add('x') : dataO.push(num) && target.classList.add('o')
      
      // if ( (dataO.length > 2 || dataX.length > 2) && (checkWin(dataO, num) || checkWin(dataX, num))) {
      if ( (dataO.length > 2 || dataX.length > 2) && (checkWin(dataO) || checkWin(dataX))) {
        isWinner = true;
        return (message.innerText = 'Победил игрок ' + player);
      };

      changePlayer();
      stepCount++;
      stepCount === 9 ? (message.innerText = 'Ничья') : (message.innerText = 'Ходит игрок ' + player);
    }
  };

  var checkWin = function(arr) {

    for (var i = 0; i < winCombinations.length; i++) {
      var someWinArr = winCombinations[i];
      var count = 0;

      for (var j = 0; j < someWinArr.length; j++) {
        if (arr.indexOf(someWinArr[j]) !== -1) {
          count++;
          if (count === 3) return true;
        }
      }
    }

  };

  gameContainer.addEventListener('click', function(e) {
    var target = e.target;

    if (!target.classList.contains('game-item')) return;

    currentStep(target);
  });

  reset.addEventListener('click', function() {
    dataO = [];
    dataX = [];
    player = 'O';
    stepCount = 0;
    isWinner = false;

    cells.forEach(function(item) {
      item.innerText = '';
      item.classList.remove('x', 'o');
    });

    message.innerText = 'Ходит игрок ' + player;
  })

})();