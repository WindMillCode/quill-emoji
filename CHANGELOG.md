# Changelog

## 2.0.0
* [BREAKING CHANGE] - can click on the editor space to close the widget, you can click as much as you need
* [BREAKING CHANGE] - editor appears in the toolbar and not in the editor space


## 2.0.2
* [BREAKNG CHANGE] -ensured that exports are not on the unusal default

## 2.0.3
[BREAKING CHANGE] In src/emoji-map.js, removed hardcoded short name values and calculated the result of the name making for a much smaller application.
[UPDATE] In src/format-emoji-blot.js, hinted that the EmojiBlot class might not be needed anymore. Less code, less hassle.
[UPDATE] In src/module-textarea-emoji.js, src/module-toolbar-emoji.js, and other emoji modules, switched from using embeds to inserting text directly for emojis. This means emojis are just text now, not fancy objects. significantly decreased bundle size
[UPDATE] Removed the uncessary css and image from the package the plugins just uses regular unicode values
[UPDATE] - by removing emoji blot decreased bundle size by a factor of nearly 300%
