//main page of our website

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { pricingCards } from "@/lib/constants";
import Image from "next/image";
import clsx from 'clsx';
import { Check } from "lucide-react";
import Link from "next/link";

// Example usage
function MyComponent({ isPrimary }: { isPrimary: boolean }) {
  return (
    <div className={clsx('base-class', { 'border-2 border-primary': isPrimary })} suppressHydrationWarning>
      {/* Content */}
    </div>
  );
}

export default function Home() {

  
  
  // return <div style={{background: 'white'}}>Hello world</div>

  return (
    <main className="" suppressHydrationWarning>
      <section className="relative flex items-center justify-center flex-col pt-60"> {/* Increased padding-top */}
        <div
          className="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"
        ></div>
        

        {/* Tag line */}

        <p className="text-center font-semibold text-xl p-5">
          Craft powerful, scalable web applications with speed and simplicity
        </p>
        <div className="bg-gradient-to-r from-primary to-secondary-foreground
        text-transparent bg-clip-text relative pb-10">
          <h1 className="text-9xl font-bold text-center md:text-[300px]">Buildify</h1>
        </div>
        <div className="flex justify-center items-center relative md:mt-[-7px]">
          <Image 
          src={'/assets/preview2.png'}
          alt = "banner_image"
          height={1200}
          width={1200}
          className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"
          />
          <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background
          left-0 right-0 absolute z-10 "></div>
        </div>
      </section>

      {/* NEW SECTION */}
      <section className="flex justify-center items-center flex-col gap-4 md:!mt-20 mt-[-40px]">
        <h2 className="text-4xl text-center">Pick your perfect match</h2>
        
        <p className="text-muted-foreground text-center">
        Our straightforward pricing plans are designed to fit your needs. 
        If {"you're"} not <br/>
        ready to commit just yet, you can start for free.
        </p>

        {/* Pricing cards imported from lib/constants.ts */}

        <div className="flex justify-center gap-4 flex-wrap mt-6">
          {pricingCards.map((card)=>(
              //WIP: wrap up free product from stripe
              <Card 
              key={card.title} 
              className={clsx('w-[300px] flex flex-col justify-between',
              {"border-2 border-primary":card.title==='Unlimited Saas'}
              )}>
                <CardHeader>
                  <CardTitle 
                    className={clsx('',{
                    'text-muted-foreground': card.title !== 'Unlimited Saas'})}>
                    {card.title}
                  </CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <span className="text-4xl font-bold">{card.price}</span>
                  <span className="text-4xl font-bold">/month</span>
                </CardContent>

                <CardFooter className="flex flex-col items-start gap-4">
                      <div>{card.features.map((feature)=> (
                        <div key={feature} className="flex gap-2 items-center">
                          <Check className="text-muted-foreground"/>
                          <p>{feature}</p>
                        </div>
                        ))}
                      </div>
                      <Link href={`/agency?plan=${card.priceId}`}
                       className={clsx(
                        'w-full text-center bg-primary p-2 rounded-md',
                        {'!bg-muted-foreground': card.title === 'Unlimited Saas'}
                       )}
                      >
                        Get Started
                      </Link>
                </CardFooter>
              </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
