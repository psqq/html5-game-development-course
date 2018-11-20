import { context as ctx } from './canvas';
import * as viewRect from './view-rect';
import * as player from './player';
import RocketLauncherProjectileEntity from './rocket-launcher-projectile-entity';
import * as gameEngine from './game-engine';

export default class Minimap {
    constructor(o) {
        this.map = o.map;
        this.pos = { x: 0, y: 0 };
        this.size = { x: 200, y: 200 };
    }
    transformCoordsToMinimap(vec) {
        var w = this.map.pixelSize.x, h = this.map.pixelSize.y;
        var nw = this.size.x, nh = this.size.y;
        var x = vec.x, y = vec.y;
        var nx = nw * (x / w);
        var ny = nh * (y / h);
        return {
            x: viewRect.x + this.pos.x + nx,
            y: viewRect.y + this.pos.y + ny
        };
    }
    drawMinimap() {
        var c = this.map.cachedCanvas;
        var w = this.map.pixelSize.x, h = this.map.pixelSize.y;
        var nw = this.size.x, nh = this.size.y;
        ctx.drawImage(
            c,
            0, 0, w, h,
            viewRect.x + this.pos.x, viewRect.y + this.pos.y,
            nw, nh
        );
    }
    drawPlayer() {
        var npPos = this.transformCoordsToMinimap(player.robotEntity.pos);
        var sz = 4;
        ctx.save();
        ctx.fillStyle = 'red';
        ctx.fillRect(npPos.x - sz / 2, npPos.y - sz / 2, sz, sz);
        ctx.restore();
    }
    drawRocketLauncherProjectiles() {
        var sz = 2;
        ctx.save();
        ctx.fillStyle = 'red';
        for(var ent of gameEngine.entities) {
            if (ent instanceof RocketLauncherProjectileEntity) {
                var np = this.transformCoordsToMinimap(ent.pos);
                ctx.fillRect(np.x - sz / 2, np.y - sz / 2, sz, sz);
            }
        }
        ctx.restore();
    }
    draw() {
        this.drawMinimap();
        this.drawPlayer();
        this.drawRocketLauncherProjectiles();
    }
}
