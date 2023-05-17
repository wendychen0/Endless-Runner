class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
    preload() {
      this.load.audio('sfx_select', './assets/blip_select12.wav');
      this.load.image('title', './assets/gametitle.png');
      this.load.image('start', './assets/start.png');
      this.load.image('control', './assets/control.png');
      this.load.image('instruc', './assets/instruc.png');
      this.load.image('credits', './assets/credits.png');

      this.load.image('cake', './assets/cake.png');
      this.load.image('watermelon', './assets/watermelon.png');
      this.load.image('sandwhich', './assets/sandwhich.png');

      // load audio
      this.load.audio('collect1', './assets/foodCollect.wav');
      this.load.audio('collect2', './assets/foodCollect2.wav');
      this.load.audio('hit', './assets/hit.wav');
    }
    create() {
      this.title = this.add.sprite(game.config.width/2, 90, 'title');
      this.title.setScale(0.8);

      this.control = this.add.image(game.config.width/2, 235, 'control');
      this.control.setScale(0.65);

      this.start = this.add.image(game.config.width/2, 305, 'start');
      this.start.setScale(0.65);

      this.tut = this.add.image(game.config.width/2, 445, 'instruc');
      this.tut.setScale(0.52);

      this.credit = this.add.image(game.config.width/2, 495, 'credits');
      this.credit.setScale(0.52);

      this.cake = this.add.image(570, 150, 'cake');
      this.cake.setScale(1.1);

      this.sandwhich = this.add.image(100, 370, 'sandwhich');
      this.sandwhich.setScale(0.5);

      this.watermelon = this.add.image(620, 510, 'watermelon');
      this.watermelon.setScale(0.5);

      // define keys
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
          // easy mode
          game.settings = {
            foodSpeed: 3,    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          this.scene.start('creditsScene');
        }
    }
  }