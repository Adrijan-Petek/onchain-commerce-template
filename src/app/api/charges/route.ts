import { COINBASE_COMMERCE_API_KEY } from 'src/config';
import { PRODUCT_CATALOG } from 'src/data/productCatalog';
import { COMMERCE_API_URL } from 'src/links';
import { NextResponse } from 'next/server';
import type { ChargeDetails, ChargeRequestItem, CreateChargeRequest } from 'src/types';

const MAX_ITEM_QUANTITY = 99;
const CURRENCY = 'USD';

const productById = new Map(PRODUCT_CATALOG.map((product) => [product.id, product]));

type ChargeBuildResult =
  | { ok: true; chargeDetails: ChargeDetails }
  | { ok: false; status: number; error: string };

const buildChargeFromItems = (items: ChargeRequestItem[]): ChargeBuildResult => {
  if (!Array.isArray(items) || items.length === 0) {
    return { ok: false, status: 400, error: 'Items are required' };
  }

  let totalCents = 0;
  const descriptionParts: string[] = [];

  for (const item of items) {
    if (!item || typeof item.id !== 'string') {
      return { ok: false, status: 400, error: 'Invalid item id' };
    }
    if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
      return { ok: false, status: 400, error: 'Invalid item quantity' };
    }
    if (item.quantity > MAX_ITEM_QUANTITY) {
      return { ok: false, status: 400, error: 'Quantity too large' };
    }

    const product = productById.get(item.id);
    if (!product) {
      return { ok: false, status: 400, error: 'Unknown product' };
    }

    const priceCents = Math.round(product.price * 100);
    totalCents += priceCents * item.quantity;
    descriptionParts.push(`${product.name}(${item.quantity})`);
  }

  if (totalCents <= 0) {
    return { ok: false, status: 400, error: 'Invalid total amount' };
  }

  return {
    ok: true,
    chargeDetails: {
      name: 'Onchain commerce order',
      description: descriptionParts.join(', '),
      pricing_type: 'fixed_price',
      local_price: {
        amount: (totalCents / 100).toFixed(2),
        currency: CURRENCY,
      },
    },
  };
};

export async function POST(request: Request) {
  if (!COINBASE_COMMERCE_API_KEY) {
    return NextResponse.json(
      { error: 'Missing Coinbase Commerce API key' },
      { status: 500 },
    );
  }

  try {
    const body = (await request.json().catch(() => null)) as CreateChargeRequest | null;
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    let chargeDetails: ChargeDetails | null = null;

    if (body.items) {
      const result = buildChargeFromItems(body.items);
      if (!result.ok) {
        return NextResponse.json({ error: result.error }, { status: result.status });
      }
      chargeDetails = result.chargeDetails;
    } else if (body.chargeDetails) {
      const { pricing_type, local_price } = body.chargeDetails;
      if (!pricing_type || !local_price?.amount || !local_price?.currency) {
        return NextResponse.json({ error: 'Invalid charge details' }, { status: 400 });
      }
      chargeDetails = body.chargeDetails;
    } else {
      return NextResponse.json({ error: 'Missing charge payload' }, { status: 400 });
    }

    const res = await fetch(`${COMMERCE_API_URL}/charges`, {
      method: 'POST',
      body: JSON.stringify(chargeDetails),
      headers: {
        'Content-Type': 'application/json',
        'X-CC-Api-Key': COINBASE_COMMERCE_API_KEY,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Error:', {
        status: res.status,
        statusText: res.statusText,
        errorText,
      });
      return NextResponse.json(
        { error: `HTTP error! status: ${res.status}` },
        { status: res.status },
      );
    }

    const { data } = await res.json();
    return NextResponse.json({ id: data.id });
  } catch (error) {
    console.error('Error creating charge:', error);
    return NextResponse.json(
      { error: 'Failed to create charge' },
      { status: 500 },
    );
  }
}
