// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile3 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile6 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile5 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile4 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level3":
            case "level3":return tiles.createTilemap(hex`12000c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`, img`
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
`, [myTiles.transparency16], TileScale.Sixteen);
            case "level1":
            case "level1":return tiles.createTilemap(hex`12000c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005050000000000000000000000000000000505050500000000000000000000000000000505050500000000000000000000000000000004040000000000000000000000000000010102020101010303030101010101010101020202020202020303030202020202020202020202020202020303030202020202020202020202020202020303030202020202020202020202020202020303030202020202020202`, img`
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
`, [myTiles.transparency16,myTiles.tile1,myTiles.tile2,myTiles.tile3,myTiles.tile5,myTiles.tile6], TileScale.Sixteen);
            case "level":
            case "level2":return tiles.createTilemap(hex`12000c00000005050505050500000000000000000000000005040404040500000000000000000000000005040404040500000000000000000000000005040404040500000000000000000000000005030303030500000000000000000000000005050605050500000000000000000000000005040406040500000000000000000000000005040404060500000000000000000000000005040406040500000000000000000000000005040604040500000000000000000000000005060404040500000000000000000000010102020202020201010101010101010101`, img`
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . 
`, [myTiles.transparency16,myTiles.tile1,myTiles.tile2,myTiles.tile3,myTiles.tile4,myTiles.tile5,myTiles.tile6], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "1":
            case "tile1":return tile1;
            case "0":
            case "tile2":return tile2;
            case "myTile":
            case "tile3":return tile3;
            case "myTile2":
            case "tile6":return tile6;
            case "myTile1":
            case "tile5":return tile5;
            case "myTile0":
            case "tile4":return tile4;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
