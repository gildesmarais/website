## Getting started

```sh
make serve
make fix
make build
```

## Deployment

Vercel. Login via email: `g*@*s.de`

https://vercel.com/gils-projects-950b2ab6/website

## Resources

- site generator: https://docs.astro.build/
- css: https://picocss.com/docs

## TODOs:

- [ ] migrate remaining contents
- [ ] do an iteration on the content (see conversations, notes, this will be crucial)
- [ ] improve/update resume (open PRs!)
- [x] hide old or "short blog posts" and by default only valuable ones (keep them for SEO, maybe not link)
- [x] create an about page which allows people to connect " with my structured/rational thinking
- [ ] resume: add print button (javascript onclick print) and make resume look good in pdf (css!), hide some bullet points when printed, custom print-message to recruiters?
- [x] configurable robots/noindex per page

- [x] Cut (from home): movie ratings, tag cloud vibe, hobby list (move to About).

- [x] migrate the ratings data (all, not just a subset)
- [x] implement https://gil.desmarais.de/ratings/recommendations/
- [ ] check redirects work as intended
- [ ] setup vercel deployment (hybrid, set api key via env secret)
- [x] setup vercel speed insights: https://vercel.com/gils-projects-950b2ab6/website/speed-insights && `npm i @vercel/speed-insights`
- [ ] SEO: each page title+description.
