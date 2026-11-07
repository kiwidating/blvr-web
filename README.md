<!-- Generated from private documentation source. Do not edit directly. Source SHA256: 8b59a1a61e567225038b3263c82ed45060efb935e59891167a5f9348eea3a03c -->

# Blvr website

Static Astro splash page for [Blvr](https://info.blvr.app). Open the dating app at [blvr.app](https://blvr.app), or [join its waitlist](https://blvr.app/signin/waitlist).

## Assets

The decorative portrait is a bundled [Unsplash](https://unsplash.com/) photo also used by the Blvr development app. It illustrates the product, not a real member profile. Fredoka and Nunito are self-hosted under their SIL Open Font Licenses, included in `public/fonts/`.

## Development

Development setup requires Mise and host Python 3.11 or newer on Unix, or Python 3.13 or newer on Windows, before `mise run setup`. These prerequisites apply to local development.

Run `mise run setup` once to prepare the pinned tools and frozen dependencies. `mise run check` type-checks, builds and verifies the static output; `mise run test` verifies an existing build. `mise run dev` starts the foreground development server; stop it with Ctrl-C. Build and test tasks require prepared tools and do not install dependencies.
