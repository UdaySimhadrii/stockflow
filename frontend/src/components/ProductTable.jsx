const isLowStock = (product, defaultThreshold) => {
  const threshold = product.lowStockThreshold ?? defaultThreshold;
  return product.quantityOnHand <= threshold;
};

const formatCurrency = (value) => (value === null || value === undefined ? '—' : `$${Number(value).toFixed(2)}`);

const ProductTable = ({
  products,
  defaultThreshold,
  onEdit,
  onDelete,
  emptyTitle,
  emptyMessage,
}) => {
  if (!products || products.length === 0) {
    const title = emptyTitle || 'No products yet.';
    const message =
      emptyMessage || "Click 'Add product' to create your first product.";
    return (
      <div className="card text-center">
        <h3 className="font-display text-base font-semibold text-ink">{title}</h3>
        <p className="mt-3 text-sm text-muted">{message}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-card">
      <table className="w-full text-left text-sm">
        <thead className="bg-ink/[0.03]">
          <tr className="text-xs uppercase tracking-wide text-muted">
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">SKU</th>
            <th className="px-4 py-3 font-medium">Quantity</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Selling price</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const low = isLowStock(product, defaultThreshold);
            return (
              <tr
                key={product.id}
                className={`border-t border-border ${low ? 'bg-alert-50/40' : ''}`}
              >
                <td className="px-4 py-3 font-medium text-ink">{product.name}</td>
                <td className="px-4 py-3">
                  <span className="sku-tag">{product.sku}</span>
                </td>
                <td className="px-4 py-3 font-mono">{product.quantityOnHand}</td>
                <td className="px-4 py-3">
                  {low ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-alert-50 px-2.5 py-1 text-xs font-semibold text-alert-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-alert-500" />
                      Low stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                      In stock
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 font-mono text-muted">{formatCurrency(product.sellingPrice)}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button className="btn-secondary !px-3 !py-1.5 text-xs" onClick={() => onEdit(product)}>
                      Edit
                    </button>
                    <button
                      className="btn-danger !px-3 !py-1.5 text-xs"
                      onClick={() => onDelete(product)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
