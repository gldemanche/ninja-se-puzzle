export function moveNinja(model, direction) {
  let ninja = model.ninjase;

  ninja.move(direction);
  model.updateMoveCounter(+1);

  return model;
}

export function pickUpKey(model) {
  model.ninjaPickKey();
  model.updateMoveCounter(+1);
  return model;
}
