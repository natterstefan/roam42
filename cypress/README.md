# Cypress

Roam42 features can be tested with Cypress. Make sure you set up `cypress.json`
to point to your test graph and then run the tests with `yarn cypress:open`
or `yarn cypress:run`.

## Environment

Before you run Cypress make sure you added the following variables to the `.env`
in the root folder:

```bash
CYPRESS_BASE_URL=""
CYPRESS_EMAIL=""
CYPRESS_PASSWORD=""
```

## Links

- [Testing Your App](https://docs.cypress.io/guides/getting-started/testing-your-app)
- [Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Cypress - TypeScript Deep Dive](https://basarat.gitbook.io/typescript/intro-1/cypress)
- [IDE Integration](https://docs.cypress.io/guides/tooling/IDE-integration#Visual-Studio-Code)
