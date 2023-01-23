#!/usr/bin/env bash

# Generate OpenAPI stubs
#
# Prerequisities:
# - npm i @openapitools/openapi-generator-cli -g
#
# Usage:
# npm run build:openapi (at the root of Konsole folder)

COMMON_FOLDER="$( cd -- "$(dirname "$0")/.." >/dev/null 2>&1 || exit ; pwd -P )"
MOCKS_FOLDER="$COMMON_FOLDER/../mocks"
COMMON_OPENAPI_FOLDER="$COMMON_FOLDER/../client/src/services"

echo "$COMMON_FOLDER"
echo "$COMMON_OPENAPI_FOLDER"

####
# Generate stubs for one service.
#
# ARGUMENTS:
#   $1: YAML path of the OpenAPI specs
#   $2: Path of the Konsole OpenAPI stubs folder
# RETURN:
#   None
####
generate_stubs () {
  openapi-generator-cli \
    generate -g \
    typescript-fetch \
    -i "$1" \
    -o "$2" \
    --additional-properties=typescriptThreePlus=true \
    --additional-properties=modelPropertyNaming=camelCase \
    --additional-properties=stringEnums=true
}

####
# Generate all stubs for each service.
#
# ARGUMENTS:
#   None
# RETURN:
#   None
####
generate_all_stubs () {
  jobs=(
    # Dashboard demo service
    "generate_stubs $MOCKS_FOLDER/src/services/dashboard/openapi/user_resource.yaml $COMMON_OPENAPI_FOLDER/dashboard/userResource"
  )

  for i in "${jobs[@]}"
  do
    $i &
  done

  wait

  echo "All stubs have been generated."
}

####
# Start the whole program.
#
# ARGUMENTS:
#   None
# RETURN:
#   None
####
main() {
  generate_all_stubs
}

main
