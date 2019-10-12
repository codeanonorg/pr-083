import Probe from "./probe.js";
import { P83Targets } from "./targets.js";

export default class P83Mission {
  constructor(name, code, positions, diagAllowed, trackingAllowed, oxygen) {
    this.name = name;
    this.code = code;
    this.probe = new Probe();
    this.targets = new P83Targets(positions, trackingAllowed);
    this.diagonalAllowed = diagAllowed;
    this.trackingAllowed = trackingAllowed;
    this.oxygenStartLevel = oxygen;
    this.sequence = "";
    this.isSpeedOk = true;
    this.isAchieved = false;
  }

  get oxygenLevel() {
    return this.oxygenStartLevel - this.sequence.length;
  }

  get nbTargets() {
    return this.targets.positions.length;
  }

  move(thrust_id) {
    if (thrust_id < 1 || thrust_id > 9) return;
    this.sequence += thrust_id.toFixed();
    this.probe.accelerate(thrust_id);

    const checkState = this.targets.check(this.probe);
    switch (checkState) {
      case P83Targets.CHECK_STATE_POSITION:
        this.isSpeedOk = false;
        break;
      case P83Targets.CHECK_STATE_BOTH:
        this.isSpeedOk = true;
        if (this.targets.checkAll()) {
          this.isAchieved = true;
        }
        break;
    }
  }

  toString() {
    return trimLines(`MISSION: ${this.name}
    TELEPORTATION CODE: ${this.code}
    *** DESCRIPTION ***
    TARGETS:
    ${this.targets.targetsString()}
    DIAGONAL THRUST: ${this.diagonalAllowed ? "YES" : "NO"}
    TRACKING DEVICE: ${this.trackingAllowed ? "YES" : "NO"}
    OXYGEN AT DEPARTURE: ${this.oxygenStartLevel}
    
    *** CURRENT STATUS ***
    ${this.sequence.length === 0 ? "" : `SEQUENCE: ${this.sequence}`}
    PROBE:
    ${(this.probe.toString())}
    VALIDATED TARGETS: ${this.nbTargets === 0 ? "NONE" : this.targets.checkedString()}
    REMAINING OXYGEN: ${this.oxygenLevel}`);
  }
}

function trimLines(input) {
  return input.split('\n').map(l => l.trim()).join('\n');
}
