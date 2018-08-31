namespace Game {
    export const ON_SPIN = "onSpin";
    export class MainBoard extends PIXI.Container {
        private reel: PIXI.Sprite;
        private reelBG: PIXI.Texture;
        private spinBtn: PIXI.Sprite;
        private reel_col1: reelColumn;
        private reel_col2: reelColumn;
        private reel_col3: reelColumn;
        private reel_col4: reelColumn;
        private reel_col5: reelColumn;
        constructor() {
            super();
            this.initialize();

        }

        private initialize() {
            var reelBG: PIXI.Texture = PIXI.Texture.fromImage("frameBackground.jpg");
            var tilingSprite = new PIXI.extras.TilingSprite(reelBG, 1049, 570);
            tilingSprite.x = 33;
            tilingSprite.y = 31
            this.addChild(tilingSprite);
            this.reel = this.addChild(PIXI.Sprite.fromFrame("slotOverlay.png"));
            this.reel_col1 = this.addChild(new reelColumn(0));
            this.reel_col1.x = 50;
            this.reel_col2 = this.addChild(new reelColumn(1));
            this.reel_col2.x = 255;
            this.reel_col3 = this.addChild(new reelColumn(2));
            this.reel_col3.x = 460;
            this.reel_col4 = this.addChild(new reelColumn(3));
            this.reel_col4.x = 665;
            this.reel_col5 = this.addChild(new reelColumn(4));
            this.reel_col5.x = 870;
            this.spinBtn = this.addChild(PIXI.Sprite.fromFrame("btn_spin_01.png"));
            this.spinBtn.buttonMode = this.spinBtn.interactive = true;
            this.spinBtn.on("mousedown", function () { this.updateButtonState(3)} , this)
                .on('mouseup', this.click, this)
                .on('mouseupoutside', function () { this.updateButtonState(1) }, this)
                .on('mouseover', function () { this.updateButtonState(2) }, this)
                .on('mouseout', function () { this.updateButtonState(1) }, this)
            this.spinBtn.position.set(900, 600)
        }
        public click() {
            SlotGame.animationBehavior = 1;
            this.updateButtonState(1);
            this.spinBtn.interactive = this.spinBtn.buttonMode = false;
            this.updateButtonState(4);
            SlotGame.spinService.Spin()
            SlotGame.EventBus.emit(ON_SPIN)
            SlotGame.soundService.play("spin")
        }
        public updateButtonState(state) {
            this.spinBtn.texture = PIXI.Texture.fromFrame("btn_spin_0" + state + ".png");
        }
        public enableButton(){
            this.updateButtonState(1);
            this.spinBtn.buttonMode = this.spinBtn.interactive = true;
        }
        public update() {
            this.reel_col1.update();
            this.reel_col2.update();
            this.reel_col3.update();
            this.reel_col4.update();
            this.reel_col5.update();

        }
    }
}