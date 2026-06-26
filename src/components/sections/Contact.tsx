'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { contactSchema } from '../schemas/contactSchema';

export default function Contact() {
  type FormData = {
    name: string;
    email: string;
    message: string;
  };

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleBlur = async (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    try {
      await contactSchema.validateAt(name, { [name]: value });
      setErrors((prev) => ({ ...prev, [name]: '' }));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrors((prev) => ({ ...prev, [name]: err.message }));
      }
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const contactLinks = [
    {
      label: 'Email',
      value: 'nurettin.dincerfsd@gmail.com',
      icon: '✉️',
    },
    {
      label: 'LinkedIn',
      value: 'www.linkedin.com/in/nurettin-dincer/',
      icon: '💼',
      url: 'https://www.linkedin.com/in/nurettin-dincer/',
    },
    {
      label: 'GitHub',
      value: 'https://github.com/FullStackDev2',
      icon: '💻',
      url: 'https://github.com/FullStackDev2',
    },
  ];

  return (
    <section
      id="contact"
      className="min-h-screen py-32 px-6 bg-[#0a0a0a] text-white flex flex-col"
    >
      <div className="max-w-5xl mx-auto w-full mt-auto">
        <div className="mb-16 text-center flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent leading-normal"
          >
            Let&#39;s Work Together
          </motion.h2>
          <p className="text-white/60 text-lg">
            I&#39;m always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Form - Web3Forms action */}
          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            className="space-y-6"
          >
            {/* Access Key (Web3Forms için şart) */}
            <input
              type="hidden"
              name="access_key"
              value="b5030af0-7924-4da5-997f-a7111efdda29"
            />

            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                name="name"
                type="text"
                onBlur={handleBlur}
                onChange={handleInputChange}
                value={formData.name}
                className={`w-full bg-[#161616] border ${errors.name && touched.name ? 'border-red-500' : 'border-white/10'} rounded-xl p-4 focus:outline-none focus:border-blue-500 transition-colors`}
                placeholder="Enter Your name.."
              />
              {errors.name && touched.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                name="email"
                type="email"
                onBlur={handleBlur}
                onChange={handleInputChange}
                value={formData.email}
                className={`w-full bg-[#161616] border ${errors.email && touched.email ? 'border-red-500' : 'border-white/10'} rounded-xl p-4 focus:outline-none focus:border-blue-500 transition-colors`}
                placeholder="your.email@example.com"
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                name="message"
                rows={4}
                onBlur={handleBlur}
                onChange={handleInputChange}
                value={formData.message}
                className={`w-full bg-[#161616] border ${errors.message && touched.message ? 'border-red-500' : 'border-white/10'} rounded-xl p-4 focus:outline-none focus:border-blue-500 transition-colors`}
                placeholder="How can I help you?.."
              />
              {errors.message && touched.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 rounded-full font-bold hover:opacity-90 transition-all flex items-center gap-2"
            >
              Send Message <span>↗</span>
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Get in Touch
            </h3>
            <div className="space-y-4">
              {contactLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank" // Yeni sekmede açar
                  rel="noopener noreferrer" // Güvenlik için şarttır
                  className="bg-[#161616] p-4 rounded-xl border border-white/5 flex items-center gap-4 hover:border-purple-500/50 transition-all cursor-pointer block"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-xl">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-white/60 tracking-widest">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium text-white/90">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
