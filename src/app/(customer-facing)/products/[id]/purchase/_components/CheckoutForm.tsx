'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { useTheme } from 'next-themes';
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
  LinkAuthenticationElement,
} from '@stripe/react-stripe-js';
import { formatCurrency } from '@/lib/formaters';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { loadStripe } from '@stripe/stripe-js';
import Link from 'next/link';

type CheckoutFormProps = {
  product: {
    imagePath: string;
    name: string;
    priceInCents: number;
    description: string;
  };
  clientSecret: string;
  quantity?: number;
  totalPriceInCents?: number;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string,
);

export default function CheckoutForm({
  product,
  clientSecret,
  quantity = 1,
  totalPriceInCents,
}: CheckoutFormProps) {
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const [totalPrice, setTotalPrice] = useState(
    totalPriceInCents || product.priceInCents * localQuantity,
  );

  const { theme } = useTheme();

  useEffect(() => {
    setTotalPrice(product.priceInCents * localQuantity);
  }, [localQuantity, product.priceInCents]);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(event.target.value, 10));
    setLocalQuantity(value);
  };

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
    <div className="bg-card w-full max-w-5xl justify-center space-y-8 rounded-[--radius] p-4">
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
            <h6 className="text-muted-foreground">
              {formatCurrency(totalPrice / 100)}
            </h6>
            <div className="line-clamp text-muted-foreground">
              {product.description}
            </div>
          </div>

          <div className="items-start justify-between">
            <div className="mt-4 flex items-center gap-2">
              <label htmlFor="quantity" className="text-sm">
                Quantity:
              </label>
              <input
                id="quantity"
                type="number"
                min={1}
                placeholder="1"
                onChange={handleQuantityChange}
                className="w-16 rounded-md border p-2"
              />
            </div>
            <div className="text-muted-foreground items mt-4">
              <p>
                Price per item: {formatCurrency(product.priceInCents / 100)}
              </p>
              <p>Quantity: {localQuantity}</p>
              <strong>Total: {formatCurrency(totalPrice / 100)}</strong>
            </div>
          </div>
        </div>
      </div>

      <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
        <CheckoutFormContent
          clientSecret={clientSecret}
          totalPrice={totalPrice}
          quantity={localQuantity}
        />
      </Elements>
    </div>
  );
}

const CheckoutFormContent = ({
  totalPrice,
  quantity,
}: {
  clientSecret: string;
  totalPrice: number;
  quantity: number;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js hasn't loaded
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success?totalPrice=${totalPrice}&quantity=${quantity}`,
      },
    });

    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    }

    setIsLoading(false);
  };

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
        <CardContent className="space-y-2">
          <PaymentElement />
          <LinkAuthenticationElement
            onChange={(e) => {
              console.log('Email:', e.value.email);
            }}
          />
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !stripe || !elements}
          >
            {isLoading
              ? 'Purchasing...'
              : `Checkout - ${formatCurrency(totalPrice / 100)}`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
