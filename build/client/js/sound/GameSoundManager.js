Object.defineProperty(exports, "__esModule", { value: true });
class GameSoundManager {
    constructor() {
        this.soundOn = true;
        this.loadSounds = () => {
            soundManager.onload = function () {
                soundManager.createSound('gunshot', '/client/mp3/gunshot.mp3');
                soundManager.createSound('pistol_fire', '/client/mp3/pistol_fire.mp3');
                soundManager.createSound('shotgun_fire', '/client/mp3/shotgun_fire.mp3');
                soundManager.createSound('flamethrower_fire', '/client/mp3/flamethrower_fire.mp3');
                soundManager.createSound('rifle_fire', '/client/mp3/rifle_fire.mp3');
                soundManager.createSound('knife_swing', '/client/mp3/knife_swing.mp3');
                soundManager.createSound('gun_swing', '/client/mp3/gun_swing.mp3');
                soundManager.createSound('squishy1', '/client/mp3/squishy1.mp3');
                soundManager.createSound('squishy2', '/client/mp3/squishy2.mp3');
                soundManager.createSound('pain', '/client/mp3/pain.mp3');
                soundManager.createSound('death1', '/client/mp3/death.mp3');
                soundManager.createSound('shotgunreload', '/client/mp3/shotgunreload.mp3');
                soundManager.createSound('pistolreload', '/client/mp3/pistolreload.mp3');
                soundManager.createSound('riflereload', '/client/mp3/riflereload.mp3');
            };
        };
        this.loopSound = (sound, stop) => {
            sound.play({
                onfinish: function () {
                    if (!stop) {
                        this.loopSound(sound);
                    }
                }
            });
        };
        this.playWeaponReload = (weapon) => {
            if (this.soundOn)
                soundManager.play(weapon + "reload");
        };
        this.playWeaponAttack = (weapon, melee, stop = true) => {
            if (this.soundOn) {
                if (melee) {
                    (weapon == "knife" || weapon == "claws") ? soundManager.play("knife_swing") : soundManager.play("gun_swing");
                }
                else {
                    if (weapon == "flamethrower") {
                        let s = soundManager.getSoundById(weapon + "_fire");
                        this.loopSound(s, stop);
                    }
                    else {
                        soundManager.play(weapon + "_fire");
                    }
                }
            }
        };
        this.playHit = (category) => {
            if (this.soundOn) {
                if (category == "player")
                    soundManager.play("pain");
                if (category == "enemy") {
                    (Math.random() < 0.5) ? soundManager.play("squishy1") : soundManager.play("squishy2");
                }
            }
        };
        this.playDeath = (kind) => {
            if (this.soundOn) {
                console.log("KILLED " + kind);
                if (kind == "zombie")
                    soundManager.play("death1");
            }
        };
        this.turnSound = (sound) => {
            this.soundOn = sound;
        };
        this.loadSounds();
    }
}
exports.GameSoundManager = GameSoundManager;
//# sourceMappingURL=GameSoundManager.js.map