import path from 'path-browserify';
import { loadImage } from './images';

export default class TiledMap {
    constructor(filename) {
        this.filename = filename;
        this.numXTiles = 0;
        this.numYTiles = 0;
        this.tileSize = { x: 0, y: 0 };
        this.pixelSize = { x: 0, y: 0 };
    }
    async loadAndParse() {
        var res = await fetch(this.filename);
        var json = await res.json();
        this.mapJSON = json;
        this.numXTiles = json.width;
        this.numYTiles = json.height;
        this.tileSize = {
            x: json.tilewidth, y: json.tileheight
        };
        this.pixelSize = {
            x: this.numXTiles * this.tileSize.x,
            y: this.numYTiles * this.tileSize.y
        };
        for(var tileset of json.tilesets) {
            var curDir = path.dirname(this.filename);
            var fn = path.join(curDir, tileset.image);
            var img = await loadImage(fn);
        }
    }
}
