import { SharedStateBridge } from '@/common/PubSubServiceRequest/SharedStateBridge';
import { SharedDataMapValue, SharedDataMapValueFnData } from './type';

// 单例子类，支持动态类型
export class SharedStateBridgeSingleton extends SharedStateBridge {
  private static instances = new Map<string, SharedStateBridgeSingleton>();

  private constructor() {
    super();
  }

  // 根据 key 动态获取实例，并支持泛型类型
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static getInstance<V = any, T = any>(key: string): SharedStateBridge<V, T> {
    if (!this.instances.has(key)) {
      this.instances.set(key, new SharedStateBridgeSingleton());
    }
    return this.instances.get(key) as SharedStateBridge<V, T>;
  }
}

// 动态获取两个不同类型的实例
export const singleton = SharedStateBridgeSingleton.getInstance<SharedDataMapValue, SharedDataMapValueFnData>(
  'singleton1',
);
