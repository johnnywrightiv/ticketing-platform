'use server ';

import db from '@/db/db';

// Check if user already has an order for this product (2:33:23)
export async function userOrderExists(email: string, productId: string) {
  return (
    (await db.order.findFirst({
      where: { user: { email }, productId },
      select: { id: true },
    })) != null
  );
}
