import db from '@/db/db';
import { notFound } from 'next/navigation';
import Stripe from 'stripe';
import CheckoutForm from './_components/CheckoutForm';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function PurchaseProductPage({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams?: { quantity?: string };
}) {
  const product = await db.product.findUnique({
    where: { id },
  });
  if (product == null) return notFound();

  const quantity = parseInt(searchParams?.quantity || '1', 10);
  const totalPriceInCents = product.priceInCents * quantity;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalPriceInCents,
    currency: 'USD',
    metadata: { productId: product.id, quantity: quantity },
  });

  if (paymentIntent.client_secret == null) {
    throw new Error('Stripe failed to create payment intent');
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <CheckoutForm
        product={product}
        clientSecret={paymentIntent.client_secret}
        quantity={quantity}
        totalPriceInCents={totalPriceInCents}
      />
    </div>
  );
}
