import words from "../assets/words"

export function generateText(totalWords: number) {
  return new Array(totalWords)
    .fill(0)
    .map(() => {
      return words[Math.round(Math.random() * words.length)]
    })
    .filter(Boolean)
    .join(" ")
}
