// "use client";
// import React, { useState, useEffect } from "react";
// import InputField from "../ui/InputField";
// import {
//   Check,
//   ArrowRight,
//   ArrowLeft,
//   Package,
//   User,
//   MapPin,
//   CreditCard,
//   RefreshCw,
// } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import { useAuth } from "@/context/AuthContext";
// import { useToast } from "@/hooks/use-toast";
// import { Parcel } from "@/interfaces/order.interface";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import PaystackBrowserModal from "../ui/custom/PaystackBrowserModal";
// import { Loader } from "../ui/custom/loader";

// const steps = [
//   { id: 1, title: "Package Details", icon: Package },
//   { id: 2, title: "Receiver Details", icon: User },
//   { id: 3, title: "Location Details", icon: MapPin },
//   { id: 4, title: "Checkout Order", icon: CreditCard },
// ];

// interface Address {
//   id?: string;
//   name: string;
//   description?: string;
// }

// const Stepper = () => {
//   const { accessToken } = useAuth();
//   const { toast } = useToast();
//   const router = useRouter();

//   const [order, setOrder] = useState<Parcel | null>(null);
//   const [reference, setReference] = useState<string | undefined>(undefined);
//   const [paymentUrl, setPaymentUrl] = useState<string | undefined>(undefined);
//   const [openModal, setOpenModal] = useState<boolean>(false);
//   const [loading, setLoading] = useState(false);
//   const [addressesLoading, setAddressesLoading] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [addresses, setAddresses] = useState<Address[]>([]);
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const [formData, setFormData] = useState({
//     packageName: "",
//     description: "",
//     receiverName: "",
//     receiverEmail: "",
//     receiverPhone: "",
//     fromLocation: "",
//     toLocation: "",
//   });

//   // Updated fallback addresses to match the API response
//   const fallbackAddresses: Address[] = [
//     { id: "fallback-1", name: "Adankolo" },
//     { id: "fallback-2", name: "Army Barracks Area" },
//     { id: "fallback-3", name: "Crowther Road" },
//     { id: "fallback-4", name: "Crusher" },
//     { id: "fallback-5", name: "FUL Axis" },
//     { id: "fallback-6", name: "Felele" },
//     { id: "fallback-7", name: "GRA" },
//     { id: "fallback-8", name: "Gadumo" },
//     { id: "fallback-9", name: "Ganaja" },
//     { id: "fallback-10", name: "Kabawa" },
//     { id: "fallback-11", name: "Kabba Junction" },
//     { id: "fallback-12", name: "Kpata" },
//     { id: "fallback-13", name: "Lokongoma Phase 2" },
//     { id: "fallback-14", name: "Nataco" },
//     { id: "fallback-15", name: "New Layout" },
//     { id: "fallback-16", name: "Old Market" },
//     { id: "fallback-17", name: "Paparanda Square" },
//     { id: "fallback-18", name: "Phase 1" },
//     { id: "fallback-19", name: "Post Office Area" },
//     { id: "fallback-20", name: "Stadium Road" },
//     { id: "fallback-21", name: "Zango" },
//   ];

//   // Fetch addresses from API
//   const fetchAddresses = async () => {
//     try {
//       setAddressesLoading(true);
//       const response = await fetch("/api/orders/addresses", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       const data = await response.json();
//       // console.log("API Response:", data);

//       if (response.ok) {
//         // Handle the specific API response format: array of strings
//         if (Array.isArray(data)) {
//           // Convert string array to Address objects
//           const addressObjects = data.map(
//             (addressName: string, index: number) => ({
//               id: `address-${index}`,
//               name: addressName,
//             })
//           );
//           setAddresses(addressObjects);
//         } else {
//           console.warn("Unexpected addresses API response structure:", data);
//           setAddresses(fallbackAddresses);
//         }
//       } else {
//         toast({
//           title: "Warning",
//           description:
//             data.error ||
//             "Failed to fetch addresses. Using fallback locations.",
//           variant: "destructive",
//         });
//         setAddresses(fallbackAddresses);
//       }
//     } catch (error: any) {
//       console.error("Error fetching addresses:", error);
//       toast({
//         title: "Warning",
//         description: "Failed to fetch addresses. Using fallback locations.",
//         variant: "destructive",
//       });
//       setAddresses(fallbackAddresses);
//     } finally {
//       setAddressesLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (accessToken) {
//       fetchAddresses();
//     } else {
//       setAddresses(fallbackAddresses);
//     }
//   }, [accessToken]);

//   // Validation function
//   const validateCurrentStep = () => {
//     const newErrors: Record<string, string> = {};

//     switch (currentStep) {
//       case 1:
//         if (!formData.description.trim()) {
//           newErrors.description = "Package description is required";
//         }
//         break;
//       case 2:
//         if (!formData.receiverPhone.trim()) {
//           newErrors.receiverPhone = "Receiver's phone number is required";
//         }
//         break;
//       case 3:
//         if (!formData.fromLocation) {
//           newErrors.fromLocation = "Your location is required";
//         }
//         if (!formData.toLocation) {
//           newErrors.toLocation = "Receiver's location is required";
//         }
//         if (
//           formData.fromLocation === formData.toLocation &&
//           formData.fromLocation
//         ) {
//           newErrors.toLocation =
//             "Pickup and delivery locations must be different";
//         }
//         break;
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleVerifyPayment = async () => {
//     try {
//       setLoading(true);

//       if (!reference) {
//         toast({
//           title: "Error",
//           description:
//             "Cannot find reference, are you sure you placed an order?",
//         });
//         return;
//       }

//       const response = await fetch(
//         `/api/orders/verify_payment?reference=${reference}`,
//         {
//           method: "GET",
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         router.replace("/user/home");
//       } else {
//         toast({
//           title: "Error:",
//           description: data.error,
//           variant: "destructive",
//         });
//       }
//     } catch (e: any) {
//       toast({
//         title: "Error",
//         description: e?.message ? e.message : e,
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const closeModal = async () => {
//     setOpenModal(false);
//     await handleVerifyPayment();
//   };

//   const handleCheckout = async () => {
//     if (!order) {
//       toast({
//         title: "Error",
//         description: "Complete order before you can checkout",
//         variant: "destructive",
//       });
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(`/api/orders/checkout`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify({
//           orderId: order.orderId,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setReference(data.reference);
//         setPaymentUrl(data.authorization_url);

//         if (data.authorization_url) {
//           setOpenModal(true);
//         }
//       } else {
//         toast({
//           title: "Error:",
//           description: "Cannot generate checkout ID",
//           variant: "destructive",
//         });
//       }
//     } catch (e: any) {
//       toast({
//         title: "Error",
//         description: e?.message ? e.message : e,
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNext = async () => {
//     // Validate current step before proceeding
//     if (!validateCurrentStep()) {
//       return;
//     }

//     if (currentStep < steps.length) {
//       setCurrentStep(currentStep + 1);
//     }

//     // If we're on the last step before checkout, create the order
//     if (currentStep === steps.length - 1) {
//       setLoading(true);

//       try {
//         const response = await fetch("/api/orders/new", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${accessToken}`,
//           },
//           body: JSON.stringify({
//             address: formData.fromLocation,
//             receiver: {
//               name: formData.receiverName,
//               phone: formData.receiverPhone,
//               address: formData.toLocation,
//             },
//             descr: formData.description,
//           }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//           setOrder(data);
//         } else {
//           toast({
//             title: "Error",
//             description: data.error || "Cannot complete order",
//             variant: "destructive",
//           });
//           // Stay on current step if order creation fails
//           setCurrentStep(currentStep);
//         }
//       } catch (e: any) {
//         toast({
//           title: "Error",
//           description: e?.message ? e.message : e,
//           variant: "destructive",
//         });
//         setCurrentStep(currentStep);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//       // Clear any errors when going back
//       setErrors({});
//     }
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     // Clear error for this field when user starts typing
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   const handleSelectChange = (name: string, value: string) => {
//     setFormData({ ...formData, [name]: value });

//     // Clear error for this field when user selects
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   const refreshAddresses = async () => {
//     if (accessToken) {
//       await fetchAddresses();
//     }
//   };

//   const getCurrentStepIcon = () => {
//     const StepIcon = steps[currentStep - 1]?.icon;
//     return StepIcon ? <StepIcon className="w-6 h-6 text-[#F9CA44]" /> : null;
//   };

//   if (loading && !order) {
//     return (
//       <div className="h-screen w-full flex items-center justify-center">
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
//       {/* Header */}

//       <div className="w-full max-w-4xl mt-20 mb-8">
//         <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
//           {/* Progress Header */}
//           <div className="bg-gradient-to-r from-[#F9CA44] to-[#f0c143] p-6">
//             <div className="hidden md:flex justify-between items-center">
//               {steps.map((step, index) => {
//                 const StepIcon = step.icon;
//                 return (
//                   <div
//                     key={step.id}
//                     className="flex flex-col items-center flex-1"
//                   >
//                     <div className="flex items-center w-full">
//                       <div
//                         className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
//                           currentStep > step.id
//                             ? "bg-green-500 scale-110 shadow-lg"
//                             : currentStep === step.id
//                             ? "bg-white scale-110 shadow-lg"
//                             : "bg-white/30 border-2 border-white/50"
//                         }`}
//                       >
//                         {currentStep > step.id ? (
//                           <Check className="w-6 h-6 text-white" />
//                         ) : currentStep === step.id ? (
//                           <StepIcon className="w-6 h-6 text-[#F9CA44]" />
//                         ) : (
//                           <StepIcon className="w-6 h-6 text-white" />
//                         )}
//                       </div>
//                       {index < steps.length - 1 && (
//                         <div className="flex-1 mx-4">
//                           <div
//                             className={`h-2 rounded-full transition-all duration-500 ${
//                               currentStep > step.id
//                                 ? "bg-green-500"
//                                 : "bg-white/30"
//                             }`}
//                           />
//                         </div>
//                       )}
//                     </div>
//                     <span
//                       className={`mt-3 text-sm font-semibold transition-colors ${
//                         currentStep >= step.id ? "text-white" : "text-white/70"
//                       }`}
//                     >
//                       {step.title}
//                     </span>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Mobile Progress */}
//             <div className="md:hidden">
//               <div className="flex justify-between items-center mb-4">
//                 {steps.map((step, index) => (
//                   <div key={step.id} className="flex-1">
//                     <div
//                       className={`h-2 rounded-full transition-all duration-300 ${
//                         currentStep >= step.id ? "bg-white" : "bg-white/30"
//                       }`}
//                     />
//                   </div>
//                 ))}
//               </div>
//               <div className="text-center">
//                 <h2 className="text-xl font-bold text-white">
//                   {steps[currentStep - 1]?.title}
//                 </h2>
//                 <p className="text-white/80 text-sm">
//                   Step {currentStep} of {steps.length}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Content Section */}
//           <div className="p-2">
//             <div className="min-h-[400px]">
//               {/* Step 1: Package Details */}
//               {currentStep === 1 && (
//                 <div className="space-y-6 animate-in slide-in-from-right duration-300">
//                   <div className="text-center mb-8">
//                     <Package className="w-16 h-16 text-[#F9CA44] mx-auto mb-4" />
//                     <h3 className="text-2xl font-bold text-gray-800 mb-2">
//                       Package Information
//                     </h3>
//                     <p className="text-yellow-600">
//                       Please note that we currently do not deliver packages that
//                       exceed 15 kg (approximately 33 lbs)
//                     </p>
//                   </div>

//                   <div className="space-y-5">
//                     <InputField
//                       type="text"
//                       name="packageName"
//                       placeholder="Package Name"
//                       value={formData.packageName}
//                       onChange={handleChange}
//                     />
//                     <div>
//                       <textarea
//                         name="description"
//                         placeholder="Package Description *"
//                         value={formData.description}
//                         onChange={handleChange}
//                         className={`w-full border p-4 rounded-xl focus:ring-2 focus:ring-[#F9CA44] focus:border-transparent outline-none transition-all resize-none h-32 ${
//                           errors.description
//                             ? "border-red-500"
//                             : "border-gray-300"
//                         }`}
//                       />
//                       {errors.description && (
//                         <p className="text-red-500 text-sm mt-1">
//                           {errors.description}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Step 2: Receiver Details */}
//               {currentStep === 2 && (
//                 <div className="space-y-6 animate-in slide-in-from-right duration-300">
//                   <div className="text-center mb-8">
//                     <User className="w-16 h-16 text-[#F9CA44] mx-auto mb-4" />
//                     <h3 className="text-2xl font-bold text-gray-800 mb-2">
//                       Receiver Information
//                     </h3>
//                     <p className="text-gray-600">
//                       Who will receive this package?
//                     </p>
//                   </div>

//                   <div className="space-y-5">
//                     <InputField
//                       type="text"
//                       name="receiverName"
//                       placeholder="Receiver's Name"
//                       value={formData.receiverName}
//                       onChange={handleChange}
//                     />
//                     <InputField
//                       type="email"
//                       name="receiverEmail"
//                       placeholder="Receiver's Email"
//                       value={formData.receiverEmail}
//                       onChange={handleChange}
//                     />
//                     <div>
//                       <InputField
//                         type="tel"
//                         name="receiverPhone"
//                         placeholder="Receiver's Phone Number *"
//                         value={formData.receiverPhone}
//                         onChange={handleChange}
//                       />
//                       {errors.receiverPhone && (
//                         <p className="text-red-500 text-sm mt-1">
//                           {errors.receiverPhone}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Step 3: Location Details */}
//               {currentStep === 3 && (
//                 <div className="space-y-6 animate-in slide-in-from-right duration-300">
//                   <div className="text-center mb-8">
//                     <MapPin className="w-16 h-16 text-[#F9CA44] mx-auto mb-4" />
//                     <h3 className="text-2xl font-bold text-gray-800 mb-2">
//                       Pickup & Delivery
//                     </h3>
//                     <p className="text-gray-600">
//                       Where should we pick up and deliver?
//                     </p>
//                   </div>

//                   <div className="space-y-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Pickup Location *
//                       </label>
//                       <Select
//                         onValueChange={(value) =>
//                           handleSelectChange("fromLocation", value)
//                         }
//                         disabled={addressesLoading}
//                       >
//                         <SelectTrigger
//                           className={`w-full h-12 ${
//                             errors.fromLocation ? "border-red-500" : ""
//                           }`}
//                         >
//                           <SelectValue
//                             placeholder={
//                               addressesLoading
//                                 ? "Loading addresses..."
//                                 : "Select pickup location"
//                             }
//                           />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {addressesLoading ? (
//                             <SelectItem value="loading" disabled>
//                               Loading addresses...
//                             </SelectItem>
//                           ) : addresses.length > 0 ? (
//                             addresses.map((address, index) => (
//                               <SelectItem
//                                 key={address.id || `address-${index}`}
//                                 value={address.name}
//                               >
//                                 {address.name}
//                                 {address.description && (
//                                   <span className="text-sm text-gray-500 block">
//                                     {address.description}
//                                   </span>
//                                 )}
//                               </SelectItem>
//                             ))
//                           ) : (
//                             <SelectItem value="no-addresses" disabled>
//                               No addresses available
//                             </SelectItem>
//                           )}
//                         </SelectContent>
//                       </Select>

//                       {errors.fromLocation && (
//                         <p className="text-red-500 text-sm mt-1">
//                           {errors.fromLocation}
//                         </p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Delivery Location *
//                       </label>
//                       <Select
//                         onValueChange={(value) =>
//                           handleSelectChange("toLocation", value)
//                         }
//                         disabled={addressesLoading}
//                       >
//                         <SelectTrigger
//                           className={`w-full h-12 ${
//                             errors.toLocation ? "border-red-500" : ""
//                           }`}
//                         >
//                           <SelectValue
//                             placeholder={
//                               addressesLoading
//                                 ? "Loading addresses..."
//                                 : "Select delivery location"
//                             }
//                           />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {addressesLoading ? (
//                             <SelectItem value="loading" disabled>
//                               Loading addresses...
//                             </SelectItem>
//                           ) : addresses.length > 0 ? (
//                             addresses.map((address, index) => (
//                               <SelectItem
//                                 key={address.id || `address-to-${index}`}
//                                 value={address.name}
//                               >
//                                 {address.name}
//                                 {address.description && (
//                                   <span className="text-sm text-gray-500 block">
//                                     {address.description}
//                                   </span>
//                                 )}
//                               </SelectItem>
//                             ))
//                           ) : (
//                             <SelectItem value="no-addresses" disabled>
//                               No addresses available
//                             </SelectItem>
//                           )}
//                         </SelectContent>
//                       </Select>
//                       {errors.toLocation && (
//                         <p className="text-red-500 text-sm mt-1">
//                           {errors.toLocation}
//                         </p>
//                       )}
//                     </div>

//                     {addresses.length === 0 && !addressesLoading && (
//                       <button
//                         onClick={refreshAddresses}
//                         className="w-full py-3 px-4 text-sm text-blue-600 hover:text-blue-800 border border-blue-200 hover:border-blue-300 rounded-xl transition-colors flex items-center justify-center gap-2"
//                       >
//                         <RefreshCw className="w-4 h-4" />
//                         Retry Loading Addresses
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Step 4: Order Summary */}
//               {currentStep === 4 && (
//                 <div className="space-y-6 animate-in slide-in-from-right duration-300">
//                   <div className="text-center mb-8">
//                     <CreditCard className="w-16 h-16 text-[#F9CA44] mx-auto mb-4" />
//                     <h3 className="text-2xl font-bold text-gray-800 mb-2">
//                       Order Summary
//                     </h3>
//                     <p className="text-gray-600">
//                       Review your order details before checkout
//                     </p>
//                   </div>

//                   {order ? (
//                     <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl">
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div className="bg-white p-4 rounded-xl">
//                           <p className="text-sm font-medium text-gray-500 mb-1">
//                             Order ID
//                           </p>
//                           <p className="font-semibold text-gray-900">
//                             {order.orderId || "-"}
//                           </p>
//                         </div>
//                         <div className="bg-white p-4 rounded-xl">
//                           <p className="text-sm font-medium text-gray-500 mb-1">
//                             Package Description
//                           </p>
//                           <p className="font-semibold text-gray-900">
//                             {order.descr || "-"}
//                           </p>
//                         </div>
//                         <div className="bg-white p-4 rounded-xl">
//                           <p className="text-sm font-medium text-gray-500 mb-1">
//                             Receiver's Name
//                           </p>
//                           <p className="font-semibold text-gray-900">
//                             {order.receiverName || "-"}
//                           </p>
//                         </div>
//                         <div className="bg-white p-4 rounded-xl">
//                           <p className="text-sm font-medium text-gray-500 mb-1">
//                             Receiver's Phone
//                           </p>
//                           <p className="font-semibold text-gray-900">
//                             {order.receiverPhone || "-"}
//                           </p>
//                         </div>
//                         <div className="bg-white p-4 rounded-xl">
//                           <p className="text-sm font-medium text-gray-500 mb-1">
//                             From Address
//                           </p>
//                           <p className="font-semibold text-gray-900">
//                             {order.address || "-"}
//                           </p>
//                         </div>
//                         <div className="bg-white p-4 rounded-xl">
//                           <p className="text-sm font-medium text-gray-500 mb-1">
//                             To Address
//                           </p>
//                           <p className="font-semibold text-gray-900">
//                             {order.receiversAddress || "-"}
//                           </p>
//                         </div>
//                         <div className="bg-white p-4 rounded-xl">
//                           <p className="text-sm font-medium text-gray-500 mb-1">
//                             Order Status
//                           </p>
//                           <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
//                             {order.status || "Pending"}
//                           </span>
//                         </div>
//                         <div className="bg-white p-4 rounded-xl">
//                           <p className="text-sm font-medium text-gray-500 mb-1">
//                             Total Cost
//                           </p>
//                           <p className="text-2xl font-bold text-green-600">
//                             ₦{order.cost || "0"}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="text-center p-8 bg-gray-50 rounded-2xl">
//                       <p className="text-gray-500">Loading order details...</p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Navigation Footer */}
//             <div className="flex justify-between items-center pt-8 border-t border-gray-200 mt-8">
//               <button
//                 onClick={handlePrevious}
//                 disabled={currentStep === 1}
//                 className="px-6 py-3 flex items-center gap-2 rounded-xl text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent transition-all duration-200 disabled:cursor-not-allowed"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//                 Previous
//               </button>

//               {currentStep < steps.length ? (
//                 <button
//                   onClick={handleNext}
//                   disabled={loading}
//                   className="px-8 py-3 bg-[#F9CA44] hover:bg-[#f0c143] text-white rounded-xl flex items-center gap-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50"
//                 >
//                   {loading ? (
//                     <>
//                       <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
//                       Processing...
//                     </>
//                   ) : (
//                     <>
//                       Next
//                       <ArrowRight className="w-4 h-4" />
//                     </>
//                   )}
//                 </button>
//               ) : (
//                 <button
//                   onClick={handleCheckout}
//                   disabled={loading || !order}
//                   className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl flex items-center gap-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50"
//                 >
//                   {loading ? (
//                     <>
//                       <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
//                       Processing...
//                     </>
//                   ) : (
//                     <>
//                       <CreditCard className="w-4 h-4" />
//                       Checkout Order
//                     </>
//                   )}
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {openModal && (
//         <PaystackBrowserModal
//           isOpen={openModal}
//           onClose={closeModal}
//           paymentUrl={paymentUrl as string}
//           key={reference}
//         />
//       )}
//     </div>
//   );
// };

// export default Stepper;
"use client";
import React, { useState, useEffect } from "react";
import InputField from "../ui/InputField";
import {
  Package,
  User,
  MapPin,
  CreditCard,
  RefreshCw,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Parcel } from "@/interfaces/order.interface";
import { useRouter } from "next/navigation";
import PaystackBrowserModal from "../ui/custom/PaystackBrowserModal";
import { Loader } from "../ui/custom/loader";

interface Address {
  id?: string;
  name: string;
  description?: string;
}

const OrderForm = () => {
  const { accessToken } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const [order, setOrder] = useState<Parcel | null>(null);
  const [reference, setReference] = useState<string | undefined>(undefined);
  const [paymentUrl, setPaymentUrl] = useState<string | undefined>(undefined);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [addressesLoading, setAddressesLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    packageName: "",
    description: "",
    receiverName: "",
    receiverEmail: "",
    receiverPhone: "",
    fromLocation: "",
    toLocation: "",
  });

  const fallbackAddresses: Address[] = [
    { id: "fallback-1", name: "Adankolo" },
    { id: "fallback-2", name: "Army Barracks Area" },
    { id: "fallback-3", name: "Crowther Road" },
    { id: "fallback-4", name: "Crusher" },
    { id: "fallback-5", name: "FUL Axis" },
    { id: "fallback-6", name: "Felele" },
    { id: "fallback-7", name: "GRA" },
    { id: "fallback-8", name: "Gadumo" },
    { id: "fallback-9", name: "Ganaja" },
    { id: "fallback-10", name: "Kabawa" },
    { id: "fallback-11", name: "Kabba Junction" },
    { id: "fallback-12", name: "Kpata" },
    { id: "fallback-13", name: "Lokongoma Phase 2" },
    { id: "fallback-14", name: "Nataco" },
    { id: "fallback-15", name: "New Layout" },
    { id: "fallback-16", name: "Old Market" },
    { id: "fallback-17", name: "Paparanda Square" },
    { id: "fallback-18", name: "Phase 1" },
    { id: "fallback-19", name: "Post Office Area" },
    { id: "fallback-20", name: "Stadium Road" },
    { id: "fallback-21", name: "Zango" },
  ];

  const fetchAddresses = async () => {
    try {
      setAddressesLoading(true);
      const response = await fetch("/api/orders/addresses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        if (Array.isArray(data)) {
          const addressObjects = data.map(
            (addressName: string, index: number) => ({
              id: `address-${index}`,
              name: addressName,
            })
          );
          setAddresses(addressObjects);
        } else {
          console.warn("Unexpected addresses API response structure:", data);
          setAddresses(fallbackAddresses);
        }
      } else {
        toast({
          title: "Warning",
          description:
            data.error ||
            "Failed to fetch addresses. Using fallback locations.",
          variant: "destructive",
        });
        setAddresses(fallbackAddresses);
      }
    } catch (error: any) {
      console.error("Error fetching addresses:", error);
      toast({
        title: "Warning",
        description: "Failed to fetch addresses. Using fallback locations.",
        variant: "destructive",
      });
      setAddresses(fallbackAddresses);
    } finally {
      setAddressesLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchAddresses();
    } else {
      setAddresses(fallbackAddresses);
    }
  }, [accessToken]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.description.trim()) {
      newErrors.description = "Package description is required";
    }
    if (!formData.receiverPhone.trim()) {
      newErrors.receiverPhone = "Receiver's phone number is required";
    }
    if (!formData.fromLocation) {
      newErrors.fromLocation = "Your location is required";
    }
    if (!formData.toLocation) {
      newErrors.toLocation = "Receiver's location is required";
    }
    if (
      formData.fromLocation === formData.toLocation &&
      formData.fromLocation
    ) {
      newErrors.toLocation =
        "Pickup and delivery locations must be different";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleVerifyPayment = async () => {
    try {
      setLoading(true);

      if (!reference) {
        toast({
          title: "Error",
          description: "Cannot find reference, are you sure you placed an order?",
        });
        return;
      }

      const response = await fetch(
        `/api/orders/verify_payment?reference=${reference}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Payment verified successfully. Your order is confirmed.",
        });
        router.replace("/user/home");
      } else {
        toast({
          title: "Payment Verification Failed",
          description: data.error || "Please try verifying again.",
          variant: "destructive",
        });
      }
    } catch (e: any) {
      toast({
        title: "Error",
        description: e?.message ? e.message : e,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const closeModal = async () => {
    setOpenModal(false);
    await handleVerifyPayment();
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill out all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Step 1: Create the new order
      const newOrderResponse = await fetch("/api/orders/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          address: formData.fromLocation,
          receiver: {
            name: formData.receiverName,
            phone: formData.receiverPhone,
            address: formData.toLocation,
          },
          descr: formData.description,
        }),
      });

      const orderData = await newOrderResponse.json();

      if (!newOrderResponse.ok) {
        toast({
          title: "Error creating order",
          description: orderData.error || "Cannot complete order",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      setOrder(orderData);

      // Step 2: Checkout the created order
      const checkoutResponse = await fetch(`/api/orders/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          orderId: orderData.orderId,
        }),
      });

      const checkoutData = await checkoutResponse.json();

      if (checkoutResponse.ok) {
        setReference(checkoutData.reference);
        setPaymentUrl(checkoutData.authorization_url);

        if (checkoutData.authorization_url) {
          setOpenModal(true);
        }
      } else {
        toast({
          title: "Checkout Error",
          description: "Cannot generate checkout ID",
          variant: "destructive",
        });
      }
    } catch (e: any) {
      toast({
        title: "Error",
        description: e?.message ? e.message : e,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const refreshAddresses = async () => {
    if (accessToken) {
      await fetchAddresses();
    }
  };

  if (loading && !order) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl my-20">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Create a New Order
            </h2>
            <p className="text-gray-600">
              Fill out the details below to create your delivery order.
            </p>
          </div>

          <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            {/* Package Details Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Package className="w-6 h-6 text-[#F9CA44]" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Package Information
                </h3>
              </div>
              <div className="space-y-4">
                <InputField
                  type="text"
                  name="packageName"
                  placeholder="Package Name (e.g., 'Textbooks')"
                  value={formData.packageName}
                  onChange={handleChange}
                />
                <div>
                  <textarea
                    name="description"
                    placeholder="Package Description *"
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full border p-4 rounded-xl focus:ring-2 focus:ring-[#F9CA44] focus:border-transparent outline-none transition-all resize-none h-24 ${
                      errors.description ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Receiver Details Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <User className="w-6 h-6 text-[#F9CA44]" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Receiver Information
                </h3>
              </div>
              <div className="space-y-4">
                <InputField
                  type="text"
                  name="receiverName"
                  placeholder="Receiver's Name"
                  value={formData.receiverName}
                  onChange={handleChange}
                />
                <InputField
                  type="email"
                  name="receiverEmail"
                  placeholder="Receiver's Email (Optional)"
                  value={formData.receiverEmail}
                  onChange={handleChange}
                />
                <div>
                  <InputField
                    type="tel"
                    name="receiverPhone"
                    placeholder="Receiver's Phone Number *"
                    value={formData.receiverPhone}
                    onChange={handleChange}
                  />
                  {errors.receiverPhone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.receiverPhone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Location Details Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-[#F9CA44]" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Pickup & Delivery
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Location *
                  </label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("fromLocation", value)
                    }
                    disabled={addressesLoading}
                  >
                    <SelectTrigger
                      className={`w-full h-12 ${
                        errors.fromLocation ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue
                        placeholder={
                          addressesLoading
                            ? "Loading addresses..."
                            : "Select pickup location"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {addressesLoading ? (
                        <SelectItem value="loading" disabled>
                          Loading addresses...
                        </SelectItem>
                      ) : addresses.length > 0 ? (
                        addresses.map((address, index) => (
                          <SelectItem
                            key={address.id || `address-${index}`}
                            value={address.name}
                          >
                            {address.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-addresses" disabled>
                          No addresses available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>

                  {errors.fromLocation && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fromLocation}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Location *
                  </label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("toLocation", value)
                    }
                    disabled={addressesLoading}
                  >
                    <SelectTrigger
                      className={`w-full h-12 ${
                        errors.toLocation ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue
                        placeholder={
                          addressesLoading
                            ? "Loading addresses..."
                            : "Select delivery location"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {addressesLoading ? (
                        <SelectItem value="loading" disabled>
                          Loading addresses...
                        </SelectItem>
                      ) : addresses.length > 0 ? (
                        addresses.map((address, index) => (
                          <SelectItem
                            key={address.id || `address-to-${index}`}
                            value={address.name}
                          >
                            {address.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-addresses" disabled>
                          No addresses available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  {errors.toLocation && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.toLocation}
                    </p>
                  )}
                </div>

                {addresses.length === 0 && !addressesLoading && (
                  <button
                    type="button"
                    onClick={refreshAddresses}
                    className="w-full py-3 px-4 text-sm text-blue-600 hover:text-blue-800 border border-blue-200 hover:border-blue-300 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Retry Loading Addresses
                  </button>
                )}
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 bg-[#F9CA44] hover:bg-[#f0c143] text-white rounded-xl flex items-center justify-center gap-2 transition-all duration-200 font-bold shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Checkout Order
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {openModal && (
        <PaystackBrowserModal
          isOpen={openModal}
          onClose={closeModal}
          paymentUrl={paymentUrl as string}
          key={reference}
        />
      )}
    </div>
  );
};

export default OrderForm;