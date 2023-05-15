// Wendy Chen
// All You Can Eat
// About 20 Hours
/* Creative Tilt: I added a time event where it increases the speeds of the foods
every 10 seconds to increase the difficulty as time goes on. I also added a lives
feature where you get 2 lives before you lose from hitting the bugs. Another
technique I used was tweens that moves some of the bugs back and forth to change
up the movement.
I'm proud of the pixel art I drew for the food items and background as well as the
sound effects made.
*/

let config = {
    type: Phaser.AUTO,
    width: 680,
    height: 650,
    scale: {
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ Menu, Play, Credits ]
  }

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keySPACE;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let input;
let cursorx;
let cursory;
let mousedown = false; 
let highscore = 0;