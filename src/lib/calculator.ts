export function calculateWPM(
  typedCharacters: number,
  timeInSeconds: number,
): number {
  return (typedCharacters / timeInSeconds) * 60
}

export function calculateTextWPM(
  originalContent: string,
  typedContent: string,
  timeInSeconds: number,
): number {
  if (timeInSeconds === 0) {
    return 0
  }

  if (originalContent.length < typedContent.length) {
    throw new Error("Typed content cannot be longer than original content")
  }

  let contentToCheck = originalContent
  if (originalContent.length > typedContent.length) {
    contentToCheck = originalContent.substring(0, typedContent.length)
  }

  const correctTyped = contentToCheck
    .split("")
    .reduce((a, l, i) => a + (l === typedContent[i] ? 1 : 0), 0)

  return Math.round(((correctTyped / 5) * 60) / timeInSeconds)
}
