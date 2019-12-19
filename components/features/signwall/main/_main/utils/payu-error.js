class PayuError {
    constructor(message) {
      this.message = message
      this.name = 'payU'
      this.stack = new Error().stack
    }
  }
  
  export { PayuError }
  