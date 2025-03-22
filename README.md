# Clickstream-Core: Minimum Features

## Core Features

- Event capture (clicks, page views, form submissions) using rrweb package.
- Session management
- User identification/stitching
- Session replay using rrweb
- Automatic data batching
- Configurable sampling rate
- Error tracking/handling
- Consent management

## Technical Implementation

- TypeScript for type safety
- Module-based architecture
- Minimal dependencies
- Compression for payload reduction
- Unit tests using Jest 

## Deployment

This project uses GitHub Actions for CI/CD and semantic versioning for releases. The library is automatically deployed to an AWS S3 bucket upon successful merge to the main branch.

### Continuous Deployment Process

The deployment workflow performs the following steps:
1. Determines the next semantic version based on commit messages
2. Builds the package
3. Uploads the build artifacts to S3 in two folders:
   - `/clickstream-core/{version}/` - Version-specific build
   - `/clickstream-core/latest/` - Latest version
4. Creates a GitHub release with the new version tag
5. Attaches build artifacts to the GitHub release

### GitHub Releases

Each merge to the main branch that results in a version change (based on commit messages) will automatically:
- Create a new GitHub release with the appropriate version number
- Generate release notes from the commit messages
- Attach distribution assets to the release
- Update the CHANGELOG.md file

You can find all releases on the [Releases page](../../releases) of this repository.

### Required GitHub Secrets

To enable the S3 deployment workflow, the following secrets must be configured in your GitHub repository:

- `AWS_ACCESS_KEY_ID`: AWS access key with S3 permissions
- `AWS_SECRET_ACCESS_KEY`: Corresponding AWS secret key
- `S3_BUCKET_NAME`: Name of the S3 bucket to deploy to

### Commit Message Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/) for semantic versioning:

- `fix:` for bug fixes (triggers a PATCH version bump)
- `feat:` for new features (triggers a MINOR version bump)
- `feat!:` or `fix!:` for breaking changes (triggers a MAJOR version bump)
- `chore:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:` for other changes (no version bump)

Example: `feat: add new tracking method for custom events` 
