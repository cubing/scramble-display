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

If you change any of the attributes (e.g. using Javascript, or by hand in DevTools), the display will update immediately. This makes it ideal for timers that want to show the latest scramble on a part of the screen.

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

## Suported Events

| Event ID | 2D | 3D | WCA Notation implemented yet? |
| -| -| -| -|
| `222` | ✅ | ✅ | ⚠️¹ |
| `333` | ✅ | ❌ | ⚠️¹ |
| `444` | ✅ | ✅ | ⚠️¹ |
| `555` | ✅ | ✅ | ⚠️¹ |
| `666` | ✅ | ✅ | ⚠️¹ |
| `777` | ✅ | ✅ | ⚠️¹ |
| `333bf` | ✅ | ❌ | ⚠️¹ |
| `333fm` | ✅ | ❌ | ⚠️¹ |
| `333oh` | ✅ | ❌ | ⚠️¹ |
| `clock` | ✅ | ❌ | ❌ |
| `minx` | ✅ | ✅ | ❌ |
| `pyram` | ✅ | ❌ | ✅ |
| `skewb` | ✅ | ✅ | ❌ |
| `sq1` | ✅ | ❌ | ❌ |
| `444bf` | ✅ | ✅ | ⚠ |
| `555bf` | ✅ | ✅ | ⚠️¹ |
| `333mbf` | ✅ | ❌ | ⚠️¹ |
| `333ft` | ✅ | ❌ | ⚠️¹ |

⚠️: Currently accepts all valid WCA notation as well as some non-WCA moves. Support for non-WCA moves will be removed in the future.

Please contribute to help us make this chart 100% green!

## License

This project is licensed under the GPL license (version 3 or later). This means that this library is **free to use**, although you **must publish any code that uses it** (e.g. also put it on GitHub). See [the full license](./LICENSE.md) for exact details.

We've selected this license in order to encourage the cubing community to work on software in a way so that everyone can contribute and extend each other's work.
