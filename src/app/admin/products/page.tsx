import PageHeader from '@/app/admin/_components/PageHeader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import db from '@/db/db';
import { CheckCircle2, MoreVertical, XCircle } from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/formaters';

export default function AdminProductsPage() {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <PageHeader>Products</PageHeader>
        <Button asChild variant="secondary">
          <Link href={'/admin/products/new'}>Add Product</Link>
        </Button>
      </div>
      <ProductsTable />
    </>
  );
}

async function ProductsTable() {
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      priceInCents: true,
      isAvailableForPurchase: true,
      _count: {
        select: {
          orders: true,
        },
      },
      // orderBy: { name: 'asc' },
    },
  });

  if (products.length === 0) {
    return <div>No Products Found</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Available For Purchase</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              {product.isAvailableForPurchase ? (
                <>
                  <CheckCircle2 />
                  <span className="sr-only">Available</span>
                </>
              ) : (
                <>
                  <div className="text-destructive">
                    <XCircle />
                  </div>
                  <span className="sr-only">Unvailable</span>
                </>
              )}
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell>
            <TableCell>{formatNumber(product._count.orders)}</TableCell>
            <TableCell>
              <MoreVertical />
              <span className="sr-only">Actions</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
