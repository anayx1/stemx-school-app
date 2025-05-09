import Image from "next/image"
import { Login } from "@/components/Login"

export default function SignInPage() {

  return (
    <div className="flex min-h-screen items-center justify-center flex-col md:flex-row bg-[url(/bg2.png)] bg-cover bg-center relative z-10">
      <div className="absolute inset-0 bg-black/20 z-0">

      </div>
      {/* Image container with fixed height and width */}
      <div className="relative hidden w-full md:block md:w-1/2 md:h-screen">
        <Image
          src="/loginpage/login-image.jpg"
          alt="Computer hardware"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <Login />
      </div>
    </div>
  )
}