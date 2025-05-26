import SignInForm from '@/components/Auth/SignInForm'
import React from 'react'

const index = () => {
  return (
    <div className="h-full md:min-h-screen grid place-items-center bg-gradient-to-tl from-yellow-200 via-yellow-100 to-white">
      <SignInForm />
    </div>
  )
}

export default index

