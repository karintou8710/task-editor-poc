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
        // 単一の選択・ブロックの先頭で削除
        if (!selection.empty || $pos.from !== selection.from) return false;

        return this.editor.commands.setParagraph();
      },

      Enter: () => {
        const { selection } = this.editor.state;
        if (!targetNodes.includes(selection.$from.node().type.name))
          return false;

        const $pos = this.editor.$pos(selection.from);
        // 単一の選択・ブロックの先頭・コンテンツ無し
        if (
          !selection.empty ||
          $pos.from !== selection.from ||
          $pos.node.content.size > 0
        )
          return false;

        return this.editor.commands.setParagraph();
      },
    };
  },
});

export default ResetNode;
