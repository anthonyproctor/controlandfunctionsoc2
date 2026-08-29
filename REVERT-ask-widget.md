# Removing the ask widget

Built 2026-08-29. Designed to come out cleanly if it does not earn its place.

## Fastest kill, no deploy of the site needed

Delete the Vercel project `cf-ask-endpoint`. The widget then fails its fetch and
shows the mailto fallback. Ugly but harmless.

## Proper removal, about one minute

1. Delete the four script tags:
   ```
   grep -rn "assets/ask.js" *.html
   ```
   One line each in `index.html`, `edtech.html`, `cuecs.html`, `privacy.html`.
2. Delete `assets/ask.js`.
3. Commit and push. GitHub Pages redeploys on its own.

## Turn it off without deleting anything

Set `ENABLED = false` at the top of `assets/ask.js` and push. The file still
loads and does nothing.

## Full git revert

The widget landed in a single isolated commit, so:

```
git log --oneline --grep="ask widget"
git revert <sha>
```

## What it touches

Nothing else depends on it. No CSS (all styling is inline, deliberately, so a
missing Tailwind class cannot break it). No build step. No third party script,
no cookie, no storage, no tracker. The endpoint lives in its own Vercel project
and never touches the client portal.
