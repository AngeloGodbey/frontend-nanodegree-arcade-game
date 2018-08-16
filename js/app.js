// Enemies our player must avoid
let Enemy = function(x, y, speed) {

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.sideStep = 101;
    this.row = 83;
    this.rightBoundary = this.sideStep * 5;
    this.startPos = -this.sideStep;
    this.x = x;
    this.y = y - 35;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //if not at boundary, move forward. Otherwise reset position to start.
    if (this.x < this.rightBoundary) {
      this.x += this.speed * dt;
    } else {
      this.x = this.startPos;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Create player class to use as blueprint for player object
class Player {
  constructor() {
    this.sprite = 'images/char-boy.png';
    this.sideStep = 101;
    this.step = 83;
    this.startX = this.sideStep * 2;
    this.startY = (this.step * 5) - 35;
    this.x = this.startX;
    this.y = this.startY;
    this.winner = false;
  }

  //Draw the player sprite on current x and y position
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  //Update the player's position
  //The maximum is inclusive and the minimum is inclusive
  update() {
    for (let enemy of allEnemies) {
      //If the enemy's right side or left side touches player and enemy is on
      //same row as player, reset player's position
      if ((enemy.x + enemy.sideStep - 25 > this.x && enemy.x < this.x +
        this.sideStep - 25) && this.y == enemy.y) {
        this.reset();
      }
    }

    //If player reaches the top row, player wins
    if (this.y == -35) {
      this.winner = true;
    }
  }

  //Reset player to start position
  reset() {
    let char = ['images/char-boy.png', 'images/char-cat-girl.png',
    'images/char-horn-girl.png', 'images/char-pink-girl.png',
    'images/char-princess-girl.png'];
    const getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let randomNum = getRandomInt(0, char.length - 1);
    this.sprite = char[randomNum];
    this.x = this.startX;
    this.y = this.startY;
    this.winner = false;
  }

  /**
  * @param {string} input - key press that determines travel direction
  */
  //Update player's x or y position based on key presses
  handleInput(input) {
    switch(input) {
      case 'left':
        //Checks for left boundary
        if (this.x > 0) {
          this.x -= this.sideStep;
        }
        break;
      case 'up':
        //Checks for top boundary
        if (this.y > 0) {
          this.y -= this.step;
        }
        break;
      case 'right':
        //Checks for right boundary
        if (this.x < this.sideStep * 4) {
          this.x += this.sideStep;
        }
        break;
      case 'down':
        //Checks for bottom boundary
        if (this.y < this.startY) {
          this.y += this.step;
        }
        break;
     }
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];
//for each enemy, create enemy object and push into array
let enemy1 = new Enemy(-101, 83, 50);
let enemy2 = new Enemy(-101, 166, 200);
let enemy3 = new Enemy(-101, 249, 300);
let enemy4 = new Enemy(-101*1.5, 83, 250);
let enemy5 = new Enemy(-101*1.6, 166, 500);
let enemy6 = new Enemy(-101*1.7, 249, 150);
let enemy7 = new Enemy(-101*1.7, 249, 250);

allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7);

//initialize player object at start position
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
