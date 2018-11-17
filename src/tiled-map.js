import path from 'path-browserify';
import { loadImage } from './images';

export default class TiledMap {
    constructor(filename) {
        this.filename = filename;
        this.numXTiles = 0;
        this.numYTiles = 0;
        this.tileSize = { x: 0, y: 0 };
        this.pixelSize = { x: 0, y: 0 };
        this.tileSets = [];
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
        for (var tileset of json.tilesets) {
            var curDir = path.dirname(this.filename);
            var fn = path.join(curDir, tileset.image);
            var img = await loadImage(fn);
            this.tileSets.push({
                image: img,
                firstgid: tileset.firstgid,
                imageheight: tileset.imageheight,
                imagewidth: tileset.imagewidth,
                name: tileset.name,
                numXTiles: Math.floor(tileset.imagewidth / this.tileSize.x),
                numYTiles: Math.floor(tileset.imageheight / this.tileSize.y)
            });
        }
    }
    getTilePacket(tileIndex) {
        var pkt = {
            img: null, px: 0, py: 0
        };
        for (var i = this.tileSets.length - 1; i >= 0; i--) {
            var tileset = this.tileSets[i];
            if (tileset.firstgid <= tileIndex) {
                pkt.img = tileset.image;
                var localIdx = tileIndex - tileset.firstgid;
                pkt.py = this.tileSize.y * Math.floor(localIdx / tileset.numXTiles);
                pkt.px = this.tileSize.x * (localIdx % tileset.numXTiles);
                break;
            }
        }
        return pkt;
    }
}
