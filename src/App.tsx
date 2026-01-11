import { useState } from 'react';
import './App.css';
import Header from '@/Components/Header';
import ReadTheDocs from '@/Components/ReadTheDocs';
import PubSubDemo from '@/Components/PubSub';
import { ControlledForm, UnControlledForm } from './Components/ControlledForm';

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Header />
      <div className="card">
        <button type="button" onClick={() => setCount(count + 1)}>
          count is {count}
        </button>
      </div>
      <ReadTheDocs />

      {/* 发布订阅模式演示 */}
      <div style={{ marginTop: '40px' }}>
        <ControlledForm />
        <UnControlledForm />
      </div>
      {/* 发布订阅模式演示 */}
      <div style={{ marginTop: '40px' }}>
        <PubSubDemo />
      </div>
    </div>
  );
};

export default App;
