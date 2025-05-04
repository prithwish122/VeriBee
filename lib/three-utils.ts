// Helper functions for Three.js animations and effects
export function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function randomColor(baseColor: number, variance = 0.2): number {
  // Convert to hex string
  const hexColor = baseColor.toString(16).padStart(6, "0")

  // Extract RGB components
  const r = Number.parseInt(hexColor.slice(0, 2), 16) / 255
  const g = Number.parseInt(hexColor.slice(2, 4), 16) / 255
  const b = Number.parseInt(hexColor.slice(4, 6), 16) / 255

  // Add variance
  const newR = Math.min(1, Math.max(0, r + (Math.random() - 0.5) * variance))
  const newG = Math.min(1, Math.max(0, g + (Math.random() - 0.5) * variance))
  const newB = Math.min(1, Math.max(0, b + (Math.random() - 0.5) * variance))

  // Convert back to hex
  const newHexR = Math.floor(newR * 255)
    .toString(16)
    .padStart(2, "0")
  const newHexG = Math.floor(newG * 255)
    .toString(16)
    .padStart(2, "0")
  const newHexB = Math.floor(newB * 255)
    .toString(16)
    .padStart(2, "0")

  return Number.parseInt(newHexR + newHexG + newHexB, 16)
}
