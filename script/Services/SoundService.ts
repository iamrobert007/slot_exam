module Game {
    export class SoundService {

        public Sound: Howl;
        public SoundReel: Howl;

        constructor() {
            let soundLanding = ["/asset/sound/Landing_1.mp3"]
            let soundReel = ["/asset/sound/Reel_Spin.mp3"]
            this.Sound = new Howl({
                src: soundLanding
            });
            this.SoundReel = new Howl({
                src: soundReel
            });
        }


        public stopSound() {
            this.SoundReel.stop();
        }

        public play(name: string) {
            if (name == "landing") {
                if (this.Sound && this.Sound.state() == "loaded") {
                    this.Sound.play()
                }
            }
            else {
                if (this.SoundReel && this.SoundReel.state() == "loaded") {
                    this.SoundReel.play()
                }
            }
        }
    }
}
