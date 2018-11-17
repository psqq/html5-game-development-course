import { images } from './images';

export default class TexturepackerParser {
    constructor(filename) {
        this.filename = filename;
        this.sprites = [];
        this.atlasJSON = null;
        this.img = null;
    }
    getStats(name) {
        for(var sprite of this.sprites) {
            if (sprite.id == name) {
                return sprite;
            }
        }
        return null;
    }
    async loadAndParse(filename) {
        if (filename) {
            this.filename = filename;
        }
        var res = await fetch(this.filename);
        this.atlasJSON = await res.json();
        this.parseAtlasDefinition();
    }
    defSprite(name, x, y, w, h, cx, cy) {
        var spt = {
            id: name,
            x, y, w, h,
            cx: cx == null ? 0 : cx,
            cy: cy == null ? 0 : cy
        };
        this.sprites.push(spt);
    }
    parseAtlasDefinition() {
        this.img = images[this.atlasJSON.meta.image];
        for (var name in this.atlasJSON.frames) {
            var sprite = this.atlasJSON.frames[name];
            var cx = -sprite.frame.w / 2;
            var cy = -sprite.frame.h / 2;
            if (sprite.trimmed) {
                cx = sprite.spriteSourceSize.x - (sprite.sourceSize.w / 2);
                cy = sprite.spriteSourceSize.y - (sprite.sourceSize.h / 2);
            }
            this.defSprite(
                name,
                sprite.frame.x, sprite.frame.y,
                sprite.frame.w, sprite.frame.h,
                cx, cy
            );
        }
    }
}
