import db from '@/db/db';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(req: NextRequest) {
  try {
    // Verify the Stripe webhook event
    const signature = req.headers.get('stripe-signature');
    let event;

    try {
      event = await stripe.webhooks.constructEvent(
        await req.text(),
        signature as string,
        process.env.STRIPE_WEBHOOK_SECRET as string,
      );
    } catch (err) {
      console.error('Error verifying Stripe webhook:', err);
      return new NextResponse('Webhook Error', { status: 400 });
    }

    // Log the received webhook event
    console.log(`Received Stripe webhook event: ${event.type}`);
    console.log('Event data:', event.data.object);

    // Handle the 'charge.succeeded' event
    if (event.type === 'charge.succeeded') {
      console.log('Webhook Event Received: charge.succeeded');

      const charge = event.data.object as Stripe.Charge;
      const productId = charge.metadata.productId;
      const email = charge.billing_details.email;
      const pricePaidInCents = charge.amount;

      console.log('Customer email:', email);

      const product = await db.product.findUnique({
        where: { id: productId },
      });

      if (product == null || email == null) {
        return new NextResponse('Bad Request', { status: 400 });
      }

      const userFields = {
        email,
        orders: { create: { productId, pricePaidInCents } },
      };
      const {
        orders: [order],
      } = await db.user.upsert({
        where: { email },
        create: userFields,
        update: userFields,
        select: { orders: { orderBy: { createdAt: 'desc' }, take: 1 } },
      });

      const downloadVerification = await db.downloadVerification.create({
        data: {
          productId,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        }, // valid for 24 hours
      });

      try {
        await resend.emails.send({
          from: 'Ticketing Platform <ticketing@example.com>',
          to: email,
          subject: 'Your Ticket Download Link',
          html: `            
            <h2>Your Ticket Download Link</h2>
            <p>Please use the following link to download your ticket:</p>
            <p>This link will expire in 24 hours, after which you will need to request a new one from the My Orders page in your account.</p>
            <p>If you didn't request this, please ignore this email.</p>`,
        });
      } catch (error) {
        console.error('Error sending email:', error);
        if (error instanceof Error) {
          console.error(error.message, error.stack);
        } else {
          console.error('Unknown error:', error);
        }
        // Optionally, you can return a response here to indicate the email failed to send
        return new NextResponse('Error sending email', { status: 500 });
      }
    }

    return new NextResponse();
  } catch (err) {
    console.error('Error processing Stripe webhook:', err);
    return new NextResponse('Webhook Error', { status: 400 });
  }
}
