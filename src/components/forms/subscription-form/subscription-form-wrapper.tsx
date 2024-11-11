'use client'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { useModal } from '@/providers/modal-provider'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Loading from '@/components/global/loading'

type Props = {
  customerId: string
  planExists: boolean
}

const SubscriptionFormWrapper = ({ customerId, planExists }: Props) => {
  const { setClose } = useModal()
  const router = useRouter()
  const [selectedPriceId, setSelectedPriceId] = useState<string | ''>('')

  return (
    <div className="border-none transition-all">
      <div className="flex flex-col gap-4">
        {/* Replace this with static data if needed */}
        {[{ id: 'basic', unit_amount: 1000, nickname: 'Basic Plan' }].map(
          (price) => (
            <Card
              onClick={() => setSelectedPriceId(price.id)}
              key={price.id}
              className={clsx('relative cursor-pointer transition-all', {
                'border-primary': selectedPriceId === price.id,
              })}
            >
              <CardHeader>
                <CardTitle>
                  ${price.unit_amount / 100}
                  <p className="text-sm text-muted-foreground">
                    {price.nickname}
                  </p>
                </CardTitle>
              </CardHeader>
              {selectedPriceId === price.id && (
                <div className="w-2 h-2 bg-emerald-500 rounded-full absolute top-4 right-4" />
              )}
            </Card>
          )
        )}

        {/* Loading indicator without Stripe elements */}
        {!selectedPriceId && (
          <div className="flex items-center justify-center w-full h-40">
            <Loading />
          </div>
        )}
      </div>
    </div>
  )
}

export default SubscriptionFormWrapper
