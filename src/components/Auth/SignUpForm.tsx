"use client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Button from "../ui/custom/button";
import InputField from "../ui/InputField";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "../ui/custom/loader";

const SignUpForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [passwordCriteria, setPasswordCriteria] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    numeric: false,
    specialChar: false,
  });

  const passwordRegex = {
    minLength: /.{6,}/,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    numeric: /\d/,
    specialChar: /[!@#$%^&*(),.?":{}|<>]/,
  };

  const validatePassword = (password: string) => {
    const newCriteria = {
      minLength: passwordRegex.minLength.test(password),
      uppercase: passwordRegex.uppercase.test(password),
      lowercase: passwordRegex.lowercase.test(password),
      numeric: passwordRegex.numeric.test(password),
      specialChar: passwordRegex.specialChar.test(password),
    };

    setPasswordCriteria(newCriteria);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === "password") {
      validatePassword(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      toast({
        title: "Validation Error",
        description: "You have to agree to terms to proceed",
        variant: "destructive",
      });
      return;
    }

    if (Object.values(passwordCriteria).includes(false)) {
      toast({
        title: "Validation Error",
        description: "Password does not meet the required criteria.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { email, password, username } = formData;

      const response = await fetch(`/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
      });

      if (response.ok) {
        localStorage.setItem("v-email-auth", email);
        router.replace("/authentication/verify");
      } else {
        const data = await response.json();
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="p-8 py-12 md:py-6 bg-white rounded-lg w-full md:max-w-lg mx-auto h-auto md:shadow-md">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent mb-2">Let's Get Started</h2>
        <p className="mb-6">Fill in the fields to get started.</p>
        <form
          className="flex flex-col gap-4 w-full mt-7"
          onSubmit={handleSubmit}
        >
          <InputField
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <InputField
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {!Object.values(passwordCriteria).every(Boolean) && (
            <div className="text-sm text-gray-600 mt-1">
              <ul>
                <li
                  className={`${
                    passwordCriteria.minLength
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  At least 6 characters
                </li>
                <li
                  className={`${
                    passwordCriteria.uppercase
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  At least one uppercase letter
                </li>
                <li
                  className={`${
                    passwordCriteria.lowercase
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  At least one lowercase letter
                </li>
                <li
                  className={`${
                    passwordCriteria.numeric ? "text-green-600" : "text-red-600"
                  }`}
                >
                  At least one numeric character
                </li>
                <li
                  className={`${
                    passwordCriteria.specialChar
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  At least one special character
                </li>
              </ul>
            </div>
          )}
          <div className="flex items-center gap-2 my-3">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
            />
            <p className="text-sm">
              I agree to the Terms and Conditions & Privacy Policy
            </p>
          </div>
          <div className="mb-[50px] md:mb-2" />
          <Button label="Proceed" />
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/authentication/signin" className="text-yellow-400">
            Sign In
          </a>
        </p>
      </div>
    </>
  );
};

export default SignUpForm;
