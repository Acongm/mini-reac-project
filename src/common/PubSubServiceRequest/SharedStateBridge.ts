// SharedStateBridge.ts

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SharedDataSubscriber<T = any> = (data: T | null) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class SharedStateBridge<V = any, T = any> {
  // === 状态共享（Pub/Sub） ===
  protected sharedDataRegistry = new Map<string, V>();

  protected sharedDataSubscribers = new Map<string, Set<SharedDataSubscriber<T>>>();

  // ========== 状态共享（发布订阅） ==========

  publishSharedData(key: string, data: V): void {
    this.sharedDataRegistry.set(key, data);
    const subs = this.sharedDataSubscribers.get(key);
    subs?.forEach((cb) => cb(data as unknown as T));
  }

  getSharedData(key: string): V | undefined {
    return this.sharedDataRegistry.get(key);
  }

  clearSharedData(key: string): void {
    this.sharedDataRegistry.delete(key);
    const subs = this.sharedDataSubscribers.get(key);
    subs?.forEach((cb) => cb(null));
  }

  subscribeSharedData(key: string, callback: SharedDataSubscriber<T>): void {
    if (!this.sharedDataSubscribers.has(key)) {
      this.sharedDataSubscribers.set(key, new Set());
    }
    this.sharedDataSubscribers.get(key)!.add(callback as SharedDataSubscriber);
    const existing = this.sharedDataRegistry.get(key);
    if (existing !== undefined) callback(existing as unknown as T);
  }

  unsubscribeSharedData(key: string, callback: SharedDataSubscriber<T>): void {
    this.sharedDataSubscribers.get(key)?.delete(callback);
  }
}
