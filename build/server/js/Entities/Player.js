Object.defineProperty(exports, "__esModule", { value: true });
const Upgrade_1 = require("./Upgrade");
const GameController_1 = require("./../Controllers/GameController");
const Smoke_1 = require("./../Effects/Smoke");
const globalVariables_1 = require("./../globalVariables");
const Enemy_1 = require("./Enemy");
const Actor_1 = require("./Actor");
const GeometryAndPhysics_1 = require("./../GeometryAndPhysics");
const enums_1 = require("../enums");
const MapControler_1 = require("../Controllers/MapControler");
class Player extends Actor_1.Actor {
    constructor(param) {
        super(param);
        this.updatePack = {};
        this.counter = 0;
        this.fragPlayer = 0;
        this.fragEnemy = 0;
        this.updateFreqyencyFactor = 0;
        this.giveItems = (startingPack) => {
            if (startingPack >= enums_1.ActorStartingPack.BASIC) {
                this.inventory.addItem(enums_1.ItemType.knife, 1);
                this.inventory.addItem(enums_1.ItemType.pistol, 1);
                this.attackController.weaponCollection.setWeaponAmmo(enums_1.WeaponType.pistol, 50);
                this.inventory.useItem(enums_1.WeaponType.pistol);
            }
            if (startingPack >= enums_1.ActorStartingPack.MODERATE) {
                this.inventory.addItem(enums_1.ItemType.shotgun, 1);
                this.inventory.addItem(enums_1.ItemType.rifle, 1);
                this.inventory.addItem(enums_1.ItemType.medicalkit, 2);
                this.attackController.weaponCollection.setWeaponAmmo(enums_1.WeaponType.shotgun, 40);
                this.attackController.weaponCollection.setWeaponAmmo(enums_1.WeaponType.pistol, 100);
                this.attackController.weaponCollection.setWeaponAmmo(enums_1.WeaponType.rifle, 40);
                this.inventory.useItem(enums_1.WeaponType.shotgun);
            }
            if (startingPack >= enums_1.ActorStartingPack.FULL) {
                this.inventory.addItem(enums_1.ItemType.flamethrower, 1);
                this.inventory.addItem(enums_1.ItemType.medicalkit, 2);
                this.attackController.weaponCollection.setWeaponAmmo(enums_1.WeaponType.shotgun, 100);
                this.attackController.weaponCollection.setWeaponAmmo(enums_1.WeaponType.pistol, 200);
                this.attackController.weaponCollection.setWeaponAmmo(enums_1.WeaponType.rifle, 100);
                this.attackController.weaponCollection.setWeaponAmmo(enums_1.WeaponType.flamethrower, 400);
                this.inventory.useItem(enums_1.WeaponType.shotgun);
            }
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
                burn: this.lifeAndBodyController.burn,
                fragPlayer: this.fragPlayer,
                fragEnemy: this.fragEnemy
            };
        };
        this.extendedUpdate = () => {
            this.update();
            this.counter++;
            if (this.counter % (30 + this.updateFreqyencyFactor)) {
                this.closeEnemiesArr = this.closeEnemies(800);
                this.closeUpgradesArr = this.closeUpgrades(800);
                this.updateFreqyencyFactor = Math.floor(20 * Math.random());
            }
        };
        this.getCloseEnemies = () => {
            return this.closeEnemiesArr;
        };
        this.getCloseUpgrades = () => {
            return this.closeUpgradesArr;
        };
        this.incFragPlayer = () => {
            this.fragPlayer++;
        };
        this.incFragEnemy = () => {
            this.fragEnemy++;
        };
        this.getUpdatePack = () => {
            let attackStartedTmp = this.attackController.attackStarted;
            this.attackController.attackStarted = false;
            let newPack = {};
            this.updatePack['id'] = this.id;
            newPack['id'] = this.id;
            if (this.updatePack['position'] !== this.position) {
                newPack['position'] = this.position;
                this.updatePack['position'] = new GeometryAndPhysics_1.Point(this.position.x, this.position.y);
            }
            if (this.updatePack['hp'] !== this.lifeAndBodyController.hp) {
                newPack['hp'] = this.lifeAndBodyController.hp;
                this.updatePack['hp'] = this.lifeAndBodyController.hp;
            }
            if (this.updatePack['moving'] !== this.movementController.moving) {
                newPack['moving'] = this.movementController.moving;
                this.updatePack['moving'] = this.movementController.moving;
            }
            if (this.updatePack['aimAngle'] !== this.movementController.aimAngle) {
                newPack['aimAngle'] = this.movementController.aimAngle;
                this.updatePack['aimAngle'] = this.movementController.aimAngle;
            }
            if (this.updatePack['attackStarted'] !== attackStartedTmp) {
                newPack['attackStarted'] = attackStartedTmp;
                this.updatePack['attackStarted'] = attackStartedTmp;
            }
            if (this.updatePack['weapon'] !== this.attackController.activeWeapon.name) {
                newPack['weapon'] = this.attackController.activeWeapon.name;
                this.updatePack['weapon'] = this.attackController.activeWeapon.name;
            }
            if (this.updatePack['attackMelee'] !== this.attackController.melee) {
                newPack['attackMelee'] = this.attackController.melee;
                this.updatePack['attackMelee'] = this.attackController.melee;
            }
            if (this.updatePack['ammo'] !== this.attackController.activeWeapon.ammo) {
                newPack['ammo'] = this.attackController.activeWeapon.ammo;
                this.updatePack['ammo'] = this.attackController.activeWeapon.ammo;
            }
            if (this.updatePack['ammoInGun'] !== this.attackController.activeWeapon.ammoInGun) {
                newPack['ammoInGun'] = this.attackController.activeWeapon.ammoInGun;
                this.updatePack['ammoInGun'] = this.attackController.activeWeapon.ammoInGun;
            }
            if (this.updatePack['reload'] !== this.attackController.reloadCounter.isActive()) {
                newPack['reload'] = this.attackController.reloadCounter.isActive();
                this.updatePack['reload'] = this.attackController.reloadCounter.isActive();
            }
            if (this.updatePack['pressingAttack'] !== this.attackController.pressingAttack) {
                newPack['pressingAttack'] = this.attackController.pressingAttack;
                this.updatePack['pressingAttack'] = this.attackController.pressingAttack;
            }
            if (this.updatePack['burn'] !== this.lifeAndBodyController.burn) {
                newPack['burn'] = this.lifeAndBodyController.burn;
                this.updatePack['burn'] = this.lifeAndBodyController.burn;
            }
            if (this.updatePack['fragPlayer'] !== this.fragPlayer) {
                newPack['fragPlayer'] = this.fragPlayer;
                this.updatePack['fragPlayer'] = this.fragPlayer;
            }
            if (this.updatePack['fragEnemy'] !== this.fragEnemy) {
                newPack['fragEnemy'] = this.fragEnemy;
                this.updatePack['fragEnemy'] = this.fragEnemy;
            }
            return newPack;
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
        this.closeEnemies = (distance) => {
            let ids = [];
            let e;
            if (GameController_1.GameController.list[this.game] !== undefined) {
                let enemies = GameController_1.GameController.list[this.game].enemies;
                for (let i in enemies) {
                    e = enemies[i];
                    if (Math.abs(e.position.x - this.position.x) < distance && Math.abs(e.position.y - this.position.y) < distance) {
                        ids.push(e.id);
                    }
                }
            }
            return ids;
        };
        this.closeUpgrades = (distance) => {
            let ids = [];
            let u;
            if (GameController_1.GameController.list[this.game] !== undefined) {
                let upgrades = GameController_1.GameController.list[this.game].upgrades;
                for (let i in upgrades) {
                    u = upgrades[i];
                    if (Math.abs(u.position.x - this.position.x) < distance && Math.abs(u.position.y - this.position.y) < distance) {
                        ids.push(u.id);
                    }
                }
            }
            return ids;
        };
        globalVariables_1.initPack.player.push(this.getInitPack());
        Player.list[param.id] = this;
        if (param.starterPack !== undefined)
            this.giveItems(param.starterPack);
        else
            this.giveItems(enums_1.ActorStartingPack.FULL);
        if (GameController_1.GameController.list[this.game] !== undefined) {
            GameController_1.GameController.list[this.game].initPack.player.push(this.getInitPack());
        }
        GameController_1.GameController.list[this.game].addPlayer(this);
    }
}
Player.onConnect = (socket, createdGame = false, gID = -1, data = {}) => {
    let game;
    let gameId = gID;
    if (createdGame == true) {
        if (data !== undefined) {
            game = new GameController_1.GameController(data);
        }
        else {
            game = new GameController_1.GameController({});
        }
        if (data.monstersnumber !== undefined) {
            let num = data.monstersnumber;
            for (let i = 0; i < num; i++) {
                Enemy_1.Enemy.randomlyGenerate(game);
            }
        }
        else {
            for (let i = 0; i < 40; i++) {
                Enemy_1.Enemy.randomlyGenerate(game);
            }
        }
        if (data.itemsnumber !== undefined) {
            let num = data.itemsnumber;
            for (let i = 0; i < num; i++) {
                Upgrade_1.Upgrade.randomlyGenerate(game);
            }
        }
        else {
            for (let i = 0; i < 20; i++) {
                Upgrade_1.Upgrade.randomlyGenerate(game);
            }
        }
        gameId = game.id;
    }
    else {
        game = GameController_1.GameController.list[gameId];
        gameId = game.id;
    }
    game.addSocket(socket);
    let map = game.map;
    let player = new Player({
        id: socket.id,
        maxSpdX: 12,
        maxSpdY: 12,
        map: map,
        game: gameId,
        img: 'player',
        atkSpd: 7,
        width: 50,
        height: 50,
        type: "player",
        hp: 40,
        socket: socket,
        starterPack: game.starterPack
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
            new Smoke_1.Smoke(new GeometryAndPhysics_1.Point(player.position.x - 128, player.position.y - 128), 150, 750, 20, player.game);
    });
    socket.on('PlayerLeftGame', function (data) {
        Player.onDisconnect(socket);
    });
    socket.emit('init', { player: Player.getAllSpecificInitPack(game.id), enemy: Enemy_1.Enemy.getAllSpecificInitPack(game.id), selfId: socket.id });
    socket.emit('mapData', MapControler_1.MapController.getMapPack(game.map));
};
Player.getAllInitPack = () => {
    let players = [];
    for (let i in Player.list) {
        players.push(Player.list[i].getInitPack());
    }
    return players;
};
Player.getAllSpecificInitPack = (game) => {
    let players = [];
    if (GameController_1.GameController.list[game] !== undefined) {
        let p = GameController_1.GameController.list[game].players;
        for (let i in p) {
            players.push(p[i].getInitPack());
        }
    }
    return players;
};
Player.onDisconnect = (socket) => {
    delete Player.list[socket.id];
    globalVariables_1.removePack.player.push(socket.id);
    console.log("Disconnect");
    for (let key in GameController_1.GameController.list) {
        let players = GameController_1.GameController.list[key].players;
        for (let i in players) {
            if (players[i].id == socket.id) {
                GameController_1.GameController.list[key].removePack.player.push(socket.id);
                delete GameController_1.GameController.list[key].socketList[socket.id];
            }
        }
    }
};
Player.update = () => {
    let pack = [];
    for (let i in Player.list) {
        let player = Player.list[i];
        player.extendedUpdate();
        pack.push(player.getUpdatePack());
    }
    return pack;
};
Player.updateSpecific = (players) => {
    let pack = [];
    for (let i in players) {
        let player = players[i];
        player.extendedUpdate();
        pack.push(player.getUpdatePack());
    }
    return pack;
};
Player.list = {};
exports.Player = Player;
//# sourceMappingURL=Player.js.map