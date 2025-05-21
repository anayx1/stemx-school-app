"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function MCQQuestion({ question, selectedAnswer, onChange }) {
  if (question.multipleCorrect) {
    // Multiple correct answers (checkboxes)
    return (
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <div key={index} className="flex items-start space-x-3 space-y-0">
            <Checkbox
              id={`option-${question.id}-${index}`}
              checked={(selectedAnswer || []).includes(option.value)}
              onCheckedChange={(checked) => {
                if (checked) {
                  onChange([...(selectedAnswer || []), option.value])
                } else {
                  onChange((selectedAnswer || []).filter((value) => value !== option.value))
                }
              }}
            />
            <Label htmlFor={`option-${question.id}-${index}`} className="font-normal cursor-pointer">
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    )
  } else {
    // Single correct answer (radio buttons)
    return (
      <RadioGroup value={selectedAnswer} onValueChange={onChange} className="space-y-3">
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center space-x-3 space-y-0">
            <RadioGroupItem value={option.value} id={`option-${question.id}-${index}`} />
            <Label htmlFor={`option-${question.id}-${index}`} className="font-normal cursor-pointer">
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    )
  }
}
