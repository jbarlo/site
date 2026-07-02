_default:
    @just --list

alias i := install

install:
    pnpm install

ci:
    pnpm install --frozen-lockfile

dev:
    pnpm run dev

build:
    pnpm run build

preview:
    pnpm run preview
