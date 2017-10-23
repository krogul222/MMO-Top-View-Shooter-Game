import { ItemType, WeaponAmmoType, TerrainMaterial } from './enums';

export let imageName: any = {};
export let mapTileImageName: any = {};

imageName[ ItemType.pistol ] = "pistol";
//imageName[ ItemType.claws ] = "claws";
imageName[ ItemType.shotgun ] = "shotgun";
imageName[ ItemType.rifle ] = "rifle";
imageName[ ItemType.medicalkit ] = "medicalkit";
imageName[ ItemType.knife ] = "knife";

//imageName[ WeaponAmmoType.knife ] = "knifeammo";
imageName[ WeaponAmmoType.pistol ] = "pistolammo";
imageName[ WeaponAmmoType.shotgun ] = "shotgunammo";
imageName[ WeaponAmmoType.rifle ] = "rifleammo";

mapTileImageName[ TerrainMaterial.grass ] = "grass";
mapTileImageName[ TerrainMaterial.dirt ] = "dirt";