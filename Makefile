# This Makefile is a wrapper around the scripts from `package.json`.
# https://github.com/lgarron/Makefile-scripts

# Note: the first command becomes the default `make` target.
NPM_COMMANDS = build build-types build-esm build-bundle-global build-site dev clean prepack

.PHONY: $(NPM_COMMANDS)
$(NPM_COMMANDS):
	npm run $@

# We write the npm commands to the top of the file above to make shell autocompletion work in more places.
DYNAMIC_NPM_COMMANDS = $(shell cat package.json | npx jq --raw-output ".scripts | keys_unsorted | join(\" \")")
.PHONY: update-Makefile
update-Makefile:
	sed -i "" "s/^NPM_COMMANDS = .*$$/NPM_COMMANDS = ${DYNAMIC_NPM_COMMANDS}/" Makefile

# This is not in `scripts` in `package.json`, because that would cause a double-build.
.PHONY: publish
publish:
	npm publish

SFTP_PATH = "cubing_deploy@towns.dreamhost.com:~/experiments.cubing.net/scramble-display/"
URL       = "https://experiments.cubing.net/scramble-display/"

.PHONY: deploy
deploy: clean build-site
	# Single file
	rsync -avz \
		--exclude .DS_Store \
		--exclude .git \
		./dist/site/ \
		${SFTP_PATH}
	echo "\nDone deploying. Go to ${URL}\n"
