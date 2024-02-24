# Website

## Update movie ratings

- export from <https://www.imdb.com/user/ur67728460/ratings>
- save in csv in \_data

- In case of charset problems:

  ```sh
  iconv -f iso-8859-1 -t utf8 ratings.csv > ratings-utf.csv
  rm ratings.csv
  mv ratings-utf.csv ratings.csv
  ```

- import csv with LibreOffice Calc (Get columns right!)
- sort ratings by "Date Rated" (data -> autofilter -> sort desc)
- save as ratings.csv

Go ahead and create recommendations for newly added movies.

## Create move recommendation
