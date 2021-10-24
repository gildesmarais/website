# Website

## Update movie ratings

- export from https://www.imdb.com/user/ur67728460/ratings
- save in csv in \_data
- ```sh
  iconv -f iso-8859-1 -t utf8 ratings.csv > ratings-utf.csv
  rm ratings.csv
  mv ratings-utf.csv ratings.csv
  ```
- open with LibreOffice Calc, sort by rated at date and create recommendations
