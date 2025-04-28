function locate_tiles () {
    locateX = 0
    locateY = 0
    game.splash("Saving world...", "Do not turn the power off or modify the world")
    list22.pop()
    for (let index = 0; index < 18 * 12; index++) {
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(locateX, locateY), assets.tile`0`)) {
            list22.push(0)
        } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(locateX, locateY), assets.tile`1`)) {
            list22.push(1)
        } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(locateX, locateY), assets.tile`myTile`)) {
            list22.push(2)
        } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(locateX, locateY), assets.tile`myTile0`)) {
            list22.push(3)
        } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(locateX, locateY), assets.tile`myTile1`)) {
            list22.push(4)
        } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(locateX, locateY), assets.tile`myTile2`)) {
            list22.push(5)
        } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(locateX, locateY), assets.tile`transparency16`)) {
            list22.push(6)
        } else {
        	
        }
        if (locateX == 17) {
            locateX = 0
            locateY += 1
        } else {
            locateX += 1
        }
    }
    console.log(list22)
    blockSettings.writeNumberArray("world", list22)
    game.setGameOverScoringType(game.ScoringType.None)
    game.setGameOverMessage(true, "World Saved!")
    game.gameOver(true)
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(story.isMenuOpen())) {
        music.play(music.melodyPlayable(music.knock), music.PlaybackMode.UntilDone)
        if (item == 0) {
            tiles.setTileAt(my_sprite.tilemapLocation(), assets.tile`0`)
        } else if (item == 1) {
            tiles.setTileAt(my_sprite.tilemapLocation(), assets.tile`1`)
        } else if (item == 2) {
            tiles.setTileAt(my_sprite.tilemapLocation(), assets.tile`myTile`)
        } else if (item == 3) {
            tiles.setTileAt(my_sprite.tilemapLocation(), assets.tile`myTile0`)
        } else if (item == 4) {
            tiles.setTileAt(my_sprite.tilemapLocation(), assets.tile`myTile1`)
        } else if (item == 5) {
            tiles.setTileAt(my_sprite.tilemapLocation(), assets.tile`myTile2`)
        } else if (item == 6) {
            tiles.setTileAt(my_sprite.tilemapLocation(), assets.tile`transparency16`)
        } else {
        	
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(story.isMenuOpen())) {
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        if (item == 6) {
            item = 0
        } else {
            item += 1
        }
        info.setScore(item)
    }
})
controller.combos.attachCombo("U+RL+D", function () {
    if (!(story.isMenuOpen())) {
        locate_tiles()
    }
})
function setup () {
    if (blockSettings.exists("world")) {
        load_world()
    } else {
        story.showPlayerChoices("Template 1", "Template 2")
        if (story.checkLastAnswer("Template 2")) {
            scene.setTileMapLevel(tilemap`
                level1
                `)
        } else {
            tiles.setCurrentTilemap(tilemap`level`)
        }
    }
    scene.setBackgroundColor(9)
    my_sprite = sprites.create(img`
        . . . . . f f f f f f f . . . . . 
        . . . f f 1 1 1 1 1 1 1 f f . . . 
        . . f 1 1 f f f 1 f f f 1 1 f . . 
        . f 1 f f . . f 1 f . . f f 1 f . 
        . f 1 f . . . f 1 f . . . f 1 f . 
        f 1 f . . . . f 1 f . . . . f 1 f 
        f 1 f . . . . f 1 f . . . . f 1 f 
        f 1 f f f f f f 1 f f f f f f 1 f 
        f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
        f 1 f f f f f f 1 f f f f f f 1 f 
        f 1 f . . . . f 1 f . . . . f 1 f 
        f 1 f . . . . f 1 f . . . . f 1 f 
        . f 1 f . . . f 1 f . . . f 1 f . 
        . f 1 f f . . f 1 f . . f f 1 f . 
        . . f 1 1 f f f 1 f f f 1 1 f . . 
        . . . f f 1 1 1 1 1 1 1 f f . . . 
        . . . . . f f f f f f f . . . . . 
        `, SpriteKind.Player)
    controller.moveSprite(my_sprite, 100, 100)
    scene.cameraFollowSprite(my_sprite)
}
function load_world () {
    tiles.setCurrentTilemap(tilemap`level3`)
    load_item = 0
    list2 = blockSettings.readNumberArray("world")
    for (let index = 0; index < 18 * 12; index++) {
        if (list2[load_item] == 0) {
            tiles.setTileAt(tiles.getTileLocation(locateX, locateY), assets.tile`0`)
        } else if (list2[load_item] == 1) {
            tiles.setTileAt(tiles.getTileLocation(locateX, locateY), assets.tile`1`)
        } else if (list2[load_item] == 2) {
            tiles.setTileAt(tiles.getTileLocation(locateX, locateY), assets.tile`myTile`)
        } else if (list2[load_item] == 3) {
            tiles.setTileAt(tiles.getTileLocation(locateX, locateY), assets.tile`myTile0`)
        } else if (list2[load_item] == 4) {
            tiles.setTileAt(tiles.getTileLocation(locateX, locateY), assets.tile`myTile1`)
        } else if (list2[load_item] == 5) {
            tiles.setTileAt(tiles.getTileLocation(locateX, locateY), assets.tile`myTile2`)
        } else if (list2[load_item] == 6) {
            tiles.setTileAt(tiles.getTileLocation(locateX, locateY), assets.tile`transparency16`)
        } else {
        	
        }
        load_item += 1
        if (locateX == 17) {
            locateX = 0
            locateY += 1
        } else {
            locateX += 1
        }
    }
}
let list2: number[] = []
let load_item = 0
let my_sprite: Sprite = null
let item = 0
let list22: number[] = []
let locateX = 0
let locateY = 0
locateY = 0
locateX = 0
list22 = []
music.play(music.createSong(hex`00780004080200`), music.PlaybackMode.InBackground)
game.showLongText("Paper craft 1.0.1 Arcade Edition", DialogLayout.Top)
story.showPlayerChoices("New game", "Continue")
if (story.checkLastAnswer("New game")) {
    game.showLongText("Arrows to move, B to place, A to change, up+right then left+down to save. Materials(shown as the score):0=dirt  1=grass 2=water 3=planks 4=wood 5=leaves 6=air", DialogLayout.Full)
    blockSettings.clear()
} else {
	
}
setup()
info.setScore(item)
controller.combos.setTriggerType(TriggerType.Continuous)
