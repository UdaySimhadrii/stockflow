import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import useToast from '../hooks/useToast.js';
import FormInput from '../components/FormInput.jsx';
import ErrorBanner from '../components/ErrorBanner.jsx';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState({
    organizationName: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validateForm = () => {
    const errors = {};
    const email = form.email.trim();
    const organizationName = form.organizationName.trim();

    if (!organizationName) {
      errors.organizationName = 'Organization name is required.';
    }
    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'A valid email is required.';
    }
    if (!form.password) {
      errors.password = 'Password is required.';
    } else if (form.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    }
    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const { confirmPassword, ...payload } = {
        ...form,
        email: form.email.trim(),
        organizationName: form.organizationName.trim(),
        name: form.name.trim() || undefined,
      };
      await signup(payload);
      toast.success('Account created');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const apiErrors = err.response?.data?.errors;
      if (apiErrors?.length) {
        const mapped = {};
        apiErrors.forEach((e2) => {
          if (e2.field) mapped[e2.field] = e2.message;
        });
        setFieldErrors(mapped);
      }
      const message =
        apiErrors?.[0]?.message || err.response?.data?.message || 'Could not create your account. Please try again.';
      toast.error(message);
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink">Create your organization</h2>
      <p className="mt-1 text-sm text-muted">Set up StockFlow in under a minute.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <ErrorBanner message={error} />
        <FormInput
          id="organizationName"
          name="organizationName"
          label="Organization name"
          placeholder="My Test Store"
          value={form.organizationName}
          onChange={handleChange}
          error={fieldErrors.organizationName}
          required
        />
        <FormInput
          id="name"
          name="name"
          label="Your name (optional)"
          placeholder="Jordan Lee"
          value={form.name}
          onChange={handleChange}
          error={fieldErrors.name}
        />
        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="you@company.com"
          value={form.email}
          onChange={handleChange}
          error={fieldErrors.email}
          required
        />
        <FormInput
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="At least 8 characters"
          value={form.password}
          onChange={handleChange}
          error={fieldErrors.password}
          required
          hint="Use at least 8 characters."
        />
        <FormInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm password"
          placeholder="••••••••"
          value={form.confirmPassword}
          onChange={handleChange}
          error={fieldErrors.confirmPassword}
          required
        />
        <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-brand-600 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Signup;
