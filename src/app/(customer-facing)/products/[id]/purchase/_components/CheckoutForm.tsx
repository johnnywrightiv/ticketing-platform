'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { formatCurrency } from '@/lib/formaters';
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';
import { FormEvent, useState } from 'react';
import { useTheme } from 'next-themes';

type CheckoutFormProps = {
  product: {
    id: string;
    imagePath: string;
    name: string;
    priceInCents: number;
    description: string;
  };
  clientSecret: string;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string,
);

export function CheckoutForm({ product, clientSecret }: CheckoutFormProps) {
  const { theme } = useTheme();

  const appearance = {
    theme: theme === 'dark' ? 'night' : 'stripe',
    labels: 'floating',
    variables:
      theme === 'dark'
        ? {
            borderRadius: '8px',
            colorBackground: '#0A2540',
            colorPrimary: '#EFC078',
            accessibleColorOnColorPrimary: '#1A1B25',
            colorText: 'white',
            colorTextSecondary: 'white',
            colorTextPlaceholder: '#ABB2BF',
          }
        : {
            borderRadius: '8px',
            colorBackground: 'var(--background)',
            colorPrimary: '#EFC078',
            accessibleColorOnColorPrimary: 'var(--primary-foreground)',
            colorText: 'var(--foreground)',
            colorTextSecondary: 'var(--muted-foreground)',
            colorTextPlaceholder: 'var(--input)',
          },
  };

  return (
    <>
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <div className="flex items-center gap-4">
          <div className="relative aspect-video w-1/3 flex-shrink-0">
            <Image
              className="object-cover"
              src={product.imagePath}
              alt={product.name}
              fill
            />
          </div>
          <div>
            <div className="text-lg">
              {formatCurrency(product.priceInCents / 100)}
            </div>
            <h1>{product.name}</h1>
            <div className="text-muted-foreground line-clamp-3">
              {product.description}
            </div>
          </div>
        </div>
        <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
          <Form priceInCents={product.priceInCents} />
        </Elements>
      </div>
    </>
  );
}

function Form({ priceInCents }: { priceInCents: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [email, setEmail] = useState<string>();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (stripe == null || elements == null || email == null) return;

    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`,
        },
      })
      .then(({ error }) => {
        if (error.type === 'card_error' || error.type === 'validation_error') {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('An unexpected error occurred.');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          {errorMessage && (
            <CardDescription className="bg-destructive text-destructive-foreground">
              Error: {errorMessage}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-8">
          <PaymentElement />
          <LinkAuthenticationElement
            onChange={(e) => setEmail(e.value.email)}
          />
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            size="lg"
            disabled={stripe == null || elements == null || isLoading}
          >
            {isLoading
              ? 'Purchasing...'
              : `Purchase - ${formatCurrency(priceInCents / 100)}`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
