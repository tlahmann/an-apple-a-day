import * as Phaser from 'phaser';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Game',
};

export class GameScene extends Phaser.Scene {
    private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
    private oneByRootTwo: number = (1 / Math.sqrt(2));

    constructor() {
        super(sceneConfig);
    }

    public create() {
        this.square = this.add.rectangle(400, 400, 100, 100, 0xFFFFFF) as any;
        this.physics.add.existing(this.square);
    }

    public update() {
        const cursorKeys = this.input.keyboard.createCursorKeys();
        const velocity = { x: 0, y: 0 };

        if (cursorKeys.up.isDown) {
            velocity.y = -500;
        } else if (cursorKeys.down.isDown) {
            velocity.y = 500;
        } else {
            velocity.y = 0;
        }

        if (cursorKeys.right.isDown) {
            velocity.x = 500;
        } else if (cursorKeys.left.isDown) {
            velocity.x = -500;
        } else {
            velocity.x = 0;
        }

        if (velocity.x !== 0 && velocity.y !== 0) {
            velocity.x *= this.oneByRootTwo; velocity.y *= this.oneByRootTwo;
        }
        this.square.body.setVelocity(velocity.x, velocity.y);
    }
}

const gameConfig: Phaser.Types.Core.GameConfig = {
    title: 'Sample',

    type: Phaser.AUTO,

    scene: GameScene,

    scale: {
        width: window.innerWidth,
        height: window.innerHeight,
    },

    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        },
    },

    parent: 'game',
    backgroundColor: '#000000',
};

export const game = new Phaser.Game(gameConfig);
