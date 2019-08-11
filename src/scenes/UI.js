class UI extends Phaser.Scene {
  constructor() {
    super({key: 'UI'});
  }

  init(data) {  
    this.scene.moveUp();
    this.actualPoints = 0;
    this.playerLife = 3;
    if (Object.keys(data).length !== 0) {
      this.playerLife = data.playerLife;
    }
  }

  create() {
    this.groupLife = this.add.group({
      key: 'life',
      repeat: this.playerLife-1,
      setXY: {
        x: 50,
        y: 20,
        stepX: 25
      }
    });

    /*
    this.soundOff = this.add.image(120, 5, 'soundoff')
    .setOrigin(0);
    */

    this.points = this.add.bitmapText(
      this.scale.width -40,
      20,
      'pixelFont',
      Phaser.Utils.String.Pad('0', 6, 0, 1)
    ).setOrigin(1, 0);

    // Events
    this.registry.events.on('remove_life', () => {
      this.groupLife.getChildren()[this.groupLife.getChildren().length-1].destroy();
    });

    this.registry.events.on('update_points', () => {
      this.actualPoints += 10;
      this.points.setText(Phaser.Utils.String.Pad(this.actualPoints, 6, 0, 1))
    });

    this.registry.events.on('game_over', () => {
      this.registry.events.removeAllListeners();
      this.scene.stop('Play');
      this.sound.stopAll();

      this.sound.play('gameover');
      this.scene.start('Menu', {points: this.actualPoints });
      
      /*
      this.sound.stopAll();
      this.sound.play('')
      this.scene.time.addEvent({
        delay: 200,
        callback: () => {
          
        }
      });
      */
    });
  }
}

export default UI;