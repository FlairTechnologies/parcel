'use client';

import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import bike from "../../public/illustration/bike-illustration.png"
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

// Custom hook for intersection observer
import type { RefCallback } from 'react';

const useIntersectionObserver = (options = {}): [RefCallback<HTMLDivElement>, boolean] => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [element, setElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        ...options,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [element, options]);

  const ref = (node: HTMLDivElement | null) => {
    setElement(node);
  };

  return [ref, isIntersecting];
};

// Animation wrapper component
import type { ReactNode } from 'react';
import Image from 'next/image';
import { Package } from 'lucide-react';

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const FadeIn = ({ children, className = '', delay = 0 }: FadeInProps) => {
  const [ref, isIntersecting] = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isIntersecting
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-5'
        } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: any) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-100' : 'bg-white/95 backdrop-blur-md'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Package className="w-8 h-8 text-yellow-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">Parcel</span>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-900 hover:text-yellow-600 px-3 py-2 text-sm font-medium transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-gray-600 hover:text-yellow-600 px-3 py-2 text-sm font-medium transition-colors">
                Get Started
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-yellow-600 px-3 py-2 text-sm font-medium transition-colors">
                Contact
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105 animate-pulse"
              onClick={() => router.push('/authentication/signin')}
            >
              Send Parcel
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Hero Section Component
const HeroSection = () => {
  const router = useRouter();
  return (
    <section id="home" className="relative pt-24 pb-20 bg-gradient-to-br from-yellow-50 to-yellow-100/70 overflow-hidden">
      {/* Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(251,191,36,0.15)_0%,transparent_50%)] z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="h-screen text-center md:text-left grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-relaxed tracking-tight mb-6">
              Fast and Reliable <br />
              <span className="text-yellow-500 underline decoration-yellow-400/40 underline-offset-4">

                Delivery Service
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Send packages across the country with real-time tracking and guaranteed delivery times. Experience the future of logistics with Parcel.
            </p>

            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105 hover:-translate-y-1"
              onClick={() => router.push('/authentication/signup')}>
              Book Pickup Now
            </button>
          </FadeIn>

          <FadeIn delay={400}>
            <div className="mt-20 max-w-4xl mx-auto">
              {/* Optional illustrative image */}
              <Image
                src={bike}
                alt="Rider delivering parcel"
                className="w-full h-auto"
              />
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Optional animated shapes or floating gradient circles */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-30 z-0"></div>
    </section>

  );
};

// How It Works Section Component
const HowItWorksSection = () => {
  const steps = [
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      ),
      title: "1. Schedule a Pickup",
      description: "Call us or book online. Tell us when and where to pick up your parcel."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "2. We Pick It Up Instantly",
      description: "Our professional riders arrive promptly to collect your parcel safely."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      ),
      title: "3. Delivered in 2–4 Hours",
      description: "Fast delivery anywhere in Lokoja. Track your parcel in real-time."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Simple, fast, and reliable delivery in three easy steps</p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <FadeIn key={index} delay={index * 200}>
              <div className="text-center transition-transform hover:scale-105 hover:-translate-y-2">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// Why Choose Us Section Component
const WhyChooseUsSection = () => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z" />
        </svg>
      ),
      title: "Same-day Delivery",
      description: "Fast delivery within Lokoja in just 2-4 hours. No waiting days for your parcel."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
      ),
      title: "Trusted by 2,000+ Locals",
      description: "Join thousands of satisfied customers who trust us with their deliveries."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Professional Dispatch Riders",
      description: "Trained, reliable, and courteous riders who handle your parcels with care."
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Parcel?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Trusted by thousands of locals across Lokoja</p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={index * 200}>
              <div className="bg-white rounded-xl shadow-lg p-8 text-center transition-all hover:shadow-xl hover:scale-105 hover:-translate-y-2">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section Component
const TestimonialsSection = () => {
  const testimonials = [
    {
      initials: "AM",
      name: "Aisha M.",
      location: "Ganaja Road",
      text: "Super fast delivery! My package arrived in just 2 hours. The rider was very professional and polite."
    },
    {
      initials: "JO",
      name: "John O.",
      location: "Phase II",
      text: "I run a small business and Parcel has been a lifesaver. Reliable, affordable, and always on time!"
    },
    {
      initials: "FK",
      name: "Fatima K.",
      location: "Felele",
      text: "The tracking feature is amazing! I could see exactly where my parcel was at all times. Highly recommended!"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Real feedback from real people across Lokoja</p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={index} delay={index * 200}>
              <div className="bg-white rounded-xl shadow-lg p-8 transition-all hover:shadow-xl hover:scale-105 hover:-translate-y-2">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.initials}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600">{testimonial.location}</span>
                      <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Verified</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// Business CTA Section Component
const BusinessCTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-yellow-300 to-yellow-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Run a Business in Lokoja?</h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Let us handle your daily deliveries so you can focus on growing your business. Special rates for businesses.
            </p>
            <button className="bg-white text-yellow-600 hover:bg-gray-50 px-8 py-4 rounded-lg text-lg font-medium transition-all transform hover:scale-105 hover:-translate-y-1 shadow-lg">
              Get Business Partnership
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <span className="ml-2 text-2xl font-bold">Parcel</span>
            </div>
            <p className="text-gray-400 mb-4">
              Lokoja's trusted parcel delivery service. Fast, secure, and reliable delivery across the city.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.163-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.744-1.378l-.628 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-yellow-400 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Privacy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📍 Lokoja, Kogi State</li>
              <li>📞 +234 XXX XXX XXXX</li>
              <li>✉️ hello@parcel.ng</li>
              <li>🕒 24/7 Service</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Parcel. All rights reserved. Proudly serving Lokoja, Nigeria.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
export default function ParcelApp() {
  return (
    <div className={`min-h-screen ${inter.className}`}>
      <Navigation />
      <HeroSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      {/* <TestimonialsSection /> */}
      <BusinessCTASection />
      <Footer />
    </div>
  );
}