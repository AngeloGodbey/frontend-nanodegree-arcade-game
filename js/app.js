'use strict';

// Enemies our player must avoid
class Enemy {
  constructor(x, y, speed) {

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.sideStep = 101;
    this.row = 83;
    this.rightBoundary = this.sideStep * 5;
    this.startPos = -this.sideStep;
    this.endPos = this.rightBoundary + this.sideStep;
    this.x = x;
    this.y = y - 35;
    this.rightSide = this.sideStep - 25;
    this.speed = speed;
    this.collide = false;
    this.forward = true;
    this.backward = false;
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  // Multiply any movement by the dt parameter which will ensure the game runs
  // at the same speed for all computers.
  update(dt) {
    // Check if enemy is moving forward or backwards
    if (this.forward == true) {
      // If not at right boundary, continue moving forward. Otherwise reset
      // position to start position.
      if (this.x < this.rightBoundary) {
        this.x += this.speed * dt;
      } else {
        this.x = this.startPos;
      }
    } else {      // If moving backward
      if (this.x > 0){
        this.x -= this.speed * dt;
      } else {
        // If enemy move past the left boundary, reset to end position.
        this.x = this.endPos;
      }
    }
    // If player collides with enemy, move the opposite direction
    if (this.collide == true) {
      if (this.forward == true) {
        this.backward = true;
        this.forward = false;
      } else {
        this.backward = false;
        this.forward = true;
      }
      this.collide = false;
    }
  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
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
    this.leftSide = this.x + this.sideStep - 25;
  }

  //Draw the player sprite on current x and y position
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  //Update the player's position
  update() {
    for (let enemy of allEnemies) {
      //If the enemy's right side or left side touches player and enemy is on
      //same row as player, reset player's position
      if ((enemy.x + enemy.rightSide > this.x && enemy.x < this.leftSide)
      && this.y == enemy.y) {
        this.reset();
        enemy.collide = true;
      }
    }

    //If player reaches the top row, player wins
    if (this.y == -35) {
      this.winner = true;
    }
  }

  //Reset player to start position and randomly change sprite image
  reset() {
    let char = ['images/char-boy.png', 'images/char-cat-girl.png',
    'images/char-horn-girl.png', 'images/char-pink-girl.png',
    'images/char-princess-girl.png'];

    //The maximum is inclusive and the minimum is inclusive
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

let allEnemies = [
  new Enemy(-101, 83, 50),
  new Enemy(-101, 166, 200),
  new Enemy(-101, 249, 300),
  new Enemy(-101*1.5, 83, 250),
  new Enemy(-101*1.6, 166, 500),
  new Enemy(-101*1.7, 249, 150),
  new Enemy(-101*1.7, 249, 250),
];

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
