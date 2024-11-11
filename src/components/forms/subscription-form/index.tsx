'use client'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
// import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js' // Uncomment for Stripe functionality
import React, { useState } from 'react'

// Type for the component props
type Props = {
  selectedPriceId: string // The selected plan's price ID
}

const SubscriptionForm = ({ selectedPriceId }: Props) => {
  const { toast } = useToast()
  // const elements = useElements() // Uncomment to use Stripe elements
  // const stripeHook = useStripe() // Uncomment to use Stripe hook
  const [priceError, setPriceError] = useState('') // State to track price selection error

  // Handles the form submission for the payment process
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Check if a plan is selected, if not, set an error
    if (!selectedPriceId) {
      setPriceError('You need to select a plan to subscribe.')
      return
    }
    setPriceError('') // Clear error if plan is selected

    // Ensure Stripe and elements are loaded before proceeding
    // if (!stripeHook || !elements) return // Uncomment for Stripe functionality

    try {
      // Uncomment the following block to integrate Stripe payment confirmation
      /*
      const { error } = await stripeHook.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_URL}/agency`, // Redirect URL after payment
        },
      })

      if (error) {
        throw new Error() // Handle Stripe error if payment fails
      }
      */

      // Show success message if payment is successful
      toast({
        title: 'Payment successful',
        description: 'Your payment has been successfully processed.',
      })
    } catch (error) {
      console.log(error)
      // Show error message if payment fails
      toast({
        variant: 'destructive',
        title: 'Payment failed',
        description:
          "We couldn't process your payment. Please try a different card.",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Display error if no plan is selected */}
      <small className="text-destructive">{priceError}</small>

      {/* PaymentElement: Stripe payment UI component */}
      {/* <PaymentElement /> Uncomment to enable Stripe's PaymentElement */}

      {/* Submit button */}
      <Button
        disabled={/* !stripeHook */ true} // Disable if Stripe isn't loaded; change to !stripeHook when Stripe is enabled
        className="mt-4 w-full"
      >
        Submit
      </Button>
    </form>
  )
}

export default SubscriptionForm
