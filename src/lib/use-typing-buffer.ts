import useEventListener from "use-typed-event-listener"
import { useState } from "react"

export function useTypingBuffer(maxLenght: number): string {
  const [buffer, setBuffer] = useState("")
  useEventListener(document.body, "keypress", (e) => {
    const charcode = e.charCode
    const char = String.fromCharCode(charcode)
    const newString = buffer + char
    if (newString.length <= maxLenght) {
      setBuffer(newString)
    }
  })

  useEventListener(document.body, "keydown", (e) => {
    if (e.keyCode === 8) {
      setBuffer(buffer.substring(0, buffer.length - 1))
    }
  })

  return buffer
}
