import emojiList from "./emoji-list";

const emojiMap = {};

emojiList.forEach((emojiListObject) => {
    emojiListObject.shortname = `:{emojiListObject.name}:`
    emojiMap[emojiListObject.name] = emojiListObject;
});

export default emojiMap;
