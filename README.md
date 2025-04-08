# City AI Connect (Govex)

This represents the public face of the City AI Connect project from JHU's GovEx Group.  

Technology: Next.js

Contet management is internal to the application in JSON.

## PNPM vs. NPM

We have migrated to using PNPM as the package manager for the `web` and `storybook` apps, and continue to use npm for the `cms`. This README provides an overview of the changes, benefits, and instructions for working with PNPM in the monorepo.

### Why PNPM?

PNPM is a fast, disk-space-efficient package manager for JavaScript and Node.js projects. It offers several advantages over traditional package managers like npm and yarn, especially in the context of monorepos:

1. **Single Node Modules Store**: PNPM creates a single node_modules store at the root of the monorepo. This means that shared dependencies are stored only once on the disk, significantly reducing disk space usage compared to traditional package managers.

2. **Faster Installation**: Since PNPM reuses dependencies from the shared store, installation times are typically faster compared to npm and yarn, especially in large monorepo projects with many shared dependencies.

3. **Version Conflicts Handling**: PNPM uses a smart algorithm to handle version conflicts, ensuring that each package gets the compatible version it needs, without duplication.

4. **Deterministic**: PNPM creates a lockfile that guarantees deterministic installations, making it easier to reproduce builds and maintain consistency across different development environments.

5. **Support for Workspaces**: PNPM provides native support for Yarn workspaces-like setup without the need for additional configuration.

### Getting Started

To start using PNPM in this monorepo, follow these steps:

### Installation

Make sure you have Node.js installed on your system. PNPM comes bundled with Node.js from version 12.16.0 and above.

To install PNPM globally on your system, run the following command:

```bash
npm install -g pnpm
```

Bootstrap the monorepo to install dependencies for all packages:

```bash
pnpm install
```

### Commands

With PNPM installed, you can use it for various package management operations. First, make sure you are in the correct workspace (`web` or `storybook`):

- PNPM supports most npm and yarn commands. For more information, refer to the [PNPM documentation](https://pnpm.io/).

### Continuous Integration (CI) and Deployment

Please ensure that you configure your scripts to use PNPM for installation and other package management tasks.

###Releases are managed by lerna:

-For a stable release, run:
```bash
pnpm run lerna:bump-version:stable
```
-For a beta release, run:
```bash
pnpm run lerna:bump-version:beta
```
###Deployment
The application deploys onto infrastructure on Cloud Web Services and the pipeline is triggered by new tag creation on the main branch. 
