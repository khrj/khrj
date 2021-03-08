const dataURL = "https://profile-supporters.vercel.app/api/getJSON"
const replaceRegex = /# Supporters\n\n(.*)/ms

interface Leaderboard {
    name: string
    stars: number
    avatar: string
}

const response = await fetch(dataURL)
const data: Leaderboard[] = await response.json()

let table = `|No.|PFP|Username|Stars
|-|-|-|-|`

const avatarFrom = (name: string, url: string) =>
    `<img src="${url}" alt="GitHub Avatar of ${name}" width="50" height="50"></img>`

const userLinkFrom = (name: string) => `<a href="https://github.com/${name}">${name}</a>`

for (const [i, { name, stars, avatar }] of data.slice(0, 20).entries()) {
    table += `\n|${i + 1}|${avatarFrom(name, avatar)}|${userLinkFrom(name)}|${stars}|`
}

const README = Deno.readTextFileSync("README.md")
const changedREADME = README.replace(README.match(replaceRegex)![1], table)

Deno.writeTextFileSync("README.md", changedREADME)

export {}
