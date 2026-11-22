_default:
    @just --list

alias i := install

install:
    pnpm install

ci:
    pnpm install --frozen-lockfile

dev parameters:
    pnpm run dev {{parameters}}

build:
    pnpm run build

lint:
    pnpm run lint

fmt:
    pnpm run format

fmt-check:
    pnpm run format:check

preview:
    pnpm run preview

# latin-1, general punctuation, arrows
font_unicodes := "U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+2010-2027,U+2030-203A,U+20AC,U+2122,U+2190-2193,U+2212"

fonts:
    #!/usr/bin/env sh
    set -eu
    fs=node_modules/@fontsource
    vf=node_modules/@fontsource-variable
    while read -r src out; do
      pyftsubset "$src" --unicodes="{{font_unicodes}}" --layout-features+=tnum,pnum,lnum,onum --flavor=woff2 --output-file="src/fonts/$out.woff2"
    done <<LIST
    $fs/barlow/files/barlow-latin-400-normal.woff2 barlow-400
    $fs/barlow-semi-condensed/files/barlow-semi-condensed-latin-200-italic.woff2 barlow-semi-condensed-200-italic
    $fs/barlow-semi-condensed/files/barlow-semi-condensed-latin-400-normal.woff2 barlow-semi-condensed-400
    $fs/barlow-semi-condensed/files/barlow-semi-condensed-latin-400-italic.woff2 barlow-semi-condensed-400-italic
    $fs/barlow-semi-condensed/files/barlow-semi-condensed-latin-600-normal.woff2 barlow-semi-condensed-600
    $vf/literata/files/literata-latin-wght-normal.woff2 literata
    $vf/literata/files/literata-latin-wght-italic.woff2 literata-italic
    $fs/iosevka-etoile/files/iosevka-etoile-latin-400-normal.woff2 iosevka-etoile-400
    LIST
    du -ch src/fonts/*.woff2
