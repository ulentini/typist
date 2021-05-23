import { useState, useRef, useEffect } from "react"

export function useInterval(
  callback: () => void,
  timeInterval: number,
): () => void {
  const savedCallback = useRef<() => void>()
  const [stopInterval, setStopInterval] = useState<() => void>(() => () => {})

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current()
    }

    const id = setInterval(tick, timeInterval)
    const stopInterval = () => {
      clearInterval(id)
    }
    setStopInterval(() => stopInterval)
    return stopInterval
  }, [timeInterval])

  return stopInterval
}

export function useTimer(second: number): {
  timer: number
  running: boolean
  ended: boolean
  start: () => void
  stop: () => void
} {
  const [running, setRunning] = useState(false)
  const [ended, setEnded] = useState(false)
  const [endTime, setEndTime] = useState(0)
  const [timer, setTimer] = useState(second)

  function tick() {
    if (running) {
      const newTimer = Math.round((endTime - new Date().getTime()) / 1000)
      if (newTimer <= 0) {
        stop()
      }
      setTimer(newTimer)
    }
  }

  const stopTimer = useInterval(tick, 1000)

  function stop() {
    setRunning(false)
    setEnded(true)
    stopTimer()
  }

  function start() {
    setRunning(true)
    setEndTime(new Date().getTime() + second * 1000)
  }

  return {
    timer,
    running,
    ended,
    start,
    stop,
  }
}
