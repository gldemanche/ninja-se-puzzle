import { level1, level2, level3 } from "../model/Levels";

export function moveNinja(model, direction) {
  let ninja = model.ninjase;

  ninja.move(direction);
  model.updateMoveCounter(+1);
  model.checkDoors();
  return model;
}

export function pickUpKey(model) {
  model.ninjaPickKey();
  model.updateMoveCounter(+1);
  return model;
}

export function selectLevel(model, level) {
  model.initialize(level);
  return model;
}
