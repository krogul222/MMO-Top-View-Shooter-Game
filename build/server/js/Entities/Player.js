Object.defineProperty(exports, "__esModule", { value: true });
const Smoke_1 = require("./../Effects/Smoke");
const globalVariables_1 = require("./../globalVariables");
const Enemy_1 = require("./Enemy");
const Bullet_1 = require("./Bullet");
const Actor_1 = require("./Actor");
const GeometryAndPhysics_1 = require("./../GeometryAndPhysics");
const enums_1 = require("../enums");
const MapControler_1 = require("../Controllers/MapControler");
class Player extends Actor_1.Actor {
    constructor(param) {
        super(param);
        this.giveItems = () => {
            this.inventory.addItem(enums_1.ItemType.knife, 1);
            this.inventory.addItem(enums_1.ItemType.pistol, 1);
            this.inventory.addItem(enums_1.ItemType.shotgun, 1);
            this.inventory.addItem(enums_1.ItemType.rifle, 1);
            this.inventory.addItem(enums_1.ItemType.flamethrower, 1);
            this.attackController.weaponCollection.setWeaponAmmo(enums_1.WeaponType.shotgun, 100);
            this.attackController.weaponCollection.setWeaponAmmo(enums_1.WeaponType.pistol, 200);
            this.attackController.weaponCollection.setWeaponAmmo(enums_1.WeaponType.rifle, 100);
            this.attackController.weaponCollection.setWeaponAmmo(enums_1.WeaponType.flamethrower, 400);
            this.inventory.addItem(enums_1.ItemType.medicalkit, 4);
            this.inventory.useItem(enums_1.WeaponType.shotgun);
        };
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
                weapon: this.attackController.activeWeapon.name,
                attackStarted: this.attackController.attackStarted,
                attackMelee: this.attackController.melee,
                ammo: this.attackController.activeWeapon.ammo,
                ammoInGun: this.attackController.activeWeapon.ammoInGun,
                burn: this.lifeAndBodyController.burn
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
                weapon: this.attackController.activeWeapon.name,
                attackMelee: this.attackController.melee,
                ammo: this.attackController.activeWeapon.ammo,
                ammoInGun: this.attackController.activeWeapon.ammoInGun,
                reload: this.attackController.reloadCounter.isActive(),
                pressingAttack: this.attackController.pressingAttack,
                burn: this.lifeAndBodyController.burn
            };
        };
        this.onDeath = () => {
            this.lifeAndBodyController.reset();
            let map = MapControler_1.MapController.getMap(this.map);
            let x = Math.random() * map.width;
            let y = Math.random() * map.height;
            let position = new GeometryAndPhysics_1.Point(x, y);
            while (map.isPositionWall(position)) {
                x = Math.random() * map.width;
                y = Math.random() * map.height;
                position.updatePosition(x, y);
            }
            this.setPosition(position);
        };
        globalVariables_1.initPack.player.push(this.getInitPack());
        Player.list[param.id] = this;
        this.giveItems();
        for (let i = 0; i < 1; i++) {
            Enemy_1.Enemy.randomlyGenerate(this.map);
            Enemy_1.Enemy.randomlyGenerate(this.map);
            Enemy_1.Enemy.randomlyGenerate(this.map);
            Enemy_1.Enemy.randomlyGenerate(this.map);
        }
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
        if (data.inputId == 'heal')
            player.inventory.useItem(enums_1.ItemType.medicalkit);
        if (data.inputId == '1')
            player.attackController.weaponCollection.changeWeapon(enums_1.WeaponType.knife);
        if (data.inputId == '2')
            player.attackController.weaponCollection.changeWeapon(enums_1.WeaponType.pistol);
        if (data.inputId == '3')
            player.attackController.weaponCollection.changeWeapon(enums_1.WeaponType.shotgun);
        if (data.inputId == '4')
            player.attackController.weaponCollection.changeWeapon(enums_1.WeaponType.rifle);
        if (data.inputId == '5')
            player.attackController.weaponCollection.changeWeapon(enums_1.WeaponType.flamethrower);
        if (data.inputId == 'space')
            player.attackController.weaponCollection.chooseNextWeaponWithAmmo();
        if (data.inputId == 'smoke')
            new Smoke_1.Smoke(new GeometryAndPhysics_1.Point(player.position.x - 128, player.position.y - 128), 150, 750, 20, player.map);
        if (data.inputId == 'map') {
            let gameMap = MapControler_1.MapController.getMap(data.map);
            MapControler_1.MapController.createMap(data.map, gameMap.size, 20);
            MapControler_1.MapController.updatePack.push(MapControler_1.MapController.getMapPack(data.map));
        }
    });
    socket.emit('init', { player: Player.getAllInitPack(), bullet: Bullet_1.Bullet.getAllInitPack(), enemy: Enemy_1.Enemy.getAllInitPack(), selfId: socket.id });
    socket.emit('mapData', MapControler_1.MapController.getMapPack("forest"));
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