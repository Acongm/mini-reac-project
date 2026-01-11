/**
 * PubSubDemo 组件
 * 发布订阅模式的完整演示
 */

import { useState, memo, useMemo } from 'react';
import EventPublisher from './EventPublisher';
import EventSubscriber from './EventSubscriber';

const PubSubDemo: React.FC = () => {
  const [subscriberCount, setSubscriberCount] = useState(2);
  const subscriberIds = useMemo(
    () => Array.from({ length: subscriberCount }, (_, i) => `subscriber-${i}`),
    [subscriberCount],
  );

  const addSubscriber = () => {
    setSubscriberCount((prev) => prev + 1);
  };

  const removeSubscriber = () => {
    if (subscriberCount > 1) {
      setSubscriberCount((prev) => prev - 1);
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#fafafa', borderRadius: '8px' }}>
      <h2 style={{ marginTop: 0 }}>🔔 发布订阅模式 (Pub/Sub Pattern)</h2>

      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#fff', borderRadius: '4px' }}>
        <p style={{ margin: '0 0 10px 0', color: '#666' }}>
          <strong>说明:</strong> 发布订阅是观察者模式的变体，使发布者和订阅者完全解耦。
          发布者只需发送消息，不需要知道谁在听；订阅者只需监听感兴趣的事件，无需知道谁在发送。
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#4CAF50', marginTop: 0 }}>消息生产者</h3>
        <EventPublisher />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <div style={{ marginBottom: '15px', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <h3 style={{ margin: 0, color: '#2196F3' }}>消息消费者 ({subscriberCount} 个)</h3>
          <button
            type="button"
            onClick={addSubscriber}
            style={{
              padding: '6px 12px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            + 添加订阅者
          </button>
          <button
            type="button"
            onClick={removeSubscriber}
            disabled={subscriberCount <= 1}
            style={{
              padding: '6px 12px',
              backgroundColor: subscriberCount <= 1 ? '#ccc' : '#FF9800',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: subscriberCount <= 1 ? 'not-allowed' : 'pointer',
              fontSize: '12px',
            }}
          >
            - 移除订阅者
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
          {subscriberIds.map((id, index) => (
            <EventSubscriber key={id} subscribeName={`订阅者 ${index + 1}`} />
          ))}
        </div>
      </div>

      <div style={{ padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '4px', marginTop: '30px' }}>
        <h4 style={{ marginTop: 0 }}>核心概念</h4>
        <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '14px', color: '#555' }}>
          <li>
            <strong>发布者</strong>: 发送消息，不关心谁接收
          </li>
          <li>
            <strong>订阅者</strong>: 监听事件，响应消息
          </li>
          <li>
            <strong>事件名</strong>: 连接发布者和订阅者的纽带
          </li>
          <li>
            <strong>解耦性</strong>: 发布者和订阅者相互独立，易于扩展
          </li>
        </ul>
      </div>
    </div>
  );
};

export default memo(PubSubDemo);
