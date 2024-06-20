#!/bin/bash

set -euo pipefail

# Change the current working directory to the parent directory of the script
pushd "$(dirname "$0")/.." >/dev/null

# Function to check if a program exists
check_program() {
  if ! command -v "$1" &>/dev/null; then
    echo "Error: $1 is not installed."
    return 1
  else
    echo "Found $1"
    return 0
  fi
}

run_command() {
  if check_program "$1"; then
    if [ "$#" -gt 2 ] || [ "$#" -eq 2 ]; then
      echo "run cmd: -- $1 ${@:2} --"
      $1 ${@:2}
    fi
  else
    err_handler "$0" "$1 not found"
  fi
}

find_toml() {
    toml_path=$(find .. -type f  -name "$1")
    if [ -f $toml_path ]; then
        echo -n $toml_path
    else
        err_handler "$0" "$1 not found."
    fi
}

gen_ts() {
    echo "Generating typescript"
    t_path=$(find_toml "Scarb.toml")
    echo "Searching for Scarb.toml"
    echo "Found $t_path"
    run_command "sozo" "build" "--manifest-path" "$t_path" "--typescript-v2"
}


err_handler() {
  popd >/dev/null
  echo "Command $1 failed: $2"
  exit 1
}

echo "running"
gen_ts

