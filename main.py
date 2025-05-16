@namespace
class SpriteKind:
    MiniMenu = SpriteKind.create()

def on_system_menu_add_entry():
    return "Save and Quit"
def on_system_menu_add_entry2():
    locate_tiles()
scene.systemMenu.add_entry(on_system_menu_add_entry,
    on_system_menu_add_entry2,
    img("""
        ................................
        ..............888...............
        ..............888...............
        ..............888...............
        ..........bbbb888bbbb...........
        .........bbbbb888bbbbb..........
        .......bbbbbbb888bbbbbbb........
        ......bfffffff888fbbbbbbb.......
        .....bffffffff888ffbbbbbbb......
        .....bff188811888ff888bbbb......
        ....bbff188881888f8888bbbbb.....
        ...bbbff18888888888888bbbbbb....
        ...bbbff1188888888888ffbbbbb....
        ...bbbff111888888888ffffbbbb....
        ...bbbffffff8888888ffffffbbb....
        ...bbbfffffff88888ffffffffbb....
        ...bbbffffff1188811fffffffbb....
        ...bbbffffff1111111fffffffbb....
        ...bbbffffff1111111fffffffbb....
        ...bbbffffff1111111fffffffbb....
        ...bbbffffff1111111fffffffbb....
        ...bbbfffffff11111ffffffffbb....
        ....bbffffffffffffffffffffb.....
        .....bbbbbbbbbbbbbbbbbbbbb......
        .....bbbccccccccccccccbbbb......
        ......bbccccccccccccccbbb.......
        .......bbccccccccccccbbb........
        .........bbbbbbbbbbbbb..........
        ..........bbbbbbbbbbb...........
        ................................
        ................................
        ................................
        """))

def on_up_pressed():
    if In_game == 1 and not controller.B.is_pressed():
        if my_sprite.is_hitting_tile(CollisionDirection.BOTTOM) or tiles.tile_at_location_equals(my_sprite.tilemap_location(), assets.tile("""
            2
            """)):
            music.play(music.create_sound_effect(WaveShape.SINE,
                    400,
                    600,
                    255,
                    0,
                    100,
                    SoundExpressionEffect.NONE,
                    InterpolationCurve.LINEAR),
                music.PlaybackMode.IN_BACKGROUND)
            my_sprite.vy = -175
            if tiles.tile_at_location_equals(my_sprite.tilemap_location(), assets.tile("""
                2
                """)):
                my_sprite.start_effect(effects.bubbles, 1000)
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def locate_tiles():
    global locateX, locateY
    scene.systemMenu.close_menu()
    scene.center_camera_at(0, 0)
    locateX = 0
    locateY = 0
    list22.pop()
    for index in range(50 * 30):
        if tiles.tile_at_location_equals(tiles.get_tile_location(locateX, locateY),
            assets.tile("""
                0
                """)):
            list22.append(0)
        elif tiles.tile_at_location_equals(tiles.get_tile_location(locateX, locateY),
            assets.tile("""
                1
                """)):
            list22.append(1)
        elif tiles.tile_at_location_equals(tiles.get_tile_location(locateX, locateY),
            assets.tile("""
                2
                """)):
            list22.append(2)
        elif tiles.tile_at_location_equals(tiles.get_tile_location(locateX, locateY),
            assets.tile("""
                3
                """)):
            list22.append(3)
        elif tiles.tile_at_location_equals(tiles.get_tile_location(locateX, locateY),
            assets.tile("""
                4
                """)):
            list22.append(4)
        elif tiles.tile_at_location_equals(tiles.get_tile_location(locateX, locateY),
            assets.tile("""
                5
                """)):
            list22.append(5)
        elif tiles.tile_at_location_equals(tiles.get_tile_location(locateX, locateY),
            assets.tile("""
                transparency16
                """)):
            list22.append(6)
        elif tiles.tile_at_location_equals(tiles.get_tile_location(locateX, locateY),
            assets.tile("""
                7
                """)):
            list22.append(7)
        elif tiles.tile_at_location_equals(tiles.get_tile_location(locateX, locateY),
            assets.tile("""
                8
                """)):
            list22.append(8)
        else:
            pass
        if locateX == 49:
            locateX = 0
            locateY += 1
        else:
            locateX += 1
    print(list22)
    blockSettings.write_number_array("world", list22)
    game.show_long_text("World saved", DialogLayout.CENTER)
    game.reset()

def on_a_pressed():
    global item
    if In_game == 1:
        music.play(music.melody_playable(music.ba_ding),
            music.PlaybackMode.IN_BACKGROUND)
        if item == 8:
            item = 0
        else:
            item += 1
        my_sprite.say_text(text_list[item], 5000, False)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def setup():
    global my_sprite
    if blockSettings.exists("world"):
        load_world()
    else:
        story.show_player_choices("Template 1", "Template 2", "Blank")
        if story.check_last_answer("Template 2"):
            scene.set_tile_map_level(tilemap("""
                level1
                """))
        elif story.check_last_answer("Template 1"):
            tiles.set_current_tilemap(tilemap("""
                level
                """))
        else:
            tiles.set_current_tilemap(tilemap("""
                level3
                """))
    my_sprite = sprites.create(img("""
            . . . c 7 7 7 c . . .
            . . c 7 7 7 7 7 c . .
            . . . c f d f c . . .
            . . c c d d d c c . .
            . c 2 2 2 2 2 2 2 c .
            . c 2 2 2 2 2 2 2 c .
            . c d 2 2 2 2 2 d c .
            . c d 2 2 2 2 2 d c .
            . c d 2 2 2 2 2 d c .
            . . c 2 2 2 2 2 c . .
            . . c 6 6 6 6 6 c . .
            . . c 6 6 6 6 6 c . .
            . . c 6 6 c 6 6 c . .
            . . c 6 6 c 6 6 c . .
            . . c 6 6 c 6 6 c c .
            . c e e e c e e e c .
            """),
        SpriteKind.player)
    scene.camera_follow_sprite(my_sprite)
    controller.move_sprite(my_sprite, 100, 0)
    my_sprite.ay = 400
def backToMenu():
    global text_list, yellow_texts, locateY, locateX, In_game, list22, textSprite
    text_list = ["Dirt",
        "Grass",
        "Water",
        "Planks",
        "Trunk",
        "Leaves",
        "Air",
        "Stone",
        "Flowers"]
    yellow_texts = ["Arcade!",
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
        "This sounds good",
        "Flowers!",
        "Not a bad redesign"]
    locateY = 0
    locateX = 0
    In_game = 0
    list22 = []
    music.play(music.create_song(hex("""
            00780004080200
            """)),
        music.PlaybackMode.IN_BACKGROUND)
    textSprite = textsprite.create(yellow_texts[randint(0, len(yellow_texts) - 1)], 0, 5)
    textSprite.set_position(80, 100)
    textSprite.left = 0
    textSprite.set_max_font_height(6)
    textSprite.set_outline(1, 4)
    scene.set_background_image(img("""
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
        """))
    story.show_player_choices("New game", "Continue")
    if story.check_last_answer("New game"):
        music.play(music.create_sound_effect(WaveShape.SINE,
                5000,
                0,
                255,
                0,
                500,
                SoundExpressionEffect.NONE,
                InterpolationCurve.LINEAR),
            music.PlaybackMode.IN_BACKGROUND)
        game.show_long_text("Arrows to move cursor and player, up to jump(player), hold B to move cursor, release to place, A to change, Press Up, down, left, right to save.",
            DialogLayout.FULL)
        blockSettings.clear()
    else:
        music.play(music.create_sound_effect(WaveShape.SAWTOOTH,
                1,
                5000,
                0,
                255,
                500,
                SoundExpressionEffect.WARBLE,
                InterpolationCurve.LOGARITHMIC),
            music.PlaybackMode.IN_BACKGROUND)
    story.show_player_choices("Day", "Night")
    if story.check_last_answer("Day"):
        scene.set_background_color(9)
    else:
        scene.set_background_color(8)
    sprites.destroy(textSprite)
    setup()
    controller.combos.set_trigger_type(TriggerType.CONTINUOUS)
    In_game = 1
    scene.set_background_image(img("""
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
        """))

def on_combos_attach_combo():
    pass
controller.combos.attach_combo("U D L R", on_combos_attach_combo)

def load_world():
    global load_item, list2, locateX, locateY
    tiles.set_current_tilemap(tilemap("""
        level3
        """))
    load_item = 0
    list2 = blockSettings.read_number_array("world")
    for index2 in range(50 * 30):
        if list2[load_item] == 0:
            tiles.set_tile_at(tiles.get_tile_location(locateX, locateY),
                assets.tile("""
                    0
                    """))
            tiles.set_wall_at(tiles.get_tile_location(locateX, locateY), True)
        elif list2[load_item] == 1:
            tiles.set_tile_at(tiles.get_tile_location(locateX, locateY),
                assets.tile("""
                    1
                    """))
            tiles.set_wall_at(tiles.get_tile_location(locateX, locateY), True)
        elif list2[load_item] == 2:
            tiles.set_tile_at(tiles.get_tile_location(locateX, locateY),
                assets.tile("""
                    2
                    """))
            tiles.set_wall_at(tiles.get_tile_location(locateX, locateY), False)
        elif list2[load_item] == 3:
            tiles.set_tile_at(tiles.get_tile_location(locateX, locateY),
                assets.tile("""
                    3
                    """))
            tiles.set_wall_at(tiles.get_tile_location(locateX, locateY), False)
        elif list2[load_item] == 4:
            tiles.set_tile_at(tiles.get_tile_location(locateX, locateY),
                assets.tile("""
                    4
                    """))
            tiles.set_wall_at(tiles.get_tile_location(locateX, locateY), True)
        elif list2[load_item] == 5:
            tiles.set_tile_at(tiles.get_tile_location(locateX, locateY),
                assets.tile("""
                    5
                    """))
            tiles.set_wall_at(tiles.get_tile_location(locateX, locateY), False)
        elif list2[load_item] == 6:
            tiles.set_tile_at(tiles.get_tile_location(locateX, locateY),
                assets.tile("""
                    transparency16
                    """))
            tiles.set_wall_at(tiles.get_tile_location(locateX, locateY), False)
        elif list2[load_item] == 7:
            tiles.set_tile_at(tiles.get_tile_location(locateX, locateY),
                assets.tile("""
                    7
                    """))
            tiles.set_wall_at(tiles.get_tile_location(locateX, locateY), True)
        elif list2[load_item] == 8:
            tiles.set_tile_at(tiles.get_tile_location(locateX, locateY),
                assets.tile("""
                    8
                    """))
            tiles.set_wall_at(tiles.get_tile_location(locateX, locateY), False)
        else:
            pass
        load_item += 1
        if locateX == 49:
            locateX = 0
            locateY += 1
        else:
            locateX += 1
cursor: Sprite = None
canHoverBlocks = 0
list2: List[number] = []
load_item = 0
textSprite: TextSprite = None
yellow_texts: List[str] = []
text_list: List[str] = []
item = 0
list22: List[number] = []
locateY = 0
locateX = 0
my_sprite: Sprite = None
In_game = 0
controller.configure_repeat_event_defaults(100, 500)
controller.start_light_animation(light.running_lights_animation, 500)
scene.set_background_image(img("""
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
    """))
pause(1000)
game.set_dialog_cursor(img("""
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
    """))
game.set_dialog_frame(img("""
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
    """))
effects.clouds.start_screen_effect()
backToMenu()
music.play(music.create_song(hex("""
        003c000408020301001c000f05001202c102c20100040500280000006400280003140006020004180000000400012908000c0001270c001000012214001800012505001c000f0a006400f4010a0000040000000000000000000000000000000002180020002400012928002c0001272c003000012234003800012007001c00020a006400f401640000040000000000000000000000000000000003300000000800010608001000010810001800010d18002000010a20002800010628003000010a300038000108380040000106
        """)),
    music.PlaybackMode.LOOPING_IN_BACKGROUND)

def on_forever():
    global canHoverBlocks, cursor
    if controller.B.is_pressed():
        music.play(music.melody_playable(music.jump_down),
            music.PlaybackMode.IN_BACKGROUND)
        canHoverBlocks = 1
        my_sprite.ay = 0
        my_sprite.vy = 0
        cursor = sprites.create(img("""
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
                """),
            SpriteKind.player)
        cursor.set_position(my_sprite.x, my_sprite.y)
        cursor.set_flag(SpriteFlag.GHOST_THROUGH_WALLS, True)
        controller.move_sprite(cursor, 100, 100)
        controller.move_sprite(my_sprite, 0, 0)
        
        def on_pause_until():
            return not controller.B.is_pressed()
        pause_until(on_pause_until)
        
        if In_game == 1:
            if item == 0:
                tiles.set_tile_at(cursor.tilemap_location(), assets.tile("""
                    0
                    """))
                tiles.set_wall_at(cursor.tilemap_location(), True)
            elif item == 1:
                tiles.set_tile_at(cursor.tilemap_location(), assets.tile("""
                    1
                    """))
                tiles.set_wall_at(cursor.tilemap_location(), True)
            elif item == 2:
                tiles.set_tile_at(cursor.tilemap_location(), assets.tile("""
                    2
                    """))
                tiles.set_wall_at(cursor.tilemap_location(), False)
            elif item == 3:
                tiles.set_tile_at(cursor.tilemap_location(), assets.tile("""
                    3
                    """))
                tiles.set_wall_at(cursor.tilemap_location(), False)
            elif item == 4:
                tiles.set_tile_at(cursor.tilemap_location(), assets.tile("""
                    4
                    """))
                tiles.set_wall_at(cursor.tilemap_location(), True)
            elif item == 5:
                tiles.set_tile_at(cursor.tilemap_location(), assets.tile("""
                    5
                    """))
                tiles.set_wall_at(cursor.tilemap_location(), False)
            elif item == 6:
                tiles.set_tile_at(cursor.tilemap_location(),
                    assets.tile("""
                        transparency16
                        """))
                tiles.set_wall_at(cursor.tilemap_location(), False)
            elif item == 7:
                tiles.set_tile_at(cursor.tilemap_location(), assets.tile("""
                    7
                    """))
                tiles.set_wall_at(cursor.tilemap_location(), True)
            elif item == 8:
                tiles.set_tile_at(cursor.tilemap_location(), assets.tile("""
                    8
                    """))
                tiles.set_wall_at(cursor.tilemap_location(), False)
            else:
                pass
        sprites.destroy(cursor, effects.ashes, 1)
        canHoverBlocks = 0
        controller.move_sprite(my_sprite, 100, 0)
        my_sprite.ay = 400
    my_sprite.set_flag(SpriteFlag.GHOST_THROUGH_WALLS, False)
forever(on_forever)
