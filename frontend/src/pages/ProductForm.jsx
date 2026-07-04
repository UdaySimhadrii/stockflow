import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import productApi from '../services/productApi.js';
import FormInput from '../components/FormInput.jsx';
import useToast from '../hooks/useToast.js';
import ErrorBanner from '../components/ErrorBanner.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const emptyForm = {
  name: '',
  sku: '',
  description: '',
  quantityOnHand: '0',
  costPrice: '',
  sellingPrice: '',
  lowStockThreshold: '',
};

const ProductForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState(emptyForm);
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    const quantity = form.quantityOnHand.trim();
    const cost = form.costPrice.trim();
    const selling = form.sellingPrice.trim();

    if (!form.name.trim()) {
      errors.name = 'Product name is required.';
    }
    if (!form.sku.trim()) {
      errors.sku = 'SKU is required.';
    }
    if (quantity !== '' && (!Number.isInteger(Number(quantity)) || Number(quantity) < 0)) {
      errors.quantityOnHand = 'Quantity cannot be negative.';
    }
    if (cost !== '' && (Number.isNaN(Number(cost)) || Number(cost) < 0)) {
      errors.costPrice = 'Cost price cannot be negative.';
    }
    if (selling !== '' && (Number.isNaN(Number(selling)) || Number(selling) < 0)) {
      errors.sellingPrice = 'Selling price cannot be negative.';
    }
    if (cost !== '' && selling !== '' && Number(selling) < Number(cost)) {
      errors.sellingPrice = 'Selling price should not be lower than cost price.';
    }

    return errors;
  };

  useEffect(() => {
    if (!isEditMode) return;
    productApi
      .get(id)
      .then((product) => {
        setForm({
          name: product.name,
          sku: product.sku,
          description: product.description || '',
          quantityOnHand: String(product.quantityOnHand),
          costPrice: product.costPrice !== null ? String(product.costPrice) : '',
          sellingPrice: product.sellingPrice !== null ? String(product.sellingPrice) : '',
          lowStockThreshold:
            product.lowStockThreshold !== null ? String(product.lowStockThreshold) : '',
        });
      })
      .catch((err) => setError(err.response?.data?.message || 'Could not load this product.'))
      .finally(() => setIsLoading(false));
  }, [id, isEditMode]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const buildPayload = () => ({
    name: form.name,
    sku: form.sku,
    description: form.description || null,
    quantityOnHand: form.quantityOnHand === '' ? 0 : Number(form.quantityOnHand),
    costPrice: form.costPrice === '' ? null : Number(form.costPrice),
    sellingPrice: form.sellingPrice === '' ? null : Number(form.sellingPrice),
    lowStockThreshold: form.lowStockThreshold === '' ? null : Number(form.lowStockThreshold),
  });

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
      const payload = buildPayload();
      if (isEditMode) {
        await productApi.update(id, payload);
        toast.success('Product updated');
      } else {
        await productApi.create(payload);
        toast.success('Product created');
      }
      navigate('/products');
    } catch (err) {
      const apiErrors = err.response?.data?.errors;
      if (apiErrors) {
        const mapped = {};
        apiErrors.forEach((e2) => {
          if (e2.field) mapped[e2.field] = e2.message;
        });
        setFieldErrors(mapped);
      }
      const message = err.response?.data?.message || 'Could not save this product.';
      toast.error(message);
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner label="Loading product…" />;
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">
        {isEditMode ? 'Edit product' : 'Add product'}
      </h1>
      <p className="mt-1 text-sm text-muted">
        {isEditMode ? 'Update details, including stock on hand.' : 'Add a new product to your inventory.'}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 max-w-xl space-y-4 card">
        <ErrorBanner message={error} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput
            id="name"
            name="name"
            label="Product name"
            value={form.name}
            onChange={handleChange}
            error={fieldErrors.name}
            required
          />
          <FormInput
            id="sku"
            name="sku"
            label="SKU"
            value={form.sku}
            onChange={handleChange}
            error={fieldErrors.sku}
            hint="Must be unique within your organization."
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="field-label">
            Description (optional)
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="field-input"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormInput
            id="quantityOnHand"
            name="quantityOnHand"
            type="number"
            min="0"
            label="Quantity on hand"
            value={form.quantityOnHand}
            onChange={handleChange}
            error={fieldErrors.quantityOnHand}
          />
          <FormInput
            id="costPrice"
            name="costPrice"
            type="number"
            min="0"
            step="0.01"
            label="Cost price (optional)"
            value={form.costPrice}
            onChange={handleChange}
            error={fieldErrors.costPrice}
          />
          <FormInput
            id="sellingPrice"
            name="sellingPrice"
            type="number"
            min="0"
            step="0.01"
            label="Selling price (optional)"
            value={form.sellingPrice}
            onChange={handleChange}
            error={fieldErrors.sellingPrice}
          />
        </div>

        <FormInput
          id="lowStockThreshold"
          name="lowStockThreshold"
          type="number"
          min="0"
          label="Low stock threshold (optional)"
          value={form.lowStockThreshold}
          onChange={handleChange}
          error={fieldErrors.lowStockThreshold}
          hint="Leave blank to use your organization's default threshold."
        />

        <div className="flex gap-3 pt-2">
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saving…' : isEditMode ? 'Save changes' : 'Add product'}
          </button>
          <button type="button" className="btn-secondary" onClick={() => navigate('/products')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
