"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadFonts = void 0;
async function loadFonts() {
    const webFontLoader = await Promise.resolve().then(() => require("webfontloader"));
    webFontLoader.load({
        google: {
            families: ["Roboto:100,300,400,500,700,900&display=swap"],
        },
    });
}
exports.loadFonts = loadFonts;
//# sourceMappingURL=webfontloader.js.map