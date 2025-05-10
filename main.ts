controller.combos.attachCombo("U+RL+D", function () {
    if (!(story.isMenuOpen())) {
        locate_tiles()
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (In_game == 1 && !(controller.B.isPressed())) {
        if (my_sprite.isHittingTile(CollisionDirection.Bottom) || tiles.tileAtLocationEquals(my_sprite.tilemapLocation(), assets.tile`myTile`)) {
            music.play(music.createSoundEffect(
            WaveShape.Sine,
            400,
            600,
            255,
            0,
            100,
            SoundExpressionEffect.None,
            InterpolationCurve.Linear
            ), music.PlaybackMode.InBackground)
            my_sprite.vy = -175
        }
    }
})
function locate_tiles () {
    scene.centerCameraAt(0, 0)
    locateX = 0
    locateY = 0
    list22.pop()
    for (let index = 0; index < 50 * 30; index++) {
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
        } else if (tiles.tileAtLocationEquals(tiles.getTileLocation(locateX, locateY), assets.tile`myTile3`)) {
            list22.push(7)
        } else {
        	
        }
        if (locateX == 49) {
            locateX = 0
            locateY += 1
        } else {
            locateX += 1
        }
    }
    console.log(list22)
    blockSettings.writeNumberArray("world", list22)
    game.showLongText("World saved", DialogLayout.Center)
    game.reset()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (In_game == 1) {
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
        if (item == 7) {
            item = 0
        } else {
            item += 1
        }
        my_sprite.sayText(text_list[item], 5000, false)
    }
})
function setup () {
    if (blockSettings.exists("world")) {
        load_world()
    } else {
        story.showPlayerChoices("Template 1", "Template 2", "Blank")
        if (story.checkLastAnswer("Template 2")) {
            scene.setTileMapLevel(tilemap`
                level1
                `)
        } else if (story.checkLastAnswer("Template 1")) {
            tiles.setCurrentTilemap(tilemap`level`)
        } else {
            tiles.setCurrentTilemap(tilemap`level3`)
        }
    }
    my_sprite = sprites.create(img`
        . . . . 7 7 7 . . . . 
        . . . 7 7 7 7 7 . . . 
        . . . . f d f . . . . 
        . . . . d d d . . . . 
        . . 9 9 9 9 9 9 9 . . 
        . . 9 9 9 9 9 9 9 . . 
        . . d 9 9 9 9 9 d . . 
        . . d 9 9 9 9 9 d . . 
        . . d 9 9 9 9 9 d . . 
        . . . 9 9 9 9 9 . . . 
        . . . 8 8 8 8 8 . . . 
        . . . 8 8 8 8 8 . . . 
        . . . 8 8 . 8 8 . . . 
        . . . 8 8 . 8 8 . . . 
        . . . 8 8 . 8 8 . . . 
        . . e e e . e e e . . 
        `, SpriteKind.Player)
    scene.cameraFollowSprite(my_sprite)
    controller.moveSprite(my_sprite, 100, 0)
    my_sprite.ay = 400
}
function backToMenu () {
    color.startFadeFromCurrent(color.Black, 500)
    pause(1000)
    color.startFadeFromCurrent(color.originalPalette, 500)
    text_list = [
    "Dirt",
    "Grass",
    "Water",
    "Planks",
    "Trunk",
    "Leaves",
    "Air",
    "Stone"
    ]
    yellow_texts = [
    "Arcade!",
    "Simple, isn't it?",
    "Minecraft but not Minecraft",
    "Anyone plays this?",
    "Completely free",
    "Das ist nicht in Deutsch",
    "Who reads this?",
    "2D",
    "The player is YOU",
    "New gameplay",
    "Build, jumped, swum",
    "1.1!",
    "U hear me?",
    "This sounds good"
    ]
    locateY = 0
    locateX = 0
    In_game = 0
    list22 = []
    music.play(music.createSong(hex`
                        00780004080200
                        `), music.PlaybackMode.InBackground)
    textSprite = textsprite.create(yellow_texts[randint(0, yellow_texts.length - 1)], 0, 5)
    textSprite.setPosition(80, 100)
    textSprite.left = 0
    textSprite.setMaxFontHeight(6)
    textSprite.setOutline(1, 4)
    scene.setBackgroundImage(img`
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeee111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeee11111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeee1111111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeee1111e111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeee111eee111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeee111eeeee11111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeee1111eeeee1111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeee1111eeeeee111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee1111eeeeeeeeeeeeeeeeeeeee111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeee111eeeeee111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee11111111eeeeeeeeeeeeee11111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeee111eeeeee111eeeeeeeeeeeeeeeeeeeeeeeeeeeeee1111111111eeeeeeeeee11111111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeee111111111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeee1111111111eeeeeeeee111111111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeee111111111111eeeeee11111eeeeeeeee111111eeee111eee1111eeeeeeeee1111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeee11111111111eeeeee11111111eeeeeee111111eeee1111111111eeeeeeee11111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeee1111eeeeeeeeeeee111111111eeeeeee1111111eee1111111111eeeeeeee1111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeee1111eeeeeeeeeeee1111ee111eeeeeee11111111ee11111111eeeeeeeeee111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeee111eeeeeeeeeee1111eee1111eeeeee111e1111ee111eeeeeeeeeeeeeee111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeee111eeeeeeeeeee1111eee1111eeeeee11111111ee1111eeeeeeeeeeeeee111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeee111eeeeeeeeeee111eee111111eeeee11111111ee11111eeeeeeeeeeeee111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeee111eeeeeeeeeee111eee111111eeeee11111111eee11111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeee111eeeeeeeeeee111ee11111111eeee111eeeeeeeee111111111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeee111eeeeeeeeeee111e111111111eeee111eeeeeeeeee11111111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee11111111ee1111eee111eeeeeeeeeee1111111111eeeeeeeeeeeeeeeeeeeeee11111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee1111111eee1111eee1111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee11111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee11111eeee1111eee1111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee11111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee11111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee11111ee1111111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee111eeeeeeeeeeeeeeeee11111111111111eeee11111111111111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeee1111111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee111eeeeeeeeeeeeeee1111111111111111eeee11111111111111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeee111111111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee11111111111111111eeee11111111111111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeee1111111111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee11111111111111111eeee11111111111111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeee11111111111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee111111111111111111eeeee111111111111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeee1111111111111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee111111111eeeeeeeeeeeeeeeeeeeee11111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeee1111111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee1111111eeeeeeeeeeeeeeeeeeeeeee11111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeee111111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee1111111eeeeeeeeeeeeeeeeeeeeeee11111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeee11111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee11111eeeeeeeeee11111111111111111eeeeeeeeeeeee11111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eee11111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee111111111111eeeeeeeeee11111111111111111eeeeeeeeeeeee11111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eee1111111eeeeeeeeeeeeeeeeeeeeeee111111111eeee11111111111111eeeeeeeeee11111111111111111eeeeeeeeeeeee11111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        ee1111111eeeeeeeeeeeeeeeeeeeeee11111111111eee1111111111111111eeeeeeeee11111111111111111eeeeeeeeeeeee11111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        ee1111111eeeeeeeeeeeeeeeeeee11111111111111eee1111111111111111eeeeeeeee11111111111111111eeeeeeeeeeeee11111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        ee111111eeeeeeeeeeeeeeeeeee111111111111111ee11111111111111111eeeeeeeee11111eeeeeeeeeeeeeeeeeeeeeeeee11111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        ee111111eeeeeeeeeeeeeeeeeee111111111111111ee11111111ee1111111eeeeeeeee11111eeeeeeeeeeeeeeeeeeeeeeeee11111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        ee111111eeeeeeeeeeeeeeeeeee1111111111eeeeeee111111eeee11111111eeeeeeee11111eeeeeeeeeeeeeeeeeeeeeeeee11111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        ee111111eeeeeeeeeeeeeeeeeee11111111eeeeeeeee111111eeee111111111eeeeeee11111eeeeeeeeeeeeeeeeeeeeeeeee11111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        ee1111111eeeeeeeeeeeeeeeeee11111eeeeeeeeeeee11111eeeee111111111eeeeeee11111eeeeeeeeeeeeeeeeeeeeeeeee11111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        ee11111111eeeeeeeeeeeeeeeee11111eeeeeeeeeeee11111eeeee111111111eeeeeee11111eeeeeeeeeeeeeeeeeeeeeeeee11111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eee11111111eeeeeeeeeeeeeeee11111eeeeeeeeeeee111111eee11111111111eeeeee11111eeeeeeeeeeeeeeeeeeeeeeeee11111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eee111111111eeeeeeeeeeeeeee11111eeeeeeeeeeee1111111ee11111111111eeeeee11111eeeeeeeeeeeeeeeeeeeeeeeee111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeee111111111eeeeeeeeeeeeee11111eeeeeeeeeeee1111111e1111111111111eeeee11111eeeeeeeeeeeeeeeeeeeeeeeee1111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeee11111111111111111111ee11111eeeeeeeeeeee111111111111111111111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee1111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeee1111111111111111111ee11111eeeeeeeeeeeee1111111111111e111111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee1111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeee111111111111111111eeeeeeeeeeeeeeeeeeeee111111111111e111111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeee11111111111111111eeeeeeeeeeeeeeeeeeeee11111111111eee11111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeee1111111111111111eeeeeeeeeeeeeeeeeeeeee111111111eeeee1111111eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        `)
    story.showPlayerChoices("New game", "Continue")
    if (story.checkLastAnswer("New game")) {
        music.play(music.createSoundEffect(WaveShape.Sine, 5000, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        game.showLongText("Arrows to move cursor and player, up to jump(player), hold B to move cursor, release to place, A to change, up+right then left+down to save.", DialogLayout.Full)
        blockSettings.clear()
    } else {
        music.play(music.createSoundEffect(
        WaveShape.Sawtooth,
        1,
        5000,
        0,
        255,
        500,
        SoundExpressionEffect.Warble,
        InterpolationCurve.Logarithmic
        ), music.PlaybackMode.InBackground)
    }
    story.showPlayerChoices("Day", "Night")
    if (story.checkLastAnswer("Day")) {
        scene.setBackgroundColor(9)
    } else {
        scene.setBackgroundColor(8)
    }
    sprites.destroy(textSprite)
    setup()
    controller.combos.setTriggerType(TriggerType.Continuous)
    In_game = 1
    scene.setBackgroundImage(img`
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        `)
}
function load_world () {
    tiles.setCurrentTilemap(tilemap`level3`)
    load_item = 0
    list2 = blockSettings.readNumberArray("world")
    for (let index = 0; index < 50 * 30; index++) {
        if (list2[load_item] == 0) {
            tiles.setTileAt(tiles.getTileLocation(locateX, locateY), assets.tile`0`)
            tiles.setWallAt(tiles.getTileLocation(locateX, locateY), true)
        } else if (list2[load_item] == 1) {
            tiles.setTileAt(tiles.getTileLocation(locateX, locateY), assets.tile`1`)
            tiles.setWallAt(tiles.getTileLocation(locateX, locateY), true)
        } else if (list2[load_item] == 2) {
            tiles.setTileAt(tiles.getTileLocation(locateX, locateY), assets.tile`myTile`)
            tiles.setWallAt(tiles.getTileLocation(locateX, locateY), false)
        } else if (list2[load_item] == 3) {
            tiles.setTileAt(tiles.getTileLocation(locateX, locateY), assets.tile`myTile0`)
            tiles.setWallAt(tiles.getTileLocation(locateX, locateY), false)
        } else if (list2[load_item] == 4) {
            tiles.setTileAt(tiles.getTileLocation(locateX, locateY), assets.tile`myTile1`)
            tiles.setWallAt(tiles.getTileLocation(locateX, locateY), true)
        } else if (list2[load_item] == 5) {
            tiles.setTileAt(tiles.getTileLocation(locateX, locateY), assets.tile`myTile2`)
            tiles.setWallAt(tiles.getTileLocation(locateX, locateY), false)
        } else if (list2[load_item] == 6) {
            tiles.setTileAt(tiles.getTileLocation(locateX, locateY), assets.tile`transparency16`)
            tiles.setWallAt(tiles.getTileLocation(locateX, locateY), false)
        } else if (list2[load_item] == 7) {
            tiles.setTileAt(tiles.getTileLocation(locateX, locateY), assets.tile`myTile3`)
            tiles.setWallAt(tiles.getTileLocation(locateX, locateY), true)
        } else {
        	
        }
        load_item += 1
        if (locateX == 49) {
            locateX = 0
            locateY += 1
        } else {
            locateX += 1
        }
    }
}
let cursor: Sprite = null
let canHoverBlocks = 0
let list2: number[] = []
let load_item = 0
let textSprite: TextSprite = null
let yellow_texts: string[] = []
let text_list: string[] = []
let item = 0
let list22: number[] = []
let locateY = 0
let locateX = 0
let my_sprite: Sprite = null
let In_game = 0
color.setPalette(
color.Black
)
color.startFadeFromCurrent(color.originalPalette, 500)
scene.setBackgroundImage(img`
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222255555222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111122222222222255555222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111122222222222255555222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111122222222222255555222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111122222222222255555222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111122222222222255555222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111122222222222255555222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111122222222222255555222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111122222222222255555222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111122222222222255555222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111122222222222255555222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111122222222222555555222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111122222222222555555222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111122222222222555555222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111122222222222555555222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111122222222222555552222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111122222222222555552222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111122222222222555552222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111122222222222555552222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111122222222222555552222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111122222222222555552222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111122222222222555552222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111122222222222555552222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111122222222222555552222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111122222222222555552222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111122222222222555552222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111122222222222555552222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111122222222222555552222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111122222222222555552222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111122222222222555552222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111122222222222555552222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222211111122222222222555552222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222211111122222222222555555222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222211111122222222222555555222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222211111122222222222555555222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222211111222222222222555555222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222211111122222222222255555222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222211111122222222222222222222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222211111122222222222222222222222222222211111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222211111112222222222255555222222222222111111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222211111112222222222255555222222222222111111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111111222222222255555222222222221111111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221111111122222222255555222222222211111111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222111111112222222255555222222222211111111222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222111111111222222222222222222222111111112222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222211111111111222222222222222221111111122222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222211111111111111122222222222111111111122222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222221111111111111111111111111111111111222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222111111111111111111111111111111111222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222221111111111111111111111111111112222222222111222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222221111111111111111111111111122222222222111222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222111221111111111111111111122222222222222111222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222111222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222111222222222222222111111122222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222211111112222222222222111111122222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222111221111222222222222211111112222222222221111111122222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222111221111222222222222211111112222222222221111222222222222111122111222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222111221111222211111112222111112111221111221111111122211122111122111222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222111222111222111111112222111222111221111221111111122211122111122111122222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222111121111222111111112222111222111221111221111111122211122111222111122222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222111111111222111121112222111222111111112221112222222211122111222211122222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222111111112222111221112222111222111111112221112222222211121111222211122222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222211111112222222221112222111222111111112221112222222211121111222211122222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221112222111222211111122221112222222211111112222211122222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222221112222222222221111122222222222222211111112222211122222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222221111121112211122222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222221111111122222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222221111111122222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222221111111122222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222111111222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222222222221111122222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222222222211112221222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222122222122212222122222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222111112222221112222222212222122222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222212222112221222222112222122222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222112222122221222222122222111111222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222221122222122221222221222222222221122222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222221222222122221222212222222122112222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222212222222112221221111111122111222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222221111112221221222222222122222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    2222222222222222111222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222
    `)
pause(1000)
game.setDialogCursor(img`
    . . c c c c c c c . . 
    . c f f f f f f f c . 
    c f f f 2 2 2 f f f c 
    c f f 2 2 f 2 2 f f c 
    c f f 2 2 f 2 2 f f c 
    c f f 2 2 2 2 2 f f c 
    c f f 2 2 f 2 2 f f c 
    c f f f f f f f f f c 
    c f f f f f f f f f c 
    . c f f f f f f f c . 
    . . c c c c c c c . . 
    `)
game.setDialogFrame(img`
    ..11111111111111111111..
    .cccccccccccccccccccccc.
    cccccccccccccccccccccccc
    c1111111111111111111111c
    d1111111111111111111111d
    d1111111111111111111111d
    d1111111111111111111111d
    d1111111111111111111111d
    d1111111111111111111111d
    d1111111111111111111111d
    d1111111111111111111111d
    d1111111111111111111111d
    d1111111111111111111111d
    d1111111111111111111111d
    d1111111111111111111111d
    d1111111111111111111111d
    d1111111111111111111111d
    d1111111111111111111111d
    d1111111111111111111111d
    d1111111111111111111111d
    d1111111111111111111111d
    edddddddddddddddddddddde
    .ebbbbbbbbbbbbbbbbbbbbe.
    ..eeeeeeeeeeeeeeeeeeee..
    `)
backToMenu()
music.play(music.createSong(hex`003c000408020301001c000f05001202c102c20100040500280000006400280003140006020004180000000400012908000c0001270c001000012214001800012505001c000f0a006400f4010a0000040000000000000000000000000000000002180020002400012928002c0001272c003000012234003800012007001c00020a006400f401640000040000000000000000000000000000000003300000000800010608001000010810001800010d18002000010a20002800010628003000010a300038000108380040000106`), music.PlaybackMode.LoopingInBackground)
forever(function () {
    if (controller.B.isPressed()) {
        music.play(music.melodyPlayable(music.jumpDown), music.PlaybackMode.InBackground)
        canHoverBlocks = 1
        my_sprite.ay = 0
        my_sprite.vy = 0
        cursor = sprites.create(img`
            . . . . . . f f f f . . . . . . 
            . . . . . f f 1 1 f f . . . . . 
            . . . . f 1 f 1 1 f 1 f . . . . 
            . . . f 1 . f 1 1 f . 1 f . . . 
            . . f 1 . . f 1 1 f . . 1 f . . 
            . f 1 . . . f 1 1 f . . . 1 f . 
            f f f f f f f 1 1 f f f f f f f 
            f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
            f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
            f f f f f f f 1 1 f f f f f f f 
            . f 1 . . . f 1 1 f . . . 1 f . 
            . . f 1 . . f 1 1 f . . 1 f . . 
            . . . f 1 . f 1 1 f . 1 f . . . 
            . . . . f 1 f 1 1 f 1 f . . . . 
            . . . . . f f 1 1 f f . . . . . 
            . . . . . . f f f f . . . . . . 
            `, SpriteKind.Player)
        cursor.setPosition(my_sprite.x, my_sprite.y)
        cursor.setFlag(SpriteFlag.GhostThroughWalls, true)
        controller.moveSprite(cursor, 100, 100)
        controller.moveSprite(my_sprite, 0, 0)
        pauseUntil(() => !(controller.B.isPressed()))
        if (In_game == 1) {
            if (item == 0) {
                tiles.setTileAt(cursor.tilemapLocation(), assets.tile`0`)
                tiles.setWallAt(cursor.tilemapLocation(), true)
            } else if (item == 1) {
                tiles.setTileAt(cursor.tilemapLocation(), assets.tile`1`)
                tiles.setWallAt(cursor.tilemapLocation(), true)
            } else if (item == 2) {
                tiles.setTileAt(cursor.tilemapLocation(), assets.tile`myTile`)
                tiles.setWallAt(cursor.tilemapLocation(), false)
            } else if (item == 3) {
                tiles.setTileAt(cursor.tilemapLocation(), assets.tile`myTile0`)
                tiles.setWallAt(cursor.tilemapLocation(), false)
            } else if (item == 4) {
                tiles.setTileAt(cursor.tilemapLocation(), assets.tile`myTile1`)
                tiles.setWallAt(cursor.tilemapLocation(), true)
            } else if (item == 5) {
                tiles.setTileAt(cursor.tilemapLocation(), assets.tile`myTile2`)
                tiles.setWallAt(cursor.tilemapLocation(), false)
            } else if (item == 6) {
                tiles.setTileAt(cursor.tilemapLocation(), assets.tile`transparency16`)
                tiles.setWallAt(cursor.tilemapLocation(), false)
            } else if (item == 7) {
                tiles.setTileAt(cursor.tilemapLocation(), assets.tile`myTile3`)
                tiles.setWallAt(cursor.tilemapLocation(), true)
            } else {
            	
            }
        }
        sprites.destroy(cursor)
        canHoverBlocks = 0
        controller.moveSprite(my_sprite, 100, 0)
        my_sprite.ay = 400
    }
    my_sprite.setFlag(SpriteFlag.GhostThroughWalls, false)
})
