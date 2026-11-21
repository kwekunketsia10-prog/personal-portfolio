param(
  [ValidateSet("start", "push")]
  [string]$Mode = "push"
)

[Console]::In.ReadToEnd() | Out-Null
$root = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$watch = Join-Path $root "scripts\watch-github.ps1"
$sync = Join-Path $root "scripts\sync-to-github.ps1"
$pidFile = Join-Path $env:TEMP "personal-portfolio-github-sync.pid"

if ($Mode -eq "start") {
  $running = $false
  if (Test-Path $pidFile) {
    $existing = Get-Content $pidFile -ErrorAction SilentlyContinue
    if ($existing -and (Get-Process -Id $existing -ErrorAction SilentlyContinue)) {
      $running = $true
    }
  }
  if (-not $running) {
    Start-Process -FilePath "powershell.exe" -WindowStyle Hidden -ArgumentList @(
      "-NoProfile",
      "-ExecutionPolicy", "Bypass",
      "-File", $watch
    )
  }
} else {
  & $sync
}

Write-Output "{}"
exit 0
