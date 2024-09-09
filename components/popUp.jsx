import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeSwitcher from "./ThemeSwitcher";
import Image from "next/image";

export default function Popup({ show, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);

  const modalRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/sheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        throw new Error("Failed to add email to waitlist");
      }

      setShowThankYou(true);
      setName("");
      setEmail("");
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Close the popup if clicking outside of the modal content
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="bg-[#081829] rounded-2xl p-8 max-w-md w-full"
            ref={modalRef} // Attach the modal reference here
          >
            {showThankYou ? (
              <div className="text-center">
                <div className="flex text-center ml-14 mb-2">
                  <Image
                    src="/thanx.png"
                    alt="tkx"
                    href="/"
                    width={50}
                    height={50}
                    className="object-contain p-1 ml-6"
                  />
                  <h2 className="text-3xl font-bold mt-4 ml-1 bg-gradient-to-t from-light to-foreground text-transparent bg-clip-text border-none">
                    Thank You!
                  </h2>
                </div>
                <p className=" bg-gradient-to-b from-foreground to-foreground/70 text-transparent bg-clip-text text-pretty mb-6">
                  We've added you to our waitlist. We'll notify you as soon as
                  we launch!
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-full  bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-t from-light to-foreground text-transparent bg-clip-text border-none">
                  Join Our Waitlist
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300"
                    disabled={loading}
                  >
                    {loading ? "Joining..." : "Join Waitlist"}
                  </button>
                </form>
                {error && <p className="text-red-600">{error}</p>}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
