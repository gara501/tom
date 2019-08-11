import Tomato from '../Player/Tomato.js';
import Bombs from '../Objects/Bombs.js';
import TomatoItem from '../Objects/TomatoItem.js';

class Play extends Phaser.Scene {
  constructor() {
    super({key: 'Play'});
    this.playerLife = 4;
  }

  init() {
    console.log('Play started');
    this.scene.launch('UI', { playerLife: this.playerLife });
  }

  create() {
    //this.add.image(0, 0, 'background')
    this.add.image(0, 0, 'background_night')
    .setOrigin(0);

    this.wall_floor = this.physics.add.staticGroup();
    this.wall_floor.create(0, 0, 'wall').setOrigin(0);
    this.wall_floor.create(this.scale.width, 0, 'wall')
    .setOrigin(1, 0)
    .setFlipX(true);
    this.wall_floor.create(0, this.scale.height, 'floor')
    .setOrigin(0, 1);
    // Update colision boxes
    this.wall_floor.refresh();
    // move down colision floor 
    this.wall_floor.getChildren()[2].setOffset(0, 30);
    // Add Bombs
    this.bombsGroup = new Bombs({
      physicsWorld: this.physics.world,
      scene: this
    });
    
    // Tomato Items
    this.itemsGroup = new TomatoItem({
      physicsWorld: this.physics.world,
      scene: this
    })

    // Add Character inheriting from Player
    this.tomato = new Tomato({
      scene: this,
      x: 100,
      y: 100,
      playerLife: this.playerLife
    })

    // Add Physics collider with the world
    this.physics.add.collider([this.tomato, this.bombsGroup], this.wall_floor);
    this.physics.add.overlap(this.tomato, this.bombsGroup, () => {
      this.tomato.bombCollision();
    });
    
    this.physics.add.overlap(this.itemsGroup, this.tomato, () => {
      this.sound.play('pop');
      this.registry.events.emit('update_points');
      this.itemsGroup.destroyItem();
      this.bombsGroup.addBomb();
    });
  }

  update() {
    this.tomato.update();
    this.bombsGroup.update();
  }

  addCharacter() {
    
  }
}

export default Play;