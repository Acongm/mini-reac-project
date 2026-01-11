import { useState } from 'react';
import type { TabRoute } from './types';

interface Props {
  routes: TabRoute[];
}

const ComponentTabs: React.FC<Props> = ({ routes }) => {
  const [activeTab, setActiveTab] = useState(routes[0]?.key || '');
  const [activeRoute, setActiveRoute] = useState<string | null>(null);

  const currentTab = routes.find((t) => t.key === activeTab);
  const currentRoute = currentTab?.routes.find((r) => r.key === activeRoute);
  const ActiveComponent = currentRoute?.component;

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid #ddd', paddingBottom: 8 }}>
        {routes.map((tab) => (
          <button
            type="button"
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              setActiveRoute(null);
            }}
            style={{
              padding: '8px 16px',
              border: 'none',
              background: activeTab === tab.key ? '#1890ff' : '#f0f0f0',
              color: activeTab === tab.key ? '#fff' : '#333',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div style={{ display: 'flex', marginTop: 16, gap: 16 }}>
        <ul style={{ width: 200, listStyle: 'none', padding: 0, margin: 0 }}>
          {currentTab?.routes.map((route) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions

            <li
              key={route.key}
              role="menuitem"
              tabIndex={0}
              onClick={() => setActiveRoute(route.key)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveRoute(route.key);
                }
              }}
              style={{
                padding: '10px 12px',
                cursor: 'pointer',
                color: activeRoute === route.key ? '#1890ff' : '#fff',
                background: activeRoute === route.key ? '#e6f7ff' : 'transparent',
                borderLeft: activeRoute === route.key ? '3px solid #1890ff' : '3px solid transparent',
              }}
            >
              {route.label}
            </li>
          ))}
        </ul>

        {/* 组件渲染区 */}
        <div style={{ flex: 1, padding: 16, border: '1px solid #ddd', borderRadius: 4, minHeight: 300 }}>
          {ActiveComponent ? <ActiveComponent /> : <span style={{ color: '#999' }}>← 点击左侧列表查看组件</span>}
        </div>
      </div>
    </div>
  );
};

export default ComponentTabs;
