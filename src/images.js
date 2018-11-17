
var robowalkWhere = './assets/images/robowalk/';
var robowalkAssets = [
    'robowalk00.png', 'robowalk01.png', 'robowalk02.png',
    'robowalk03.png', 'robowalk04.png', 'robowalk05.png',
    'robowalk06.png', 'robowalk07.png', 'robowalk08.png',
    'robowalk09.png', 'robowalk10.png', 'robowalk11.png',
    'robowalk12.png', 'robowalk13.png', 'robowalk14.png',
    'robowalk15.png', 'robowalk16.png', 'robowalk17.png',
    'robowalk18.png',
];

var imagesWhere = './assets/images/';
var imagesAssets = [
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

export var robowalkImages = [];

export var images = {};

export function loadImage(filename) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.onerror = err => reject(err);
        img.src = filename;
    });
}

export async function loadAllImages() {
    // Load robowalk images
    var promises = [];
    for (var filename of robowalkAssets) {
        promises.push(loadImage(robowalkWhere + filename));
    }
    robowalkImages = await Promise.all(promises);
    // Load other images
    promises = [];
    for (var filename of imagesAssets) {
        promises.push(loadImage(imagesWhere + filename));
    }
    var imagesArr = await Promise.all(promises);
    for (var i = 0; i < imagesAssets.length; i++) {
        images[imagesAssets[i]] = imagesArr[i];
    }
}
