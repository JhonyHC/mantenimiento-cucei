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

  static getDescriptions(status) {
    switch (status) {
      case this.OPEN:
        return 'Pendiente';
      case this.IN_PROGRESS:
        return 'En progreso';
      case this.SOLVED:
        return 'Resuelto';
      case this.BLOCKED:
        return 'Bloqueado';
      case this.CLOSED:
        return 'Cerrado';
      default:
        return 'Desconocido';
    }
  }
}
