"use client";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Popup from "./popUp";
import { useState } from "react";

export default function Pricing() {
  const [showPopup, setShowPopup] = useState(false);

  const plans = [
    {
      name: "Free Plan",
      desc: "Get started with QuickStart AI with 200 free credits.",
      price: 0,
      isMostPop: false,
      features: [
        "200 free credits",
        "Real-time customer support",
        "Basic chat widget customization",
        "Data security"
      ],
    },
    {
      name: "Basic Plan",
      desc: "Expand your customer support capabilities with more credits and features.",
      price: 10,
      isMostPop: true,
      features: [
        "500 credits per month",
        "Real-time customer support",
        "Customizable chat widget",
        "Access to interaction analytics",
        "Data security"
      ],
    },
    {
      name: "Enterprise Plan",
      desc: "For large businesses needing more comprehensive support and customization.",
      price: 20,
      isMostPop: false,
      features: [
        "Unlimited credits",
        "Real-time customer support",
        "Advanced chat widget customization",
        "Interaction analytics and reporting",
        "Priority customer support",
        "Data security and compliance",
      ],
    },
  ];

  return (
    <section id="pricing" className="max-w-screen-xl w-full mx-auto px-4 py-28 gap-12 md:px-8 flex flex-col justify-center items-center">
      <motion.div
        initial={{ y: 5, opacity: 0 }}
        whileInView={{
          y: 0,
          opacity: 1,
        }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="max-w-screen-xl mx-auto px-4 md:px-8"
      >
        <div className="relative max-w-xl mx-auto sm:text-center">
          <h3 className="text-2xl tracking-tighter sm:text-3xl to-foreground/70 bg-gradient-to-t from-blue-500  text-transparent bg-clip-text border-none text-pretty">
            Pricing Plans for QuickStart AI
          </h3>
          <div className="max-w-xl text-foreground/80 text-center">
            <p>Select the plan that best suits your business needs.</p>
          </div>
        </div>
        <div className="mt-16 gap-10 grid lg:grid-cols-3 place-content-center">
          {plans.map((item, idx) => (
            <Card
              key={idx}
              className={
                item.isMostPop ? "border-2 border-primary sm:scale-110" : ""
              }
            >
              <CardHeader>
                <span className="font-medium">{item.name}</span>
              </CardHeader>
              <Divider />
              <CardBody className="gap-3">
                <div className="text-3xl font-semibold">
                  ${item.price} <span className="text-xl font-normal">/mo</span>
                </div>
                <p>{item.desc}</p>
                <ul className="p-8 space-y-3">
                  <li className="font-medium">
                    <p>Features</p>
                  </li>
                  {item.features.map((featureItem, idx) => (
                    <li key={idx} className="flex items-center gap-5">
                      <Check size={20} />
                      {featureItem}
                    </li>
                  ))}
                </ul>
              </CardBody>
              <CardFooter>
                <Button
                  className="w-full"
                  variant="solid"
                  color={item.isMostPop ? "primary" : "default"}
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </motion.div>
      <Popup show={showPopup} onClose={() => setShowPopup(false)} />
    </section>
  );
}
