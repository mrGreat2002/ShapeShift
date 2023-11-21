var player = document.getElementById('player');
var obstacles = [];
var score = 0;
var highScore = localStorage.getItem('highScore') || 0;
var gameSpeed = 2;

function createObstacle() {
  var obstacle = document.createElement('div');
  obstacle.classList.add('obstacle');
  obstacle.style.left = '100%';
  obstacle.style.top = Math.random() * 80 + '%'; // Randomize the obstacle's vertical position
  document.body.appendChild(obstacle);
  obstacles.push(obstacle);
}

function updateScore() {
  document.getElementById('score').innerText = 'Score: ' + score;
  document.getElementById('highScore').innerText = 'High Score: ' + highScore;
}

function moveObstacles() {
  for (var i = 0; i < obstacles.length; i++) {
    var obstacle = obstacles[i];
    var obstacleRect = obstacle.getBoundingClientRect();
    obstacle.style.left = obstacleRect.left - gameSpeed + 'px'; // Move the obstacle to the left

    if (obstacleRect.left < -obstacleRect.width) {
      obstacle.remove();
      obstacles.splice(i, 1);
      i--;
    }
  }
}

function gameLoop() {
  var playerRect = player.getBoundingClientRect();

  // Check for collision with obstacles
  for (var i = 0; i < obstacles.length; i++) {
    var obstacle = obstacles[i];
    var obstacleRect = obstacle.getBoundingClientRect();

    if (
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top &&
      playerRect.right > obstacleRect.left &&
      playerRect.left < obstacleRect.right
    ) {
      gameOver();
    }
  }

  // Increase the score
  score++;
  
    // Update the score display
    updateScore();

  // Increase game speed over time
  if (score % 100 === 0) {
    gameSpeed += 0.5;
  }

  moveObstacles();

  requestAnimationFrame(gameLoop);
}

function startGame() {
  setInterval(createObstacle, 2000); // Create obstacles every 2 seconds
  gameLoop();
  updateScore();
}

function gameOver() {
  highScore = Math.max(score, highScore);
  localStorage.setItem('highScore', highScore);
  alert('Game Over! Your score: ' + score + '. High score: ' + highScore);
  location.reload();
}

// Event listeners for shape-shifting controls

document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 32: // Space bar
      player.style.borderRadius = '0';
      break;
    case 37: // Left arrow
      player.style.left = player.offsetLeft - 10 + 'px';
      break;
    case 39: // Right arrow
      player.style.left = player.offsetLeft + 10 + 'px';
      break;
    case 38: // Up arrow
      player.style.top = player.offsetTop - 10 + 'px';
      break;
    case 40: // Down arrow
      player.style.top = player.offsetTop + 10 + 'px';
      break;
  }
});

document.addEventListener('keyup', function(event) {
  if (event.keyCode === 32) {
    player.style.borderRadius = '50%';
  }
});

startGame();
