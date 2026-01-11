import { SharedStateBridge, SharedDataMap } from '@/common/PubSubServiceRequest/SharedStateBridge';

// 单例子类
export class SharedStateBridgeSingleton extends SharedStateBridge<keyof SharedDataMap> {
  private static instance: SharedStateBridgeSingleton;

  private constructor() {
    super();
  }

  public static getInstance(): SharedStateBridgeSingleton {
    if (!SharedStateBridgeSingleton.instance) {
      SharedStateBridgeSingleton.instance = new SharedStateBridgeSingleton();
    }
    return this.instance;
  }
}

// 导出单例
export const singleton = SharedStateBridgeSingleton.getInstance();
