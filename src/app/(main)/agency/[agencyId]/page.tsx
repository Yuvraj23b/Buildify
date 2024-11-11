import CircleProgress from '@/components/global/circle-progress'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { db } from '@/lib/db'
import { AreaChart } from '@tremor/react'
import {
  ClipboardIcon,
  Contact2,
  DollarSign,
  Goal,
  ShoppingCart,
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Page = async ({
  params,
}: {
  params: { agencyId: string }
  searchParams: { code: string }
}) => {
  let currency = 'USD'
  const currentYear = new Date().getFullYear()
  
  // Demo data for transaction history and conversions
  const demoTransactionData = [
    { created: '2024-01-10', amount_total: 500 },
    { created: '2024-02-15', amount_total: 1200 },
    { created: '2024-03-20', amount_total: 900 },
    { created: '2024-04-25', amount_total: 300 },
    { created: '2024-05-30', amount_total: 750 },
    { created: '2024-06-15', amount_total: 1500 },
    { created: '2024-07-20', amount_total: 800 },
    { created: '2024-08-25', amount_total: 1100 },
  ]

  const conversionRate = 75 // Example conversion rate percentage

  const agencyDetails = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
  })

  if (!agencyDetails) return

  const subaccounts = await db.subAccount.findMany({
    where: {
      agencyId: params.agencyId,
    },
  })

  return (
    <div className="relative h-full">
      {/* Non-blocking Stripe connection banner */}
      {!agencyDetails.connectAccountId && (
        <div className="mb-4 p-4 bg-background text-center rounded-md">
          <p className="text-sm">Connect Your Stripe</p>
          <p className="text-xs text-muted-foreground">
            You need to connect your Stripe account to see metrics.
          </p>
          <Link
            href={`/agency/${agencyDetails.id}/launchpad`}
            className="p-2 w-fit bg-secondary text-white rounded-md flex items-center gap-2 mt-2"
          >
            <ClipboardIcon />
            Launch Pad
          </Link>
        </div>
      )}
      
      {/* Dashboard content */}
      <h1 className="text-4xl">Dashboard</h1>
      <Separator className=" my-6" />
      <div className="flex flex-col gap-4 pb-6">
        <div className="flex gap-4 flex-col xl:!flex-row">
          <Card className="flex-1 relative">
            <CardHeader>
              <CardDescription>Income</CardDescription>
              <CardTitle className="text-4xl">
                {`${currency} ${demoTransactionData.reduce((acc, data) => acc + data.amount_total, 0).toFixed(2)}`}
              </CardTitle>
              <small className="text-xs text-muted-foreground">
                For the year {currentYear}
              </small>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Total revenue generated.
            </CardContent>
            <DollarSign className="absolute right-4 top-4 text-muted-foreground" />
          </Card>
          <Card className="flex-1 relative">
            <CardHeader>
              <CardDescription>Potential Income</CardDescription>
              <CardTitle className="text-4xl">
                {currency} 2500.00
              </CardTitle>
              <small className="text-xs text-muted-foreground">
                For the year {currentYear}
              </small>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              This is how much you can close.
            </CardContent>
            <DollarSign className="absolute right-4 top-4 text-muted-foreground" />
          </Card>
          <Card className="flex-1 relative">
            <CardHeader>
              <CardDescription>Active Clients</CardDescription>
              <CardTitle className="text-4xl">{subaccounts.length}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Reflects the number of sub accounts you own and manage.
            </CardContent>
            <Contact2 className="absolute right-4 top-4 text-muted-foreground" />
          </Card>
          <Card className="flex-1 relative">
            <CardHeader>
              <CardTitle>Agency Goal</CardTitle>
              <CardDescription>
                <p className="mt-2">
                  Reflects the number of sub accounts you want to own and
                  manage.
                </p>
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">
                    Current: {subaccounts.length}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    Goal: {agencyDetails.goal}
                  </span>
                </div>
                <Progress
                  value={(subaccounts.length / agencyDetails.goal) * 100}
                />
              </div>
            </CardFooter>
            <Goal className="absolute right-4 top-4 text-muted-foreground" />
          </Card>
        </div>
        <div className="flex gap-4 xl:!flex-row flex-col">
          <Card className="p-4 flex-1">
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <AreaChart
              className="text-sm stroke-primary"
              data={demoTransactionData} // Using demo data for the transaction history
              index="created"
              categories={['amount_total']}
              colors={['primary']}
              yAxisWidth={30}
              showAnimation={true}
            />
          </Card>
          <Card className="xl:w-[400px] w-full">
            <CardHeader>
              <CardTitle>Conversions</CardTitle>
            </CardHeader>
            <CardContent>
              <CircleProgress
                value={conversionRate}
                description={
                  <div>
                    {conversionRate}% conversion rate for completed sessions
                  </div>
                }
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Page
