import { notFound } from 'next/navigation';
import Image from "next/image";
import Link from 'next/link';

type ParamsType = { slug: string } | Promise<{ slug: string }>;

interface RelatedProduct {
  id: number;
  name: string;
  slug: string;
  thumbnail_url: string;
  category_id: number;
}

export default async function ProductDetailPage(props: { params: ParamsType }) {
  const params = await props.params;
  const { slug } = params;

  // Fetch detail produk by slug
  const res = await fetch(`https://api.imajiwa.id/public/products/slug/${slug}`, { cache: 'no-store' });
  const json = await res.json();
  const product = json.data;

  if (!product) return notFound();

  // Fetch all products for related section
  let relatedProducts: RelatedProduct[] = [];
  try {
    const relRes = await fetch('https://api.imajiwa.id/public/products', { cache: 'no-store' });
    const relJson = await relRes.json();
    if (Array.isArray(relJson)) {
      relatedProducts = relJson;
    } else if (Array.isArray(relJson.data)) {
      relatedProducts = relJson.data;
    } else {
      relatedProducts = [];
    }
    // Filter: same category, not current product, ambil max 6
    relatedProducts = relatedProducts.filter((p) => p.category_id === product.category_id && p.id !== product.id).slice(0, 6);
  } catch { }

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

      <div className="text-sm pb-5">
        {product.category?.name}
      </div>

      {/* Media utama (jika ada, tetap tampilkan di atas) */}
      {mediaUrl && (
        mediaUrl.endsWith('.mp4') || mediaUrl.endsWith('.webm') ? (
          <video src={mediaUrl} controls className="w-full rounded-lg mb-6" />
        ) : (
          <Image src={mediaUrl} alt={product.name} width={800} height={450} className="w-full rounded-lg mb-6" />
        )
      )}

      {/* Gallery Section */}
      {Array.isArray(product.media) && product.media.length > 0 && (
        <>
          <h2 className="font-bold mb-2 text-lg">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {product.media.map((media: { url: string }, idx: number) => (
              <div key={idx} className="w-full">
                {/\.(mp4|webm)$/i.test(media.url) ? (
                  <video
                    src={media.url}
                    controls
                    className="w-full rounded-lg"
                    style={{ maxHeight: 320 }}
                  />
                ) : (
                  <Image
                    src={media.url}
                    alt={`Media ${idx + 1}`}
                    width={800}
                    height={450}
                    className="w-full rounded-lg"
                    style={{ maxHeight: 320, objectFit: 'cover' }}
                  />
                )}
              </div>
            ))}
          </div>
        </>
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

      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="font-bold mb-4 text-xl">More</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {relatedProducts.map((prod) => (
              <Link
                key={prod.id}
                href={`/interactive/${prod.slug}`}
                className="relative rounded-2xl overflow-hidden shadow-lg group aspect-[16/9] bg-[#2a2a2a] w-full min-h-[140px] sm:min-h-[180px] md:min-h-[0] cursor-pointer transition-transform hover:scale-[1.03] focus:outline-none"
              >
                {prod.thumbnail_url.match(/\.(mp4|webm)$/i) ? (
                  <video
                    src={prod.thumbnail_url}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <Image
                    src={prod.thumbnail_url}
                    alt={prod.name}
                    width={800}
                    height={450}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-black/30 z-0" />
                <div className="absolute bottom-0 left-0 z-10 p-3 sm:p-4">
                  <div className="text-white text-base sm:text-lg font-bold drop-shadow-md">
                    {prod.name}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
} 