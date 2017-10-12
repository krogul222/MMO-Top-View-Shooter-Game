Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
class Item {
    constructor(id, name, event, add, remove, info) {
        this.id = id;
        this.name = name;
        this.event = event;
        this.add = add;
        this.remove = remove;
        this.info = info;
        Item.list[this.id] = this;
    }
}
Item.list = {};
exports.Item = Item;
new Item("medicalkit", "Medical Kit", function (player) {
    player.lifeAndBodyController.heal(10);
    player.inventory.removeItem("medicalkit", 1);
}, function (actor, amount) { }, function (actor, amount) { }, function (actor) {
    return "";
});
new Item(enums_1.WeaponType.pistol, "Pistol", function (actor) {
    actor.attackController.equip(enums_1.WeaponType.pistol);
}, function (actor, amount) {
    actor.attackController.weaponCollection.addWeapon(enums_1.WeaponType.pistol, amount);
}, function (actor, amount) {
    actor.attackController.weaponCollection.removeWeapon(enums_1.WeaponType.pistol, amount);
}, function (actor) {
});
new Item(enums_1.WeaponType.knife, "Knife", function (actor) {
    actor.attackController.equip(enums_1.WeaponType.knife);
}, function (actor, amount) {
    actor.attackController.weaponCollection.addWeapon(enums_1.WeaponType.knife, amount);
}, function (actor, amount) {
    actor.attackController.weaponCollection.removeWeapon(enums_1.WeaponType.knife, amount);
}, function (actor) {
});
new Item(enums_1.WeaponType.shotgun, "Shotgun", function (actor) {
    actor.attackController.equip(enums_1.WeaponType.shotgun);
}, function (actor, amount) {
    actor.attackController.weaponCollection.addWeapon(enums_1.WeaponType.shotgun, amount);
}, function (actor, amount) {
    actor.attackController.weaponCollection.removeWeapon(enums_1.WeaponType.shotgun, amount);
}, function (actor) {
});
new Item(enums_1.WeaponType.rifle, "Rifle", function (actor) {
    actor.attackController.equip(enums_1.WeaponType.rifle);
}, function (actor, amount) {
    actor.attackController.weaponCollection.addWeapon(enums_1.WeaponType.rifle, amount);
}, function (actor, amount) {
    actor.attackController.weaponCollection.removeWeapon(enums_1.WeaponType.rifle, amount);
}, function (actor) {
});
new Item(enums_1.WeaponType.claws, "Claws", function (actor) {
    actor.attackController.equip(enums_1.WeaponType.claws);
}, function (actor, amount) {
    actor.attackController.weaponCollection.addWeapon(enums_1.WeaponType.claws, amount);
}, function (actor, amount) {
    actor.attackController.weaponCollection.removeWeapon(enums_1.WeaponType.claws, amount);
}, function (actor) {
});
//# sourceMappingURL=Item.js.map