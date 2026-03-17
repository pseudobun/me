set shell := ["bash", "-uc"]
set quiet

[no-quiet]
default:
    @just --list

encrypt:
    #!/usr/bin/env bash
    set -euo pipefail
    if [ ! -f .env ]; then
        echo "Error: .env not found"
        exit 1
    fi
    echo "Encrypting .env..."
    sops encrypt --input-type dotenv --output-type dotenv .env > .env.enc
    echo "Done. Encrypted to .env.enc"

decrypt:
    #!/usr/bin/env bash
    set -euo pipefail
    if [ ! -f .env.enc ]; then
        echo "Error: .env.enc not found"
        exit 1
    fi
    echo "Decrypting .env.enc..."
    sops decrypt --input-type dotenv --output-type dotenv .env.enc > .env
    echo "Done. Decrypted to .env"

edit-env:
    sops --input-type dotenv --output-type dotenv .env.enc
