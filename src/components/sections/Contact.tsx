'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { contactSchema } from '../schemas/contactSchema';
import RotatingHeading from '../layout/RotatingHeading';

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
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

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

    // Kullanıcı yazmaya devam ederken eski hata mesajını hemen temizle
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1) Tüm formu bir kerede doğrula (yup)
    try {
      await contactSchema.validate(formData, { abortEarly: false });
    } catch (err: unknown) {
      // yup ValidationError -> inner[] içinde her alanın hatası var
      const newErrors: Record<string, string> = {};

      if (
        err &&
        typeof err === 'object' &&
        'inner' in err &&
        Array.isArray((err as { inner: unknown[] }).inner)
      ) {
        for (const validationError of (
          err as { inner: { path?: string; message: string }[] }
        ).inner) {
          if (validationError.path && !newErrors[validationError.path]) {
            newErrors[validationError.path] = validationError.message;
          }
        }
      }

      setErrors(newErrors);
      setTouched({ name: true, email: true, message: true });
      return;
    }

    // 2) Doğrulama geçti -> arka planda gönder, sayfa hiç yönlenmiyor
    setStatus('loading');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'b5030af0-7924-4da5-997f-a7111efdda29',
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await res.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTouched({});
        setErrors({});
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  // Sağdaki iletişim bilgisi satırları — sadece ikon + değer, etiket yok,
  // arkaplan kutusu yok (referans görseldeki sade stil)
  const contactRows = [
    {
      value: 'Unavailable',
      icon: 'fa-solid fa-phone',
      color: 'text-blue-500',
    },
    {
      value: 'nurettin.dincerfsd@gmail.com',
      href: undefined,
      icon: 'fa-solid fa-envelope',
      color: 'text-blue-500',
    },
    {
      value: 'Istanbul, Türkiye',
      href: undefined,
      icon: 'fa-solid fa-location-dot',
      color: 'text-blue-500',
    },
  ];

  // Alttaki sosyal medya ikon butonları — gradientli
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
    {
      label: 'Instagram',
      url: undefined,
      icon: 'fa-brands fa-instagram',
    },
    {
      label: 'Facebook',
      url: undefined,
      icon: 'fa-brands fa-facebook',
    },
  ];

  return (
    <section
      id="contact"
      className="min-h-screen py-24 px-6 text-white flex flex-col"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Başlık bloğu */}
        <div className="mb-24 text-center flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="uppercase tracking-[0.3em] text-sm md:text-base font-semibold bg-gradient-to-r from-orange-400 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent"
          >
            Let&#39;s Work Together
          </motion.span>
          <RotatingHeading />

          <div className="flex gap-3 mt-8 mb-8">
            <span className="w-14 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-pink-500" />
            <span className="w-14 h-1.5 rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500" />
          </div>

          <p className="max-w-2xl text-lg text-white/60 leading-8">
            I&#39;m always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-24 items-center">
          {/* Form - arkasında statik pembe/mor organik blob, form birebir aynı */}
          <div className="relative z-0 flex items-center justify-center min-h-[750px]">
            {/* Statik blob şekli — animasyon yok, sabit organik form */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
            >
              <svg
                width="700"
                height="760"
                viewBox="0 0 820 820"
                className="drop-shadow-[0_35px_50px_rgba(255,0,128,.35)]"
              >
                <defs>
                  <linearGradient
                    id="contactBlob"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#ff8a4c" />
                    <stop offset="45%" stopColor="#ff4b93" />
                    <stop offset="100%" stopColor="#bf00ff" />
                  </linearGradient>
                </defs>

                <path
                  fill="url(#contactBlob)"
                  d="
    M120 185
    C80 65 200 5 355 35
    C470 55 560 115 655 110
    C760 105 805 240 780 370
    C755 470 725 555 745 650
    C765 760 665 825 530 810
    C430 800 350 760 250 785
    C130 815 45 745 35 635
    C25 540 60 475 80 395
    C100 320 155 285 120 185
    Z
  "
                />
              </svg>
            </div>

            <div className="relative z-10 w-full max-w-[430px] px-6 py-8">
              <h3 className="text-2xl font-bold text-white mb-8 drop-shadow-sm">
                Please fill this form
              </h3>

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
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
                    <p className="text-white text-sm font-bold mt-1.5 inline-flex items-center gap-1.5 rounded-md px-2 ">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
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
                    <p className="text-white text-sm font-bold mt-1.5 inline-flex items-center gap-1.5 rounded-md px-2 ">
                      {errors.email}
                    </p>
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
                    <p className="text-white text-sm font-bold mt-1.5 inline-flex items-center gap-1.5 rounded-md px-2 ">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group bg-yellow-400 rounded-[6px] px-8 py-4 font-bold text-white hover:scale-[1.05] active:scale-[0.98] flex items-center gap-2 disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                  <i className="fa-solid fa-paper-plane text-sm group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </button>

                {status === 'success' && (
                  <p className="text-green-400 text-sm font-semibold mt-2 flex items-center gap-2">
                    <i className="fa-solid fa-circle-check" />
                    Message sent successfully! I&#39;ll get back to you soon.
                  </p>
                )}

                {status === 'error' && (
                  <p className="text-red-400 text-sm font-semibold mt-2 flex items-center gap-2">
                    <i className="fa-solid fa-triangle-exclamation" />
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Contact Info - sade ikon + metin, arkaplansız, etiketsiz */}
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

            <div className="space-y-6">
              {contactRows.map((item) => {
                const Wrapper = item.href ? 'a' : 'div';
                return (
                  <Wrapper
                    key={item.value}
                    {...(item.href ? { href: item.href } : {})}
                    className="group flex items-center gap-4 w-fit"
                  >
                    <i
                      className={`${item.icon} ${item.color} text-xl w-6 text-center`}
                    />
                    <p className="text-base font-medium text-white/90 group-hover:text-cyan-300 transition-colors">
                      {item.value}
                    </p>
                  </Wrapper>
                );
              })}
            </div>

            <div className="h-px w-full bg-white/10" />

            {/* Sosyal medya ikonları — gradientli kare butonlar */}
            <div className="flex items-center gap-4">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="
    group
    relative
    w-14
    h-14
    rounded-lg
    p-[1.5px]
    bg-gradient-to-br
    from-orange-400
    via-pink-500
    to-fuchsia-500
    transition-all
    duration-300
    hover:scale-110
    hover:shadow-[0_0_20px_rgba(236,72,153,.4)]
  "
                >
                  <div
                    className="
      flex
      h-full
      w-full
      items-center
      justify-center
      rounded-[7px]
      bg-[#0b0f1a]
      transition-all
      duration-300
      group-hover:bg-transparent
    "
                  >
                    <i
                      className={`${item.icon}
      text-[22px]
      bg-gradient-to-br
      from-orange-400
      via-pink-500
      to-fuchsia-500
      bg-clip-text
      text-transparent
      transition-all
      duration-300
      group-hover:text-white
      group-hover:bg-none`}
                    />
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
