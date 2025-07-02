"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Menu,
  X,
  User,
  Package,
  MapPin,
  Bike,
  ArrowRight,
  Calendar,
  Truck,
  CheckCircle,
  Clock,
  Users,
  Shield,
  Star,
  Building2,
  TrendingUp,
  MessageCircle,
  Instagram,
  Twitter,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function Home() {
  // Navigation state
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Animation states
  const [isHeroVisible, setIsHeroVisible] = useState(false)
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([false, false, false])
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false, false])
  const [visibleTestimonials, setVisibleTestimonials] = useState<boolean[]>([false, false, false])
  const [isBusinessVisible, setIsBusinessVisible] = useState(false)
  const router = useRouter()

  // Refs for intersection observer
  const howItWorksRef = useRef<HTMLElement>(null)
  const whyChooseUsRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLElement>(null)
  const businessRef = useRef<HTMLElement>(null)

  // Data
  const steps = [
    {
      icon: Calendar,
      title: "Schedule a Pickup",
      description: "Book via our website. Quick and easy scheduling.",
      step: "01",
    },
    {
      icon: Truck,
      title: "We Pick It Up Instantly",
      description: "Our professional riders arrive at your location promptly.",
      step: "02",
    },
    {
      icon: CheckCircle,
      title: "Delivered in 2–4 Hours",
      description: "Fast delivery anywhere within Lokoja with live tracking.",
      step: "03",
    },
  ]

  const features = [
    {
      icon: Clock,
      title: "Same-day Delivery in Lokoja",
      description: "Get your parcels delivered within 2-4 hours anywhere in Lokoja.",
    },
    // {
    //   icon: MapPin,
    //   title: "Live Tracking & WhatsApp Support",
    //   description: "Track your parcel in real-time and get instant support via WhatsApp.",
    // },
    {
      icon: Users,
      title: "Trusted by 2,000+ Locals",
      description: "Join thousands of satisfied customers who trust us with their deliveries.",
    },
    {
      icon: Shield,
      title: "Professional Dispatch Riders",
      description: "Our trained and verified riders ensure safe and secure delivery.",
    },
  ]

  const testimonials = [
    {
      name: "Adamu K.",
      location: "Ganaja Road",
      rating: 5,
      text: "Parcel delivered my documents to Phase II in just 2 hours. Excellent service and very professional riders!",
    },
    {
      name: "Sarah M.",
      location: "Phase II",
      rating: 5,
      text: "I use Parcel for my online business deliveries. They are always on time and my customers love the fast delivery.",
    },
    {
      name: "Ibrahim A.",
      location: "Felele",
      rating: 5,
      text: "Reliable and affordable. The WhatsApp tracking updates are very helpful. Highly recommend Parcel!",
    },
  ]

  // WhatsApp handler
  const handleWhatsAppClick = () => {
    const phoneNumber = "2348123456789"
    const message = "Hi! I need help with parcel delivery."
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  // Hero animation effect
  useEffect(() => {
    setIsHeroVisible(true)
  }, [])

  // Intersection observers for scroll animations
  useEffect(() => {
    const observerOptions = { threshold: 0.3 }

    // How It Works observer
    const howItWorksObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          steps.forEach((_, index) => {
            setTimeout(() => {
              setVisibleSteps((prev) => {
                const newState = [...prev]
                newState[index] = true
                return newState
              })
            }, index * 200)
          })
        }
      })
    }, observerOptions)

    // Why Choose Us observer
    const whyChooseUsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => {
                  const newState = [...prev]
                  newState[index] = true
                  return newState
                })
              }, index * 150)
            })
          }
        })
      },
      { threshold: 0.2 },
    )

    // Testimonials observer
    const testimonialsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            testimonials.forEach((_, index) => {
              setTimeout(() => {
                setVisibleTestimonials((prev) => {
                  const newState = [...prev]
                  newState[index] = true
                  return newState
                })
              }, index * 200)
            })
          }
        })
      },
      { threshold: 0.2 },
    )

    // Business CTA observer
    const businessObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsBusinessVisible(true)
        }
      })
    }, observerOptions)

    // Attach observers
    if (howItWorksRef.current) howItWorksObserver.observe(howItWorksRef.current)
    if (whyChooseUsRef.current) whyChooseUsObserver.observe(whyChooseUsRef.current)
    if (testimonialsRef.current) testimonialsObserver.observe(testimonialsRef.current)
    if (businessRef.current) businessObserver.observe(businessRef.current)

    return () => {
      howItWorksObserver.disconnect()
      whyChooseUsObserver.disconnect()
      testimonialsObserver.disconnect()
      businessObserver.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-orange-600 hover:text-orange-700 transition-colors duration-300 cursor-pointer">
                Parcel
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:block">

            </div>

            {/* Desktop Auth Buttons */}
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="border-orange-600 text-orange-600 hover:bg-orange-50 transition-all duration-300 hover:scale-105 bg-transparent"
                onClick={() => router.push("/authentication/signin")}
              >
                <User size={16} className="mr-2" />
                Sign In
              </Button>
              <Button
                size="sm"
                className="bg-orange-600 hover:bg-orange-700 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hidden lg:inline-flex"
                onClick={() => router.push("/authentication/signup/rider")}
              >
                Become a Rider
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-orange-50 to-yellow-50 py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div
              className={`text-center lg:text-left transition-all duration-1000 ease-out ${isHeroVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              <div className="flex items-center justify-center lg:justify-start mb-4 animate-fade-in">
                <MapPin className="text-orange-600 mr-2 animate-pulse" size={24} />
                <span className="text-orange-600 font-medium">Serving Lokoja, Nigeria</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Lokoja's Trusted{" "}
                <span className="text-orange-600 bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent animate-gradient">
                  Parcel Delivery
                </span>{" "}
                Service
              </h1>

              <p className="text-xl text-gray-600 mb-8 max-w-2xl animate-fade-in-delay">
                Fast, secure, and same-day delivery within Lokoja. Your packages delivered with care and speed you can
                trust.
              </p>

              {/* Main CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                  onClick={() => router.push("/authentication/signup")}
                >
                  Send Parcel
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>

              {/* Account Creation CTAs */}
              <div className="border-t border-orange-200 pt-6">
                <p className="text-sm text-gray-600 mb-4">New to Parcel? Join us today!</p>
                <div className="flex flex-row gap-3 justify-center lg:justify-start">
                  <Button
                    variant="outline"
                    className="border-orange-300 text-orange-700 hover:bg-orange-50 transition-all duration-300 hover:scale-105 group bg-transparent"
                    onClick={() => router.push("/authentication/signup")}
                  >
                    <User size={16} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Create Account
                  </Button>
                  <Button
                    variant="outline"
                    className="border-green-300 text-green-700 hover:bg-green-50 transition-all duration-300 hover:scale-105 group bg-transparent"
                    onClick={() => router.push("/authentication/signup/rider")}
                  >
                    <Bike size={16} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Become a Rider
                  </Button>
                </div>
              </div>
            </div>

            {/* Illustration */}
            <div
              className={`flex justify-center lg:justify-end transition-all duration-1000 ease-out delay-300 ${isHeroVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
            >
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center animate-float">
                  <Package size={120} className="text-orange-600 animate-pulse" />
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-white font-bold text-sm">2-4h</span>
                </div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-orange-500 rounded-full animate-ping opacity-75"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={howItWorksRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 animate-fade-in">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-delay">
              Simple, fast, and reliable. Get your parcels delivered in just 3 easy steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`text-center relative transition-all duration-700 ease-out hover:scale-105 ${visibleSteps[index] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
              >
                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full text-2xl font-bold mb-6 transition-all duration-300 hover:bg-orange-200 hover:scale-110">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="mb-6">
                  <step.icon
                    size={48}
                    className="text-orange-600 mx-auto transition-all duration-300 hover:scale-110 hover:text-orange-700"
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4 transition-colors duration-300 hover:text-orange-600">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>

                {/* Connector Line (hidden on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-orange-200 transform translate-x-8">
                    <div className="h-full bg-orange-400 animate-expand-width"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section ref={whyChooseUsRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Parcel?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best parcel delivery experience in Lokoja.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-500 hover:scale-105 hover:-translate-y-2 group ${visibleCards[index] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
              >
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-orange-200 group-hover:scale-110">
                  <feature.icon
                    size={32}
                    className="text-orange-600 transition-all duration-300 group-hover:scale-110"
                  />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-4 transition-colors duration-300 group-hover:text-orange-600">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}


      {/* Business CTA Section */}
      <section ref={businessRef} className="py-20 bg-gradient-to-r from-orange-600 to-orange-700 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div
              className={`text-center lg:text-left transition-all duration-1000 ease-out ${isBusinessVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
            >
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <Building2 className="text-orange-200 mr-2 animate-pulse" size={24} />
                <span className="text-orange-200 font-medium">For Businesses</span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Run a Business in Lokoja?</h2>

              <p className="text-xl text-orange-100 mb-8 max-w-2xl">
                Let us handle your daily deliveries so you can focus on growing your business. Special rates and
                priority service for business customers.
              </p>

              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group"
              >
                Get Business Plan
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>

            {/* Illustration */}
            <div
              className={`flex justify-center lg:justify-end transition-all duration-1000 ease-out delay-300 ${isBusinessVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
            >
              <div className="relative">
                <div className="w-64 h-64 bg-white bg-opacity-10 rounded-full flex items-center justify-center animate-float">
                  <TrendingUp size={80} className="text-white animate-pulse" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-white font-bold text-xs">B2B</span>
                </div>
                <div className="absolute -top-6 -right-6 w-8 h-8 bg-white bg-opacity-20 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-1">
              <h3 className="text-2xl font-bold text-orange-400 mb-4">Parcel</h3>
              <p className="text-gray-400 leading-relaxed">
                Lokoja's most trusted parcel delivery service. Fast, secure, and reliable delivery within the city.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-gray-400 hover:text-orange-400 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-orange-400 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#terms" className="text-gray-400 hover:text-orange-400 transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <Twitter size={24} />
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-gray-400 mb-2">Lokoja, Kogi State</p>
              <p className="text-gray-400">Nigeria</p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2024 Parcel. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 animate-bounce-slow group"
        aria-label="Chat with a Dispatcher on WhatsApp"
      >
        <MessageCircle size={24} className="group-hover:scale-110 transition-transform duration-300" />
        <span className="absolute -top-2 -left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
          Chat
        </span>
        <div className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-30"></div>
      </button>
    </div>
  )
}