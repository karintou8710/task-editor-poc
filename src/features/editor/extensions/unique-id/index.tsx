import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Extension } from "@tiptap/react";

const UniqueId = Extension.create({
  name: "unique-id",

  addGlobalAttributes() {
    return [
      {
        types: ["heading", "paragraph", "task"],
        attributes: {
          uniqueId: {
            default: null,
            rendered: false,
          },
        },
      },
    ];
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("unique-id"),
        appendTransaction(transactions, _, nextState) {
          const tr = nextState.tr;
          let modified = false;
          if (transactions.some((transaction) => transaction.docChanged)) {
            nextState.doc.descendants((node, pos) => {
              if (node.isText || node.attrs.uniqueId) return;

              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                uniqueId: crypto.randomUUID(),
              });
              modified = true;
            });
          }

          return modified ? tr : null;
        },
      }),
    ];
  },
});

export default UniqueId;
