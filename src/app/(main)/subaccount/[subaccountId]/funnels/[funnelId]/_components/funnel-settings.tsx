import React from 'react'

import { Funnel } from '@prisma/client'
import { db } from '@/lib/db'

import FunnelForm from '@/components/forms/funnel-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import FunnelProductsTable from './funnel-products-table'

interface FunnelSettingsProps {
  subaccountId: string
  defaultData: Funnel
}

const FunnelSettings: React.FC<FunnelSettingsProps> = async ({
  subaccountId,
  defaultData,
}) => {
  // Fetching subaccount details without Stripe-specific fields
  const subaccountDetails = await db.subAccount.findUnique({
    where: {
      id: subaccountId,
    },
  })

  if (!subaccountDetails) return



  // this is the  sample data to show  that how it would look after applying it 
  // Placeholder products array if Stripe functionality is removed
  const products = [
    { id: '1', name: 'Sample Product 1', price: 100 },
    { id: '2', name: 'Sample Product 2', price: 200 },
  ]


  
  
  return (
    <div className="flex gap-4 flex-col xl:!flex-row">
      <Card className="flex-1 flex-shrink">
        <CardHeader>
          <CardTitle>Funnel Products</CardTitle>
          <CardDescription>
            Select the products and services you wish to sell on this funnel.
            You can sell one-time and recurring products too.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FunnelProductsTable
            defaultData={defaultData}
            products={products}    
          />
        </CardContent>
      </Card>

      <FunnelForm
        subAccountId={subaccountId}
        defaultData={defaultData}
      />
    </div>
  )
}

export default FunnelSettings
