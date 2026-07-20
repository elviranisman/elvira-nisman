export type ShopVariant = {
  id: string;
  title: string;
  price: string;
  available: boolean;
  url: string;
};

export type ShopProduct = {
  id: string;
  title: string;
  description: string;
  image: { src: string; width: number; height: number } | null;
  available: boolean;
  variants: ShopVariant[];
};

const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

const query = `{
  products(first: 50, sortKey: CREATED_AT, reverse: true) {
    edges {
      node {
        id
        title
        description
        availableForSale
        featuredImage { url width height }
        variants(first: 20) {
          edges {
            node {
              id
              title
              availableForSale
              price { amount currencyCode }
            }
          }
        }
      }
    }
  }
}`;

function formatPrice(amount: string, currency: string) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency,
    minimumFractionDigits: Number(amount) % 1 === 0 ? 0 : 2,
  }).format(Number(amount));
}

function variantUrl(gid: string) {
  const id = gid.split("/").pop();
  return `https://${domain}/cart/${id}:1`;
}

type RawVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: { amount: string; currencyCode: string };
};

type RawProduct = {
  id: string;
  title: string;
  description: string;
  availableForSale: boolean;
  featuredImage: { url: string; width: number; height: number } | null;
  variants: { edges: { node: RawVariant }[] };
};

export async function getShopProducts(): Promise<ShopProduct[]> {
  if (!domain || !token) return [];
  try {
    const response = await fetch(`https://${domain}/api/2026-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query }),
      cache: "force-cache",
    });
    if (!response.ok) return [];
    const json = await response.json();
    const edges: { node: RawProduct }[] = json?.data?.products?.edges ?? [];
    return edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      description: node.description ?? "",
      available: node.availableForSale,
      image: node.featuredImage
        ? {
            src: node.featuredImage.url,
            width: node.featuredImage.width,
            height: node.featuredImage.height,
          }
        : null,
      variants: node.variants.edges.map(({ node: variant }) => ({
        id: variant.id,
        title: variant.title,
        price: formatPrice(variant.price.amount, variant.price.currencyCode),
        available: variant.availableForSale,
        url: variantUrl(variant.id),
      })),
    }));
  } catch {
    return [];
  }
}
