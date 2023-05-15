class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }
    preload() {
        this.load.image('creditstitle', './assets/creditstitle.png');
        this.load.image('return', './assets/returnmenu.png');
        this.load.image('artSoundProg', './assets/artsoundprog.png');
        this.load.image('name', './assets/name.png');
    }

    create() {

        let menuConfig = {
            fontSize: '25px',
            color: '#e391bd',
        }

        this.creditTitle = this.add.image(game.config.width/2, 120, 'creditstitle');
        this.creditTitle.setScale(0.52);
   
        this.returnM = this.add.image(game.config.width/2, 500, 'return');
        this.returnM.setScale(0.52);

        this.artSP = this.add.image(game.config.width/2, 200, 'artSoundProg');
        this.artSP.setScale(0.52);
        this.name = this.add.image(game.config.width/2, 235, 'name');
        this.name.setScale(0.52);

        let artText = 'Using pixilart.com';
        let soundText = 'Sfxr.me and Uppbeat.io in Phaser 3';
        this.art = this.add.text(game.config.width/2, 285, artText, menuConfig).setOrigin(0.5);;
        this.sound = this.add.text(game.config.width/2, 318, soundText, menuConfig).setOrigin(0.5);;

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.scene.start('menuScene');
          }
    }
}