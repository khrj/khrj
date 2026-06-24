$url = "https://files.khushrajrathod.com/ca.crt"
$path = "$env:TEMP\ca.crt"

Invoke-WebRequest -Uri $url -OutFile $path

try {
    Start-Process powershell -Verb RunAs -WindowStyle Hidden -Wait -ErrorAction Stop -ArgumentList "-NoProfile -Command `"Import-Certificate -FilePath '$path' -CertStoreLocation Cert:\LocalMachine\Root`""
} catch {
    Import-Certificate -FilePath $path -CertStoreLocation Cert:\CurrentUser\Root
}

Read-Host "Certificate install completed successfully, press enter to exit"