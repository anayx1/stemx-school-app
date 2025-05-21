"use client"

import { Textarea } from "@/components/ui/textarea"

export default function TextQuestion({ question, value, onChange }) {
  return (
    <div>
      <Textarea
        placeholder="Type your answer here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        className="resize-none"
      />
      {question.maxLength && (
        <div className="text-right text-sm text-gray-500 mt-1">
          {value.length}/{question.maxLength} characters
        </div>
      )}
    </div>
  )
}
