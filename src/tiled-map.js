
export default class TiledMap {
    constructor(filename) {
        this.filename = filename;
    }
    async loadAndParse() {
        var res = await fetch(this.filename);
        var json = await res.json();
        this.mapJSON = json;
    }
}
