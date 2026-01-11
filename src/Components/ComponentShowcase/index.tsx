import ComponentTabs from './ComponentTabs';
import routes from './config';

const ComponentShowcase: React.FC = () => (
  <div style={{ padding: 20 }}>
    <h2 style={{ marginBottom: 20 }}>组件展示</h2>
    <ComponentTabs routes={routes} />
  </div>
);

export default ComponentShowcase;
