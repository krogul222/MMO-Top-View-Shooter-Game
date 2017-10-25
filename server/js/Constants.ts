import { ItemType, WeaponAmmoType, TerrainMaterial, Orientation, CornerOrientation } from './enums';

export let imageName: any = {};
export let mapTileImageName: any = {};
export let mapTileSideImageName: any = {}; 
export let mapTileCornerImageName: any = {}; 

export const GAME_SPEED_TOOLINGFACTOR = 0.75;

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

//mapTileImageName[ TerrainMaterial.grass ] = "grass";
mapTileImageName[ TerrainMaterial.dirt ] = "dirt";
mapTileImageName[ TerrainMaterial.water ] = "water";
mapTileImageName[ TerrainMaterial.stone ] = "stone";

mapTileSideImageName[Orientation.left] = {};
mapTileSideImageName[Orientation.left][TerrainMaterial.stone] = "stoneL"; 
mapTileSideImageName[Orientation.left][TerrainMaterial.dirt] = "dirtL"; 
mapTileSideImageName[Orientation.left][TerrainMaterial.water] = "waterL"; 

mapTileSideImageName[Orientation.right] = {};
mapTileSideImageName[Orientation.right][TerrainMaterial.stone] = "stoneR"; 
mapTileSideImageName[Orientation.right][TerrainMaterial.dirt] = "dirtR"; 
mapTileSideImageName[Orientation.right][TerrainMaterial.water] = "waterR"; 

mapTileSideImageName[Orientation.up] = {};
mapTileSideImageName[Orientation.up][TerrainMaterial.stone] = "stoneU"; 
mapTileSideImageName[Orientation.up][TerrainMaterial.dirt] = "dirtU";
mapTileSideImageName[Orientation.up][TerrainMaterial.water] = "waterU";

mapTileSideImageName[Orientation.down] = {};
mapTileSideImageName[Orientation.down][TerrainMaterial.stone] = "stoneD"; 
mapTileSideImageName[Orientation.down][TerrainMaterial.dirt] = "dirtD";
mapTileSideImageName[Orientation.down][TerrainMaterial.water] = "waterD";

mapTileCornerImageName[CornerOrientation.RU] = {};
mapTileCornerImageName[CornerOrientation.RU][TerrainMaterial.stone] = "stoneRU"; 
mapTileCornerImageName[CornerOrientation.RU][TerrainMaterial.dirt] = "dirtRU";
mapTileCornerImageName[CornerOrientation.RU][TerrainMaterial.water] = "waterRU";

mapTileCornerImageName[CornerOrientation.RD] = {};
mapTileCornerImageName[CornerOrientation.RD][TerrainMaterial.stone] = "stoneRD"; 
mapTileCornerImageName[CornerOrientation.RD][TerrainMaterial.dirt] = "dirtRD";
mapTileCornerImageName[CornerOrientation.RD][TerrainMaterial.water] = "waterRD";

mapTileCornerImageName[CornerOrientation.LU] = {};
mapTileCornerImageName[CornerOrientation.LU][TerrainMaterial.stone] = "stoneLU"; 
mapTileCornerImageName[CornerOrientation.LU][TerrainMaterial.dirt] = "dirtLU";
mapTileCornerImageName[CornerOrientation.LU][TerrainMaterial.water] = "waterLU";

mapTileCornerImageName[CornerOrientation.LD] = {};
mapTileCornerImageName[CornerOrientation.LD][TerrainMaterial.stone] = "stoneLD"; 
mapTileCornerImageName[CornerOrientation.LD][TerrainMaterial.dirt] = "dirtLD";
mapTileCornerImageName[CornerOrientation.LD][TerrainMaterial.water] = "waterLD";