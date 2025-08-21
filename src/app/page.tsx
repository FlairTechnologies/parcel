"use client";

import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import bike from "../../public/illustration/bike-illustration.png";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Package, Clock, MapPin, ShieldCheck  } from "lucide-react";
// import { } from 'lucide-react';
import { PrivacyPolicyModal, TermsAndConditionsModal } from "@/components/Auth/TermsandPolicy";

const inter = Inter({ subsets: ["latin"] });

// Custom hook for intersection observer (remains the same)
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

// Animation wrapper component (remains the same)
import type { ReactNode } from "react";

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

  return (
    <nav
      // className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300  `}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Package className="w-8 h-8 text-yellow-500" />
              <span className={`ml-2 text-xl font-bold ${isScrolled ? "text-gray-900" : "text-white"}`}>
                Parcel
              </span>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link href="#home" className={`px-3 py-2 text-sm font-medium transition-colors ${isScrolled ? "text-gray-900 hover:text-yellow-600" : "text-white hover:text-yellow-600"}`}>
                Home
              </Link>
              <Link href="#how-it-works" className={`px-3 py-2 text-sm font-medium transition-colors ${isScrolled ? "text-gray-900 hover:text-yellow-600" : "text-white hover:text-yellow-600"}`}>
                Get Started
              </Link>
              <Link href="#contact" className={`px-3 py-2 text-sm font-medium transition-colors ${isScrolled ? "text-gray-900 hover:text-yellow-600" : "text-white hover:text-yellow-600"}`}>
                Contact
              </Link>
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
  className="relative py-24 overflow-hidden" // Removed bg-gradient classes
>
  {/* Background Image Layer */}
  <div
    className="absolute inset-0 bg-cover bg-no-repeat"
    style={{ backgroundImage: "url('/man.jpg')" }} // Replace this with your image path
  >
    {/* Semi-transparent Overlay for Readability */}
    <div className="absolute inset-0 bg-black/50"></div>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="text-center md:text-left">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-4">
            Fast and Reliable <br />
            <span className="text-yellow-400">Delivery Service</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-lg leading-relaxed">
            Send packages across Lokoja city with tracking and guaranteed
            delivery. Experience the future of logistics with Parcel.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-md text-lg font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105 hover:-translate-y-1"
              onClick={() => router.push("/authentication/signup")}
            >
              Send Parcel Now
            </button>
            {/* Optional: Add a secondary action button if needed */}
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={400}>
        <div className="mt-10 md:mt-0">
          <Image
            src={bike}
            alt="Rider delivering parcel"
            className="w-full h-auto rounded-lg shadow-lg"
            style={{ maxWidth: "500px", margin: "0 auto" }}
          />
        </div>
      </FadeIn>
    </div>
  </div>
</section>
  );
};


const HowItWorksSection = () => {
  const steps = [
    {
      id: 1,
      title: "Place Order",
      description: "Tell us pickup and drop-off locations through our easy-to-use platform.",
      icon: (
        <svg className="w-16 h-16 text-white mx-auto drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      backgroundImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "Instant Pickup",
      description: "Our professional team collects your parcel promptly from your specified location.",
      icon: (
        <svg className="w-16 h-16 text-white mx-auto drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2v-5H14a2 2 0 01-2-2V7z" />
        </svg>
      ),
      backgroundImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-green-500 to-teal-600"
    },
    {
      id: 3,
      title: "Fast Delivery",
      description: "Your parcel is delivered safely within 2-4 hours anywhere in Lokoja.",
      icon: (
        <svg className="w-16 h-16 text-white mx-auto drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      backgroundImage: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "from-orange-500 to-red-600"
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple steps for fast and reliable parcel delivery
            </p>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6 rounded"></div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <FadeIn key={step.id} delay={index * 200}>
              <div className="relative group">
                {/* Step connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 -right-4 w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-200 z-10"></div>
                )}
                
                {/* Main card */}
                <div 
                  className="relative rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 text-center overflow-hidden group-hover:transform group-hover:scale-105 min-h-[340px] flex flex-col justify-center"
                  style={{
                    backgroundImage: `url(${step.backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  {/* Dark overlay for text readability */}
                  <div className="absolute inset-0 bg-black bg-opacity-60 group-hover:bg-opacity-50 transition-all duration-500"></div>
                  
                  {/* Additional gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
                  
                  {/* Step number */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg z-20">
                    {step.id}
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-6">
                      {step.icon}
                    </div>

                    {/* Text content */}
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-300 transition-colors duration-300 drop-shadow-lg">
                      {step.title}
                    </h3>
                    <p className="text-gray-100 leading-relaxed drop-shadow-md">
                      {step.description}
                    </p>
                  </div>

                  {/* Decorative bottom border */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-10"></div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Call to action */}
        <FadeIn delay={800}>
          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Ready to get started?</h4>
              <p className="text-gray-600 mb-4">Join thousands of satisfied customers</p>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
                Place Your First Order
              </button>
            </div>
          </div>
        </FadeIn>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </section>
  );
};



// Why Choose Us Section Component
// const WhyChooseUsSection = () => {
//   const features = [
//     {
//       icon: (
//         <svg className="w-8 h-8 text-yellow-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       ),
//       title: "Fast Delivery",
//       description: "2-4 hour delivery within Lokoja.",
//     },
//     {
//       icon: (
//         <svg className="w-8 h-8 text-yellow-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4l3-3m7 14l3-3M9 8h10m-6 5a2 2 0 11-4 0 2 2 0 014 0z" />
//         </svg>
//       ),
//       title: "Wide Coverage",
//       description: "Serving all areas across Lokoja.",
//     },
//     {
//       icon: (
//         <svg className="w-8 h-8 text-yellow-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       ),
//       title: "Reliable Service",
//       description: "Trusted by individuals and businesses.",
//     },
//   ];

//   return (
//     <section className="py-20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <FadeIn>
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">
//               Why Choose Parcel?
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Your trusted partner for efficient deliveries
//             </p>
//           </div>
//         </FadeIn>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <FadeIn key={index} delay={index * 200}>
//               <div className="bg-white rounded-lg shadow-md p-6 text-center">
//                 <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600 text-sm">{feature.description}</p>
//               </div>
//             </FadeIn>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };


const WhyChooseUsSection = () => {
  const features = [
    {
      icon: <Clock size={28} className="text-amber-500 group-hover:text-amber-600 transition-colors" />,
      title: "Swift Delivery",
      description: "Get your parcels delivered in 2-4 hours, right on time, every time within Lokoja.",
    },
    {
      icon: <MapPin size={28} className="text-amber-500 group-hover:text-amber-600 transition-colors" />,
      title: "Lokoja-Wide Coverage",
      description: "From Ganaja to Zango, our network covers every corner of the city, ensuring no location is out of reach.",
    },
    {
      icon: <ShieldCheck size={28} className="text-amber-500 group-hover:text-amber-600 transition-colors" />,
      title: "Unwavering Reliability",
      description: "Count on us for secure handling and dependable service, trusted by countless individuals and businesses.",
    },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Your Go-To Delivery Partner
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
              We're more than just a delivery service; we're your partner in
              getting things done quickly and reliably across Lokoja.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={index * 150}>
              <div className="group relative bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2">
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};


// Testimonials Section Component
// const TestimonialsSection = () => {
//   const testimonials = [
//     {
//       initials: "AM",
//       name: "Aisha M.",
//       text: "Super fast and reliable service!",
//     },
//     {
//       initials: "JO",
//       name: "John O.",
//       text: "Great experience with Parcel. Highly recommended.",
//     },
//     {
//       initials: "FK",
//       name: "Fatima K.",
//       text: "Excellent customer support and timely delivery.",
//     },
//   ];

//   return (
//     <section className="py-20 bg-gray-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <FadeIn>
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">
//               What Our Customers Say
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Hear from our satisfied customers
//             </p>
//           </div>
//         </FadeIn>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {testimonials.map((testimonial, index) => (
//             <FadeIn key={index} delay={index * 200}>
//               <div className="bg-white rounded-lg shadow-md p-6">
//                 <div className="flex items-center mb-4">
//                   <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-white font-semibold">
//                     {testimonial.initials}
//                   </div>
//                   <h4 className="ml-3 font-semibold text-gray-900">{testimonial.name}</h4>
//                 </div>
//                 <p className="text-gray-600 text-sm italic">"{testimonial.text}"</p>
//               </div>
//             </FadeIn>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// Business CTA Section Component
const BusinessCTASection = () => {
  return (
    <section className="py-20 bg-yellow-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Run a Business in Lokoja?
            </h2>
            <p className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
              Partner with Parcel for reliable and efficient business deliveries.
            </p>
            <button className="bg-white text-yellow-600 hover:bg-gray-100 px-8 py-3 rounded-md text-lg font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105 hover:-translate-y-1">
              <Link href="mailto:hello@theparcel.com.ng">Contact Us for Business</Link>
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
    <footer id="contact" className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Package className="w-6 h-6 text-yellow-500" />
              <span className="ml-2 text-lg font-bold">Parcel</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted logistics partner in Lokoja.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Quick Links</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li><Link href="#">About Us</Link></li>
              <li><Link href="#">Services</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Support</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li><button onClick={onOpenTermsModal} className="text-left">Terms & Conditions</button></li>
              <li><button onClick={onOpenPrivacyModal} className="text-left">Privacy Policy</button></li>
              <li><Link href="#">Contact Support</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Contact</h4>
            <p className="text-gray-400 text-sm">📍 Lokoja, Nigeria</p>
            <p className="text-gray-400 text-sm">📞 +234 70XXXXXXXX</p>
            <p className="text-gray-400 text-sm">✉️ hello@theparcel.com.ng</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-4 text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} Parcel. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

// Main App Component
export default function ParcelApp() {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);

  const handleOpenTermsModal = () => setIsTermsModalOpen(true);
  const handleCloseTermsModal = () => setIsTermsModalOpen(false);
  const handleOpenPrivacyPolicyModal = () => setPrivacyPolicyOpen(true);
  const handleClosePrivacyPolicyModal = () => setPrivacyPolicyOpen(false);

  return (
    <div className={`min-h-screen ${inter.className}`}>
      <Navigation />
      <HeroSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      {/* <TestimonialsSection /> Added Testimonials Section */}
      <BusinessCTASection />
      <Footer
        onOpenTermsModal={handleOpenTermsModal}
        onOpenPrivacyModal={handleOpenPrivacyPolicyModal}
      />

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


// "use client";

// import { useState, useEffect } from "react";
// import { Inter } from "next/font/google";
// import Link from "next/link";
// import bike from "../../public/illustration/bike-illustration.png";
// import { useRouter } from "next/navigation";

// const inter = Inter({ subsets: ["latin"] });

// // Custom hook for intersection observer
// import type { RefCallback } from "react";

// const useIntersectionObserver = (
//   options = {}
// ): [RefCallback<HTMLDivElement>, boolean] => {
//   const [isIntersecting, setIsIntersecting] = useState(false);
//   const [element, setElement] = useState<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (!element) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setIsIntersecting(entry.isIntersecting);
//       },
//       {
//         threshold: 0.1,
//         rootMargin: "0px 0px -50px 0px",
//         ...options,
//       }
//     );

//     observer.observe(element);
//     return () => observer.disconnect();
//   }, [element, options]);

//   const ref = (node: HTMLDivElement | null) => {
//     setElement(node);
//   };

//   return [ref, isIntersecting];
// };

// // Animation wrapper component
// import type { ReactNode } from "react";
// import Image from "next/image";
// import { Package } from "lucide-react";
// import { PrivacyPolicyModal, TermsAndConditionsModal } from "@/components/Auth/TermsandPolicy";

// type FadeInProps = {
//   children: ReactNode;
//   className?: string;
//   delay?: number;
// };

// const FadeIn = ({ children, className = "", delay = 0 }: FadeInProps) => {
//   const [ref, isIntersecting] = useIntersectionObserver();

//   return (
//     <div
//       ref={ref}
//       className={`transition-all duration-700 ease-out ${
//         isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
//       } ${className}`}
//       style={{ transitionDelay: `${delay}ms` }}
//     >
//       {children}
//     </div>
//   );
// };

// // Navigation Component
// const Navigation = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 0);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToSection = (sectionId: any) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   };

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled
//           ? "bg-white/95 backdrop-blur-md border-b border-gray-100"
//           : "bg-white/95 backdrop-blur-md"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center">
//             <div className="flex-shrink-0 flex items-center">
//               <Package className="w-8 h-8 text-yellow-500" />
//               <span className="ml-2 text-xl font-bold text-gray-900">
//                 Parcel
//               </span>
//             </div>
//           </div>

//           <div className="hidden md:block">
//             <div className="ml-10 flex items-baseline space-x-8">
//               <button
//                 onClick={() => scrollToSection("home")}
//                 className="text-gray-900 hover:text-yellow-600 px-3 py-2 text-sm font-medium transition-colors"
//               >
//                 Home
//               </button>
//               <button
//                 onClick={() => scrollToSection("how-it-works")}
//                 className="text-gray-600 hover:text-yellow-600 px-3 py-2 text-sm font-medium transition-colors"
//               >
//                 Get Started
//               </button>
//               <button
//                 onClick={() => scrollToSection("contact")}
//                 className="text-gray-600 hover:text-yellow-600 px-3 py-2 text-sm font-medium transition-colors"
//               >
//                 Contact
//               </button>
//             </div>
//           </div>

//           <div className="flex items-center">
//             <button
//               className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105 animate-pulse"
//               onClick={() => router.push("/authentication/signin")}
//             >
//               Send Parcel
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// // Hero Section Component
// const HeroSection = () => {
//   const router = useRouter();
//   return (
//     <section
//       id="home"
//       className="relative pt-24 pb-20 bg-gradient-to-br from-yellow-50 to-yellow-100/70 overflow-hidden"
//     >
//       {/* Radial Glow */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(251,191,36,0.15)_0%,transparent_50%)] z-0"></div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="h-screen text-center md:text-left grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//           <FadeIn>
//             <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-relaxed tracking-tight mb-6">
//               Fast and Reliable <br />
//               <span className="text-yellow-500 underline decoration-yellow-400/40 underline-offset-4">
//                 Delivery Service
//               </span>
//             </h1>
//             <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
//               Send packages across lokoja city with tracking and guaranteed
//               delivery. Experience the future of logistics with Parcel.
//             </p>

//             <button
//               className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105 hover:-translate-y-1"
//               onClick={() => router.push("/authentication/signup")}
//             >
//               Send Parcel Now
//             </button>
//           </FadeIn>

//           <FadeIn delay={400}>
//             <div className="mt-20 max-w-4xl mx-auto">
//               {/* Optional illustrative image */}
//               <Image
//                 src={bike}
//                 alt="Rider delivering parcel"
//                 className="w-full h-auto"
//               />
//             </div>
//           </FadeIn>
//         </div>
//       </div>

//       {/* Optional animated shapes or floating gradient circles */}
//       <div className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-30 z-0"></div>
//     </section>
//   );
// };

// // How It Works Section Component
// const HowItWorksSection = () => {
//   const steps = [
//     {
//       icon: (
//         <svg
//           className="w-8 h-8 text-white"
//           fill="currentColor"
//           viewBox="0 0 20 20"
//         >
//           <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
//         </svg>
//       ),
//       title: "1. Place an Order",
//       description:
//         "Tell us where to pick up your parcel and where to drop it off.",
//     },
//     {
//       icon: (
//         <svg
//           className="w-8 h-8 text-white"
//           fill="currentColor"
//           viewBox="0 0 20 20"
//         >
//           <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       ),
//       title: "2. We Pick It Up Instantly",
//       description:
//         "Our professionals arrive promptly to collect your parcel safely.",
//     },
//     {
//       icon: (
//         <svg
//           className="w-8 h-8 text-white"
//           fill="currentColor"
//           viewBox="0 0 20 20"
//         >
//           <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
//         </svg>
//       ),
//       title: "3. Delivered in 2–4 Hours",
//       description:
//         "Fast delivery anywhere in Lokoja. View delivery status in real-time.",
//     },
//   ];

//   return (
//     <section id="how-it-works" className="py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <FadeIn>
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               How It Works
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Simple, fast, and reliable delivery in three easy steps
//             </p>
//           </div>
//         </FadeIn>

//         <div className="grid md:grid-cols-3 gap-8">
//           {steps.map((step, index) => (
//             <FadeIn key={index} delay={index * 200}>
//               <div className="text-center transition-transform hover:scale-105 hover:-translate-y-2">
//                 <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
//                   {step.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-3">
//                   {step.title}
//                 </h3>
//                 <p className="text-gray-600">{step.description}</p>
//               </div>
//             </FadeIn>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// // Why Choose Us Section Component
// const WhyChooseUsSection = () => {
//   const features = [
//     {
//       icon: (
//         <svg
//           className="w-8 h-8 text-yellow-600"
//           fill="currentColor"
//           viewBox="0 0 20 20"
//         >
//           <path d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z" />
//         </svg>
//       ),
//       title: "Same-day Delivery",
//       description:
//         "Fast delivery within Lokoja in just 2-4 hours. No waiting days for your parcel.",
//     },
//     {
//       icon: (
//         <svg
//           className="w-8 h-8 text-yellow-600"
//           fill="currentColor"
//           viewBox="0 0 20 20"
//         >
//           <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
//         </svg>
//       ),
//       title: "Trusted by 2,000+ Locals",
//       description:
//         "Join thousands of satisfied customers who trust us with their deliveries.",
//     },
//     {
//       icon: (
//         <svg
//           className="w-8 h-8 text-yellow-600"
//           fill="currentColor"
//           viewBox="0 0 20 20"
//         >
//           <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       ),
//       title: "Trusted by many businesses",
//       description: "Businesses use Parcel to deliver to their customers.",
//     },
//   ];

//   return (
//     <section className="py-20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <FadeIn>
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Why Choose Parcel?
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Trusted by many locals and businesses across Lokoja
//             </p>
//           </div>
//         </FadeIn>

//         <div className="grid md:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <FadeIn key={index} delay={index * 200}>
//               <div className="bg-white rounded-xl shadow-lg p-8 text-center transition-all hover:shadow-xl hover:scale-105 hover:-translate-y-2">
//                 <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-3">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             </FadeIn>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// // Testimonials Section Component
// const TestimonialsSection = () => {
//   const testimonials = [
//     {
//       initials: "AM",
//       name: "Aisha M.",
//       location: "Ganaja Road",
//       text: "Super fast delivery! My package arrived in just 40 minutes. They are very professional and polite.",
//     },
//     {
//       initials: "JO",
//       name: "John O.",
//       location: "Phase II",
//       text: "I run a small business and Parcel has been a lifesaver. Reliable, affordable, and always on time!",
//     },
//     {
//       initials: "FK",
//       name: "Fatima K.",
//       location: "Felele",
//       text: "The tracking feature is amazing! I could see the status of my delivery at all time and even get emails. Highly recommended!",
//     },
//   ];

//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <FadeIn>
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               What Our Customers Say
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Feedback from Parcel users across Lokoja
//             </p>
//           </div>
//         </FadeIn>

//         <div className="grid md:grid-cols-3 gap-8">
//           {testimonials.map((testimonial, index) => (
//             <FadeIn key={index} delay={index * 200}>
//               <div className="bg-white rounded-xl shadow-lg p-8 transition-all hover:shadow-xl hover:scale-105 hover:-translate-y-2">
//                 <div className="flex items-center mb-4">
//                   <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold">
//                     {testimonial.initials}
//                   </div>
//                   <div className="ml-4">
//                     <h4 className="font-semibold text-gray-900">
//                       {testimonial.name}
//                     </h4>
//                     <div className="flex items-center">
//                       <span className="text-sm text-gray-600">
//                         {testimonial.location}
//                       </span>
//                       <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
//                         Verified
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <p className="text-gray-600 italic">"{testimonial.text}"</p>
//               </div>
//             </FadeIn>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// // Business CTA Section Component
// const BusinessCTASection = () => {
//   return (
//     <section className="py-20 bg-gradient-to-r from-yellow-300 to-yellow-400">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <FadeIn>
//           <div className="text-center">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Run a Business in Lokoja?
//             </h2>
//             <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
//               Let us handle your daily deliveries so you can focus on growing
//               your business. Special rates for businesses.
//             </p>
//             <button className="bg-white text-yellow-600 hover:bg-gray-50 px-8 py-4 rounded-lg text-lg font-medium transition-all transform hover:scale-105 hover:-translate-y-1 shadow-lg">
//               <Link href="mailto:info@thepaercel.com.ng"> Contact Us </Link>
//             </button>
//           </div>
//         </FadeIn>
//       </div>
//     </section>
//   );
// };

// // Footer Component
// const Footer = ({
//   onOpenTermsModal,
//   onOpenPrivacyModal,
// }: {
//   onOpenTermsModal: () => void;
//   onOpenPrivacyModal: () => void;
// }) => {
//   return (
//     <footer id="contact" className="bg-gray-900 text-white py-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid md:grid-cols-4 gap-8">
//           <div className="col-span-2">
//             <div className="flex items-center mb-4">
//               <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
//                 <Package className="w-5 h-5 text-white" />
//               </div>
//               <span className="ml-2 text-2xl font-bold">Parcel</span>
//             </div>
//             <p className="text-gray-400 mb-4">
//               Lokoja's trusted logistics service. Fast, secure, and reliable
//               delivery across the city.
//             </p>
//             <div className="flex space-x-4">
//               <a
//                 href="https://x.com/TheParcelNg"
//                 className="text-gray-400 hover:text-yellow-400 transition-colors"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
//                 </svg>
//               </a>
//             </div>
//           </div>

//           <div>
//             <h4 className="font-semibold mb-4">Quick Links</h4>
//             <ul className="space-y-2 text-gray-400">
//               <li>
//                 <a href="#" className="hover:text-yellow-400 transition-colors">
//                   About
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-yellow-400 transition-colors">
//                   Contact
//                 </a>
//               </li>
//               <li>
//                 <button
//                   onClick={onOpenTermsModal}
//                   className="hover:text-yellow-400 transition-colors text-left"
//                 >
//                   Terms & Conditions
//                 </button>
//               </li>
//               <button
//                 onClick={onOpenPrivacyModal}
//                 className="hover:text-yellow-400 transition-colors text-left"
//               >
//                 Privacy Policy
//               </button>
//             </ul>
//           </div>

//           <div>
//             <h4 className="font-semibold mb-4">Contact Info</h4>
//             <ul className="space-y-2 text-gray-400">
//               <li>📍 Lokoja, Nigeria</li>
//               <li>📞 +234 706 716 2340</li>
//               <li>📞 +234 912 838 7342</li>
//               <li>✉️ hello@theparcel.com.ng</li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
//           <p className="font-bold">
//             &copy; {new Date().getFullYear()} Parcel by Dolph Tech Ltd & Flair
//             Technologies Ltd. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };


// // Main App Component
// export default function ParcelApp() {
//   const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
//   const [isPrivacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);

//   const handleOpenTermsModal = () => {
//     setIsTermsModalOpen(true);
//     // Optional: Add a class to body to prevent scrolling when modal is open
//     document.body.style.overflow = "hidden";
//   };

//   const handleCloseTermsModal = () => {
//     setIsTermsModalOpen(false);
//     // Optional: Remove the body class to re-enable scrolling
//     document.body.style.overflow = "";
//   };

//   const handleOpenPrivacyPolicyModal = () => {
//     setPrivacyPolicyOpen(true);
//     document.body.style.overflow = "hidden";
//   };

//   const handleClosePrivacyPolicyModal = () => {
//     setPrivacyPolicyOpen(false);
//     document.body.style.overflow = "";
//   };

//   return (
//     <div className={`min-h-screen ${inter.className}`}>
//       <Navigation />
//       <HeroSection />
//       <HowItWorksSection />
//       <WhyChooseUsSection />
//       {/* <TestimonialsSection /> */}
//       <BusinessCTASection />
//       <Footer
//         onOpenTermsModal={handleOpenTermsModal}
//         onOpenPrivacyModal={handleOpenPrivacyPolicyModal}
//       />

//       {/* Terms and Conditions Modal */}
//       <TermsAndConditionsModal
//         isOpen={isTermsModalOpen}
//         onClose={handleCloseTermsModal}
//       />

//       <PrivacyPolicyModal
//         isOpen={isPrivacyPolicyOpen}
//         onClose={handleClosePrivacyPolicyModal}
//       />
//     </div>
//   );
// }
