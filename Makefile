.PHONY: build docs test

BUILDDIR := $(PWD)
PYCHECKDIRS := utils
PYCHECKGLOBS := 'utils/**/*.py'
DOCDIR := docs
MDCHECKGLOBS := 'docs/**/*.md' 'docs/**/*.rst'
MDCHECKFILES := CODE_OF_CONDUCT.md CONTRIBUTING.md DEVELOPING.md README.md

# run checks on all files for the repo
quality:
	@echo "Running copyright checks";
	python3 utils/copyright.py quality $(PYCHECKGLOBS) $(JSCHECKGLOBS) $(MDCHECKGLOBS) $(MDCHECKFILES)
	@echo "Running python3 quality checks";
	black --check $(PYCHECKDIRS);
	isort --check-only $(PYCHECKDIRS);
	flake8 $(PYCHECKDIRS);

# style the code according to accepted standards for the repo
style:
	@echo "Running copyrighting";
	python3 utils/copyright.py style $(PYCHECKGLOBS) $(JSCHECKGLOBS) $(MDCHECKGLOBS) $(MDCHECKFILES)
	@echo "Running python3 styling";
	black $(PYCHECKDIRS);
	isort $(PYCHECKDIRS);

# create docs
docs:
	@echo "Running docs creation";
	python3 utils/docs_builder.py --src $(DOCDIR) --dest $(DOCDIR)/build/html;

# formats docs source build for github pages
build:
	make docs;
	rm -rf _images/ && rm -rf _sources/ && rm -rf _static/ && \
		cp -r docs/build/html/* ./;
	make clean;

# clean package
clean:
	rm -rf .pytest_cache;
	rm -rf docs/_build docs/build;
	rm -rf build;
	rm -rf dist;
	find $(PYCHECKDIRS) | grep -E "(__pycache__|\.pyc|\.pyo)" | xargs rm -rf;
