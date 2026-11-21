$ErrorActionPreference = "Continue"
$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$pidFile = Join-Path $env:TEMP "personal-portfolio-github-sync.pid"
Set-Content -Path $pidFile -Value $PID

$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $root
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true
$watcher.NotifyFilter = [IO.NotifyFilters]"FileName, DirectoryName, LastWrite, Size"

$ignored = [regex]'\\(\.git|\.next|node_modules)(\\|$)'
$action = {
  $path = $Event.SourceEventArgs.FullPath
  if ($path -and $path -match $ignored) { return }
  $global:githubSyncPending = $true
  $global:githubSyncLast = Get-Date
}

Register-ObjectEvent $watcher "Changed" -Action $action | Out-Null
Register-ObjectEvent $watcher "Created" -Action $action | Out-Null
Register-ObjectEvent $watcher "Deleted" -Action $action | Out-Null
Register-ObjectEvent $watcher "Renamed" -Action $action | Out-Null

$global:githubSyncPending = $false
$global:githubSyncLast = Get-Date

while ($true) {
  Start-Sleep -Seconds 2
  if ($global:githubSyncPending -and ((Get-Date) - $global:githubSyncLast).TotalSeconds -ge 8) {
    $global:githubSyncPending = $false
    & (Join-Path $PSScriptRoot "sync-to-github.ps1")
  }
}
