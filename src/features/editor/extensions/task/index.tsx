import {
  mergeAttributes,
  Node,
  ReactNodeViewRenderer,
  textblockTypeInputRule,
} from "@tiptap/react";
import TaskView from "./view";

const Task = Node.create({
  name: "task",
  group: "block",
  content: "inline*",

  parseHTML() {
    return [
      {
        tag: "react-task",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["react-task", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TaskView);
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () => {
        const { selection } = this.editor.state;
        if (selection.$from.node().type.name !== this.name) return false;

        const $pos = this.editor.$pos(selection.from);
        // ブロックの先頭で削除か
        if (!selection.empty || $pos.from !== selection.from) return false;

        return this.editor.commands.setParagraph();
      },
    };
  },

  addInputRules() {
    return [
      textblockTypeInputRule({
        find: /^\[$/,
        type: this.type,
      }),
    ];
  },
});

export default Task;
