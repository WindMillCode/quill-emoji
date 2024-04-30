# Notes
* shorthand does not work make a PR to fix and make an option
* everything seems to export as [name].default and all the usual properties exist on  [name].default need assistance in order to make truly tree shakable
* built for Quill 2.0.0 lsb
version will be based on version starting with  2.0.0000
  * [2.0.0] - is the quill version
  * [000] - is the major minor patch version of our library
  * meaning we only have 9 digits avaialble for major,minor and patch before we have to wait for qull library to update hopefully it does not come to that
  * however according to the semver spec the there cant be trailing zeros so for 2.0.0 there will be patch  updates until 2.x.x comes out
  * for every new version of quill down to its patch there will be new release hopefully on the same day
* there is no testing but minimal modification from quill emoji to get things to work with quill 2.0.0 feel free to add test cases and open a PR
* cant copy emojis open a PR as necessary



# Windmillcode Quill Emoji Selector
Module extension for [Quill.js](https://github.com/quilljs/quill) that handles emojis in the toolbar. Through this extension, you can add emojis through the toolbar at the top, or by typing the emoji code.

![Screenshot](/demo/screenshot.png)


<!-- Needs fix -->
To add an emoji via emoji code, type ``:`` followed by the first few letters, and an autocomplete menu will appear. You can then select or ``tab`` to the preferred emoji.


## Installation

```sh
npm install  @windmillcode/quill-emoji
```

## Usage


```javascript
// someone can contribute and make ShortNameEmoji work
// itseems the only emoji needed is text area
import Quill from 'quill';
import {
// ShortNameEmoji
// EmojiBlot
// ToolbarEmoji
  TextAreaEmoji }from "@windmillcode/quill-emoji";


// Quill.register(EmojiBlot)
// Quill.register('modules/emoji-shortname', ShortNameEmoji,true)
// Quill.register('modules/emoji-toolbar', ToolbarEmoji,true)
Quill.register('modules/emoji-textarea', TextAreaEmoji,true)
```

### Import styles

Styles are present under

```javascript
import "@windmillcode/quill-emoji/quill-emoji.css";
```




### Options
See [emoji-list.js](src/emoji-list.js) for emoji list example

#### Example options
```javascript
// Custom emoji-list
const emojiList = [ /* emojiList */ ];

// MDI emojicon instead of default icon
const emojiIcon = '<svg class="i" viewBox="0 0 24 24"><use href="#emoticon-happy"></use></svg>';

const quill = new Quill(editor, {
  // ...
  modules: {
    // ...
    "emoji-shortname": {
      emojiList: emojiList,
      fuse: {
        shouldSort: true,
        threshold: 0.1,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          "shortname"
        ]
      },
      onOpen: function() { /* ... */ },
      onClose: function(emojiListItem) { /* ... */ }
    },
    "emoji-toolbar": {
      buttonIcon: emojiIcon
    },
    "emoji-textarea": {
      buttonIcon: emojiIcon
    }

  }
});
```

### Custom Emoji Blot
If you need to display the emojis in a different way, you can customize the [emoji blot](src/format-emoji-blot.js) by creating a new blot or extending the default emoji blot.



## Contributing

Please check out our [contributing guidelines](CONTRIBUTING.md).

