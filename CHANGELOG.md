# [1.3.0](https://github.com/build-stack/clickstream-core/compare/v1.2.1...v1.3.0) (2025-04-29)


### Features

* add React example application with Clickstream Tracker integration, including routing, form handling, and Tailwind CSS styling ([4ab2e9d](https://github.com/build-stack/clickstream-core/commit/4ab2e9d9df60cf19e05ada6921eed067a2db3ac8))
* update Clickstream to version 1.2.0 with lz-string compression and production mode configuration ([d65ef8d](https://github.com/build-stack/clickstream-core/commit/d65ef8d71bdb0fe9a6341a48b3dabd1542eb06da))

## [1.2.1](https://github.com/build-stack/clickstream-core/compare/v1.2.0...v1.2.1) (2025-04-12)


### Bug Fixes

* implement session management with getOrCreateSessionId method in ClickstreamTracker ([d4afdbc](https://github.com/build-stack/clickstream-core/commit/d4afdbcc6af5997894f3b68ec79845299a678a5a))

# [1.2.0](https://github.com/build-stack/clickstream-core/compare/v1.1.0...v1.2.0) (2025-04-12)


### Features

* add environmentId support to ClickstreamTracker for enhanced event tracking ([00fec1a](https://github.com/build-stack/clickstream-core/commit/00fec1a7dad47f6c6131c1a33a03ab372bad957e))

# [1.1.0](https://github.com/build-stack/clickstream-core/compare/v1.0.0...v1.1.0) (2025-04-12)


### Features

* update ClickstreamTracker to support remote event flushing and session management ([c714050](https://github.com/build-stack/clickstream-core/commit/c71405008c6c413d054555900ace3f3e91d69ee4))

# 1.0.0 (2025-03-22)


### Features

* enhance S3 deployment workflow with semantic-release integration and dynamic .releaserc.json creation ([9e0d9c8](https://github.com/build-stack/clickstream-core/commit/9e0d9c81f93d901563ec2fe8c8b33686b130c100))
* initial commit ([a0a5833](https://github.com/build-stack/clickstream-core/commit/a0a5833e6392089489403eba4011bfc77fb21539))

# 1.0.0 (2025-03-22)


### Features

* enhance S3 deployment workflow with semantic-release integration and dynamic .releaserc.json creation ([9e0d9c8](https://github.com/build-stack/clickstream-core/commit/9e0d9c81f93d901563ec2fe8c8b33686b130c100))
* initial commit ([a0a5833](https://github.com/build-stack/clickstream-core/commit/a0a5833e6392089489403eba4011bfc77fb21539))

## [1.0.1](https://github.com/build-stack/clickstream-core/compare/v1.0.0...v1.0.1) (2025-03-22)


### Bug Fixes

* test the release pipeline ([c85cc5e](https://github.com/build-stack/clickstream-core/commit/c85cc5e5d3153e8ea2783a9b6b029f04019bd150))

# 1.0.0 (2025-03-22)


### Bug Fixes

* Add semantic release configuration and deployment workflow to S3 ([#2](https://github.com/build-stack/clickstream-core/issues/2)) ([ac55c37](https://github.com/build-stack/clickstream-core/commit/ac55c37d83db44c81fe2ae9d900ad04e4dde64ba))
* downgrade semantic-release and related plugins in deploy-to-s3.yml for compatibility ([954cf96](https://github.com/build-stack/clickstream-core/commit/954cf96534d732835b3bdd6699fee9e6a47df4b8))
* enhance deployment workflow to handle semantic-release version detection ([41a48f4](https://github.com/build-stack/clickstream-core/commit/41a48f4c2f662ebbea0e9fb3d52f4565e58555a4))
* Merge pull request [#5](https://github.com/build-stack/clickstream-core/issues/5) from build-stack/fix/correct-aws-region ([af3e988](https://github.com/build-stack/clickstream-core/commit/af3e988374c93463282b822b32720b8c4ab1e1fc))
* refactor .releaserc.json creation in deploy-to-s3.yml to use echo commands for improved readability and maintainability ([c2aa339](https://github.com/build-stack/clickstream-core/commit/c2aa33999a779bcc71d7a5e27aa9dfc0634dfdeb))
* update .releaserc.json creation in deployment workflow to remove single quotes for EOF marker ([ba12b89](https://github.com/build-stack/clickstream-core/commit/ba12b8901887e10b2f29e0114ad88abe33830c83))
* Update AWS region configuration in deploy-to-s3.yml to use secret variable for improved flexibility ([dde0558](https://github.com/build-stack/clickstream-core/commit/dde05586ea9d9c2f95930cf1aea69ba05cafe64a))
* update environment variable handling in deploy-to-s3.yml for semantic-release configuration ([234ca6f](https://github.com/build-stack/clickstream-core/commit/234ca6f45b64136ca4a49e894b4ebde3d72a1675))
* update GitHub token reference in deployment workflow ([834215e](https://github.com/build-stack/clickstream-core/commit/834215eb4288af7684e6ccd3ac49261d3fcaf296))
* update semantic-release configuration and dependencies in deployment workflow ([e93a960](https://github.com/build-stack/clickstream-core/commit/e93a960146d6cb2ecdb158e875fb7dda77556ab4))


### Features

* initial release of clickstream tracking functionality ([6415994](https://github.com/build-stack/clickstream-core/commit/641599423ed7620e263741665cf42f0fd8dc7d2c))
