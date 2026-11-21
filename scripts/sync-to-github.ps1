$ErrorActionPreference = "Continue"
$root = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $root

$mutex = New-Object System.Threading.Mutex($false, "PersonalPortfolioGithubSync")
if (-not $mutex.WaitOne(0)) {
  exit 0
}

try {
  $env:GIT_AUTHOR_NAME = "kwekunketsia10-prog"
  $env:GIT_AUTHOR_EMAIL = "306258258+kwekunketsia10-prog@users.noreply.github.com"
  $env:GIT_COMMITTER_NAME = $env:GIT_AUTHOR_NAME
  $env:GIT_COMMITTER_EMAIL = $env:GIT_AUTHOR_EMAIL

  git add -A | Out-Null
  $pending = git status --porcelain
  if ($pending) {
    git commit -m "Update the portfolio site." | Out-Null
  }

  $ahead = git rev-list --count "@{u}..HEAD" 2>$null
  if ($LASTEXITCODE -ne 0 -or [int]$ahead -gt 0) {
    git push origin HEAD | Out-Null
  }
} finally {
  $mutex.ReleaseMutex() | Out-Null
  $mutex.Dispose()
}

exit 0
