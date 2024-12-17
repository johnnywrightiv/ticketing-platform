import { Button } from '@/components/ui/button';
import db from '@/db/db';
import { formatCurrency } from '@/lib/formaters';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: {
    payment_intent: string;
    quantity?: string;
    total_price?: string;
  };
}) {
  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent,
  );

  const { productId } = paymentIntent.metadata || {};
  const { quantity, total_price } = searchParams;

  if (!productId || !quantity) {
    return notFound();
  }

  const product = await db.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    return notFound();
  }

  const parsedQuantity = parseInt(quantity, 10);
  const parsedTotalPrice = total_price ? parseInt(total_price, 10) : undefined;

  const calculatedTotalPrice =
    parsedTotalPrice || product.priceInCents * parsedQuantity;

  const isSuccess = paymentIntent.status === 'succeeded';

  return (
    <div className="bg-card w-full justify-center space-y-8 rounded-[--radius] p-4">
      <h1>{isSuccess ? 'Success! 🎉' : 'Error! 😢'}</h1>
      <h3>
        {isSuccess
          ? 'Please download your ticket(s) below.'
          : 'Please try again.'}
      </h3>
      <div className="flex gap-4">
        <div className="relative aspect-video w-1/2 flex-shrink-0">
          <Image
            className="rounded-[--radius] object-cover"
            src={product.imagePath}
            alt={product.name}
            fill
          />
        </div>
        <div className="flex w-full flex-col justify-between">
          <div>
            <h3>{product.name}</h3>
            <div className="line-clamp text-muted-foreground">
              {product.description}
            </div>
          </div>

          <div className="items-start justify-between">
            <div className="text-muted-foreground items mt-4">
              <p>
                Price per item: {formatCurrency(product.priceInCents / 100)}
              </p>
              <p>Quantity: {parsedQuantity}</p>
              <strong>
                Total: {formatCurrency(calculatedTotalPrice / 100)}
              </strong>
            </div>
          </div>
          <Button size="lg" asChild>
            {isSuccess ? (
              <a
                href={`/products/download/${await createDownloadVerification(product.id)}`}
              >
                Download
              </a>
            ) : (
              <Link href={`/products/${product.id}/purchase`}>Try Again</Link>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

async function createDownloadVerification(productId: string) {
  return (
    await db.downloadVerification.create({
      data: {
        productId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      }, // valid for 24 hours
    })
  ).id;
}
