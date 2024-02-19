---
entry-num: 3
title: Moving to Content Collections
created: 2024-02-18
last-updated: 2024-02-19
---

Just a quick update. I managed to pretty easily migrate from a hand-rolled content reading system to [Astro Content Collections](https://docs.astro.build/en/guides/content-collections). My original folder structure and logic mapped almost perfectly to the new scheme so all I really needed to do was take satisfaction in deleting a few lines of regex and an extraneous config file.

The crux of the work boiled down to collating the two types of "project content" I have: project indices (a project's "main body"), and entries (the numbered subsections).

This was mainly so I could avoid redefining project-level-metadata in every log entry like the project's name and related image. It's just a lazy implementation right now; they're grouped by folder so I split Astro's built-in content `id` key with `"/"` to rip out the common folder name and group with that.

What actually convinced me to _do_ the migration was the Zod frontmatter validation. I expected more content types to pile up over time and managing all of them with typeguards sounded kind of nightmarish. Zod makes it easy. I've only fully adopted Zod recently but now that I'm looking it seems to be everywhere. Here's to hoping this honeymoon phase fades into a healthy relationship.

Project content types are easy enough with Zod's `discriminatedUnion`. I ended up discriminating an `isIndex` key on values `true` and `undefined` to mimic optionality. That way I can just omit `isIndex` in my project entry files.

I would've liked to allow an explicit `isIndex === false`, but unfortunately from what I can tell `discriminatedUnion` doesn't support discriminating states where the key allows for more than one value, i.e. things like `discriminator: z.literal(false).optional()` won't work without adding a duplicate schema entry for both `z.literal(false)` and `z.undefined()`. I'm sure there's some performance reason for this (or I'm just missing something) but the mild inconvenience stuck out in what has been an otherwise very ergonomic library. It's a minor gripe.

With this I'm calling the pathsweeping work for the garage page officially over, and that the (slightly procrastinated) writing part can proceed at full speed.
