import React, { useRef } from "react"

export const Word: React.FC<{
  content: string
  active?: boolean
  typed?: boolean
  buffer?: string
  elementRef?: React.MutableRefObject<HTMLElement | null>
}> = ({ content, active = false, typed = false, buffer, elementRef }) => {
  if (!typed) {
    return (
      <span className="inline-block">
        {content.split("").map((letter, i) => (
          <span
            key={`l-${i}`}
            className={`inline-block w-4-5 h-10 align-middle`}
          >
            {letter}
          </span>
        ))}
      </span>
    )
  }

  const cursorIndex = buffer?.length || 0

  return (
    <span className="inline-block" ref={elementRef}>
      {content.split("").map((letter, i) => {
        let className
        if (cursorIndex === i && active) {
          className = "border-b-2 border-blue-600"
        } else if (cursorIndex > i || (cursorIndex === i && !active)) {
          if (buffer && buffer[i] === content[i]) {
            className = "rounded bg-green-200 text-green-800"
          } else {
            className = "rounded bg-red-200 text-red-800"
          }
        }
        return (
          <span
            key={`l-${i}`}
            className={`inline-block ${className} w-4-5 h-10 align-middle`}
          >
            {letter}
          </span>
        )
      })}
    </span>
  )
}
