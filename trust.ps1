$url = "https://files.khushrajrathod.com/ca.crt"
$path = "$env:TEMP\ca.crt"
Start-Process powershell -Verb RunAs -WindowStyle Hidden -Wait -ArgumentList "-NoProfile -Command `"Invoke-WebRequest -Uri '$url' -OutFile '$path'; Import-Certificate -FilePath '$path' -CertStoreLocation Cert:\LocalMachine\Root`""
Read-Host "Certificate install completed successfully, press enter to exit"