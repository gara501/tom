class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader'); 
    }

    preload() {
        this.load.path = './assets/';

        this.loadImages();
        this.loadAudio();
        this.loadFonts();
        this.loadCharacters();
        
        this.load.on('complete', () => {
            const fontData = this.cache.json.get('fontData');
            this.cache.bitmapFont.add('pixelFont', Phaser.GameObjects.RetroFont.Parse(this, fontData));
            this.scene.start('Menu');
        });
    }

    loadImages() {
        this.load.image([
            'background',
            'bomb',
            'floor',
            'life',
            'logo',
            'tomato_item',
            'wall',
            'sound',
            'soundoff',
            'background_night',
            'head_item_small',
            'eye'
        ]);
    }

    loadAudio() {
        this.load.audio('bongo', 'bongojam_f.mp3');
        this.load.audio('back', 'back.mp3');
        this.load.audio('draw', 'draw.mp3');
        this.load.audio('pop', 'pop.mp3');
        this.load.audio('scream', 'scream.mp3');
        this.load.audio('gameover', 'gameover.mp3');
    }

    loadFonts() {
        this.load.image('font', 'font/font.png');
        this.load.json('fontData', 'font/font.json')
    }

    loadCharacters() {
        this.load.atlas('tomato', 'tomato/tomato.png', 'tomato/tomato_atlas.json');
        this.load.animation('tomatoAnim', 'tomato/tomato_anim.json');
    }
}
export default Bootloader;