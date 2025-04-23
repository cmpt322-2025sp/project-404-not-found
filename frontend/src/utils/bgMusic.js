import groceryMusicFile from "../asset/music/GroceryMusic.mp3";
import mainMusicFile from "../asset/music/main_music.mp3"
import BobCleansMusicFile from "../asset/music/BobCleansMusic.mp3"
import DontDrownBobMusicFile from "../asset/music/DrownBobMusic.mp3"

export const mainMusic = new Audio(mainMusicFile);
mainMusic.loop   = true;
mainMusic.volume = 1;

export const groceryMusic = new Audio(groceryMusicFile);
groceryMusic.loop   = true;
groceryMusic.volume = 1;

export const BobCleansMusic = new Audio(BobCleansMusicFile);
BobCleansMusic.loop   = true;
BobCleansMusic.volume = 0.5;

export const BobDrownsMusic = new Audio(DontDrownBobMusicFile);
BobDrownsMusic.loop   = true;
BobDrownsMusic.volume = 1;

export default mainMusic;