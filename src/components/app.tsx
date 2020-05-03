import React, { FC } from "react"
import "../css/tailwind.css"
import { Typist } from "./typist"
import { generateText } from "../lib/text-generator"

const App: FC<{}> = () => {
  const content = generateText(200)

  return (
    <div className="bg-gray-200 h-screen text-gray-700 flex items-center justify-center">
      <div className="w-2/3">
        <h1 className="text-5xl text-indigo-500 -mt-10 font-mono mb-6">
          Typist
        </h1>
        <Typist content={content} />
      </div>
    </div>
  )
}

export default App
