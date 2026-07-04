const LowStockTable = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <div className="card">
        <h3 className="font-display text-base font-semibold text-ink">Low stock items</h3>
        <p className="mt-3 text-sm text-muted">No low stock products.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="font-display text-base font-semibold text-ink">Low stock items</h3>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
              <th className="py-2 pr-4 font-medium">Name</th>
              <th className="py-2 pr-4 font-medium">SKU</th>
              <th className="py-2 pr-4 font-medium">On hand</th>
              <th className="py-2 pr-4 font-medium">Threshold</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-border/60 last:border-0">
                <td className="py-2.5 pr-4 font-medium text-ink">
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-alert-500 align-middle" />
                  {item.name}
                </td>
                <td className="py-2.5 pr-4">
                  <span className="sku-tag">{item.sku}</span>
                </td>
                <td className="py-2.5 pr-4 font-mono text-alert-600">{item.quantityOnHand}</td>
                <td className="py-2.5 pr-4 font-mono text-muted">{item.lowStockThreshold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LowStockTable;
