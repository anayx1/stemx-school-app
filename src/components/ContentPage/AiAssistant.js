"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Send, Bot } from "lucide-react"

export default function AiAssistant({ isOpen, onClose }) {
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content:
                "Hi there! I'm your AI assistant for this course. How can I help you with SQL Injection Attack concepts?",
        },
    ])
    const [input, setInput] = useState("")
    const messagesEndRef = useRef(null)

    // Auto-scroll to bottom of messages
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages, isOpen])

    const handleSendMessage = () => {
        if (input.trim() === "") return

        // Add user message
        setMessages([...messages, { role: "user", content: input }])

        // Clear input
        setInput("")

        // Simulate AI response after a short delay
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: `I'll help you understand more about "${input}". This is a simulated response for the demo. In a real implementation, this would connect to an AI service.`,
                },
            ])
        }, 1000)
    }

    if (!isOpen) return null

    return (
        <Card className="fixed bottom-4 right-4 w-80 md:w-96 h-96 flex flex-col shadow-lg border border-gray-200 z-50">
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b">
                <div className="flex items-center">
                    <Bot className="h-5 w-5 mr-2 text-blue-600" />
                    <h3 className="font-medium">AI Assistant</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
                    <X className="h-4 w-4" />
                </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
                {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                            className={`max-w-[80%] rounded-lg p-3 ${message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                                }`}
                        >
                            {message.content}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t">
                <form
                    className="flex gap-2"
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSendMessage()
                    }}
                >
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about SQL injection..."
                        className="flex-1"
                    />
                    <Button type="submit" size="icon">
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </Card>
    )
}
