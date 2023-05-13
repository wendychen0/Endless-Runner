class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    preload() {
        // load images/tile sprites
        this.load.image('mat', './assets/picnicmat.png');
        this.load.image('avatar1', './assets/avatar1sm.png');
        this.load.image('cake', './assets/cake.png');
        this.load.image('cookie', './assets/cookie.png');
        this.load.image('sandwhich', './assets/sandwhich.png');
        this.load.image('watermelon', './assets/watermelon.png');
        this.load.image('bug', './assets/bug.png');

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});

        this.load.audio('music', './assets/upbeat.mp3');
      }

    create() {
      // place tile sprite
      this.space = this.add.tileSprite(0, 0, 680, 650, 'mat').setOrigin(0, 0);

      let sfx = this.sound.add('music', {volume: 0.4});
      sfx.loop = true;
      sfx.play();

      // green UI background
      this.add.rectangle(0, borderUISize + borderPadding -5, game.config.width, borderUISize * 2, 0xa0d2e8).setOrigin(0, 0);
      // white borders
      this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
      this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
      this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
      this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
      //this.scene.start("playScene");

      // add player
      this.avatar = new Player(this, 20 + borderPadding, game.config.height - borderUISize - borderPadding, 'avatar1').setOrigin(0, 0);
      this.avatar.setScale(0.8);

      const bug1 = this.add.image(100,200,'bug').setScale(0.5);
      const bug2 = this.add.image(150,300,'bug').setScale(0.5);
      // add foods
      this.cake = new Food(this, game.config.width + borderUISize*6, borderUISize*4 + 35, 'cake', 0, 10).setOrigin(0, 0);
      this.cake.setScale(0.7);
      this.cookie = new Food(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2 + 20, 'cookie', 0, 5).setOrigin(0,0);
      this.cookie.setScale(0.5);
      this.bug = new Food(this, game.config.width, borderUISize*6 + borderPadding*4 + 18, 'bug', 0, -10).setOrigin(0,0);
      this.bug.setScale(0.5);

      this.sandwhich = new Food(this, game.config.width + borderUISize*6 + 45, borderUISize*4 - 45, 'sandwhich', 0, 10).setOrigin(0,0);
      this.sandwhich.setScale(0.5);
      this.sandwhich.moveSpeed = 3.3;

      this.watermelon = new Food(this, game.config.width, borderUISize*6 + borderPadding*4 + 65, 'watermelon', 0, 10).setOrigin(0,0);
      this.watermelon.setScale(0.5);

      this.tweens.add({
        targets: [ bug1, bug2 ],
        x: 600,
        yoyo: true,
        duration: 1500,
        ease: 'Sine.easeInOut',
        repeat: -1,
        delay: this.tweens.stagger(100)
      });

      // define keys
      keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
      keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

      // animation config
      /*this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
        frameRate: 30
      });*/

      // initialize score
      this.p1Score = 0;

      input = this.input;
      input.on('pointerdown', this.clicked, this);
      input.on('pointerup', this.notClicked, this);

      this.reached = true;
      // display score
      let scoreConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#eda4c8',
        color: '#843605',
        align: 'right',
        padding: {
          top: 5,
          bottom: 5,
        },
        fixedWidth: 90
      }
      let clockConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#eda4c8',
        color: '#843605',
        align: 'center',
        padding: {
          top: 5,
          bottom: 5,
        },
        fixedWidth: 90
      }
      let highScConfig = {
        fontFamily: 'Courier',
        fontSize: '26px',
        backgroundColor: '#eda4c8',
        color: '#843605',
        align: 'center',
        padding: {
          top: 5,
          bottom: 5,
        },
        fixedWidth: 115
      }

      this.timeLeft = this.add.text(borderUISize + borderPadding + 300, borderUISize + borderPadding*2, this.p1Score, clockConfig);
      this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
      this.highscoreText = this.add.text(borderUISize + borderPadding + 425, borderUISize + borderPadding*2, `HI:${highscore}`, highScConfig);

      // GAME OVER flag
      this.gameOver = false;
      // 60-second play clock
      scoreConfig.fixedWidth = 0;
      this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
          this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
          this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
          this.gameOver = true;
      }, null, this);

    }
    update() {
      cursorx = input.x;
      cursory = input.y;    
      //const yval = [borderUISize*4 + 35, borderUISize*4 + 50, borderUISize*7 + 15];
      //let pick = Math.floor(Math.random() * 3);
      //this.bug.y = yval[pick];

      // increase rocket speeds after 30 secs
      if (Math.trunc(this.clock.elapsed/1000) == 30 && this.reached) {
        this.cake.moveSpeed += 1.5;
        this.cookie.moveSpeed += 1.5;
        this.bug.moveSpeed += 1.5;
        this.sandwhich.moveSpeed += 1.5;
        this.watermelon.moveSpeed += 1.5;
        this.reached = false;
      }
      // check key input for restart
      if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
        if (this.p1Score > highscore) {
          highscore = this.p1Score;
        }
        this.scene.restart();
      }
      if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        if (this.p1Score > highscore) {
          highscore = this.p1Score;
        }
        this.scene.start("menuScene");
      }
      this.timeLeft.text = Math.trunc(this.clock.getOverallRemainingSeconds());

      this.space.tilePositionX -= 4;

      if (!this.gameOver) {               
        this.avatar.update();         // update avatar sprite
        this.cake.update();           // update foods
        this.cookie.update();
        this.bug.update();
        this.sandwhich.update();
        this.watermelon.update();
      } 

      // check collisions
      if(this.checkCollision(this.avatar, this.bug)) {
        this.avatar.reset();
        this.hitBug(this.bug);
      }
      if (this.checkCollision(this.avatar, this.cookie)) {
        this.avatar.reset();
        this.collectFood(this.cookie);
      }
      if (this.checkCollision(this.avatar, this.cake)) {
        this.avatar.reset();
        this.collectFood(this.cake);
      }
      if (this.checkCollision(this.avatar, this.sandwhich)) {
        this.avatar.reset();
        this.collectFood(this.sandwhich);
      }
      if (this.checkCollision(this.avatar, this.watermelon)) {
        this.avatar.reset();
        this.collectFood(this.watermelon);
      }
  
    }
    checkCollision(player, food) {
        // simple AABB checking
        if (player.x < food.x + food.width && 
          player.x + player.width > food.x && 
          player.y < food.y + food.height &&
          player.height + player.y > food.y) {
            return true;
        } else {
            return false;
        }
    }
    collectFood(food) {
        // temporarily hide food
        food.alpha = 0;
        food.reset();     // reset food position
        food.alpha = 1;   // make food visible again
        // score add and repaint
        this.p1Score += food.points;
        console.log('score',this.p1Score);
        this.scoreLeft.text = this.p1Score;  
        let num = Math.floor(Math.random() * 2);
        //console.log(num);
        if (num == 0) {
          this.sound.play('collect1');
        }
        if (num == 1) {
          this.sound.play('collect2');
        }
        // add 1 second to timer when a ship is hit
        this.clock.delay += food.points * 100;
        this.timeLeft.text = Math.trunc(this.clock.getOverallRemainingSeconds());   
    }
    hitBug(bug) {
      bug.alpha = 0;
      bug.reset();
      bug.alpha = 1;
      this.p1Score += bug.points;
      this.sound.play('hit');
    }
    clicked(){
      mousedown = true;
    }
    notClicked(){
      mousedown = false;
    }
}