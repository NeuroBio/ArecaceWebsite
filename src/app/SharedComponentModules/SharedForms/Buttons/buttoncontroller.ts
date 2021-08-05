
export class ButtonController {
    Submit: boolean;
    Reset: boolean;
    Delete: boolean;
    UpdateAll: boolean;
    constructor(bool: boolean[]) {
      this.Submit = bool[0];
      this.Reset = bool[1];
      this.Delete = bool[2];
      this.UpdateAll = bool[3];
    }
  }
