import P83Mission from "./mission.js";
import { colors } from "./consts.js";
import P83StatusPanel, { P83MissionPanel, P83SequencePanel, P83ThrustPanel, P83XYPanel } from "./panels.js";
import Vector from "./vector.js";
import P83Scope from "./scope.js";
import P83Splash from "./splash.js";
import { P83TargetSelector } from "./targets.js";

export default class P83Controller {
  constructor(parent, missionData, quit_cb) {
    this.parent = parent;
    this.root = this.parent.root;
    this.mission = new P83Mission(
      missionData.name,
      missionData.code,
      missionData.positions,
      missionData.diagonalAllowed,
      missionData.trackingAllowed,
      missionData.oxygen
    );
    this.quitCallback = quit_cb;

    this.thrustPanel = new P83ThrustPanel(this, Vector.zero, this.mission, this.move.bind(this));
    this.speedPanel = new P83XYPanel(this, new Vector(0, 14), "SPEED", this.mission.probe.speed);
    this.positionPanel = new P83XYPanel(this, new Vector(0, 21), "POSITION", this.mission.probe.position);
    this.scope = new P83Scope(this, new Vector(14, 0), new Vector(28, 28), this.mission);
    this.statusPanel = new P83StatusPanel(this, new Vector(42, 0), this.mission);
    this.targetSelector = new P83TargetSelector(this, new Vector(42, 7), this.mission, this.scope.select.bind(this));
    this.sequencePanel = new P83SequencePanel(this, new Vector(0, 28), this.mission, this.move.bind(this));
    this.missionPanel = new P83MissionPanel(this, new Vector(42, 28), this.mission, this.quit.bind(this));
    this.splash = new P83Splash(this, new Vector(8, 16), this.quit.bind(this));
    this.children = [
      this.thrustPanel,
      this.speedPanel,
      this.positionPanel,
      this.scope,
      this.statusPanel,
      this.targetSelector,
      this.sequencePanel,
      this.missionPanel
    ]
  }

  draw() {
    for (const child of this.children) {
      child.draw();
    }
  }

  move(thrust) {
    if (this.mission.oxygenLevel === 0) return false;
    this.mission.move(thrust);
    if (this.mission.isSpeedOk) {
      this.statusPanel.trackingLED.blink(0);
      this.speedPanel.led.colors = colors.green;
    } else {
      this.statusPanel.trackingLED.blink(1);
      this.speedPanel.led.colors = colors.red;
      this.speedPanel.led.blink(1);
    }
    if (this.mission.oxygenLevel <= 0) {
      this.statusPanel.oxygenLED.blink(1);
    }

    this.root.draw();
    if (this.mission.isAchieved) {
      this.splash.setup(`Mission ${this.mission.name} achieved!!`.toUpperCase());
      this.splash.draw();
    } else if (this.mission.oxygenLevel <= 0) {
      this.splash.setup(`You ran out of oxygen before achieving mission ${this.mission.name}!`.toUpperCase());
      this.splash.draw();
    }
    return true;
  }

  quit() {
    this.statusPanel.oxygenLED.blink(0);
    this.statusPanel.trackingLED.blink(0);
    this.speedPanel.led.blink(0);
    this.sequencePanel.sequenceInput.show(false);
    this.quitCallback(this.mission.isAchieved);
  }

  onClick(pos) {
    if (this.mission.isAchieved || this.mission.oxygenLevel <= 0) {
      this.splash.onClick(pos);
    } else {
      this.thrustPanel.onClick(pos);
      this.targetSelector.onClick(pos);
      this.missionPanel.onClick(pos);
    }
  }
}
