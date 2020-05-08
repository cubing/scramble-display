# `<scramble-display>`

<img alt="Scramble demo" src="./screenshot.png" width="768">

`<scramble-display>` is an easy way to display scrambles for twisty puzzles like the [Rubik's Cube](https://en.wikipedia.org/wiki/Rubik%27s_Cube) and [WCA puzzles](https://www.worldcubeassociation.org/) in cubing apps.

You can use it like this:

    <scramble-display scramble="F' D F2 L2 U' R2 U' F2 D2 R2 F2 U2 F R' B F D' B2 U B'"></scramble-display>

You can specify puzzles other than 3x3x3 using the `event` attribute, and optionally set a checkered background:

    <scramble-display 
      event="pyram"
      scramble="B U' L U' L B' U' L' l' r u'"
      checkered
    ></scramble-display>

3D is also supported (for 3x3x3, so far):

    <scramble-display
      scramble="F' D F2 L2 U' R2 U' F2 D2 R2 F2 U2 F R' B F D' B2 U B'"
      visualization="3D"
      checkered
    ></scramble-display>

## Attributes

    // More events coming.
    event: null | "222" | "333" | "pyram" | "333bf" | "333fm" | "333oh" | "333mbf" | "333ft"
    visualization: null | "2D" | "3D"
    scramble: null | string
    checkered: null | "" | "true"

## Javascript Usage

    import { ScrambleDisplay } from "scramble-display"

    const el = new ScrambleDisplay();
    el.event = "pyram";
    el.scramble = "B U' L U' L B' U' L' l' r u'";

    document.body.appendChild(el);

