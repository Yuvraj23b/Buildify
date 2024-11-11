'use client'
import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Image from 'next/image'
import {
  saveActivityLogNotification,
  updateFunnelProducts,
} from '@/lib/queries'
import { Funnel } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

// Define a simplified product structure for Funnel Products
interface FunnelProduct {
  id: string
  name: string
  price: number
  image?: string
  isRecurring?: boolean
}

interface FunnelProductsTableProps {
  defaultData: Funnel
  products: FunnelProduct[]
}

const FunnelProductsTable: React.FC<FunnelProductsTableProps> = ({
  products,
  defaultData,
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [liveProducts, setLiveProducts] = useState<
    { productId: string; recurring: boolean }[] | []
  >(JSON.parse(defaultData.liveProducts || '[]'))

  const handleSaveProducts = async () => {
    setIsLoading(true)
    const response = await updateFunnelProducts(
      JSON.stringify(liveProducts),
      defaultData.id
    )
    await saveActivityLogNotification({
      agencyId: undefined,
      description: `Update funnel products | ${response.name}`,
      subaccountId: defaultData.subAccountId,
    })
    setIsLoading(false)
    router.refresh()
  }

  const handleAddProduct = async (product: FunnelProduct) => {
    const productIdExists = liveProducts.find(
      (prod) => prod.productId === product.id
    )
    productIdExists
      ? setLiveProducts(
          liveProducts.filter((prod) => prod.productId !== product.id)
        )
      : setLiveProducts([
          ...liveProducts,
          {
            productId: product.id,
            recurring: product.isRecurring || false,
          },
        ])
  }

  return (
    <>
      <Table className="bg-card border-[1px] border-border rounded-md">
        <TableHeader className="rounded-md">
          <TableRow>
            <TableHead>Live</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Interval</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-medium truncate">
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Input
                  defaultChecked={!!liveProducts.find((prod) => prod.productId === product.id)}
                  onChange={() => handleAddProduct(product)}
                  type="checkbox"
                  className="w-4 h-4"
                />
              </TableCell>
              <TableCell>
                {product.image && (
                  <Image
                    alt="Product Image"
                    height={60}
                    width={60}
                    src={product.image}
                  />
                )}
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.isRecurring ? 'Recurring' : 'One Time'}</TableCell>
              <TableCell className="text-right">
                ${product.price / 100}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        disabled={isLoading}
        onClick={handleSaveProducts}
        className="mt-4"
      >
        Save Products
      </Button>
    </>
  )
}

export default FunnelProductsTable



// Users needs to use stripe connect to list out the products !
// so creating the products uploading the images and all the things will 
// be handled by the stripe connect only so here it will not show anything like
