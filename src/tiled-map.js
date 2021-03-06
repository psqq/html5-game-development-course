import path from 'path-browserify';
import { context as ctx } from './canvas';
import * as viewRect from './view-rect';
import * as physicsEngine from './physics-engine';
import * as images from './images';
import * as gameEngine from './game-engine';
import TeleporterEntity from './teleporter-entity';

export default class TiledMap {
    constructor(filename) {
        this.filename = filename;
        this.numXTiles = 0;
        this.numYTiles = 0;
        this.tileSize = { x: 0, y: 0 };
        this.pixelSize = { x: 0, y: 0 };
        this.tileSets = [];
        this.cachedCanvas = null;
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
            var img = images.images[path.basename(fn)];
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
    draw(aCtx) {
        if (!aCtx) aCtx = ctx;
        for (var layer of this.mapJSON.layers) {
            if (layer.type === 'tilelayer') {
                for (var i = 0; i < layer.data.length; i++) {
                    var idx = layer.data[i];
                    if (idx <= 0) {
                        continue;
                    }
                    var pkt = this.getTilePacket(idx);
                    var x = this.tileSize.y * (i % this.numXTiles);
                    var y = this.tileSize.x * Math.floor(i / this.numXTiles);
                    aCtx.drawImage(
                        pkt.img,
                        pkt.px, pkt.py,
                        this.tileSize.x, this.tileSize.y,
                        x, y,
                        this.tileSize.x, this.tileSize.y
                    );
                }
            }
        }
    }
    drawFromCache() {
        var c = this.cachedCanvas;
        var r = viewRect;
        ctx.drawImage(
            c,
            r.x, r.y, r.w, r.h,
            r.x, r.y, r.w, r.h,
        );
    }
    makeCache() {
        this.cachedCanvas = document.createElement('canvas');
        this.cachedCanvas.width = this.pixelSize.x;
        this.cachedCanvas.height = this.pixelSize.y;
        var cachedCtx = this.cachedCanvas.getContext('2d');
        this.draw(cachedCtx);
    }
    createStaticObjects() {
        for (var layer of this.mapJSON.layers) {
            if (layer.type === 'objectgroup' && layer.name === 'collision') {
                for (var obj of layer.objects) {
                    physicsEngine.addBody(
                        obj.x + obj.width / 2,
                        obj.y + obj.height / 2,
                        obj.width, obj.height,
                        {
                            isStatic: true
                        }
                    );
                }
            }
        }
    }
    drawStaticObjects() {
        for (var layer of this.mapJSON.layers) {
            if (layer.type === 'objectgroup' && layer.name === 'collision') {
                for (var obj of layer.objects) {
                    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
                }
            }
        }
    }
    spawnTeleporters() {
        for (var layer of this.mapJSON.layers) {
            if (layer.type === 'objectgroup' && layer.name === 'environment') {
                for (var obj of layer.objects) {
                    if (obj.name === 'TP') {
                        gameEngine.spawnEnitty(
                            new TeleporterEntity({
                                x: obj.x + obj.width / 2,
                                y: obj.y + obj.height / 2,
                                w: obj.width,
                                h: obj.height
                            })
                        );
                    }
                }
            }
        }
    }
}
