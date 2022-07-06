export default abstract class Store {
  abstract async get(key: string): Promise<{ val: string; ttl: number }> // ttl is second

  abstract async set(key: string, val: string, ttl: number): Promise<void>
}

export class StoreMemory extends Store {
  private store: { [key: string]: { val: string; ttl: number; expired: number } } = {}

  constructor() {
    super()
    this.store = {}
  }

  async get(key: string): Promise<{ val: string; ttl: number }> {
    const val = this.store[key]
    if (!val) {
      return { val: '', ttl: 0 }
    }
    const ttl = val.expired - Math.floor(Date.now() / 1000)
    if (ttl >= 5) {
      return { val: val.val, ttl }
    }
    // remove key from store
    delete this.store[key]
    return { val: '', ttl: 0 }
  }

  async set(key: string, val: string, ttl: number): Promise<void> {
    const now = Math.floor(Date.now() / 1000)
    this.store[key] = { val, ttl, expired: now + ttl }
  }
}
