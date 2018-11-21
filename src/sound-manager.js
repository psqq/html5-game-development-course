import { Howl, Howler } from 'howler';
import path from 'path-browserify';
import key from 'keymaster';
import * as player from './player';
import * as viewRect from './view-rect';
import Victor from 'victor';

var muteFlag = true;

var sounds = {};

function addSound(fn, loop = false, volume = 1) {
    var name = path.parse(fn).name;
    sounds[name] = new Howl({ src: [fn], loop, volume });
}

addSound('./assets/sounds/battleThemeA.mp3', true, 0.5);
addSound('./assets/sounds/sfx_wpn_laser6.wav');
addSound('./assets/sounds/sfx_wpn_cannon2.wav');

export function play(name, o) {
    var id = sounds[name].play();
    o = o || {};
    if (o.volume) {
        sounds[name].volume(o.volume, id);
    }
    return id;
}

export function playWorldSound(name, x, y) {
    var px = player.robotEntity.pos.x;
    var py = player.robotEntity.pos.y;
    var r = Math.max(viewRect.w, viewRect.h);
    var sv = new Victor(x, y), pv = new Victor(px, py);
    var d = sv.subtract(pv).length();
    var normD = d / r;
    if (normD > 1) normD = 1;
    var volume = 1 - normD;
    if (volume > 0) play(name, { volume });
}

export function toggleMuteAll() {
    Howler.mute(muteFlag);
    muteFlag = !muteFlag;
}

export function create() {
    sounds.battleThemeA.play();
    key('m', toggleMuteAll);
}
