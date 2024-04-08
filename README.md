# Website

1. Built with https://lume.land/
2. https://lume.land/docs/overview/about-lume/

## Development setup

```sh
# install deno, via asdf
asdf plugin-add deno
asdf install deno latest

# via task
deno task lume -s

# install lume_cli
# deno install --allow-run --name lume --force --reload https://deno.land/x/lume_cli/mod.ts
# lume -s
```

### run tasks from deno.json

```sh
deno task
```

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
