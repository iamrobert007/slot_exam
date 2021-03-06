module Game {
    export const SPIN_RESULT = "spinResult";
    export class SpinService extends PIXI.utils.EventEmitter {
        private results: Array<number[]> = [];
        constructor() {
            super();
        }

        public Spin() {
            this.results = [];
            SlotGame.totalReelStopped = 0;
            for (let i = 0; i < 5; i++) {
                this.results.push(generateResult());
            }
            setTimeout(
                function () {
                    SlotGame.EventBus.emit(SPIN_RESULT);
                    SlotGame.animationBehavior = 2;
                }
                , 1000);

        }

        public getResult(index:number) {
            return this.results[index];
        }
    }
}
