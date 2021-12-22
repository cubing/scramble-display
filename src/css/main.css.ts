export const mainStyleText = `
:host {
  width: 384px;
  height: 256px;
  display: grid;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  place-content: center;
  overflow: hidden;
}

.wrapper > * {
  width: inherit;
  height: inherit;
  overflow: hidden;
}

twisty-player {
  width: 100%;
  height: 100%;
}

.checkered {
  background-color: #eaeaea;
  background-image: linear-gradient(
      45deg,
      #ddd 25%,
      transparent 25%,
      transparent 75%,
      #ddd 75%,
      #ddd
    ),
    linear-gradient(
      45deg,
      #ddd 25%,
      transparent 25%,
      transparent 75%,
      #ddd 75%,
      #ddd
    );
  background-size: 32px 32px;
  background-position: 0 0, 16px 16px;
}
`;
