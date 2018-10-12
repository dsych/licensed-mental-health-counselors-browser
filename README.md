# FL Licensure Browser

It used to be a pain to find and browse through the list of licensed mental health counselors in Florida. You had to go to the gov website, navigate their menu, find what you wanted in a huge dropdown (I'm talking 100s of options), then find the download link (It's not big or noticeable at all). The worst part? It's not even a `download` link. It opens a text file in a new tab, which you then have to `save as`, import to excel, and customize the import by having it delimit rows on new lines, and columns on `|`'s.

This was a process which used to require some technical understanding and a _lot_ of patience. Which is where this tool comes into play. All you have to do to get the information you want is go to the site and search for it.

## Getting Started

I created this repo with ease of development in mind. I eschewed any frameworks or plugins and instead elected to create a simple express server and a react.js front end. The project is built and serve automagically by Parcel.js.

Server content belongs in `server/`. Client content belongs in `src/`. The production build is served from `dist/` automatically by the parcel middleware, and the database is stored in '.data/.

### Installation

To install the dependencies:

```sh
yarn
```

To start the dev server:

```sh
yarn dev
```

To start the prod server:

```sh
yarn start
```

### Contributing

I just ask that you follow my loose intepretation of semantic commit messages. Just take a look at the commit log for examples.
