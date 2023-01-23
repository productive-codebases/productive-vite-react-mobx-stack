####
# This script installs all npm dependencies.
####

$dirs = @(
  "."
  "client"
  "common"
  "server"
  "tooling"
  "mocks"
)

For ($i = 0; $i -lt $dirs.Length; $i++) {
  $dir = $PSScriptRoot + "\" + $dirs[$i]
  Write-Output "`n`n=== Install deps of $dirs[$i] ===`n`n"
  npm ci --prefix $dir .
}

Write-Output "All dependencies have been fetched."
