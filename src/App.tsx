import { useState } from 'react';
import './App.css';
// import Header from '@/Components/Header';
// import ReadTheDocs from '@/Components/ReadTheDocs';
import ComponentShowcase from '@/Components/ComponentShowcase';

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      {/* <Header /> */}
      <div className="card">
        <button type="button" onClick={() => setCount(count + 1)}>
          count is {count}
        </button>
      </div>
      {/* <ReadTheDocs /> */}

      {/* 组件展示库 */}
      <div style={{ marginTop: '40px' }}>
        <ComponentShowcase />
      </div>
    </div>
  );
};

export default App;
