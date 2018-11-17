
export default class TexturepackerParser {
    constructor() {
        this.sprites = [];
    }
    async loadAndParse(filename) {
        var res = await fetch(filename);
        this.parseAtlasDefinition(await res.json());
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
    parseAtlasDefinition(atlasJSON) {
        for (var name in atlasJSON.frames) {
            var sprite = atlasJSON.frames[name];
            var cx = -sprite.frame.w / 2;
            var cy = -sprite.frame.h / 2;
            this.defSprite(
                name,
                sprite.frame.x, sprite.frame.y,
                sprite.frame.w, sprite.frame.h,
                cx, cy
            );
        }
    }
}
