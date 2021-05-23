import React, { useCallback, useEffect, useRef, useState } from "react"
import { calculateTextWPM } from "../lib/calculator"
import { useInterval, useTimer } from "../lib/use-timer"
import { useTypingBuffer } from "../lib/use-typing-buffer"
import { Word } from "./word"

const scrollToRef = (
  container: React.MutableRefObject<HTMLElement | null>,
  ref: React.MutableRefObject<HTMLElement | null>,
) => {
  ref.current &&
    container.current &&
    container.current.scrollTo(
      0,
      ref.current.offsetTop - container.current.offsetTop,
    )
}

const TOTAL_TIME = 60

export const Typist: React.FC<{
  content: string
}> = ({ content }) => {
  let counter = 0
  const containerRef = useRef<HTMLDivElement>(null)
  const currentWordRef = useRef<HTMLElement>(null)
  const { timer, running, ended, start: startTyping } = useTimer(TOTAL_TIME)
  const [wpm, setWpm] = useState("-")
  const activeBuffer = useTypingBuffer(content.length)
  const [buffer, setBuffer] = useState(activeBuffer)

  const updateWpm = useCallback(() => {
    if (running) {
      setWpm(calculateTextWPM(content, buffer, TOTAL_TIME - timer).toFixed(0))
    }
  }, [setWpm, buffer, content, running, timer])

  useEffect(() => {
    if (!ended) {
      setBuffer(activeBuffer)
    }
  }, [activeBuffer, ended])

  useEffect(() => {
    scrollToRef(containerRef, currentWordRef)
    if (buffer?.length > 0 && !running) {
      startTyping()
    }
  }, [buffer, running, startTyping])

  const stopWpmInterval = useInterval(() => {
    updateWpm()
  }, 3000)

  useEffect(() => {
    if (ended) {
      updateWpm()
      stopWpmInterval()
    }
  }, [ended, stopWpmInterval, updateWpm])

  return (
    <div className="w-full">
      <div className="h-12 flex items-center justify-between">
        <div className="rounded bg-gray-100 text-blue-400 px-2 py-1 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>

          <span className="text-2xl font-mono ml-2 leading-none">{timer}</span>
        </div>

        <div
          className={`rounded bg-gray-100 ${
            ended ? "text-green-600" : "text-gray-600"
          } text-lg px-2 py-1`}
        >
          {wpm} wpm
        </div>
      </div>
      <div
        className="font-mono text-3xl text-gray-700 overflow-hidden h-32"
        ref={containerRef}
      >
        {content.split(" ").map((word, i) => {
          const currentBuffer = buffer.substring(
            counter,
            counter + word.length + 1,
          )
          const typed = counter <= buffer.length
          counter += word.length + 1
          const active = typed && counter > buffer.length
          return (
            <Word
              elementRef={active ? currentWordRef : undefined}
              key={`w-${i}`}
              content={word + " "}
              typed={typed}
              active={active}
              buffer={currentBuffer}
            />
          )
        })}
      </div>
    </div>
  )
}
