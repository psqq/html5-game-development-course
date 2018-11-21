import { context } from './canvas';
import * as viewRect from './view-rect';
import * as player from './player';
import RocketLauncherProjectileEntity from './rocket-launcher-projectile-entity';
import * as gameEngine from './game-engine';

export default class Minimap {
    constructor(o) {
        this.map = o.map;
        this.pos = { x: 0, y: 0 };
        this.size = { x: 200, y: 200 };
        this.ctx = context;
        this.cachedCanvas = null;
    }
    transformCoordsToMinimap(vec) {
        var w = this.map.pixelSize.x, h = this.map.pixelSize.y;
        var nw = this.size.x, nh = this.size.y;
        var x = vec.x, y = vec.y;
        var nx = nw * (x / w);
        var ny = nh * (y / h);
        return {
            x: this.pos.x + nx,
            y: this.pos.y + ny
        };
    }
    drawMinimap() {
        var ctx = this.ctx;
        var c = this.map.cachedCanvas;
        var w = this.map.pixelSize.x, h = this.map.pixelSize.y;
        var nw = this.size.x, nh = this.size.y;
        ctx.drawImage(
            c,
            0, 0, w, h,
            0, 0, nw, nh
        );
    }
    drawPlayer() {
        var ctx = this.ctx;
        var npPos = this.transformCoordsToMinimap(player.robotEntity.pos);
        var sz = 4;
        ctx.save();
        ctx.fillStyle = 'red';
        ctx.fillRect(npPos.x - sz / 2, npPos.y - sz / 2, sz, sz);
        ctx.restore();
    }
    drawRocketLauncherProjectiles() {
        var ctx = this.ctx;
        var sz = 2;
        ctx.save();
        ctx.fillStyle = 'red';
        for (var ent of gameEngine.entities) {
            if (ent instanceof RocketLauncherProjectileEntity) {
                var np = this.transformCoordsToMinimap(ent.pos);
                ctx.fillRect(np.x - sz / 2, np.y - sz / 2, sz, sz);
            }
        }
        ctx.restore();
    }
    draw(aCtx, onlyMap = false) {
        if (!aCtx) aCtx = context;
        this.ctx = aCtx;
        var ctx = this.ctx;
        ctx.save();
        ctx.translate(viewRect.x, viewRect.y);
        this.drawMinimap();
        if (!onlyMap) {
            this.drawPlayer();
            this.drawRocketLauncherProjectiles();
        }
        ctx.restore();
    }
    drawFromCache() {
        this.ctx = context;
        var ctx = context;
        var c = this.cachedCanvas;
        var w = this.size.x, h = this.size.y;
        ctx.save();
        ctx.translate(viewRect.x, viewRect.y);
        ctx.drawImage(
            c,
            0, 0, w, h,
            0, 0, w, h,
        );
        this.drawPlayer();
        this.drawRocketLauncherProjectiles();
        ctx.restore();
    }
    makeCache() {
        this.cachedCanvas = document.createElement('canvas');
        this.cachedCanvas.width = this.size.x;
        this.cachedCanvas.height = this.size.y;
        var cachedCtx = this.cachedCanvas.getContext('2d');
        this.draw(cachedCtx, true);
    }
}
