#!/usr/bin/env bash

####
# This script installs all npm dependencies.
####

# By default, use the Chromium binary of the system
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=false

####
# Install npm dependecies.
#
# ARGUMENTS:
#   $1: dir name
# RETURN:
#   None
####
install_deps() {
  printf "\n\n=== Install deps of %s ===\n\n" "$1"

  pushd "$1" || exit
  # npm ci
  npm i
  popd || exit
}

####
# Install all deps in parallel.
#
# ARGUMENTS:
#   None
# RETURN:
#   None
####
install_all_deps() {
  dirs=(
    # Session service
    "install_deps ."
    "install_deps client"
    "install_deps common"
    "install_deps server"
    "install_deps tooling"
    "install_deps mocks"
  )

  for i in "${dirs[@]}"
  do
    $i &
  done

  wait

  echo "All dependencies have been fetched."
}

install_all_deps
