import Image from "next/image";
import { getShopProducts } from "@/lib/shopify";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Shop",
  description:
    "Limited edition fine art prints by Elvira Nisman — each one a moment caught between honesty and beauty, printed on demand and shipped worldwide.",
  path: "/shop",
});

export default async function ShopPage() {
  const products = await getShopProducts();

  if (products.length === 0) {
    return (
      <div className="main">
        <p className="empty">[ Coming soon ]</p>
      </div>
    );
  }

  return (
    <div className="shopPage">
      <h1 className="pageTitle">Shop</h1>
      <p className="note">
        Limited edition prints — printed on demand, shipped worldwide.
      </p>
      <ul className="grid">
        {products.map((product) => (
          <li
            key={product.id}
            className={`product${product.available ? "" : " -soldOut"}`}
          >
            {product.image && (
              <div className="media">
                <Image
                  src={product.image.src}
                  alt={product.title}
                  width={product.image.width}
                  height={product.image.height}
                  sizes="(min-width: 769px) 50vw, 100vw"
                />
              </div>
            )}
            <div className="info">
              <h2 className="title">{product.title}</h2>
              {product.available ? (
                <ul className="variants">
                  {product.variants
                    .filter((variant) => variant.available)
                    .map((variant) => (
                      <li key={variant.id}>
                        <a href={variant.url}>
                          {variant.title === "Default Title"
                            ? `Buy — ${variant.price}`
                            : `${variant.title} — ${variant.price}`}
                        </a>
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="soldOut">Edition sold out</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
