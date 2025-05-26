import ForgetPasswordEmail from "@/components/Auth/ForgotPasswordEmail";
import React from "react";

const page = () => {
  return (
    <div className="h-full md:min-h-screen grid place-items-center bg-gradient-to-tl from-yellow-200 via-yellow-100 to-white">
      <ForgetPasswordEmail />
    </div>
  );
};

export default page;
