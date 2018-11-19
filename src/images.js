import path from 'path-browserify';
import TexturepackerParser from './texturepacker-parser';
import { context as ctx } from './canvas';

var imagesDir = './assets/images/';
var imagesPaths = [
    "robowalk/robowalk00.png", "robowalk/robowalk01.png", "robowalk/robowalk02.png",
    "robowalk/robowalk03.png", "robowalk/robowalk04.png", "robowalk/robowalk05.png",
    "robowalk/robowalk06.png", "robowalk/robowalk07.png", "robowalk/robowalk08.png",
    "robowalk/robowalk09.png", "robowalk/robowalk10.png", "robowalk/robowalk11.png",
    "robowalk/robowalk12.png", "robowalk/robowalk13.png", "robowalk/robowalk14.png",
    "robowalk/robowalk15.png", "robowalk/robowalk16.png", "robowalk/robowalk17.png",
    "robowalk/robowalk18.png",
    'grits_effects.png',
    'grits_master.png',
    'ralphyrobot.png',
];

var spriteSheetsDir = './assets/json/';
var spriteSheetsPaths = ['grits_effects.json'];

var spriteSheets = {};

export var images = {};

export function loadImage(filename) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.onerror = err => reject(err);
        img.src = filename;
    });
}

async function loadAllImages() {
    var promises = [];
    for (var filename of imagesPaths) {
        promises.push(loadImage(imagesDir + filename));
    }
    var imagesArr = await Promise.all(promises);
    for (var i = 0; i < imagesPaths.length; i++) {
        var basename = path.basename(imagesPaths[i]);
        images[basename] = imagesArr[i];
    }
}

async function loadAllSpriteSheets() {
    var promises = [];
    for (var filename of spriteSheetsPaths) {
        var name = path.parse(filename).name;
        var spriteSheet = new TexturepackerParser(path.join(spriteSheetsDir, filename));
        spriteSheets[name] = spriteSheet;
        promises.push(spriteSheet.loadAndParse());
    }
    await Promise.all(promises);
}

export async function loadAll() {
    await loadAllImages();
    await loadAllSpriteSheets();
}

export function findSprite(spriteName) {
    for (var sheetName in spriteSheets) {
        var sheet = spriteSheets[sheetName];
        var sprite = sheet.getStats(spriteName);
        if (sprite == null) continue;
        return { sheet, sprite };
    }
    return null;
}

export function findAndDrawSprite(spriteName, posX, posY) {
    var findResult = findSprite(spriteName);
    if (!findResult) {
        return;
    }
    drawSprite(findResult.sprite, findResult.sheet, posX, posY);
}

export function drawSprite(spt, sheet, posX, posY) {
    if (spt == null || sheet == null) return;
    var hlf = {
        x: spt.cx, y: spt.cy
    };
    ctx.drawImage(
        sheet.img,
        spt.x, spt.y, spt.w, spt.h,
        posX + hlf.x, posY + hlf.y, spt.w, spt.h
    );
}
