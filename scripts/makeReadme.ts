const dataURL = "https://profile-supporters.vercel.app/api/getJSON"
const replaceRegex = /# Supporters\n\n(.*)/ms

interface Leaderboard {
    name: string
    stars: number
    avatar: string
}

const response = await fetch(dataURL)
const data: Leaderboard[] = await response.json()

let table = `|No.|PFP|Username|Stars|No.|PFP|Username|Stars|
|-|-|-|-|-|-|-|-|`

const avatarFrom = (name: string, url: string) =>
    `<img src="${url}" alt="GitHub Avatar of ${name}" width="50" height="50"></img>`

const userLinkFrom = (name: string) => `<a href="https://github.com/${name}">${name}</a>`

const dataset1 = data.slice(0, 10)
const dataset2 = data.slice(10, 20)

for (let i = 0; i < 10; i++) {
    const { name: name1, stars: stars1, avatar: avatar1 } = dataset1[i]
    const { name: name2, stars: stars2, avatar: avatar2 } = dataset2[i]
    table += `\n|${i + 1}.|${avatarFrom(name1, avatar1)}|${userLinkFrom(name1)}|${stars1} ★|`
        + `${i + 11}.|${avatarFrom(name2, avatar2)}|${userLinkFrom(name2)}|${stars2} ★|`
}

const README = Deno.readTextFileSync("README.md")
const changedREADME = README.replace(README.match(replaceRegex)![1], table)

Deno.writeTextFileSync("README.md", changedREADME)

export {}
