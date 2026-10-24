<!-- Generated from private documentation source. Do not edit directly. Source SHA256: 5c48060ca14b49e0ce5b1b5b0183769892f60adc9b629d2f1d4a63eb8d7a4402 -->

# Blvr website

Static Astro splash page for [Blvr](https://info.blvr.app). Open the dating app at [blvr.app](https://blvr.app), or [join its waitlist](https://blvr.app/signin/waitlist).

## Development

Use the Bun and Node versions pinned in `.mise.toml`.

```sh
mise install
mise exec -- make install
mise exec -- make check
mise exec -- make dev
```

`make check` type-checks, builds and validates the static output. `make test` checks an existing build. `bun run preview` previews `dist/`; stop the foreground server with Ctrl-C. `make clean` removes generated output.

The site ships static HTML and CSS with no client JavaScript. CI runs the same build and output checks. The application link goes to the separate Blvr app.

## Assets

The decorative portrait is a bundled [Unsplash](https://unsplash.com/) photo also used by the Blvr development app. It illustrates the product, not a real member profile. Fredoka and Nunito are self-hosted under their SIL Open Font Licenses, included in `public/fonts/`.
