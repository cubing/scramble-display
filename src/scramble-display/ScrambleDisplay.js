var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ScrambleDisplay_shadow, _ScrambleDisplay_wrapper, _ScrambleDisplay_currentAttributes, _ScrambleDisplay_twistyPlayer;
import { Alg } from "cubing/alg";
import { wcaEventInfo } from "cubing/puzzles";
import { experimentalSetShareAllNewRenderers, TwistyPlayer, } from "cubing/twisty";
import { mainStyleText } from "./css";
experimentalSetShareAllNewRenderers(true);
const CUBE_333 = "333";
const DEFAULT_EVENT = CUBE_333;
export class ScrambleDisplay extends HTMLElement {
    // TODO: Accept ScrambleDisplayAttributes arg?
    constructor() {
        super();
        _ScrambleDisplay_shadow.set(this, void 0);
        _ScrambleDisplay_wrapper.set(this, document.createElement("div"));
        _ScrambleDisplay_currentAttributes.set(this, {
            eventID: null,
            scramble: new Alg(),
            visualization: null,
            checkered: true,
        });
        _ScrambleDisplay_twistyPlayer.set(this, new TwistyPlayer({
            controlPanel: "none",
            hintFacelets: "none",
            visualization: "2D",
        }));
        __classPrivateFieldSet(this, _ScrambleDisplay_shadow, this.attachShadow({ mode: "closed" }), "f");
        __classPrivateFieldGet(this, _ScrambleDisplay_wrapper, "f").classList.add("wrapper");
        __classPrivateFieldGet(this, _ScrambleDisplay_shadow, "f").appendChild(__classPrivateFieldGet(this, _ScrambleDisplay_wrapper, "f"));
        // TODO: change style depending on event/view type?
        const style = document.createElement("style");
        style.textContent = mainStyleText;
        __classPrivateFieldGet(this, _ScrambleDisplay_shadow, "f").appendChild(style);
    }
    // Note: You should avoid setting properties like `alg` or `visualization`
    // directly on the twisty player, since `<scramble-display>` may overwrite
    // them again. However, we make the player available this way in case you may
    // find it convenient to have access for other purposes.
    get player() {
        return __classPrivateFieldGet(this, _ScrambleDisplay_twistyPlayer, "f");
    }
    connectedCallback() {
        __classPrivateFieldGet(this, _ScrambleDisplay_wrapper, "f").appendChild(__classPrivateFieldGet(this, _ScrambleDisplay_twistyPlayer, "f"));
    }
    set event(eventID) {
        var _a;
        const eventInfo = wcaEventInfo(eventID !== null && eventID !== void 0 ? eventID : DEFAULT_EVENT);
        __classPrivateFieldGet(this, _ScrambleDisplay_twistyPlayer, "f").puzzle = (_a = eventInfo === null || eventInfo === void 0 ? void 0 : eventInfo.puzzleID) !== null && _a !== void 0 ? _a : "3x3x3";
        __classPrivateFieldGet(this, _ScrambleDisplay_currentAttributes, "f").eventID = eventID;
    }
    get event() {
        return __classPrivateFieldGet(this, _ScrambleDisplay_currentAttributes, "f").eventID;
    }
    set scramble(scramble) {
        const alg = new Alg(scramble !== null && scramble !== void 0 ? scramble : "");
        __classPrivateFieldGet(this, _ScrambleDisplay_twistyPlayer, "f").alg = alg;
        __classPrivateFieldGet(this, _ScrambleDisplay_currentAttributes, "f").scramble = alg;
        __classPrivateFieldGet(this, _ScrambleDisplay_wrapper, "f").setAttribute("title", alg.toString());
    }
    get scramble() {
        return __classPrivateFieldGet(this, _ScrambleDisplay_currentAttributes, "f").scramble;
    }
    set visualization(visualization) {
        __classPrivateFieldGet(this, _ScrambleDisplay_twistyPlayer, "f").visualization = visualization !== null && visualization !== void 0 ? visualization : "2D";
        __classPrivateFieldGet(this, _ScrambleDisplay_currentAttributes, "f").visualization = visualization;
    }
    get visualization() {
        return __classPrivateFieldGet(this, _ScrambleDisplay_currentAttributes, "f").visualization;
    }
    set checkered(checkered) {
        const checkeredBoolean = !!checkered;
        __classPrivateFieldGet(this, _ScrambleDisplay_twistyPlayer, "f").background = checkeredBoolean ? "checkered" : "none";
        __classPrivateFieldGet(this, _ScrambleDisplay_currentAttributes, "f").checkered = checkeredBoolean;
    }
    get checkered() {
        return __classPrivateFieldGet(this, _ScrambleDisplay_currentAttributes, "f").checkered;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "event": {
                this.event = newValue;
                break;
            }
            case "scramble": {
                this.scramble = newValue;
                break;
            }
            case "visualization": {
                this.visualization = newValue;
                break;
            }
            case "checkered": {
                this.checkered = newValue !== "";
                break;
            }
        }
    }
    static get observedAttributes() {
        return ["event", "scramble", "visualization", "checkered"];
    }
}
_ScrambleDisplay_shadow = new WeakMap(), _ScrambleDisplay_wrapper = new WeakMap(), _ScrambleDisplay_currentAttributes = new WeakMap(), _ScrambleDisplay_twistyPlayer = new WeakMap();
customElements.define("scramble-display", ScrambleDisplay);
