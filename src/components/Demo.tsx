'use client'

import Header from "./Header";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function Demo() {
    return (
        <>
            <Header />
            <div className="w-full min-h-screen flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 p-4 md:p-10 lg:p-20">
                    <img
                        className="rounded-[10px] w-full h-auto"
                        src="https://images.ctfassets.net/r6vlh4dr9f5y/IXzQqiardgxqUGps4MnCv/49b2cb94f4d8cdfe1c48cc6dbaad5acf/Contact_Sales_Mobile___1.jpg?fm=webp&fit=fill&f=center&w=1248&h=1472"
                        alt="Contact Sales"
                        width={624}
                        height={736}
                    />
                </div>
                <div className="w-full md:w-1/2 p-4 md:p-10 lg:p-20">
                    <h1 className="font-anzo font-bold text-2xl md:text-3xl lg:text-4xl mb-2">Let's Connect</h1>
                    <p className="font-anzo text-sm md:text-base mb-6">
                        We're here to help you find the right products for your business. Tell us a bit about yourself, and we'll be in touch.
                    </p>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="businessEmail" className="block text-sm font-bold mb-1">Business E-mail</label>
                            <Input id="businessEmail" className="rounded-[7px] w-full" />
                        </div>
                        <div>
                            <label htmlFor="interestedSolution" className="block text-sm font-bold mb-1">I am Interested in Solution for</label>
                            <Input id="interestedSolution" className="rounded-[7px] w-full" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-bold mb-1">Message</label>
                            <Textarea id="message" className="rounded-[7px] w-full" />
                        </div>
                        <div className="flex items-start space-x-2">
                            <Checkbox id="terms" className="mt-1" />
                            <label htmlFor="terms" className="text-xs">
                                Agree to the <span className="text-indigo-500">privacy policy</span> and to Dialpad using my contact details to get in touch to share marketing tips, other content, and the latest offers.
                            </label>
                        </div>
                        <Button size="sm" className='w-full sm:w-auto rounded-full py-2 px-4 hover:text-white hover:bg-black text-xs bg-indigo-600 text-white'>
                            Submit
                        </Button>
                    </form>
                </div>
            </div>

            <div className="w-full bg-indigo-600 py-10 px-4 md:py-14 md:px-10">
                <div className="text-center text-white">
                    <h2 className="text-xl md:text-2xl font-bold font-anzo">Get Started</h2>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl mt-4 font-bold font-anzo">Try Dialpad free for 14 days</h1>
                    <p className="text-sm md:text-base mt-3 max-w-2xl mx-auto">
                        See why thousands of teams big and small stay connected with Dialpad.
                    </p>
                    <Button size="sm" className='mt-6 rounded-full py-2 px-4 border-2 border-white hover:border-black hover:text-black hover:bg-white text-xs bg-black text-white'>
                        Get Started
                    </Button>
                </div>
            </div>
        </>
    )
}

