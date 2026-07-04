import { Outlet } from 'react-router-dom';

const shelfTags = [
  { sku: 'SKU-2041', qty: 128 },
  { sku: 'SKU-1187', qty: 12 },
  { sku: 'SKU-3390', qty: 64 },
];

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen bg-paper">
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-ink px-12 py-12 text-white lg:flex">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-500 font-mono text-sm font-semibold text-white">
            SF
          </span>
          <span className="font-display text-lg font-semibold">StockFlow</span>
        </div>

        <div>
          <h1 className="font-display text-4xl font-semibold leading-tight">
            Know what's on the shelf,
            <br />
            before it's gone.
          </h1>
          <p className="mt-4 max-w-sm text-sm text-white/60">
            One place to track products, quantities, and the items that need reordering —
            without a spreadsheet.
          </p>

          <div className="mt-10 space-y-2">
            {shelfTags.map((tag) => (
              <div
                key={tag.sku}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-xs"
              >
                <span className="text-white/70">{tag.sku}</span>
                <span className={tag.qty <= 15 ? 'text-alert-300' : 'text-brand-300'}>
                  {tag.qty} units
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-white/40">StockFlow MVP · Internal inventory tool</p>
      </div>

      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
