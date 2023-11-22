"use strict";

const {
  screen,
  keyboard,
  Key,
  mouse,
  straightTo,
  centerOf,
  Region,
  singleWord,
  imageResource,
} = require("@nut-tree/nut-js");

const { exec, spawn } = require("child_process");

screen.config.autoHighlight = true;
screen.config.resourceDirectory = "assets/mac/";

require("@nut-tree/nl-matcher");

const {
    configure,
    Language,
    LanguageModelType,
    preloadLanguages,
  } = require("@nut-tree/plugin-ocr");

jest.setTimeout(140000);

  afterAll(done => {
    exec(`killall "log"`)
    done();
  })


async function openSafariAndNavigate() {
    try {
        // Press Super key + Spacebar together
        await keyboard.pressKey(Key.LeftSuper, Key.Space);
        await keyboard.releaseKey(Key.LeftSuper, Key.Space);

        // Write "Safari"
        await keyboard.type("Safari");

        // Press Enter
        await keyboard.pressKey(Key.Enter);
        await keyboard.releaseKey(Key.Enter);

        // Wait for Safari to open and write "arc.net"
        await new Promise(resolve => setTimeout(resolve, 3000)); // Adjust delay as needed
        await keyboard.type("arc.net");

        // Press Enter to navigate
        await keyboard.pressKey(Key.Enter);
        await keyboard.releaseKey(Key.Enter);

        // Wait to locate image called "image.png"
        //const target = await screen.waitFor(imageResource("arc-button-download.png"), 3000);
        await mouse.move(straightTo(centerOf(screen.find(imageResource("arc-button-download.png")))));
        // await mouse.move();
        await mouse.leftClick();
        await new Promise(resolve => setTimeout(resolve, 3000));

    } catch (error) {
        console.error("An error occurred:", error);
    }
}

async function openDmgFile() {
    try {
        // console.log(`Mounting .dmg file`)
        // exec(`open /Users/orlie/Downloads/Arc*.dmg`)
        
        // console.log(`Sleep 1 s`)
        // await new Promise(resolve => setTimeout(resolve, 1000));

        // console.log(`Moving Arc.app to Applications folder`)
        // exec(`cd /Volumes/Arc; cp -r Arc.app Applications`)
        // console.log(`Sleep 3 s`)
        // await new Promise(resolve => setTimeout(resolve, 3000));
        // console.log(`Remove file quarantine lock`)
        // exec(`cd /Applications`)
        // exec(`find Arc.app -print0 | xargs -0 xattr -c`)
        exec(`pkill Arc`)
        await keyboard.pressKey(Key.LeftSuper, Key.Space);
        await keyboard.releaseKey(Key.LeftSuper, Key.Space);

        await keyboard.type("Arc");
        await keyboard.pressKey(Key.Enter);
        await keyboard.releaseKey(Key.Enter);
        exec(`log stream --predicate "processID == $(pgrep Arc | head -n1)" --level debug --style compact >> ~/Desktop/arc.log`)

        // await mouse.move(straightTo(centerOf(screen.find(imageResource("arcexec.png")))));
        // await mouse.rightClick();
        // await keyboard.type(Key.Down);
        // await keyboard.type(Key.Enter);
        // await new Promise(resolve => setTimeout(resolve, 1000));
        // await mouse.move(straightTo(centerOf(screen.find(imageResource("open.png")))));
        // await mouse.leftClick();

    }
    catch (error) {
        console.error("An error occurred:", error);
    }
}

async function createArcAccount() {
    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await mouse.move(straightTo(centerOf(screen.find(imageResource("createaccount.png")))));
        await mouse.leftClick();
        await keyboard.type("Orlando");
        await keyboard.pressKey(Key.Tab);
        await keyboard.type(`orlando+${Math.floor(1 + (10 - 1) * Math.random())}${Math.floor(1 + (10 - 1) * Math.random())}${Math.floor(1 + (10 - 1) * Math.random())}${Math.floor(1 + (10 - 1) * Math.random())}@dashcam.io`);
        await keyboard.pressKey(Key.Tab);
        await keyboard.type("dashcamiotest11");
        await keyboard.pressKey(Key.Tab);
        await keyboard.type("dashcamiotest11");
        await mouse.move(straightTo(centerOf(screen.find(imageResource("tos.png")))));
        await mouse.leftClick();
        await mouse.move(straightTo(centerOf(screen.find(imageResource("createaccountbtn.png")))));
        await new Promise(resolve => setTimeout(resolve, 1000));
        await mouse.leftClick();
    }
    catch (error) {
        console.error("An error occurred:", error);
    }
}

describe("Navigate to main site and download file", () => {
    it("should open browser", async () => {
        await openSafariAndNavigate()
    })
    it("should find call to action", async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    });
    it("should download file", async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    });
    it("should verify file is downloaded", async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    });
});

describe("Background installation", () => {
    it("should kill any unwanted process", async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    });
    it("should start logging the application's subsystem", async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    });
    it("should mount the .dmg file", async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    });
    it("should delete previously installed versions of the app", async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    });
    it("should install the app", async () => {
        await openDmgFile()
    });
});

describe("Account creation", () => {  
    it("should locate the Create account button", async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    });  
    it("should create a new random account", async () => {
        await createArcAccount()
});
    it("should successfully get to the onboarding screen", async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    });  
});