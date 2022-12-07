# Experiments with React Microfrontend server side rendering

This monorepo contains my on going exploration of server side rendering microfrontend websites. The goal is a HTML response composed of multiple microfrontends from different servers with hydration to a normal Module Federation SPA setup.

## Getting started
This monorepo uses `yarn@1.x` workspaces and `turborepo`. Please note that `promotions` and `search` servers have a default delay set.

### Commands
- `yarn dev` - Launch all servers with HTTP streaming enabled. Servers restart upon file changes. 
- `yarn dev:static` - Launch all servers with HTTP streaming disabled.
- Prod build commands are WIP