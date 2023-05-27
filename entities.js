import Matter from "matter-js";
import Platform from "./components/Platform";
import Peter from "./components/Peter";

import word1 from "./assets/game-screen/food/banana-banana.png";
import word2 from './assets/game-screen/food/bread-pan.png'

import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
function importAll(r) {
  return r.keys().map(r);
}


export default (restart) => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;

  engine.gravity.y = 0.4;
  const images = importAll(require.context('./assets/game-screen/food', false, /\.(png)$/));

  console.log(images);
  let platforms = {};

  let spacing = 200;
  let startHeight = 400;

  for (let i = 0; i < 6; i++) {
    label = "platform" + i;
    x = 70;
    y = i * 200;
    platforms[label] = Platform(
      world,
      label,
      { x: x, y: y },
      { height: 50, width: 100 },
      images[i * 2],
    );
  }
  for (let i = 0; i < 6; i++) {
    label = "platform2" + i;
    x = 330;
    y = i * 200;
    platforms[label] = Platform(
      world,
      label,
      { x: x, y: y },
      { height: 50, width: 100 },
      images[i * 2 + 8],
    );
  }

  return {
    physics: { engine, world },

    Peter: Peter(world, { x: 200, y: 0 }, { height: 80, width: 100 }),
    ...platforms,
    // platform1: Platform(world, 'platform1', { x: 200, y: 200 }, { height: 50, width: 200 }),
  };
};
