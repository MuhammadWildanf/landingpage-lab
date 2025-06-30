import { notFound } from 'next/navigation';

export default async function ProductDetailPage(props: any) {
  const params = await props.params;
  const { slug } = params;

  // Fetch detail produk by slug
  const res = await fetch(`https://api.imajiwa.id/public/products/slug/${slug}`, { cache: 'no-store' });
  const json = await res.json();
  const product = json.data;

  if (!product) return notFound();

  // Ambil media utama
  const mediaUrl = product.thumbnail_url || (product.media && product.media[0]?.url);

  // Parse spesifikasi & requirements jika ada
  let specifications = {};
  let requirements = {};
  try {
    specifications = product.specifications ? JSON.parse(product.specifications) : {};
    requirements = product.requirements ? JSON.parse(product.requirements) : {};
  } catch { }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 text-white font-mono">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      {mediaUrl && (
        mediaUrl.endsWith('.mp4') || mediaUrl.endsWith('.webm') ? (
          <video src={mediaUrl} controls className="w-full rounded-lg mb-6" />
        ) : (
          <img src={mediaUrl} alt={product.name} className="w-full rounded-lg mb-6" />
        )
      )}
      <p className="mb-4 whitespace-pre-line">{product.description}</p>
      {Object.keys(specifications).length > 0 && (
        <div className="mb-4">
          <h2 className="font-bold mb-2">Specifications</h2>
          <ul className="list-disc list-inside text-sm">
            {Object.entries(specifications).map(([key, value]) => (
              <li key={key}><b>{key}:</b> {String(value)}</li>
            ))}
          </ul>
        </div>
      )}
      {Object.keys(requirements).length > 0 && (
        <div className="mb-4">
          <h2 className="font-bold mb-2">Requirements</h2>
          <ul className="list-disc list-inside text-sm">
            {Object.entries(requirements).map(([key, value]) => (
              <li key={key}><b>{key}:</b> {String(value)}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="text-sm text-gray-400">
        Category: {product.category?.name}
      </div>
    </div>
  );
} 