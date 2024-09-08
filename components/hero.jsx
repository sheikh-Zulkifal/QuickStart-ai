"use client";
/* eslint-disable @next/next/no-img-element */
import { Chip } from "@nextui-org/chip";
import { Button } from "@nextui-org/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { useState } from "react";
import Popup from "./popUp";

export default function Hero() {
  const [showPopup, setShowPopup] = useState(false);
  

  return (
    <div className="relative justify-center items-center">
      <section className="max-w-screen-xl mx-auto px-4 py-28 gap-12 md:px-8 flex flex-col justify-center items-center">
        <motion.div
          initial={{ y: 5, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center items-center space-y-5 max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl font-light tracking-tighter mx-auto md:text-6xl bg-gradient-to-b from-foreground to-foreground/70 text-transparent bg-clip-text text-pretty">
            Empower Your Business with Seamless Chat Support – Build, Train, and Manage Effortlessly with{" "}
            <span className="bg-gradient-to-t from-light to-foreground text-transparent bg-clip-text border-none">
              QuickStart AI
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-foreground/80 text-balance">
            Create a superior chat experience for your website with QuickStart AI. Manage and train your data with ease.
          </p>
          <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button onPress={() => setShowPopup(true)} color="primary" variant="solid">
                Get Started
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <motion.div
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="w-full h-full absolute -top-32 flex justify-end items-center -z-10"
      >
        <div className="w-3/4 flex justify-center items-center">
          <div className="w-12 h-[600px] bg-light blur-[100px] rounded-3xl max-sm:rotate-[15deg] sm:rotate-[35deg]"></div>
        </div>
      </motion.div>
      <Popup show={showPopup} onClose={() => setShowPopup(false)} />

      </div>
  );
}
