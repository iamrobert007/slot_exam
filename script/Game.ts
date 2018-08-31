namespace Game {
    export const WIDTH = 1310;
    export const HEIGHT = 1126;
    export class Game extends PIXI.Application {
        public EventBus: PIXI.utils.EventEmitter = new PIXI.utils.EventEmitter();
        private mainGame: MainBoard;
        public spinService: SpinService;
        public soundService: SoundService;
        public totalReelStopped: number = 5;
        public animationBehavior: number = 0; //0 = complete stop, 1 = spin, 2 = stopping 
        constructor() {
            super({
                view: document.getElementById("game-canvas") as HTMLCanvasElement,
                width: window.innerWidth,
                height: window.innerHeight,
                antialias: true,
                backgroundColor: 0x191919,
                forceCanvas: true
            });

            SlotGame = this;

            this.mainGame = new MainBoard();
            this.stage.addChild(this.mainGame)
            this.ticker.add(this.update, this);
            this.spinService = new SpinService();
            this.soundService = new SoundService();
        }

        private update(elapsed: number) {
            this.mainGame.update();
        }

        public updateReelStop() {
            this.totalReelStopped++;
            if (this.totalReelStopped == 5) {
                this.animationBehavior = 0;
                this.mainGame.enableButton();
                this.soundService.stopSound();
            }
        }
    }

    PIXI.loader.add("spritesJSON", "asset/img/sprites.json")
        .add("sprites", "asset/img/sprites.png");
    PIXI.loader.load();
    PIXI.loader.onComplete.add(() => {
        new Game();
    });
    export let SlotGame: Game;
}