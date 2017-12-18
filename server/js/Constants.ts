import { ItemType, WeaponAmmoType, TerrainMaterial, Orientation, CornerOrientation, MapObjectType } from './enums';

export let imageName: any = {};
export let mapTileImageName: any = {};
export let mapTileSideImageName: any = {}; 
export let mapTileCornerImageName: any = {}; 
export let mapObjectImageName: any = {}; 
export let mapObjectCollisions: any = {}; 

export const GAME_SPEED_TOOLINGFACTOR = 0.75;
export const TILE_SIZE = 8;
export const STICKY_THRESHOLD = 0.01;

imageName[ ItemType.pistol ] = "pistol";
//imageName[ ItemType.claws ] = "claws";
imageName[ ItemType.shotgun ] = "shotgun";
imageName[ ItemType.rifle ] = "rifle";
imageName[ ItemType.medicalkit ] = "medicalkit";
imageName[ ItemType.knife ] = "knife";
imageName[ ItemType.flamethrower ] = "flamethrower";

//imageName[ WeaponAmmoType.knife ] = "knifeammo";
imageName[ WeaponAmmoType.pistol ] = "pistolammo";
imageName[ WeaponAmmoType.shotgun ] = "shotgunammo";
imageName[ WeaponAmmoType.rifle ] = "rifleammo";
imageName[ WeaponAmmoType.flamethrower ] = "flamethrowerammo";

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

//------------------------------------------------
mapObjectImageName[MapObjectType.GR_D] = "groundRingD";
mapObjectImageName[MapObjectType.GR_U] = "groundRingU";
mapObjectImageName[MapObjectType.GR_L] = "groundRingL";
mapObjectImageName[MapObjectType.GR_R] = "groundRingR";
mapObjectImageName[MapObjectType.GR_RU] = "groundRingRU";
mapObjectImageName[MapObjectType.GR_LU] = "groundRingLU";
mapObjectImageName[MapObjectType.GR_RD] = "groundRingRD";
mapObjectImageName[MapObjectType.GR_LD] = "groundRingLD";
mapObjectImageName[MapObjectType.GR_EU] = "groundRingUenter";
mapObjectImageName[MapObjectType.GR_ED] = "groundRingDenter";
mapObjectImageName[MapObjectType.GR_EL] = "groundRingLenter";
mapObjectImageName[MapObjectType.GR_ER] = "groundRingRenter";
//--------------------------------------------------------

mapObjectCollisions[MapObjectType.GR_D] = [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 2,2,2,2,2,2,2,2, 2,2,2,2,2,2,2,2]; 
mapObjectCollisions[MapObjectType.GR_U] = [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 2,2,2,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0];
mapObjectCollisions[MapObjectType.GR_L] = [0,0,0,0,0,2,0,0, 0,0,0,0,0,2,0,0, 0,0,0,0,0,2,0,0, 0,0,0,0,0,2,0,0, 0,0,0,0,0,2,0,0, 0,0,0,0,0,2,0,0, 0,0,0,0,0,2,0,0, 0,0,0,0,0,2,0,0];
mapObjectCollisions[MapObjectType.GR_R] = [0,0,2,0,0,0,0,0, 0,0,2,0,0,0,0,0, 0,0,2,0,0,0,0,0, 0,0,2,0,0,0,0,0, 0,0,2,0,0,0,0,0, 0,0,2,0,0,0,0,0, 0,0,2,0,0,0,0,0, 0,0,2,0,0,0,0,0];

mapObjectCollisions[MapObjectType.GR_RD] = [0,0,2,0,0,0,0,0, 0,0,2,0,0,0,0,0, 0,0,2,0,0,0,0,0, 0,0,2,0,0,0,0,0, 0,0,2,0,0,0,0,0, 0,2,2,0,0,0,0,0, 2,2,0,0,0,0,0,0, 2,0,0,0,0,0,0,0];
mapObjectCollisions[MapObjectType.GR_LD] = [0,0,0,0,0,2,0,0, 0,0,0,0,0,2,0,0, 0,0,0,0,0,2,0,0, 0,0,0,0,0,2,0,0, 0,0,0,0,0,2,0,0, 0,0,0,0,0,2,2,0, 0,0,0,0,0,0,2,2, 0,0,0,0,0,0,0,2];
mapObjectCollisions[MapObjectType.GR_RU] = [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 2,0,0,0,0,0,0,0, 2,2,0,0,0,0,0,0, 0,2,2,0,0,0,0,0, 0,0,2,0,0,0,0,0, 0,0,2,0,0,0,0,0, 0,0,2,0,0,0,0,0];
mapObjectCollisions[MapObjectType.GR_LU] = [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,2, 0,0,0,0,0,0,2,2, 0,0,0,0,0,2,2,0, 0,0,0,0,0,2,0,0, 0,0,0,0,0,2,0,0, 0,0,0,0,0,2,0,0];

mapObjectCollisions[MapObjectType.GR_EU] = [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 2,2,2,1,1,2,2,2, 0,0,0,1,1,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0];
mapObjectCollisions[MapObjectType.GR_ED] = [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,1,1,0,0,0, 2,2,2,1,1,2,2,2, 2,2,2,1,1,2,2,2];
mapObjectCollisions[MapObjectType.GR_EL] = [0,0,0,0,0,2,0,0, 0,0,0,0,0,2,0,0, 0,0,0,0,0,2,0,0, 0,0,0,0,0,1,1,0, 0,0,0,0,0,1,1,0, 0,0,0,0,0,2,0,0, 0,0,0,0,0,2,0,0, 0,0,0,0,0,2,0,0];
mapObjectCollisions[MapObjectType.GR_ER] = [0,0,2,0,0,0,0,0, 0,0,2,0,0,0,0,0, 0,0,2,0,0,0,0,0, 0,1,1,0,0,0,0,0, 0,1,1,0,0,0,0,0, 0,0,2,0,0,0,0,0, 0,0,2,0,0,0,0,0, 0,0,2,0,0,0,0,0];
