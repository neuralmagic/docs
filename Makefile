.PHONY: build clean git_add

EXCLUDED_DIRS := .cache node_modules public venv

git_add:
	git add $(git ls-files -m --exclude-standard);

# formats docs source build for github pages
build:
	npm run build;
	python utils/move_files.py ./public .;

# clean package
clean:
	npm run clean;
