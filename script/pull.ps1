$command = "git pull"
$maxAttempts = 100
$attemptCount = 1

while ($attemptCount -le $maxAttempts) {
    Write-Host "Attempt $attemptCount"
    $result = Invoke-Expression $command
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Command executed successfully."
        break
    } else {
        Write-Host "Command failed. Retrying in 1 second..."
        Start-Sleep -Seconds 1
        $attemptCount++
    }
}

if ($attemptCount -gt $maxAttempts) {
    Write-Host "Maximum number of attempts reached. Command failed."
}