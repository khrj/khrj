const dataURL = "https://profile.khushrajrathod.com/api/getJSON"

const response = await fetch(dataURL)
const data = await response.json()

console.log(data)

export {}
