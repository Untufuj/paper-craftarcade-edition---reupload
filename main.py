def on_combos_attach_combo():
    if not (story.is_menu_open()):
        locate_tiles()
controller.combos.attach_combo("U+RL+D", on_combos_attach_combo)

def locate_tiles():
    global locateX, locateY
    locateX = 0
    locateY = 0
    game.splash("Saving world...",
        "Do not turn the power off or modify the world")
    list22.pop()
    for index in range(18 * 12):
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
                myTile
                """)):
            list22.append(2)
        elif tiles.tile_at_location_equals(tiles.get_tile_location(locateX, locateY),
            assets.tile("""
                myTile0
                """)):
            list22.append(3)
        elif tiles.tile_at_location_equals(tiles.get_tile_location(locateX, locateY),
            assets.tile("""
                myTile1
                """)):
            list22.append(4)
        elif tiles.tile_at_location_equals(tiles.get_tile_location(locateX, locateY),
            assets.tile("""
                myTile2
                """)):
            list22.append(5)
        elif tiles.tile_at_location_equals(tiles.get_tile_location(locateX, locateY),
            assets.tile("""
                transparency16
                """)):
            list22.append(6)
        elif tiles.tile_at_location_equals(tiles.get_tile_location(locateX, locateY),
            assets.tile("""
                myTile3
                """)):
            list22.append(7)
        else:
            pass
        if locateX == 17:
            locateX = 0
            locateY += 1
        else:
            locateX += 1
    print(list22)
    blockSettings.write_number_array("world", list22)
    game.set_game_over_scoring_type(game.ScoringType.NONE)
    game.set_game_over_message(True, "World Saved!")
    game.game_over(True)

def on_b_pressed():
    if not (story.is_menu_open()):
        music.play(music.melody_playable(music.knock),
            music.PlaybackMode.UNTIL_DONE)
        if item == 0:
            tiles.set_tile_at(my_sprite.tilemap_location(), assets.tile("""
                0
                """))
        elif item == 1:
            tiles.set_tile_at(my_sprite.tilemap_location(), assets.tile("""
                1
                """))
        elif item == 2:
            tiles.set_tile_at(my_sprite.tilemap_location(),
                assets.tile("""
                    myTile
                    """))
        elif item == 3:
            tiles.set_tile_at(my_sprite.tilemap_location(),
                assets.tile("""
                    myTile0
                    """))
        elif item == 4:
            tiles.set_tile_at(my_sprite.tilemap_location(),
                assets.tile("""
                    myTile1
                    """))
        elif item == 5:
            tiles.set_tile_at(my_sprite.tilemap_location(),
                assets.tile("""
                    myTile2
                    """))
        elif item == 6:
            tiles.set_tile_at(my_sprite.tilemap_location(),
                assets.tile("""
                    transparency16
                    """))
        elif tiles.tile_at_location_equals(tiles.get_tile_location(locateX, locateY),
            assets.tile("""
                myTile3
                """)):
            list22.append(7)
        else:
            pass
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_a_pressed():
    global item
    if not (story.is_menu_open()):
        music.play(music.melody_playable(music.ba_ding),
            music.PlaybackMode.UNTIL_DONE)
        if item == 7:
            item = 0
        else:
            item += 1
        my_sprite.say_text(list22[item])
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def setup():
    global my_sprite
    if blockSettings.exists("world"):
        load_world()
    else:
        story.show_player_choices("Template 1", "Template 2")
        if story.check_last_answer("Template 2"):
            scene.set_tile_map_level(tilemap("""
                level1
                """))
        else:
            tiles.set_current_tilemap(tilemap("""
                level
                """))
    scene.set_background_color(9)
    my_sprite = sprites.create(img("""
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
            """),
        SpriteKind.player)
    controller.move_sprite(my_sprite, 100, 100)
    scene.camera_follow_sprite(my_sprite)
def load_world():
    global load_item, list2, locateX, locateY
    tiles.set_current_tilemap(tilemap("""
        level3
        """))
    load_item = 0
    list2 = blockSettings.read_number_array("world")
    for index2 in range(18 * 12):
        if list2[load_item] == 0:
            tiles.set_tile_at(tiles.get_tile_location(locateX, locateY),
                assets.tile("""
                    0
                    """))
        elif list2[load_item] == 1:
            tiles.set_tile_at(tiles.get_tile_location(locateX, locateY),
                assets.tile("""
                    1
                    """))
        elif list2[load_item] == 2:
            tiles.set_tile_at(tiles.get_tile_location(locateX, locateY),
                assets.tile("""
                    myTile
                    """))
        elif list2[load_item] == 3:
            tiles.set_tile_at(tiles.get_tile_location(locateX, locateY),
                assets.tile("""
                    myTile0
                    """))
        elif list2[load_item] == 4:
            tiles.set_tile_at(tiles.get_tile_location(locateX, locateY),
                assets.tile("""
                    myTile1
                    """))
        elif list2[load_item] == 5:
            tiles.set_tile_at(tiles.get_tile_location(locateX, locateY),
                assets.tile("""
                    myTile2
                    """))
        elif list2[load_item] == 6:
            tiles.set_tile_at(tiles.get_tile_location(locateX, locateY),
                assets.tile("""
                    transparency16
                    """))
        else:
            pass
        load_item += 1
        if locateX == 17:
            locateX = 0
            locateY += 1
        else:
            locateX += 1
list2: List[number] = []
load_item = 0
my_sprite: Sprite = None
item = 0
list22: List[number] = []
locateX = 0
locateY = 0
locateY = 0
locateX = 0
list22 = []
music.play(music.create_song(hex("""
        00780004080200
        """)),
    music.PlaybackMode.IN_BACKGROUND)
game.show_long_text("Paper craft As4-30a Arcade Edition", DialogLayout.TOP)
story.show_player_choices("New game", "Continue")
if story.check_last_answer("New game"):
    game.show_long_text("Arrows to move, B to place, A to change, up+right then left+down to save. Materials(shown as the score):0=dirt  1=grass 2=water 3=planks 4=wood 5=leaves 6=air",
        DialogLayout.FULL)
    blockSettings.clear()
else:
    pass
setup()
info.set_score(item)
controller.combos.set_trigger_type(TriggerType.CONTINUOUS)
text_list = ["Dirt", "Grass", "Water", "Planks", "Trunk", "Air", "Stone"]