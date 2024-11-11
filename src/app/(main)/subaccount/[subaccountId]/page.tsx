import BlurPage from '@/components/global/blur-page'
import CircleProgress from '@/components/global/circle-progress'
import PipelineValue from '@/components/global/pipeline-value'
import SubaccountFunnelChart from '@/components/global/subaccount-funnel-chart'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { AreaChart, BadgeDelta } from '@tremor/react'
import { ClipboardIcon, Contact2, DollarSign, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
  params: { subaccountId: string }
  searchParams: {
    code: string
  }
}

const SubaccountPageId = async ({ params, searchParams }: Props) => {
  // Mock currency and transaction data for demo
  let currency = 'USD'
  let sessions = [
    {
      id: 'txn_1',
      customer_details: { email: 'demo1@example.com' },
      status: 'complete',
      created: '2024-01-10',
      amount_total: 120.50,
    },
    {
      id: 'txn_2',
      customer_details: { email: 'demo2@example.com' },
      status: 'complete',
      created: '2024-02-15',
      amount_total: 75.00,
    },
    {
      id: 'txn_3',
      customer_details: { email: 'demo3@example.com' },
      status: 'open',
      created: '2024-03-20',
      amount_total: 200.00,
    },
  ]
  const totalClosedSessions = sessions.filter((session) => session.status === 'complete')
  const totalPendingSessions = sessions.filter((session) => session.status === 'open')

  const net = totalClosedSessions.reduce((total, session) => total + session.amount_total, 0).toFixed(2)
  const potentialIncome = totalPendingSessions.reduce((total, session) => total + session.amount_total, 0).toFixed(2)
  const closingRate = ((totalClosedSessions.length / sessions.length) * 100).toFixed(2)

  // Mock funnel data
  const funnels = [
    {
      id: 'funnel_1',
      name: 'Demo Funnel 1',
      FunnelPages: [
        { id: 'page_1', visits: 100 },
        { id: 'page_2', visits: 50 },
      ],
    },
    {
      id: 'funnel_2',
      name: 'Demo Funnel 2',
      FunnelPages: [
        { id: 'page_3', visits: 80 },
        { id: 'page_4', visits: 20 },
      ],
    },
  ]
  const funnelPerformanceMetrics = funnels.map((funnel) => ({
    ...funnel,
    totalFunnelVisits: funnel.FunnelPages.reduce((total, page) => total + page.visits, 0),
  }))

  return (
    <BlurPage>
      <div className="relative h-full">
        <div className="flex flex-col gap-4 pb-6">
          <div className="flex gap-4 flex-col xl:!flex-row">
            <Card className="flex-1 relative">
              <CardHeader>
                <CardDescription>Income</CardDescription>
                <CardTitle className="text-4xl">{`${currency} ${net}`}</CardTitle>
              </CardHeader>
              <DollarSign className="absolute right-4 top-4 text-muted-foreground" />
            </Card>
            <Card className="flex-1 relative">
              <CardHeader>
                <CardDescription>Potential Income</CardDescription>
                <CardTitle className="text-4xl">{`${currency} ${potentialIncome}`}</CardTitle>
              </CardHeader>
              <Contact2 className="absolute right-4 top-4 text-muted-foreground" />
            </Card>
            <PipelineValue subaccountId={params.subaccountId} />
            <Card className="xl:w-fit">
              <CardHeader>
                <CardDescription>Conversions</CardDescription>
                <CircleProgress
                  value={Number(closingRate)}
                  description={
                    <>
                      <div className="flex flex-col">
                        Total Carts Opened
                        <div className="flex gap-2">
                          <ShoppingCart className="text-rose-700" />
                          {sessions.length}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        Won Carts
                        <div className="flex gap-2">
                          <ShoppingCart className="text-emerald-700" />
                          {totalClosedSessions.length}
                        </div>
                      </div>
                    </>
                  }
                />
              </CardHeader>
            </Card>
          </div>

          <div className="flex gap-4 flex-col xl:!flex-row">
            <Card className="relative">
              <CardHeader>
                <CardDescription>Funnel Performance</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground flex flex-col gap-12 justify-between">
                <SubaccountFunnelChart data={funnelPerformanceMetrics} />
              </CardContent>
              <Contact2 className="absolute right-4 top-4 text-muted-foreground" />
            </Card>
            <Card className="p-4 flex-1">
              <CardHeader>
                <CardTitle>Checkout Activity</CardTitle>
              </CardHeader>
              <AreaChart
                className="text-sm stroke-primary"
                data={sessions}
                index="created"
                categories={['amount_total']}
                colors={['primary']}
                yAxisWidth={30}
                showAnimation={true}
              />
            </Card>
          </div>

          <div className="flex gap-4 xl:!flex-row flex-col">
            <Card className="p-4 flex-1 h-[450px] overflow-scroll relative">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Transaction History
                  <BadgeDelta className="rounded-xl bg-transparent" deltaType="moderateIncrease" size="xs">
                    +12.3%
                  </BadgeDelta>
                </CardTitle>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created Date</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {totalClosedSessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell>{session.customer_details.email}</TableCell>
                        <TableCell>
                          <Badge className="bg-emerald-500 dark:text-black">Paid</Badge>
                        </TableCell>
                        <TableCell>{session.created}</TableCell>
                        <TableCell className="text-right">
                          <small>{currency}</small>{' '}
                          <span className="text-emerald-500">{session.amount_total.toFixed(2)}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </BlurPage>
  )
}

export default SubaccountPageId
