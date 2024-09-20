import { Extension } from "@tiptap/react";

const ResetNode = Extension.create({
  name: "resetNode",

  addKeyboardShortcuts() {
    const targetNodes = ["heading", "task"];

    return {
      Backspace: () => {
        const { selection } = this.editor.state;
        if (!targetNodes.includes(selection.$from.node().type.name))
          return false;

        const $pos = this.editor.$pos(selection.from);
        // ブロックの先頭で削除か
        if (!selection.empty || $pos.from !== selection.from) return false;

        return this.editor.commands.setParagraph();
      },
    };
  },
});

export default ResetNode;
