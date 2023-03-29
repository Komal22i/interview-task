curl --location 'https://api.ciplcrm.org.in/api/admin/jobcategory' \
--header 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZTIwM2NmYjkxMDE3NmFiZjY3NDg4NDE0YTIxYjZmZThkOTcxM2JlNmY4MTBmYjljYjNjN2RhY2VlZDgyOWI5Yzc0OTEwMGEzNWM2YWM4ZGYiLCJpYXQiOjE2NzYzNzMwNTAuODkyNjU1LCJuYmYiOjE2NzYzNzMwNTAuODkyNjU5LCJleHAiOjE3MDc5MDkwNTAuODI5OTg0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.FUh1SegmiIdyNjKlcelNHtE85oniYcQq3c5RP8w69mDJJYvGkCR2UAViQBrBEEkqY_S-dvrxGawEQCrPCJgnSma5YXvIFh2YI7rt51'



curl --location 'https://stagingarb.ciplcrm.org.in/api/filteruser' \
--header 'Accept: application/json' \
--form 'skills[1]="php,laravel"' \
--form 'category="AWS Certified Solution Architect,ITIL Master certification"'



curl --location 'https://api.ciplcrm.org.in/api/admin/skills/search/260'