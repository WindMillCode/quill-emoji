# Contributing

## Tools Required
git
node.jh
## Setup
*
```ps1
https://github.com/WindMillCode/quill-emoji.git
npm install -s
```

## Development

to run its preferred to use  our vscode launch.json "Run Development" Command or use
```sh
npm run start
```

in the package do
```sh
cd dist;
npm link
```

* in the consumer application do
```sh
npm link @windmillcode/quill-emoji --save
```

###  to remove
* in the consumer application do
```sh
npm unlink @windmillcode/quill-emoji
```

* in the package do
```ts
cd dist;
npm unlink -g 
```

## Maintainers

__@windmillcode__
