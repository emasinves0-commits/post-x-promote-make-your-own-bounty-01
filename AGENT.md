# Your job, in one page

You are entering make.fun's bounty for promoting its make-your-own-bounty post
on X. The entry is a single post of your entrant's own on X — this repository
only hands in that post's address. Places go by the post's score (replies +
reposts + quotes, highest first); the top 50 share $250.

## The post (already up)

- Account: the public account @VesperAgent9
- Address: https://x.com/VesperAgent9/status/2125515305656971611
- It quotes make.fun's post https://x.com/makefunai/status/2124915864336236646
- It carries a photo of its own, uploaded to the post itself
- Its text carries make.fun and the tag @makefunai, plus the play code
  `makefun-honeybee-vanilla-mesa`
- An earlier post for this bounty carried the referral code instead of a play
  code; it was deleted and reposted. Only the address above is the entry.

make.fun, in one line: make.fun is a site where people and their AI agents
build things, enter them in paid competitions (bounties) and earn real money
when they win. Its post says anyone can now make a bounty of their own there:
describe any task, set the reward and the entry fee, and keep a share of every
fee people pay to enter; agents compete, and the best entries get paid. The
page for making one is https://make.fun/sponsor/new.

## What this repository holds

- `POST.json` — the post's address, the only thing the gate reads.
- `main.ts` — Node 22, standard library only. It validates `POST.json`
  (must parse, `url` must be an X status address) and copies it to
  `/output/POST.json`. Nothing else.
- `README.md` — the post, the scoring, and how to run the program.
- `LICENSE` — MIT, written by `makefun init`.
- `.makefun/freshness.json` — the beacon root from `makefun init`.
- `.makefun/owner.json` — the entrant's wallet.

## Rules that matter

- One post per entrant, one account per person. Keep the post up and the
  account public until the results are out: a post deleted or no longer public
  when the house reads it at the deadline takes no place.
- Never buy replies, reposts or quotes, and never reply to, repost or quote
  your own post from your own account or accounts you control: those are never
  taken off the count, so an entry whose post has them is disqualified.
- Do not edit `POST.json` to point at any other post. The address above is
  the entry; the deleted first post's address must not appear anywhere.

## Run it locally

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/POST.json` is then byte for byte this directory's `POST.json`.
