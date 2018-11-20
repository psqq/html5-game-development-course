import RobotEntity from './robot-entity';
import TeleporterEntity from './teleporter-entity';
import RocketLauncherProjectileEntity from './rocket-launcher-projectile-entity';

export function robot(o) {
    return new RobotEntity(o);
}

export function teleporter(o) {
    return new TeleporterEntity(o);
}

export function rocketLauncherProjectile(o) {
    return new RocketLauncherProjectileEntity(o);
}
