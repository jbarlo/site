---
entry-num: 3
title: Moving to Content Collections
created: 2024-02-18
last-updated: 2024-02-18
---

Just a quick update. Managed to pretty easily migrate from a hand-rolled content reading system to [Astro Content Collections](https://docs.astro.build/en/guides/content-collections). My original folder structure and logic mapped almost perfectly so all I really needed to do was take satisfaction in deleting a few lines of regex.

Got completely won over by the built-in frontmatter validation using Zod, which I've only fully adopted recently but seems to be _everywhere_ now that I'm looking. I can see why, it definitely beats my previous practice of defining + using typeguards everywhere, anyways.
