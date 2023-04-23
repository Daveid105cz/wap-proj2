#!/bin/bash

# This script is used to pack the project into a zip file.
# The zip file will be named xpetra21-xpodes05.zip

# The zip file will contain the following files:
# folders src, public and all files in the root directory
# except for the zip file itself and the pack.sh script

zip -r xpetra21-xpodes05.zip src public env.d.ts index.html package.json package-lock.json tsconfig.json tsconfig.node.json vite.config.ts