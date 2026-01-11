/**
 * EventSubscriber 组件
 * 演示如何订阅和处理事件
 */

import { useEffect, useState } from 'react';
import { singleton } from './EventEmitter';

interface Message {
  id: number;
  content: string;
  timestamp: string;
}

interface SubscriberProps {
  subscribeName?: string;
}

const EventSubscriber: React.FC<SubscriberProps> = ({ subscribeName = 'Subscriber 1' }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // 订阅事件
    const unsubscribe = singleton.subscribeSharedData('pubsub-message', (data) => {
      console.log(`[${subscribeName}] 收到消息:`, data);
      setMessages((prev) => [
        ...(data && typeof data?.id === 'number'
          ? [
              {
                id: data?.id,
                content: data?.content,
                timestamp: data?.timestamp,
              },
            ]
          : []),
        ...prev,
      ]);
    });

    // 清理：组件卸载时取消订阅
    return unsubscribe;
  }, [subscribeName]);

  const handleClearMessages = () => {
    setMessages([]);
  };

  return (
    <div style={{ padding: '20px', border: '2px solid #2196F3', borderRadius: '8px', marginBottom: '20px' }}>
      <h3 style={{ marginTop: 0, color: '#2196F3' }}>{subscribeName} (Subscriber)</h3>
      <div style={{ marginBottom: '10px' }}>
        <button
          type="button"
          onClick={handleClearMessages}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          清空消息
        </button>
      </div>

      <div
        style={{
          maxHeight: '200px',
          overflowY: 'auto',
          padding: '10px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
          minHeight: '100px',
        }}
      >
        {messages.length === 0 ? (
          <p style={{ color: '#999', margin: 0 }}>等待消息...</p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {messages.map((msg) => (
              <li key={msg.id} style={{ marginBottom: '8px', fontSize: '14px' }}>
                <span style={{ color: '#666' }}>[{msg.timestamp}]</span>
                <span style={{ marginLeft: '10px', color: '#333' }}>{msg.content}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
        <p>
          已接收消息数: <strong>{messages.length}</strong>
        </p>
      </div>
    </div>
  );
};

export default EventSubscriber;
