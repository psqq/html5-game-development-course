import { Howl, Howler } from 'howler';
import path from 'path-browserify';
import key from 'keymaster';

var muteFlag = true;

var sounds = {};

function addSound(fn, loop = false, volume = 1) {
    var name = path.parse(fn).name;
    sounds[name] = new Howl({ src: [fn], loop, volume });
}

addSound('./assets/sounds/battleThemeA.mp3', true, 0.5);
addSound('./assets/sounds/sfx_wpn_laser6.wav');
addSound('./assets/sounds/sfx_wpn_cannon2.wav');

export function play(name) {
    sounds[name].play();
}

export function toggleMuteAll() {
    Howler.mute(muteFlag);
    muteFlag = !muteFlag;
}

export function create() {
    sounds.battleThemeA.play();
    key('m', toggleMuteAll);
}
