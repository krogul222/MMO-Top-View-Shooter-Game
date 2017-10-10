Object.defineProperty(exports, "__esModule", { value: true });
const globalVariables_1 = require("./../globalVariables");
const Enemy_1 = require("./Enemy");
const Bullet_1 = require("./Bullet");
const Actor_1 = require("./Actor");
const GeometryAndPhysics_1 = require("./../GeometryAndPhysics");
class Player extends Actor_1.Actor {
    constructor(param) {
        super(param);
        this.getInitPack = () => {
            return {
                id: this.id,
                position: this.position,
                hp: this.lifeAndBodyController.hp,
                hpMax: this.lifeAndBodyController.hpMax,
                map: this.map,
                width: this.width,
                height: this.height,
                moving: this.movementController.moving,
                aimAngle: this.movementController.aimAngle,
                weapon: this.attackController.activeWeapon.weapon,
                attackStarted: this.attackController.attackStarted,
                attackMelee: this.attackController.melee,
                ammo: this.attackController.activeWeapon.ammo,
                ammoInGun: this.attackController.activeWeapon.ammoInGun
            };
        };
        this.getUpdatePack = () => {
            let attackStartedTmp = this.attackController.attackStarted;
            this.attackController.attackStarted = false;
            return {
                id: this.id,
                position: this.position,
                hp: this.lifeAndBodyController.hp,
                moving: this.movementController.moving,
                aimAngle: this.movementController.aimAngle,
                attackStarted: attackStartedTmp,
                weapon: this.attackController.activeWeapon.weapon,
                attackMelee: this.attackController.melee,
                ammo: this.attackController.activeWeapon.ammo,
                ammoInGun: this.attackController.activeWeapon.ammoInGun,
                reload: this.attackController.reloadCounter.isActive()
            };
        };
        this.onDeath = () => {
            this.lifeAndBodyController.reset();
            let map = this.mapController.getMap(this.map);
            let x = Math.random() * map.width;
            let y = Math.random() * map.height;
            let position = new GeometryAndPhysics_1.Point(x, y);
            while (map.isPositionWall(position)) {
                x = Math.random() * map.width;
                y = Math.random() * map.height;
                position.changePosition(x, y);
            }
            this.setPosition(position);
        };
        globalVariables_1.initPack.player.push(this.getInitPack());
        Player.list[param.id] = this;
    }
}
Player.onConnect = (socket) => {
    let map = 'forest';
    let player = new Player({
        id: socket.id,
        maxSpdX: 12,
        maxSpdY: 12,
        map: map,
        img: 'player',
        atkSpd: 7,
        width: 50,
        height: 50,
        type: "player",
        hp: 40,
        socket: socket
    });
    socket.on('changeWeapon', function (data) {
        if (data.state == 'next') {
            player.attackController.weaponCollection.chooseNextWeaponWithAmmo();
        }
        if (data.state == 'prev') {
            player.attackController.weaponCollection.choosePrevWeaponWithAmmo();
        }
    });
    socket.on('keyPress', function (data) {
        if (data.inputId == 'left')
            player.movementController.pressingLeft = data.state;
        if (data.inputId == 'right')
            player.movementController.pressingRight = data.state;
        if (data.inputId == 'up')
            player.movementController.pressingUp = data.state;
        if (data.inputId == 'down')
            player.movementController.pressingDown = data.state;
        if (data.inputId == 'attack')
            player.attackController.pressingAttack = data.state;
        if (data.inputId == 'mouseAngle')
            player.movementController.aimAngle = data.state;
    });
    socket.emit('init', { player: Player.getAllInitPack(), bullet: Bullet_1.Bullet.getAllInitPack(), enemy: Enemy_1.Enemy.getAllInitPack(), selfId: socket.id });
};
Player.getAllInitPack = () => {
    let players = [];
    for (let i in Player.list) {
        players.push(Player.list[i].getInitPack());
    }
    return players;
};
Player.onDisconnect = (socket) => {
    delete Player.list[socket.id];
    globalVariables_1.removePack.player.push(socket.id);
};
Player.update = () => {
    let pack = [];
    for (let i in Player.list) {
        let player = Player.list[i];
        player.update();
        pack.push(player.getUpdatePack());
    }
    return pack;
};
Player.list = {};
exports.Player = Player;
//# sourceMappingURL=Player.js.map