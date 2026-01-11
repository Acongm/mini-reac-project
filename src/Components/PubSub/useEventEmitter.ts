/**
 * useEventEmitter Hook
 * 为 React 组件提供便捷的发布订阅接口
 * 基于 SharedStateBridge，自动处理订阅清理，防止内存泄漏
 */

import { useEffect, useCallback, useRef } from 'react';
import { singleton } from './EventEmitter';
import type { SharedDataSubscriber } from '../../common/PubSubServiceRequest/SharedStateBridge';
import { SharedDataMap } from './type';

/**
 * 使用事件发射器的 Hook
 * @param key 订阅的键名（来自 SharedDataMap）
 * @returns { subscribe, publish } 事件操作方法
 */
export function useEventEmitter<K extends keyof SharedDataMap>(key: K) {
  // 追踪所有订阅回调，以便在卸载时清理
  const subscriptionsRef = useRef<SharedDataSubscriber<SharedDataMap[K]>[]>([]);

  // 订阅事件
  const subscribe = useCallback(
    (callback: SharedDataSubscriber<SharedDataMap[K]>) => {
      singleton.subscribeSharedData(key, callback);
      subscriptionsRef.current.push(callback);

      // 返回取消订阅函数
      return () => {
        singleton.unsubscribeSharedData(key, callback);
        subscriptionsRef.current = subscriptionsRef.current.filter((cb) => cb !== callback);
      };
    },
    [key],
  );

  // 发布事件
  const publish = useCallback(
    (data: SharedDataMap[K]) => {
      singleton.publishSharedData(key, data);
    },
    [key],
  );

  // 组件卸载时清理所有订阅
  useEffect(
    () => () => {
      subscriptionsRef.current.forEach((callback) => {
        singleton.unsubscribeSharedData(key, callback);
      });
      subscriptionsRef.current = [];
    },
    [key],
  );

  return {
    subscribe,
    publish,
  };
}

export default useEventEmitter;
