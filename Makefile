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
	npx tsc -p tsconfig.json

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
prepack: clean test

.PHONY: deploy
deploy: clean build-site
	bunx @cubing/deploy
