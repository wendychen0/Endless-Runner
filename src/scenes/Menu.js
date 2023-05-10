class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
    preload() {
      this.load.image('title', './assets/gametitle.png');
      this.load.image('start', './assets/start.png');
      this.load.image('control1', './assets/controls1.png');
      this.load.image('control2', './assets/controls2.png');
      this.load.image('t', './assets/t.png');

      this.load.image('cake', './assets/cake.png');
      this.load.image('watermelon', './assets/watermelon.png');
      this.load.image('sandwhich', './assets/sandwhich.png');

      // load audio
      this.load.audio('sfx_select', './assets/blip_select12.wav');
      this.load.audio('sfx_explosion', './assets/explosion38.wav');
      this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
      this.load.audio('explosion1', './assets/explosion1.wav');
      this.load.audio('explosion2', './assets/explosion2.wav');
      this.load.audio('explosion3', './assets/explosion3.wav');
      this.load.audio('explosion4', './assets/explosion4.wav');
    }
    create() {
      this.title = this.add.sprite(game.config.width/2, 90, 'title');
      this.title.setScale(0.8);

      this.control1 = this.add.image(game.config.width/2, 235, 'control1');
      this.control1.setScale(0.65);
      this.control2 = this.add.image(game.config.width/2, 275, 'control2');
      this.control2.setScale(0.65);

      this.start = this.add.image(game.config.width/2, 325, 'start');
      this.start.setScale(0.65);

      this.tut = this.add.image(game.config.width/2, 455, 't');
      this.tut.setScale(0.65);

      this.cake = this.add.image(570, 150, 'cake');
      this.cake.setScale(1.1);

      this.sandwhich = this.add.image(100, 390, 'sandwhich');
      this.sandwhich.setScale(0.5);

      this.watermelon = this.add.image(620, 510, 'watermelon');
      this.watermelon.setScale(0.5);

      //this.add.bitmapText(game.config.width/2, game.config.height/2, 'gem', 'High Score:', 64).setOrigin(0.5).setTint(0xff0000);
      //this.add.bitmapText(game.config.width/2, game.config.height/2, 'gem', 'High Score:', 64).setOrigin(0.5).setTint(0xff00ff).setBlendMode('SCREEN');
      // menu text configuration
      let menuConfig = {
        fontFamily: 'Sigmar',
        fontSize: '35px',
        backgroundColor: '#33658A',//'#F3B141',
        color: '#E6D48E',//#843605',
        align: 'right',
        borderRadius: '25px',
        padding: {
          top: 5,
          bottom: 5,
          left: 5,
          right: 5
        },
        fixedWidth: 0
      }
      //this.add.text(20, 20, "Rocket Patrol Menu");
      //this.scene.start("playScene");

      // show menu text
      //this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 90, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
      
      //menuConfig.backgroundColor = '#33658A';
      //menuConfig.color = '#DB995A';
      //this.add.text(game.config.width/2, game.config.height/2 + borderUISize*2 + borderPadding*2 + 50, 'High Score: ' + highscore, menuConfig).setOrigin(0.5);

      // define keys
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
    }
  }