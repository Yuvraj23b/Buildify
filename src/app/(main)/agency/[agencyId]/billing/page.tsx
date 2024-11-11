import React from 'react'
import { addOnProducts, pricingCards } from '@/lib/constants'
import { Separator } from '@/components/ui/separator'
import PricingCard from './_components/pricing-card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import clsx from 'clsx'
import SubscriptionHelper from './_components/subscription-helper'

type Props = {
  params: { agencyId: string }
}

const page = async ({ params }: Props) => {
  const allCharges = [
    {
      description: "Sample description",
      id: "sample-id-123",
      date: "10:00 AM 01/01/2024",
      status: "Paid",
      amount: "$100",
    },
    // Add more sample charge data if needed
  ]

  return (
    <>
      <SubscriptionHelper
              planExists={true} customerId={''}      />
      <h1 className="text-4xl p-4">Billing</h1>
      <Separator className=" mb-6" />
      <h2 className="text-2xl p-4">Current Plan</h2>
      <div className="flex flex-col lg:!flex-row justify-between gap-8">
        <PricingCard
          planExists={true}
          amt="$0"
          buttonCta="Get Started"
          highlightDescription="Want to modify your plan? You can do this here. If you have
          further questions, contact support@buildify-app.com"
          highlightTitle="Plan Options"
          description="Let's get started! Pick a plan that works best for you."
          duration="/ month"
          features={["One time agency creation", "Limited SaaS support"]}
          title="Starter"
        />
        {addOnProducts.map((addOn) => (
          <PricingCard
            planExists={true}
            key={addOn.id}
            amt="$99"
            buttonCta="Subscribe"
            description="Dedicated support line & teams channel for support"
            duration="/ month"
            features={[]}
            title="24/7 priority support"
            highlightTitle="Get support now!"
            highlightDescription="Get priority support and skip the long line with the click of a button."
          />
        ))}
      </div>
      <h2 className="text-2xl p-4">Payment History</h2>
      <Table className="bg-card border-[1px] border-border rounded-md">
        <TableHeader className="rounded-md">
          <TableRow>
            <TableHead className="w-[200px]">Description</TableHead>
            <TableHead className="w-[200px]">Invoice Id</TableHead>
            <TableHead className="w-[300px]">Date</TableHead>
            <TableHead className="w-[200px]">Paid</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-medium truncate">
          {allCharges.map((charge) => (
            <TableRow key={charge.id}>
              <TableCell>{charge.description}</TableCell>
              <TableCell className="text-muted-foreground">
                {charge.id}
              </TableCell>
              <TableCell>{charge.date}</TableCell>
              <TableCell>
                <p
                  className={clsx('', {
                    'text-emerald-500': charge.status.toLowerCase() === 'paid',
                    'text-orange-600': charge.status.toLowerCase() === 'pending',
                    'text-red-600': charge.status.toLowerCase() === 'failed',
                  })}
                >
                  {charge.status.toUpperCase()}
                </p>
              </TableCell>
              <TableCell className="text-right">{charge.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default page