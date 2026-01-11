import type { TabRoute } from './types';
import PubSubDemo from '../PubSub';
import { ControlledForm, UnControlledForm } from '../ControlledForm';

const routes: TabRoute[] = [
  {
    key: 'patterns',
    label: '设计模式',
    routes: [{ key: 'pubsub', label: '发布订阅', component: PubSubDemo }],
  },
  {
    key: 'forms',
    label: '表单',
    routes: [
      { key: 'controlled', label: '受控表单', component: ControlledForm },
      { key: 'uncontrolled', label: '非受控表单', component: UnControlledForm },
    ],
  },
];

export default routes;
