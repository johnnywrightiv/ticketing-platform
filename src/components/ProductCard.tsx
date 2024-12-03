import Link from 'next/link';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
  CardFooter,
} from './ui/card';
import { formatCurrency } from '@/lib/formaters';
import Image from 'next/image';

type ProductCardProps = {
  id: string;
  name: string;
  priceInCents: number;
  description: string;
  imagePath: string;
};

export function ProductCard({
  id,
  name,
  priceInCents,
  description,
  imagePath,
}: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="h-auth relative aspect-video w-full">
        <Image src={imagePath} alt={name} fill />
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{formatCurrency(priceInCents / 100)}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-4">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild size="lg" variant="outline" className="w-full">
          <Link href={`/products/${id}/purchase`}>Purchase</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="flex animate-pulse flex-col overflow-hidden">
      <div className="h-auth relative w-full"></div>
      <div className="bg-muted text-muted-foreground aspect-video h-52 w-full rounded"></div>
      <CardHeader>
        <CardTitle>
          <div className="bg-muted h-6 w-3/4 rounded-full"></div>
        </CardTitle>
        <CardDescription>
          <div className="bg-muted h-4 w-1/2 rounded-full"></div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="bg-muted h-4 w-full rounded-full"></div>
        <div className="bg-muted h-4 w-full rounded-full"></div>
        <div className="bg-muted h-4 w-3/4 rounded-full"></div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled size="lg"></Button>
      </CardFooter>
    </Card>
  );
}
