.PHONY: build
build: build-esm build-bundle-global build-types

.PHONY: setup
setup:
	bun install --no-save

.PHONY: build-esm
build-esm: setup
	bun run script/build-esm.ts

.PHONY: build-bundle-global
build-bundle-global: setup
	bun run script/build-bundle-global.ts

.PHONY: build-types
build-types: setup
	bun x tsc --project ./.config/types.tsconfig.json

.PHONY: build-site
build-site: setup
	bun run script/build-site.ts

.PHONY: dev
dev: setup
	bun run script/dev.ts

.PHONY: clean
clean:
	rm -rf ./.cache ./dist

.PHONY: prepublishOnly
prepublishOnly: test clean build

.PHONY: deploy
deploy: clean build-site
	bunx @cubing/deploy

.PHONY: test
test: check-dependency-constraints

.PHONY: check-dependency-constraints
check-dependency-constraints:
	bun run ./script/check-dependency-constraints.ts

.PHONY: lint
lint: lint-biome lint-tsc

.PHONY: lint-biome
lint-biome: setup
	bun x @biomejs/biome check

.PHONY: lint-tsc
lint-tsc: setup
	bun x tsc --project tsconfig.json

.PHONY: format
format: setup
	bun x @biomejs/biome check --write

.PHONY: publish
publish: setup
	npm publish

.PHONY: reset
reset: clean
	rm -rf ./node_modules
