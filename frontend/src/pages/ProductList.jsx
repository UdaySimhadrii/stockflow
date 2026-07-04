import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useProducts from '../hooks/useProducts.js';
import useToast from '../hooks/useToast.js';
import settingsApi from '../services/settingsApi.js';
import productApi from '../services/productApi.js';
import ProductTable from '../components/ProductTable.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorBanner from '../components/ErrorBanner.jsx';

const ProductList = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { products, pagination, search, setSearch, isLoading, error, refresh } = useProducts(10);
  const [defaultThreshold, setDefaultThreshold] = useState(5);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    settingsApi
      .get()
      .then((s) => setDefaultThreshold(s.defaultLowStockThreshold))
      .catch(() => {});
  }, []);

  const handleDelete = useCallback(async () => {
    if (!productToDelete) return;
    setIsDeleting(true);
    setDeleteError('');
    try {
      await productApi.remove(productToDelete.id);
      setProductToDelete(null);
      refresh(pagination.page);
      toast.success('Product deleted');
    } catch (err) {
      setDeleteError(err.response?.data?.message || 'Could not delete this product.');
      toast.error(err.response?.data?.message || 'Could not delete this product.');
    } finally {
      setIsDeleting(false);
    }
  }, [productToDelete, refresh, pagination.page]);

  const isSearching = search && search.trim() !== '';

  const emptyTitle = isSearching ? 'No matching products.' : 'No products found.';
  const emptyMessage = isSearching
    ? `No products match "${search}". Try a different keyword.`
    : "Click 'Add product' to create your first product.";

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Products</h1>
          <p className="mt-1 text-sm text-muted">{pagination.total} total</p>
        </div>
        <button className="btn-primary" onClick={() => navigate('/products/new')}>
          Add product
        </button>
      </div>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Search by name or SKU…"
          className="field-input max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="mt-4 space-y-4">
        {isLoading && <LoadingSpinner label="Loading products…" />}
        {!isLoading && error && <ErrorBanner message={error} onRetry={() => refresh(pagination.page)} />}
        {deleteError && <ErrorBanner message={deleteError} />}

        {!isLoading && !error && (
          <>
            <ProductTable
              products={products}
              defaultThreshold={defaultThreshold}
              onEdit={(product) => navigate(`/products/${product.id}/edit`)}
              onDelete={(product) => setProductToDelete(product)}
              emptyTitle={emptyTitle}
              emptyMessage={emptyMessage}
            />

            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between text-sm text-muted">
                <span>
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <div className="flex gap-2">
                  <button
                    className="btn-secondary !px-3 !py-1.5 text-xs"
                    disabled={pagination.page <= 1}
                    onClick={() => refresh(pagination.page - 1)}
                  >
                    Previous
                  </button>
                  <button
                    className="btn-secondary !px-3 !py-1.5 text-xs"
                    disabled={pagination.page >= pagination.totalPages}
                    onClick={() => refresh(pagination.page + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(productToDelete)}
        title="Delete this product?"
        message={`"${productToDelete?.name}" will be permanently removed. This can't be undone.`}
        confirmLabel="Delete"
        isDestructive
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setProductToDelete(null)}
      />
    </div>
  );
};

export default ProductList;
