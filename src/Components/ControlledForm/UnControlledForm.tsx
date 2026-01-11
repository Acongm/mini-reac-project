import { useRef, FormEvent, memo } from 'react';

/**
 * 非受控组件示例
 * 特点：
 * 1. 表单数据由 DOM 自身管理，React 只在需要时获取值
 * 2. 使用 ref 访问 DOM 元素获取数据
 * 3. 不会因为输入而触发重新渲染，性能更好
 * 4. 适合简单表单或性能敏感场景
 */
const UnControlledForm: React.FC = () => {
  // 使用 ref 引用 DOM 元素
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // 提交表单
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 从 ref 中获取当前值
    const formData = {
      username: usernameRef.current?.value || '',
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
    };

    // 简单验证
    if (!formData.username || !formData.email || !formData.password) {
      alert('请填写所有字段');
      return;
    }

    console.log('[UnControlledForm] 提交数据:', formData);
    alert('非受控组件提交成功！查看控制台');

    // 重置表单 - 直接操作 DOM
    if (usernameRef.current) usernameRef.current.value = '';
    if (emailRef.current) emailRef.current.value = '';
    if (passwordRef.current) passwordRef.current.value = '';
  };

  // 重置表单
  const handleReset = () => {
    if (usernameRef.current) usernameRef.current.value = '';
    if (emailRef.current) emailRef.current.value = '';
    if (passwordRef.current) passwordRef.current.value = '';
  };

  console.log('[UnControlledForm] re-render:', {
    username: usernameRef.current?.value || '',
    email: emailRef.current?.value || '',
    password: passwordRef.current?.value || '',
  });

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h3>非受控组件 (Uncontrolled Component)</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="uncontrolled-username">
            用户名：
            <input
              id="uncontrolled-username"
              type="text"
              ref={usernameRef}
              defaultValue=""
              placeholder="请输入用户名"
              style={{ marginLeft: '10px', width: '200px' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="uncontrolled-email">
            邮箱：
            <input
              id="uncontrolled-email"
              type="email"
              ref={emailRef}
              defaultValue=""
              placeholder="请输入邮箱"
              style={{ marginLeft: '10px', width: '200px' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="uncontrolled-password">
            密码：
            <input
              id="uncontrolled-password"
              type="password"
              ref={passwordRef}
              defaultValue=""
              placeholder="请输入密码"
              style={{ marginLeft: '10px', width: '200px' }}
            />
          </label>
        </div>

        <div style={{ marginTop: '15px' }}>
          <button type="submit" style={{ marginRight: '10px' }}>
            提交
          </button>
          <button type="button" onClick={handleReset}>
            重置
          </button>
        </div>

        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          <p>注意：输入时不会触发组件重新渲染</p>
        </div>
      </form>
    </div>
  );
};

export default memo(UnControlledForm);
