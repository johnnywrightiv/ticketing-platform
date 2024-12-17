import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import db from '@/db/db';
import { formatCurrency, formatNumber } from '@/lib/formaters';

async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: {
      pricePaidInCents: true,
    },
    _count: true,
  });

  return {
    amount: (data._sum.pricePaidInCents || 0) / 100,
    numberofSales: data._count,
  };
}

async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaidInCents: true },
    }),
  ]);

  return {
    userCount,
    averageValuePerUser:
      userCount === 0
        ? 0
        : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
  };
}

async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),
    db.product.count({ where: { isAvailableForPurchase: false } }),
  ]);

  return {
    activeCount,
    inactiveCount,
  };
}

export default async function AdminDashboard() {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 dark:from-gray-900 dark:to-gray-800">
      <PageHeader>Dashboard</PageHeader>
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Sales"
          subtitle={`${formatNumber(salesData.numberofSales)} Sales`}
          body={formatCurrency(salesData.amount)}
          icon="💰"
          color="bg-green-100 dark:bg-green-900"
        />
        <DashboardCard
          title="Customers"
          subtitle={`${formatCurrency(userData.averageValuePerUser)} Average Value`}
          body={formatNumber(userData.userCount)}
          icon="👥"
          color="bg-blue-100 dark:bg-blue-900"
        />
        <DashboardCard
          title="Active Products"
          subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
          body={formatNumber(productData.activeCount)}
          icon="📦"
          color="bg-purple-100 dark:bg-purple-900"
        />
      </div>
      <Card className="w-full overflow-hidden">
        <CardHeader>
          <h3 className="text-lg font-semibold">Sales Overview</h3>
          <CardDescription>Monthly sales performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 w-full items-end justify-around">
            <Bar height="40%" label="Jan" />
            <Bar height="60%" label="Feb" />
            <Bar height="80%" label="Mar" />
            <Bar height="30%" label="Apr" />
            <Bar height="50%" label="May" />
            <Bar height="70%" label="Jun" />
            <Bar height="90%" label="Jul" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

type DashboardCardProps = {
  title: string;
  subtitle: string;
  body: string;
  icon: string;
  color: string;
};

function DashboardCard({
  title,
  subtitle,
  body,
  icon,
  color,
}: DashboardCardProps) {
  return (
    <Card
      className={`overflow-hidden ${color} transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm font-medium">{title}</h3>
        <span className="text-2xl">{icon}</span>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{body}</div>
        <p className="text-muted-foreground text-xs">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

function Bar({ height, label }: { height: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-12 rounded-t-md bg-blue-500 transition-all duration-1000 ease-out"
        style={{ height: height }}
      />
      <span className="mt-2 text-sm">{label}</span>
    </div>
  );
}

function PageHeader({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="animate-fade-in mb-8 text-3xl font-bold tracking-tight">
      {children}
    </h1>
  );
}
