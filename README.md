# `scramble-display`

`scramble-display` is an easy way to display scrambles for twisty puzzles like the [Rubik's Cube](https://en.wikipedia.org/wiki/Rubik%27s_Cube) and [WCA puzzles](https://www.worldcubeassociation.org/) in cubing apps.

You can use it like this:

    <scramble-display scramble="F' D F2 L2 U' R2 U' F2 D2 R2 F2 U2 F R' B F D' B2 U B'"></scramble-display>

You can specify that you'd like other puzzles by specifying the appropriate `wca-event` attribute:

    <scramble-display wca-event="222" scramble="R U' F U' R2 U' F U' R"></scramble-display>

Possible features we'd like to add in the future:

- Interactive 3D puzzle view (can be rotated).
