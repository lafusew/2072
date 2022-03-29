import { SpriteLoaderConfig, SpritesLoaderConfig } from "./assets";

export const ANIMATED_SPRITES: Record<string, SpritesLoaderConfig> = {
  punk: {
    name: 'punk',
    extension: 'gif',
    subDir: 'animated_punk',
    filenames: ['punk_0', 'punk_1']
  },
  btc: {
    name: 'btc',
    extension: 'gif',
    subDir: 'animated_btc',
    filenames: [
      'btc_attack_0',
      'btc_attack_1',
      'btc_attack_2',
      'btc_attack_3',
      'btc_attack_4',
      'btc_attack_5'
    ]
  },
  monkey: {
    name: 'monkey',
    extension: 'gif',
    subDir: 'animated_monkey',
    filenames: [
      'monkey_0',
      'monkey_1'
    ]
  },
  earth: {
    name: 'earth',
    extension: 'gif',
    subDir: 'animated_earth',
    filenames: [
      'earth_0',
      'earth_1',
      'earth_2',
      'earth_3',
      'earth_4',
      'earth_5',
      'earth_6',
      'earth_7',
      'earth_8',
      'earth_9',
      'earth_10',
    ]
  },
  banana: {
    name: 'banana',
    extension: 'png',
    subDir: 'animated_banana',
    filenames: [
      'banana_0',
      'banana_1',
      'banana_2',
      'banana_3',
    ]
  },
  tank: {
    name: 'tank',
    extension: 'gif',
    subDir: 'animated_tank',
    filenames: [
      'tank_0',
      'tank_1',
    ]
  },
  playBtn: {
    name: 'playBtn',
    extension: 'png',
    filenames: ['playBtn_1', 'playBtn_2'],
  }
};

export const STATIC_SPRITES: Record<string, SpriteLoaderConfig> = {
  bg: { name: 'bg', filename: 'background', extension: 'png' },
  bgClear: { name: 'bg_clear', filename: 'background_clear', extension: 'png' },
  lifeFrame: { name: 'life_frame', filename: 'life_frame', extension: 'png' },
  eth: { name: 'eth_logo', filename: 'eth', extension: 'png' }
}