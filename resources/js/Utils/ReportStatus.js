export default class ReportStatus {
  static get OPEN() {
    return 1;
  }
  static get IN_PROGRESS() {
    return 2;
  }
  static get SOLVED() {
    return 3;
  }
  static get BLOCKED() {
    return 4;
  }
  static get CLOSED() {
    return 5;
  }
}
