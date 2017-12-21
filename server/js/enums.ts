export enum WeaponType { knife = 0, pistol = 1, shotgun = 2, rifle = 3, flamethrower = 4, claws = 20 };
export enum WeaponAmmoType { pistol = 1001, shotgun = 1002, rifle = 1003, flamethrower = 1004 };
export enum ItemType { knife = 0, pistol = 1, shotgun = 2, rifle = 3, flamethrower = 4, medicalkit = 101 };
export enum UpgradeCategory { item = 0, ammo = 1}
export enum TerrainMaterial { dirt = 1, water = 2, stone = 3, darkdirt = 4 }
export enum TerrainMaterialWithoutWater { dirt = 1, stone =3, darkdirt = 4 }
export enum Orientation { up = 0, right = 1, down = 2, left = 3 }
export enum CornerOrientation { RU = 0, RD = 1, LD = 2, LU = 3 }
export enum ParticleType { fire = 0 };
export enum AttackType { bullet = 0, fire = 1, contact = 2 };
export enum ActorStartingPack { BASIC = 0, MODERATE = 1, FULL = 2 };

export enum MapObjectType { GR_LU = 1, GR_LD = 2, GR_RU = 3, GR_RD = 4, GR_L = 5, GR_R = 6,
GR_D = 7, GR_U = 8, GR_EU = 9, GR_ED = 10, GR_EL = 11, GR_ER = 12, SS = 13, RO = 14, FM_L = 15, FM_M = 16, FM_R = 17 }



export function randomEnum (myEnum) {
    const enumValues = Object.keys(myEnum)
    .map(n => Number.parseInt(n))
    .filter(n => !Number.isNaN(n));

    const randomIndex = getRandomInt(0, enumValues.length);
    
    return enumValues[randomIndex];
}

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }