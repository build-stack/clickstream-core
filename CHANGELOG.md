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
