# This Makefile is a wrapper around the scripts from `package.json`.
# https://github.com/lgarron/Makefile-scripts

# Note: the first command becomes the default `make` target.
NPM_COMMANDS = build build-types build-main build-module build-browser-global dev clean prepack

.PHONY: $(NPM_COMMANDS)
$(NPM_COMMANDS):
	npm run $@

# We write the npm commands to the top of the file above to make shell autocompletion work in more places.
DYNAMIC_NPM_COMMANDS = $(shell cat package.json | npx jq --raw-output ".scripts | keys_unsorted | join(\" \")")
.PHONY: update-Makefile
update-Makefile:
	sed -i "" "s/^NPM_COMMANDS = .*$$/NPM_COMMANDS = ${DYNAMIC_NPM_COMMANDS}/" Makefile

SFTP_PATH = "towns.dreamhost.com:~/cdn.cubing.net/js/scramble-display/latest/"
URL       = "https://cdn.cubing.net/js/scramble-display/latest/"

.PHONY: deploy
deploy: clean build
	@echo "Bundling during building is not working. Use this:"
	@echo ""
	@echo make clean build
	@echo npx parcel serve --no-hmr --no-source-maps test/index.html
	@echo "[Ctrl-C to interrupt Parcel once it's finished the initial build]"
	@echo ""
	@echo npx terser --compress --mangle -o dist/scramble-display.browser.js dist/scramble-display.????????.js
	@echo ""

# rsync -avz \
# 	--exclude .DS_Store \
# 	--exclude .git \
# 	./dist/ \
# 	${SFTP_PATH}
# echo "\nDone deploying. Go to ${URL}\n"
