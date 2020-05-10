// TODO: Move these into separate files (currently broken).

export const styleText = `
:host {
  width: 256px;
  height: 192px;
  contain: content;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  place-content: center;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  place-content: center;
}

.svg-wrapper {
  place-content: center;
  object-fit: fill;
  position: relative;
}

.svg-wrapper svg {
  position: absolute;
  width: 100%;
  height: 100%;
}

twisty {
  contain: size;
}

/* Main Definitions */
twisty player {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

twisty player ksolve-svg-view,
twisty player cube3d-view {
  flex: 4 1 100px;

  overflow: hidden;

  /* TODO: dynamic fitting */
}

twisty player ksolve-svg-view.flash,
twisty player cube3d-view.flash {
  opacity: 0.25;
  transition: 0s;
  flex: 4;
}

twisty player cube3d-view {
  position: relative;
  object-fit: contain;

  display: grid;
  grid-template-columns: repeat(2, 50%);
  contain: size;
}

twisty player cube3d-view:not(.side-by-side) {
  grid-template-columns: 1fr;
}

twisty player cube3d-view cube3d-wrapper {
  overflow: hidden;
}

twisty player cube3d-view cube3d-wrapper canvas {
  width: 100%;
  height: 100%
}

twisty player cube3d-view:not(.side-by-side) cube3d-wrapper.back {
  position: absolute;
  right: 0;
  top: 0;
  width: 25%;
  height: 25%;
}

twisty player ksolve-svg-view .svg-wrapper,
twisty player cube3d {
  width:  100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

twisty player ksolve-svg-view .svg-wrapper svg {
  width: 90%;
  height: 90%;
}

/* TODO */
cube3d-wrapper.back {
  display: none;
}

/*
twisty {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
  overflow: hidden;
}

twisty cube3d-wrapper {
  contain: content;
}

twisty > player {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
  overflow: hidden;
}

twisty cube3d-view, twisty cube3d-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  contain: content;
}*/
`;

export const checkeredStyleText = `
:host {
  background-color: #EAEAEA;
  background-image: linear-gradient(45deg, #DDD 25%, transparent 25%, transparent 75%, #DDD 75%, #DDD),
    linear-gradient(45deg, #DDD 25%, transparent 25%, transparent 75%, #DDD 75%, #DDD);
  background-size: 32px 32px;
  background-position: 0 0, 16px 16px;
}
`;

export const invalidScrambleStyleText = `
:host {
  background-size: auto !important;
  background-color: red !important;
  background-image: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 1em,
    rgba(0, 0, 0, 0.2) 1em,
    rgba(0, 0, 0, 0.2) 2em
  ) !important;
  opacity: 0.5 !important;
}
`;
