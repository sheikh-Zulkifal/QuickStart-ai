"use client";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { motion } from "framer-motion";

export default function Faq() {
  return (
    <section id="faq" className="relative max-w-screen-lg mx-auto px-4 py-28 gap-12 md:px-8 flex flex-col justify-center items-center">
      <motion.div
        initial={{ y: 5, opacity: 0 }}
        whileInView={{
          y: 0,
          opacity: 1,
        }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="flex flex-col gap-3 justify-center items-center"
      >
        <h3 className="text-2xl tracking-tighter sm:text-3xl to-foreground/70 bg-gradient-to-t from-blue-500  text-transparent bg-clip-text border-none text-pretty text-center">
          Frequently Asked Questions <br></br>(FAQ)
        </h3>
        <p className="max-w-xl text-foreground/80 text-center">
          Here are some of our frequently asked questions. If you have any other
          questions you’d like answered, please feel free to email us.
        </p>
      </motion.div>
      <motion.div
        initial={{ y: 5, opacity: 0 }}
        whileInView={{
          y: 0,
          opacity: 1,
        }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1 }}
        className="max-w-3xl w-full border border-foreground/50 rounded-md p-1"
      >
        <Accordion
          motionProps={{
            variants: {
              enter: {
                opacity: 1,
                transition: {
                  opacity: {
                    easings: "ease",
                    duration: 0.3,
                  },
                },
              },
              exit: {
                opacity: 0,
                transition: {
                  opacity: {
                    easings: "ease",
                    duration: 0.25,
                  },
                },
              },
            },
          }}
          className="w-full"
        >
          <AccordionItem key="1" aria-label="What is QuickStart AI?" title="What is QuickStart AI?">
            QuickStart AI is an AI-powered chat solution that allows businesses to offer instant, real-time customer support by integrating a simple npm package into their website.
          </AccordionItem>
          <AccordionItem key="2" aria-label="How do I integrate QuickStart AI into my website?" title="How do I integrate QuickStart AI into my website?">
            Once you sign up and add your business, you’ll receive an npm package that you can install into your website. Configure it via your personalized dashboard to match your business needs.
          </AccordionItem>
          <AccordionItem key="3" aria-label="What is the free plan?" title="What is the free plan?">
            The free plan provides you with 200 credits. Each time a customer query is responded to, one credit is deducted. Once you use up your credits, you’ll need to subscribe to continue using the service.
          </AccordionItem>
          <AccordionItem key="4" aria-label="How does the credit system work?" title="How does the credit system work?">
            Every customer interaction handled by QuickStart AI deducts one credit from your account. You’ll start with 200 free credits and can purchase additional credits or move to a subscription plan when they’re used up.
          </AccordionItem>
          <AccordionItem key="5" aria-label="Can I monitor real-time interactions?" title="Can I monitor real-time interactions?">
            Yes, you can view all real-time chats, track responses, and gain insights into customer interactions directly from your business dashboard.
          </AccordionItem>
          <AccordionItem key="6" aria-label="Will QuickStart AI slow down my website?" title="Will QuickStart AI slow down my website?">
            No! QuickStart AI is built to be lightweight, ensuring that your website maintains optimal speed and performance.
          </AccordionItem>
          <AccordionItem key="7" aria-label="What happens when my credits run out?" title="What happens when my credits run out?">
            When your credits are used up, the live chat functionality will pause. You’ll need to either buy more credits or upgrade to a subscription plan to continue using the service.
          </AccordionItem>
          <AccordionItem key="8" aria-label="Is there a limit to the number of chats per day?" title="Is there a limit to the number of chats per day?">
            Quickstart AI allows you to customize the appearance of the chat widget to match your website's branding and design.
          </AccordionItem>
          <AccordionItem key="9" aria-label="How secure is the chat data?" title="How secure is the chat data?">
            We prioritize security, ensuring that all chat data is securely stored and protected by industry-standard security protocols.
          </AccordionItem>
          <AccordionItem key="10" aria-label="Can I customize the look of the chat widget?" title="Can I customize the look of the chat widget?">
            Yes, you can fully customize the chat widget to match your website’s branding and style, ensuring a seamless user experience for your customers.
          </AccordionItem>
        </Accordion>
      </motion.div>
    </section>
  );
}
