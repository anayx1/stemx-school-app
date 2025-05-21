"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { HelpCircle, MessageSquare, Phone, Mail } from "lucide-react"

export default function HelpSupport() {
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would send this message to your backend
    console.log("Support message:", message)
    setSubmitted(true)
    setMessage("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Help & Support</h2>
        <p className="text-gray-500">Get assistance with your account or studies</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>Find quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                <AccordionContent>
                  Click on the "Forgot Password" link on the login page and follow the instructions sent to your email.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How can I improve my quiz scores?</AccordionTrigger>
                <AccordionContent>
                  Review your incorrect answers, use the study materials provided, and practice regularly with sample
                  quizzes.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I retake a quiz?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can retake quizzes after a 24-hour waiting period. Your highest score will be recorded.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How do I update my profile information?</AccordionTrigger>
                <AccordionContent>
                  Click on the "Edit Profile" button on your profile page to update your information.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Contact Support
            </CardTitle>
            <CardDescription>We're here to help with any issues</CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="text-center py-8">
                <h3 className="text-lg font-medium text-green-600">Message Sent!</h3>
                <p className="text-gray-500 mt-2">We'll get back to you within 24 hours</p>
                <Button variant="outline" className="mt-4" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                      Subject
                    </label>
                    <Input id="subject" placeholder="What do you need help with?" required />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Describe your issue in detail..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full mt-4">
                  Send Message
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="border-t pt-4 flex flex-col items-start">
            <p className="text-sm font-medium mb-2">Other ways to reach us:</p>
            <div className="space-y-2 w-full">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>support@studentportal.com</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
