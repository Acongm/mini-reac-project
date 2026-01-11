import { useState } from 'react';
import { singleton } from './EventEmitter';

const EventPublisher: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [messageCount, setMessageCount] = useState(0);

  const handlePublish = () => {
    if (inputValue.trim()) {
      // 使用 SharedStateBridge 发布消息
      singleton.publishSharedData('pubsub-message', {
        content: inputValue,
        timestamp: new Date().toLocaleTimeString('zh-CN'),
      });

      setInputValue('');
      setMessageCount((prev) => prev + 1);
    }
  };

  return (
    <div style={{ padding: '20px', border: '2px solid #4CAF50', borderRadius: '8px', marginBottom: '20px' }}>
      <h3 style={{ marginTop: 0, color: '#4CAF50' }}>发布者 (Publisher)</h3>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="输入消息内容..."
          style={{
            width: '300px',
            padding: '8px',
            fontSize: '14px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            marginRight: '10px',
          }}
        />
        <button
          type="button"
          onClick={handlePublish}
          style={{
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          发布消息
        </button>
      </div>
      <div style={{ fontSize: '12px', color: '#666' }}>
        <p>
          已发布消息数: <strong>{messageCount}</strong>
        </p>
      </div>
    </div>
  );
};

export default EventPublisher;
