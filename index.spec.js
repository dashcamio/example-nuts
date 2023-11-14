"use strict";

const {
  screen,
  mouse,
  centerOf,
  Region,
  singleWord,
  imageResource,
} = require("@nut-tree/nut-js");

screen.config.autoHighlight = true;

require("@nut-tree/nl-matcher");

const {
  configure,
  Language,
  LanguageModelType,
  preloadLanguages,
} = require("@nut-tree/plugin-ocr");

const util = require("util");
const { exec, spawn } = require("child_process");
const execa = util.promisify(exec);

let raycastApp;
let raycastLog;

afterAll(done => {
  exec(`killall "log"`)
  done();
})

jest.setTimeout(10000);

describe("Log test", () => {
  describe("install", () => {
    it("should run Raycast", () => {
      raycastApp = exec(`open -a Raycast`);
    });

    it("should run spawn logs", () => {
      raycastLog = exec(
        `log stream --predicate "subsystem == 'com.raycast.macos'" --level debug --style compact >> ~/Desktop/ray.cast.log`
      );
    });
  });

  describe("dimensions", () => {
    it("should log screen height", async () => {
      console.log("Screen Height", await screen.height());
    });

    it("should log screen width", async () => {
      console.log("Screen Width", await screen.width());
    });
  });

  describe("click settings icon", () => {
    it("should find a match", async () => {

      screen.config.resourceDirectory = "assets/mac/";

      // https://nut-tree.github.io/apidoc/classes/region_class.Region.html
      let region = await screen.waitFor(imageResource("settings-icon.png"));

      console.log("Found Settings Icon", region);

      await mouse.move(centerOf(region));
      await mouse.leftClick();
    });
  });

  describe("click 'about' icon", () => {
    it("should find a match", async () => {
      screen.config.resourceDirectory = "assets/mac/";

      let region = await screen.waitFor(imageResource("menu-item-about.png"));

      console.log("Found About Icon", region);

      await mouse.move(centerOf(region));

      await mouse.leftClick();
    });
  });
});
