.PHONY: build clean git_add

EXCLUDED_DIRS := .cache node_modules public venv

git_add:
	@bash -c ' \
	  IFS=$$'\''\n'\''; \
		for file in $$(git ls-files --others --exclude-from=.gitignore); do \
			skip=0; \
			for dir in $(EXCLUDED_DIRS); do \
 				if [[ $$file == $$dir* ]]; then \
 					skip=1; \
					break; \
				fi; \
			done; \
			if [[ $$skip -eq 0 ]]; then \
				git add $$file; \
			fi; \
		done \
	';

# formats docs source build for github pages
build:
	npm run build;
	python utils/move_files.py ./public .;

# clean package
clean:
	npm run clean;
