import Link from "@tiptap/extension-link";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Extension } from "@tiptap/react";

const LinkAtEnd = Extension.create({
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("linkHandle"),
        appendTransaction(transactions, oldState, newState) {
          const isChanged = transactions.some(
            (transaction) => transaction.docChanged
          );
          if (!isChanged) return;

          let modified = false;
          const tr = newState.tr;

          const currentPos = newState.selection.$from;
          const nextPos = newState.doc.resolve(newState.selection.from + 1);
          const isInLink = !!currentPos
            .marks()
            .find((m) => m.type.name === Link.name);
          const isNextInLink = !!nextPos
            .marks()
            .find((m) => m.type.name === Link.name);
          const isAtLinkEnd = isInLink && !isNextInLink;

          if (isAtLinkEnd) {
            tr.removeMark(
              oldState.selection.from,
              newState.selection.from,
              null
            );
            modified = true;
          }

          return modified ? tr : null;
        },
      }),
    ];
  },
});

export default LinkAtEnd;
