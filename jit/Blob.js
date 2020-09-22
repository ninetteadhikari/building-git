class Blob {
  constructor(data) {
    this.data = data;
  }
  type() {
    return 'blob';
  }
  toS() {
    return this.data;
  }
}

module.exports = Blob;
