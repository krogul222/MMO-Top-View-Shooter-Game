export enum WeaponType { knife = 0, pistol = 1, shotgun = 2, rifle = 3, claws = 20 };
export enum WeaponAmmoType { pistol = 1001, shotgun = 1002, rifle = 1003 };
export enum ItemType { knife = 0, pistol = 1, shotgun = 2, rifle = 3, medicalkit = 101 };
export enum UpgradeCategory { item = 0, ammo = 1}

export function randomEnum (myEnum) {
    const enumValues = Object.keys(myEnum)
    .map(n => Number.parseInt(n))
    .filter(n => !Number.isNaN(n));

    const randomIndex = getRandomInt(0, enumValues.length);
    
    return enumValues[randomIndex];
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }