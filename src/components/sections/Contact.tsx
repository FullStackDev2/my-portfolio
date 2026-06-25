'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import type { ChangeEvent } from 'react';

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

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const key = e.target.name as keyof FormData;
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const contactLinks = [
    { label: 'Email', value: 'hello@example.com', icon: '✉️' },
    { label: 'LinkedIn', value: '/in/yourprofile', icon: '💼' },
    { label: 'GitHub', value: '@yourusername', icon: '💻' },
  ];

  return (
    // section'a min-h-screen ve flex-col verdik
    <section
      id="contact"
      className="min-h-screen py-32 px-6 bg-[#0a0a0a] text-white flex flex-col"
    >
      <div className="max-w-5xl mx-auto w-full mt-auto">
        {' '}
        {/* mt-auto ile tüm içeriği en aşağı ittik */}
        {/* Header */}
        <div className="mb-16 text-center flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent leading-normal"
          >
            Let&#39;s Work Together
          </motion.h2>
          <p className="text-white/60 text-lg">
            Have a project in mind or want to discuss opportunities? I&#39;d
            love to hear from you.
          </p>
        </div>
        {/* Main Grid - Yapı bozulmadı, yan yana duruyorlar */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                name="name"
                type="text"
                className="w-full bg-[#161616] border border-white/10 rounded-xl p-4 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Your name"
                onChange={handleInputChange}
                value={formData.name}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                name="email"
                type="email"
                className="w-full bg-[#161616] border border-white/10 rounded-xl p-4 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="your.email@example.com"
                onChange={handleInputChange}
                value={formData.email}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                name="message"
                rows={4}
                className="w-full bg-[#161616] border border-white/10 rounded-xl p-4 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="How can I help you?"
                onChange={handleInputChange}
                value={formData.message}
              />
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
            <p className="text-white/60 leading-relaxed">
              I&#39;m always open to discussing new projects, creative ideas, or
              opportunities.
            </p>

            <div className="space-y-4">
              {contactLinks.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#161616] p-4 rounded-xl border border-white/5 flex items-center gap-4 hover:border-purple-500/50 transition-all cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-xl">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase">
                      {item.label}
                    </p>
                    <p className="font-mono text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
