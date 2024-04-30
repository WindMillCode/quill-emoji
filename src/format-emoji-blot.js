import emojiMap from "./emoji-map";
import Quill from 'quill';
const Embed = Quill.import('blots/embed');


// this whole class may be uncessary
class EmojiBlot extends Embed {
  static blotName = 'emoji';
  static className = 'ql-emojiblot';
  static tagName = 'span';
  static emojiClass = 'ap';
  static emojiPrefix = 'ap-';

  static create(value) {
    let node = super.create();
    if (typeof value === 'object') {

      EmojiBlot.buildSpan(value, node);
    } else if (typeof value === "string") {
      const valueObj = emojiMap[value];

      if (valueObj) {
        EmojiBlot.buildSpan(valueObj, node);
      }
    }

    return node;
  }

  static value(node) {
    return node.dataset.name;
  }

  static buildSpan(value, node) {
    node.setAttribute('data-name', value.name);
    let emojiSpan = document.createElement('span');
    emojiSpan.classList.add(this.emojiClass);
    emojiSpan.classList.add(this.emojiPrefix + value.name);
    emojiSpan.innerText = String.fromCodePoint(...EmojiBlot.parseUnicode(value.unicode));
    node.appendChild(emojiSpan);
  }
  static parseUnicode(string) {
    return string.split('-').map(str => parseInt(str, 16));
  }
}



export default EmojiBlot;
