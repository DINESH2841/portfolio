# Portfolio

Static portfolio site for S. Dinesh, built with Tailwind CSS CDN and vanilla JavaScript.

## Preview locally

Use any static server. With Python installed:

```bash
# from repo root
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to GitHub Pages

1) Push this repo to GitHub.
2) Settings → Pages → Source: Deploy from a branch → Branch: `main` → Save.
3) The site will be at `https://<username>.github.io/<repo>/`.

## Use a custom domain (dineshsevinni.me)

This repo includes a `CNAME` file with `dineshsevinni.me`. Do these DNS steps at your domain registrar:

- Apex `@` (root) A records (set both):
	- 185.199.108.153
	- 185.199.109.153
	- 185.199.110.153
	- 185.199.111.153
- Optional AAAA (IPv6) records:
	- 2606:50c0:8000::153
	- 2606:50c0:8001::153
	- 2606:50c0:8002::153
	- 2606:50c0:8003::153
- `www` CNAME → `<username>.github.io` (example: `dinesh2841.github.io`).

Then in GitHub → Repo → Settings → Pages:
- Add `dineshsevinni.me` as the custom domain.
- Check “Enforce HTTPS”. Certificate provisioning may take up to an hour.

Troubleshooting:
- DNS changes can take time (TTL). Use `dig dineshsevinni.me +short` to verify.
- If Pages says “Not yet configured”, remove and re-add the custom domain.
- Ensure no conflicting DNS records exist (like parked/forwarding records).

## Update content

Edit `index.html`:
- Skills in the Skills section
- Certifications cards inside the Certifications section
- Projects auto-load from public GitHub repos of `dinesh2841`

## Dark mode

Theme toggle persists using `localStorage` and respects system preference.
