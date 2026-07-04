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

  // Sağdaki bilgi kartı — telefon/adres yok, sadece email vurgulanıyor
  const contactInfo = {
    label: 'Email',
    value: 'nurettin.dincerfsd@gmail.com',
    href: 'mailto:nurettin.dincerfsd@gmail.com',
    icon: 'fa-solid fa-envelope',
  };

  // Alttaki sosyal medya ikon butonları (referans görseldeki gibi
  // outline kare butonlar)
  const socialLinks = [
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/nurettin-dincer/',
      icon: 'fa-brands fa-linkedin-in',
    },
    {
      label: 'GitHub',
      url: 'https://github.com/FullStackDev2',
      icon: 'fa-brands fa-github',
    },
  ];

  return (
    <section
      id="contact"
      className="min-h-screen py-32 px-6 text-white flex flex-col"
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
          {/* Form - arkasında organik blob şekli, kendisi DEĞİŞMEDİ */}
          <div className="relative">
            {/* Blob şekli — formun arkasında, hafif dönerek nefes alan bir blur'lu leke */}
            <motion.div
              aria-hidden="true"
              className="absolute -inset-8 -z-10 opacity-40 blur-2xl"
              style={{
                background:
                  'linear-gradient(135deg, #3b82f6, #8b5cf6 55%, #22d3ee)',
                borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
              }}
              animate={{
                borderRadius: [
                  '60% 40% 30% 70% / 60% 30% 70% 40%',
                  '40% 60% 70% 30% / 30% 70% 40% 60%',
                  '60% 40% 30% 70% / 60% 30% 70% 40%',
                ],
                rotate: [0, 8, 0],
              }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* İkinci, daha küçük ve daha net blob katmanı (derinlik için) */}
            <motion.div
              aria-hidden="true"
              className="absolute -inset-4 -z-10 opacity-25 blur-xl"
              style={{
                background:
                  'linear-gradient(135deg, #8b5cf6, #3b82f6 60%, #22d3ee)',
                borderRadius: '40% 60% 70% 30% / 50% 60% 30% 60%',
              }}
              animate={{
                borderRadius: [
                  '40% 60% 70% 30% / 50% 60% 30% 60%',
                  '60% 40% 30% 70% / 60% 30% 70% 40%',
                  '40% 60% 70% 30% / 50% 60% 30% 60%',
                ],
                rotate: [0, -6, 0],
              }}
              transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
            />

            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              className="relative space-y-6"
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
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
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
          </div>

          {/* Contact Info - yeniden tasarlandı */}
          <div className="space-y-10 pt-2">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold">
                Get in{' '}
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Touch
                </span>
              </h3>
              <p className="text-white/60 leading-relaxed max-w-sm">
                Have a project in mind or just want to say hi? Drop a message
                and I&#39;ll get back to you as soon as possible.
              </p>
            </div>

            {/* Öne çıkan iletişim bilgisi (email) — referans görseldeki
                telefon/email/adres satırlarına benzer */}
            <a
              href={contactInfo.href}
              className="group flex items-center gap-4 w-fit"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-lg text-cyan-400 group-hover:border-cyan-400/60 group-hover:text-cyan-300 transition-colors">
                <i className={contactInfo.icon} />
              </div>
              <div>
                <p className="text-xs text-white/50 tracking-widest uppercase">
                  {contactInfo.label}
                </p>
                <p className="text-base font-medium text-white/90 group-hover:text-cyan-300 transition-colors">
                  {contactInfo.value}
                </p>
              </div>
            </a>

            <div className="h-px w-full bg-white/10" />

            {/* Sosyal medya ikonları — outline kare butonlar */}
            <div className="flex items-center gap-4">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="w-11 h-11 rounded-lg border border-white/15 flex items-center justify-center text-white/70 hover:text-cyan-300 hover:border-cyan-400/60 hover:bg-cyan-400/5 transition-colors"
                >
                  <i className={item.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
