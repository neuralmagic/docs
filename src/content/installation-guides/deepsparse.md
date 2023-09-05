---
title: "DeepSparse Installation"
metaTitle: "DeepSparse Installation"
metaDescription: "Installation instructions for DeepSparse enabling performant neural network deployments"
index: 2000
---

# DeepSparse

With support for AVX2, AVX-512, and VNNI instruction sets, DeepSparse is validated to work on x86 Intel (Haswell generation and later) and AMD (Zen 2 and later) CPUs running Linux. 

Note that DeepSparse is supported natively only on Linux. Mac and Windows require running Linux in a Docker or virtual machine.

DeepSparse is tested on Python 3.8 and 3.10, ONNX 1.5.0-1.12.0, ONNX opset version 11+. DeepSparse is manylinux compliant. 

## DeepSparse Community Installation

Install DeepSparse Community for performant inference on CPUs in development or testing environments. There are two ways to install, and both are described below:

- Docker (recommended)
- PyPI

### Installing With Docker (Recommended)

DeepSparse Community is available as a container image hosted on [GitHub container registry](https://github.com/neuralmagic/deepsparse/pkgs/container/deepsparse).

```bash
docker pull ghcr.io/neuralmagic/deepsparse:1.4.2
docker tag ghcr.io/neuralmagic/deepsparse:1.4.2 deepsparse-docker
docker run -it deepsparse-docker
```

Check out the [Docker page](https://github.com/neuralmagic/deepsparse/tree/main/docker/) for more details.

### Installing With PyPI

To install DeepSparse Community with pip:

```bash
pip install deepsparse
```

There are options to install the DeepSparse Server and YOLO:

**`[server]`**—The DeepSparse Server enables you to serve models and pipelines through an HTTP interface using the `deepsparse.server` CLI. For example:

```bash
pip install deepsparse[server]
```

**`[yolo]`**—The Ultralytics YOLOv5 models require extra dependencies for deployment. To use YOLO models:

```bash
pip install deepsparse[yolo]
```

If you want to use both the `[server]` and `[yolo]` options, enter:

```bash
pip install deepsparse[yolo,server]
```

## DeepSparse Enterprise Installation

For DeepSparse Enterprise, you will:

- Get, install, and validate a license
- Install DeepSparse Enterprise

### Getting and Installing a License

DeepSparse Enterprise requires a valid license to run the engine and can be licensed for production, commercial applications. 

### Getting a License

There are two options available for getting a license:

- **90-Day Enterprise Trial License**<br>
To try out DeepSparse Enterprise and get a Neural Magic trial license, complete our registration form. Upon submission, the license will be emailed to you and your 90-day term starts right then.

- **DeepSparse Enterprise License**<br>
To learn more about DeepSparse Enterprise pricing, contact our Sales team to discuss your use case further for a custom quote.

### Installing a License

Once you have obtained a license, you will need to initialize it to be able to run DeepSparse Enterprise. You can initialize your license by running:

    `deepsparse.license <license_string>` or `<path/to/license.txt>`

To initialize a license on a machine:

1. Confirm you have deepsparse-ent installed in a fresh virtual environment.

    - Installing deepsparse and deepsparse-ent on the same virtual environment may result in unsupported behaviors.

2. Run `deepsparse.license` with the `<license_string>` or `path/to/license.txt` as an argument:

    - `deepsparse.license <samplelicensetring>`
    - `deepsparse.license ./license.txt`

3. If successful, `deepsparse.license` will write the license file to `~/.config/neuralmagic/license.txt`. You may overwrite this path by setting the environment variable `NM_CONFIG_DIR` (before and after running the script) with the following command:

    - `export NM_CONFIG_DIR=path/to/license.txt`

4. Once the license is authenticated, you should see a splash message indicating you are now running DeepSparse Enterprise.

If you encounter issues initializing your DeepSparse Enterprise license, contact license@neuralmagic.com for help.

#### Validating a License

Once you have initialized your license, you may want to check that it is still valid before running a workload on DeepSparse Enterprise. To confirm your license is still active with DeepSparse Enterprise, run the command:

```bash
deepsparse.validate_license```bash
```

`deepsparse.validate_license` can be run with no arguments, which will reference an existing environment variable (if set), or with one argument that is a reference to the license and can be referenced in the `deepsparse.validate_license` command as `path/to/license.txt`.

To validate a license on a machine:

1. If you have successfully run `deepsparse.license`, `deepsparse.validate_license` can be used to validate that the license file is in the correct location:

    - Run the `deepsparse.validate_license` with no arguments. If the referenced license is valid, the DeepSparse Enterprise splash screen should display in your terminal window.
    - If the `NM_CONFIG_DIR` environment variable was set when creating the license, ensure this variable is still set to the same value.

2. If you want to supply the `path/to/license.txt`:

    - Run `deepsparse.validate_license` with `path/to/license.txt` as an argument as:
          `deepsparse.validate_license --license_path path/to/license.txt`
    - If the referenced license is valid, the DeepSparse Enterprise splash screen should display in your terminal window.

### Installing DeepSparse Enterprise

Install DeepSparse Enterprise for performant inference on CPUs in production deployments. Installation is with PyPI:

```bash
pip install deepsparse-ent
```

There are options to install the DeepSparse Server and YOLO:

**`[server]`**—The DeepSparse Server enables you to serve models and pipelines through an HTTP interface using the `deepsparse.server` CLI. For example:

```bash
pip install deepsparse-ent[server]
```

**`[yolo]`**—The Ultralytics YOLOv5 models require extra dependencies for deployment. To use YOLO models:

```bash
pip install deepsparse-ent[yolo]
```

If you want to use both the `[server]` and `[yolo]` options, enter:

```bash
pip install deepsparse-ent[yolo,server]
```
