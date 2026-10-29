import { Link } from 'react-router';
import { useVendors } from '../hooks/useVendors.js';
import VendorCard from '../components/VendorCard.jsx';
import { Loading, ErrorMessage } from '../components/Status.jsx';

export default function HomePage() {
  const { vendors, loading, error, reload } = useVendors();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  return (
    <section>
      <h2 className="section-title">Choose a vendor</h2>
      <div className="vendor-grid">
        {vendors.map((vendor) => (
          <Link key={vendor.id} to={`/vendor/${vendor.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <VendorCard vendor={vendor} isSelected={false} onSelect={() => {}} />
          </Link>
        ))}
      </div>
    </section>
  );
}