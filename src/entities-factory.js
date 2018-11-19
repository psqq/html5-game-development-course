import RobotEntity from './robot-entity';
import TeleporterEntity from './teleporter-entity';

export function robot(o) {
    return new RobotEntity(o);
}

export function teleporter(o) {
    return new TeleporterEntity(o);
}
