"use client";

import { motion } from "motion/react";
import { useState } from "react";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/contact", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Server error");
      }

      setSuccess("Message sent! I will get back to you as soon as possible.");
      setFormData({
        email: "",
        message: "",
        name: "",
      });
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Unknown error";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "name") setFormData({ ...formData, name: value });
    if (name === "message") setFormData({ ...formData, message: value });
    if (name === "email") setFormData({ ...formData, email: value });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label
          htmlFor="contact-name"
          className="inline-block mb-3 text-xl text-gray-200"
        >
          Name:
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="block w-full h-12 border border-gray-700 rounded-2xl p-4 bg-transparent text-gray-200 text-xl/6 focus-visible:outline-0"
        />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="inline-block mb-3 text-xl text-gray-200"
        >
          Email:
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="block w-full h-12 border border-gray-700 rounded-2xl p-4 bg-transparent text-gray-200 text-xl/6 focus-visible:outline-0"
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="inline-block mb-3 text-xl text-gray-200"
        >
          Message:
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          required
          className="block w-full border border-gray-700 rounded-2xl p-4 bg-transparent text-gray-200 text-xl/6 focus-visible:outline-0"
        />
      </div>

      <motion.button
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 3, type: "spring" }}
        onClick={handleSubmit}
        className="cta-button relative px-8 py-4 cursor-pointer"
      >
        Send
      </motion.button>
    </div>
  );
};
