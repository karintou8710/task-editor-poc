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
