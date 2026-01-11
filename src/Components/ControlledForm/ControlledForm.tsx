import { useState, FormEvent, memo } from 'react';

interface FormData {
  username: string;
  email: string;
  password: string;
}

/**
 * 受控组件示例
 * 特点：
 * 1. 表单数据由 React state 完全控制
 * 2. 每次输入都会触发 state 更新和重新渲染
 * 3. 可以实时验证和控制用户输入
 * 4. 适合需要实时反馈的表单场景
 */
const ControlledForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  // 处理输入变化
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 清除该字段的错误
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // 表单验证
  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.username.trim()) {
      newErrors.username = '用户名不能为空';
    } else if (formData.username.length < 3) {
      newErrors.username = '用户名至少3个字符';
    }

    if (!formData.email.trim()) {
      newErrors.email = '邮箱不能为空';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '邮箱格式不正确';
    }

    if (!formData.password) {
      newErrors.password = '密码不能为空';
    } else if (formData.password.length < 6) {
      newErrors.password = '密码至少6个字符';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 提交表单
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validate()) {
      console.log('[ControlledForm] 提交数据:', formData);
      // 这里可以调用 API 提交数据
      alert('受控组件提交成功！查看控制台');

      // 重置表单
      setFormData({ username: '', email: '', password: '' });
    }
  };
  console.log('[ControlledForm] re-render:', formData);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginBottom: '20px' }}>
      <h3>受控组件 (Controlled Component)</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="controlled-username">
            用户名：
            <input
              id="controlled-username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="请输入用户名"
              style={{ marginLeft: '10px', width: '200px' }}
            />
          </label>
          {errors.username && (
            <span style={{ color: 'red', marginLeft: '10px', fontSize: '12px' }}>{errors.username}</span>
          )}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="controlled-email">
            邮箱：
            <input
              id="controlled-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="请输入邮箱"
              style={{ marginLeft: '10px', width: '200px' }}
            />
          </label>
          {errors.email && <span style={{ color: 'red', marginLeft: '10px', fontSize: '12px' }}>{errors.email}</span>}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="controlled-password">
            密码：
            <input
              id="controlled-password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="请输入密码"
              style={{ marginLeft: '10px', width: '200px' }}
            />
          </label>
          {errors.password && (
            <span style={{ color: 'red', marginLeft: '10px', fontSize: '12px' }}>{errors.password}</span>
          )}
        </div>

        <div style={{ marginTop: '15px' }}>
          <button type="submit" style={{ marginRight: '10px' }}>
            提交
          </button>
          <button type="button" onClick={() => setFormData({ username: '', email: '', password: '' })}>
            重置
          </button>
        </div>

        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          <p>当前值: {JSON.stringify(formData)}</p>
        </div>
      </form>
    </div>
  );
};

export default memo(ControlledForm);
