import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ExpiredPage() {
  return (
    <div className="">
      <h1>Download Link Expired</h1>
      <Button asChild size="lg">
        <Link href="/orders">Get New Link</Link>
      </Button>
    </div>
  );
}
