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

lint:
    pnpm run lint

fmt:
    pnpm run format

fmt-check:
    pnpm run format:check

preview:
    pnpm run preview
