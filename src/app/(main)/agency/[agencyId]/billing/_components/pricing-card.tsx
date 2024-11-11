'use client'
import SubscriptionFormWrapper from '@/components/forms/subscription-form/subscription-form-wrapper'
import CustomModal from '@/components/global/custom-modal'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useModal } from '@/providers/modal-provider'
import React from 'react'

type Props = {
  features: string[]
  buttonCta: string
  title: string
  description: string
  amt: string
  duration: string
  highlightTitle: string
  highlightDescription: string
  planExists: boolean
}

const PricingCard = ({
  amt,
  buttonCta,
  description,
  duration,
  features,
  highlightDescription,
  highlightTitle,
  planExists,
  title,
}: Props) => {
  const { setOpen } = useModal()

  const handleManagePlan = () => {
    setOpen(
      <CustomModal
        title={'Manage Your Plan'}
        subheading="You can change your plan at any time from the billings settings"
      >
        <SubscriptionFormWrapper planExists={planExists} customerId={''} />
      </CustomModal>
    )
  }

  return (
    <Card className="flex flex-col justify-between lg:w-1/2">
      <div>
        <CardHeader className="flex flex-col md:!flex-row justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <p className="text-6xl font-bold">
            {amt}
            <small className="text-xs font-light text-muted-foreground">
              {duration}
            </small>
          </p>
        </CardHeader>
        <CardContent>
          <ul>
            {features.map((feature) => (
              <li
                key={feature}
                className="list-disc ml-4 text-muted-foreground"
              >
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
      </div>
      <CardFooter>
        <Card className="w-full">
          <div className="flex flex-col md:!flex-row items-center justify-between rounded-lg border gap-4 p-4">
            <div>
              <p>{highlightTitle}</p>
              <p className="text-sm text-muted-foreground">
                {highlightDescription}
              </p>
            </div>

            <Button
              className="md:w-fit w-full"
              onClick={handleManagePlan}
            >
              {buttonCta}
            </Button>
          </div>
        </Card>
      </CardFooter>
    </Card>
  )
}

export default PricingCard
