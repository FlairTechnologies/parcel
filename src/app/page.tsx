"use client";

import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import bike from "../../public/illustration/bike-illustration.png";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

// Custom hook for intersection observer
import type { RefCallback } from "react";

const useIntersectionObserver = (
  options = {}
): [RefCallback<HTMLDivElement>, boolean] => {
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
        rootMargin: "0px 0px -50px 0px",
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
import type { ReactNode } from "react";
import Image from "next/image";
import { Package } from "lucide-react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const FadeIn = ({ children, className = "", delay = 0 }: FadeInProps) => {
  const [ref, isIntersecting] = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: any) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-100"
          : "bg-white/95 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Package className="w-8 h-8 text-yellow-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Parcel
              </span>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="text-gray-900 hover:text-yellow-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-gray-600 hover:text-yellow-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Get Started
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-600 hover:text-yellow-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Contact
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105 animate-pulse"
              onClick={() => router.push("/authentication/signin")}
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
    <section
      id="home"
      className="relative pt-24 pb-20 bg-gradient-to-br from-yellow-50 to-yellow-100/70 overflow-hidden"
    >
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
              Send packages across lokoja city with tracking and guaranteed
              delivery. Experience the future of logistics with Parcel.
            </p>

            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105 hover:-translate-y-1"
              onClick={() => router.push("/authentication/signup")}
            >
              Send Parcel Now
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
        <svg
          className="w-8 h-8 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      ),
      title: "1. Place an Order",
      description:
        "Tell us where to pick up your parcel and where to drop it off.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "2. We Pick It Up Instantly",
      description:
        "Our professionals arrive promptly to collect your parcel safely.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      ),
      title: "3. Delivered in 2–4 Hours",
      description:
        "Fast delivery anywhere in Lokoja. View delivery status in real-time.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, fast, and reliable delivery in three easy steps
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <FadeIn key={index} delay={index * 200}>
              <div className="text-center transition-transform hover:scale-105 hover:-translate-y-2">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
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
        <svg
          className="w-8 h-8 text-yellow-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z" />
        </svg>
      ),
      title: "Same-day Delivery",
      description:
        "Fast delivery within Lokoja in just 2-4 hours. No waiting days for your parcel.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-yellow-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
      ),
      title: "Trusted by 2,000+ Locals",
      description:
        "Join thousands of satisfied customers who trust us with their deliveries.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-yellow-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Trusted by many businesses",
      description: "Businesses use Parcel to deliver to their customers.",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Parcel?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trusted by many locals and businesses across Lokoja
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={index * 200}>
              <div className="bg-white rounded-xl shadow-lg p-8 text-center transition-all hover:shadow-xl hover:scale-105 hover:-translate-y-2">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
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
      text: "Super fast delivery! My package arrived in just 40 minutes. They are very professional and polite.",
    },
    {
      initials: "JO",
      name: "John O.",
      location: "Phase II",
      text: "I run a small business and Parcel has been a lifesaver. Reliable, affordable, and always on time!",
    },
    {
      initials: "FK",
      name: "Fatima K.",
      location: "Felele",
      text: "The tracking feature is amazing! I could see the status of my delivery at all time and even get emails. Highly recommended!",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Feedback from Parcel users across Lokoja
            </p>
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
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600">
                        {testimonial.location}
                      </span>
                      <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                        Verified
                      </span>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Run a Business in Lokoja?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Let us handle your daily deliveries so you can focus on growing
              your business. Special rates for businesses.
            </p>
            <button className="bg-white text-yellow-600 hover:bg-gray-50 px-8 py-4 rounded-lg text-lg font-medium transition-all transform hover:scale-105 hover:-translate-y-1 shadow-lg">
              <Link href="mailto:info@thepaercel.com.ng"> Contact Us </Link>
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

// Footer Component
const Footer = ({
  onOpenTermsModal,
  onOpenPrivacyModal,
}: {
  onOpenTermsModal: () => void;
  onOpenPrivacyModal: () => void;
}) => {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-2xl font-bold">Parcel</span>
            </div>
            <p className="text-gray-400 mb-4">
              Lokoja's trusted logistics service. Fast, secure, and reliable
              delivery across the city.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://x.com/TheParcelNg"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenTermsModal}
                  className="hover:text-yellow-400 transition-colors text-left"
                >
                  Terms & Conditions
                </button>
              </li>
              <button
                onClick={onOpenPrivacyModal}
                className="hover:text-yellow-400 transition-colors text-left"
              >
                Privacy Policy
              </button>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📍 Lokoja, Nigeria</li>
              <li>📞 +234 706 716 2340</li>
              <li>📞 +234 912 838 7342</li>
              <li>✉️ hello@theparcel.com.ng</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p className="font-bold">
            &copy; {new Date().getFullYear()} Parcel by Dolph Tech Ltd & Flair
            Technologies Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Terms and Conditions Modal Component
interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsAndConditionsModal: React.FC<TermsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-gray-900 bg-opacity-75 p-4">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            Terms and Conditions
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl font-semibold"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <div className="p-6 flex-grow overflow-y-auto custom-scrollbar">
          {/* Your Terms and Conditions Content */}
          <div className="prose max-w-none text-gray-700">
            <p>
              Please read these Terms and Conditions carefully before using the
              Parcel web application, operated by Dolph Tech and Flair
              Technologies. By accessing or using our service, you agree to be
              bound by these Terms. If you disagree with any part of the terms,
              then you may not access the service.
            </p>

            <br />

            <h3 className="font-bold">1. Description of Service</h3>
            <br />
            <p>
              Parcel is a logistics service currently operating exclusively
              within Lokoja, Kogi State, Nigeria. Our web application,
              accessible at theparcel.com.ng or www.theparcel.com.ng, allows
              users to transport items ("parcels") from one location to another
              within Lokoja. The service is designed for use on desktops, mobile
              devices, and tablets.
            </p>
            <br />

            <p>
              Our target users include businesses, individuals, and students who
              wish to send items. An ideal parcel size and weight for transport
              by one person on a bike is generally up to 15 kg (approximately 33
              lbs) and dimensions not exceeding 50cm x 40cm x 30cm (length x
              width x height). If the weight or size of your parcel exceeds
              these specifications, a 50% refund will be issued for the service.
            </p>
            <br />

            <p>
              When sending a parcel, we will collect the name, email, and phone
              number of the receiver, as well as the name and description of the
              parcel from you. We do not require users to upload any content to
              the platform at this time.
            </p>
            <br />

            <h3 className="font-bold">2. User Accounts</h3>
            <br />

            <p>
              To use Parcel's services, you are required to create an account.
              The account creation process is fast and straightforward. We
              collect your username, email, and password during registration.
              You must be at least 15 years of age to create an account and use
              our services.
            </p>
            <br />

            <h3 className="font-bold">3. Pricing and Payments</h3>
            <br />

            <p>
              Parcel charges for each service rendered, not on a subscription
              basis. Our primary payment method is Paystack, which supports
              various options including bank transfers, OPay, and debit cards.
            </p>
            <br />

            <h4>Refund and Additional Charges Policy:</h4>
            <br />

            <ul>
              <li>
                <strong>Damaged Goods:</strong> If we are responsible for
                damaging your goods during transit, a full refund will be
                issued.
              </li>
              <li>
                <strong>Incorrect Address:</strong> No refund will be provided
                if you supply an incorrect delivery address.
              </li>
              <li>
                <strong>Receiver Unavailability:</strong> If the receiver is not
                available to receive the goods on the scheduled delivery day, an
                additional charge of ₦1,000 will be applied for each day we have
                to store the parcel. This charge will be paid by the receiver
                upon final delivery.
              </li>
            </ul>
            <br />

            <h3 className="font-bold">4. Data Collection and Privacy</h3>
            <br />

            <p>
              We collect personal data including your name, email, phone number,
              and address. This data is stored in our secure database. When you
              delete your account, we retain your data for an additional three
              (3) months before permanent deletion. Passwords are encrypted, and
              we do not sell your data to third parties. We only share your
              email address with Paystack to facilitate payment processing. We
              are committed to ensuring the security of your data.
            </p>

            <br />

            <h3 className="font-bold">5. Intellectual Property</h3>
            <br />

            <p>
              All intellectual property rights, including software, content, and
              trademarks associated with Parcel, are exclusively owned by Dolph
              Tech and Flair Technologies. In the future, should we enable
              user-uploaded content, our policy regarding such content will be
              updated accordingly.
            </p>
            <br />

            <h3 className="font-bold">6. Company Status and Liability</h3>
            <br />

            <p>
              Parcel is not currently an incorporated entity. All damages, legal
              actions, and complaints will be directed to and handled by Dolph
              Tech and Flair Technologies.
            </p>
            <br />

            <h3 className="font-bold">7. Account Termination</h3>
            <br />

            <p>
              We reserve the right to terminate user accounts if a user makes
              prank orders or cancels orders more than once. Users can terminate
              their own accounts at any time through their profile page within
              the web application.
            </p>
            <br />

            <h3 className="font-bold">
              8. Governing Law and Dispute Resolution
            </h3>
            <br />

            <p>
              These Terms and Conditions shall be governed by and construed in
              accordance with the laws of Nigeria. Any dispute arising out of or
              in connection with these Terms will first be resolved through
              arbitration. Should arbitration fail to resolve the dispute, legal
              proceedings may be initiated in a court with Uyo jurisdiction.
            </p>
            <br />

            <h3 className="font-bold">9. Amendments to Terms</h3>
            <br />

            <p>
              Any updates or amendments to these Terms and Conditions will be
              communicated to users via our social media handles and through
              email notifications.
            </p>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export const PrivacyPolicyModal: React.FC<PrivacyPolicyProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-gray-900 bg-opacity-75 p-4">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Privacy Policy</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl font-semibold"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <div className="p-6 flex-grow overflow-y-auto custom-scrollbar">
          {/* Your Privacy Policy Content */}
          <div className="prose max-w-none text-gray-700">
            <p>
              <strong>Last Updated: July 6, 2025</strong>
            </p>
            <br />
            <p>
              This Privacy Policy describes how
              <strong> Parcel</strong>, operated by Dolph Tech Ltd & Flair
              Technologies Ltd ("we," "us," or "our"), collects, uses, and
              protects your personal information when you use our web
              application and services (collectively, the "Service").
            </p>

            <p>
              By accessing or using our Service, you agree to the collection and
              use of information in accordance with this policy.
            </p>
            <br />
            <h3 className="font-bold">1. Information We Collect</h3>

            <p>
              We collect various types of information to provide and improve our
              Service to you.
            </p>
            <br />
            <h4 className="font-semibold">Personal Data</h4>

            <p>
              While using our Service, we may ask you to provide us with certain
              personally identifiable information that can be used to contact or
              identify you ("Personal Data"). Personal Data we collect includes,
              but is not limited to:
            </p>
            <br />
            <ul>
              <li>
                <strong>Account Information:</strong> Your username, email
                address, and password when you create an account.
              </li>
              <li>
                <strong>Contact Information:</strong> Your name, email address,
                phone number, and physical address.
              </li>
              <li>
                <strong>Receiver Information:</strong> When sending a parcel, we
                collect the name, email, and phone number of the receiver.
              </li>
              <li>
                <strong>Parcel Information:</strong> The name and description of
                the parcel you are sending.
              </li>
            </ul>
            <br />
            <h4 className="font-semibold">Usage Data</h4>

            <p>
              We may also collect information about how the Service is accessed
              and used ("Usage Data"). This Usage Data may include information
              such as your computer's Internet Protocol address (e.g., IP
              address), browser type, browser version, the pages of our Service
              that you visit, the time and date of your visit, the time spent on
              those pages, unique device identifiers, and other diagnostic data.
            </p>
            <br />
            <h3 className="font-bold">2. How We Use Your Information</h3>

            <p>Parcel uses the collected data for various purposes:</p>
            <br />
            <ul>
              <li>To provide and maintain our Service.</li>
              <li>
                To manage your account and provide you with access to our
                services.
              </li>
              <li>To process and fulfill your parcel delivery requests.</li>
              <li>
                To communicate with you about your orders, updates, and other
                service-related information.
              </li>
              <li>To ensure the security of your data and our Service.</li>
              <li>To facilitate payment processing through Paystack.</li>
              <li>To monitor the usage of the Service.</li>
              <li>To detect, prevent, and address technical issues.</li>
            </ul>
            <br />
            <h3 className="font-bold">3. Sharing Your Information</h3>

            <p>
              We value your privacy and are committed to protecting your data.
              We do not sell your Personal Data to third parties.
            </p>
            <br />
            <p>
              We only share your email address with Paystack to facilitate
              payment processing for the services you use.
            </p>
            <br />

            <h3 className="font-bold">4. Data Security</h3>

            <p>
              The security of your data is paramount to us. We store your
              personal data in our secure database. Your passwords are
              encrypted. While we strive to use commercially acceptable means to
              protect your Personal Data, please remember that no method of
              transmission over the Internet or method of electronic storage is
              100% secure. We cannot guarantee its absolute security.
            </p>
            <br />

            <h3 className="font-bold">5. Data Retention</h3>

            <p>
              When you delete your account, we retain your data for an
              additional three (3) months before permanent deletion from our
              systems. This retention period allows for administrative purposes
              and to address any potential disputes or issues that may arise
              shortly after account termination.
            </p>
            <br />

            <h3 className="font-bold">6. Age Restriction</h3>

            <p>
              To create an account and use our services, you must be at least 15
              years of age.
            </p>
            <br />

            <h3 className="font-bold">7. Changes to This Privacy Policy</h3>

            <p>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page.
            </p>
            <br />

            <p>
              We will also communicate updates or amendments to this Privacy
              Policy via our social media handles and through email
              notifications.
            </p>
            <br />

            <p>
              You are advised to review this Privacy Policy periodically for any
              changes. Changes to this Privacy Policy are effective when they
              are posted on this page.
            </p>
            <br />

            <h3 className="font-bold">8. Contact Us</h3>

            <p>
              If you have any questions about this Privacy Policy, please
              contact us through the channels provided by Dolph Tech Ltd & Flair
              Technologies Ltd.
            </p>
            <br />

            <p>Operated by: Dolph Tech Ltd & Flair Technologies Ltd</p>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function ParcelApp() {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);

  const handleOpenTermsModal = () => {
    setIsTermsModalOpen(true);
    // Optional: Add a class to body to prevent scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  const handleCloseTermsModal = () => {
    setIsTermsModalOpen(false);
    // Optional: Remove the body class to re-enable scrolling
    document.body.style.overflow = "";
  };

  const handleOpenPrivacyPolicyModal = () => {
    setPrivacyPolicyOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleClosePrivacyPolicyModal = () => {
    setPrivacyPolicyOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <div className={`min-h-screen ${inter.className}`}>
      <Navigation />
      <HeroSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      {/* <TestimonialsSection /> */}
      <BusinessCTASection />
      <Footer
        onOpenTermsModal={handleOpenTermsModal}
        onOpenPrivacyModal={handleOpenPrivacyPolicyModal}
      />

      {/* Terms and Conditions Modal */}
      <TermsAndConditionsModal
        isOpen={isTermsModalOpen}
        onClose={handleCloseTermsModal}
      />

      <PrivacyPolicyModal
        isOpen={isPrivacyPolicyOpen}
        onClose={handleClosePrivacyPolicyModal}
      />
    </div>
  );
}
