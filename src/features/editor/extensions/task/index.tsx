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

  addAttributes() {
    return {
      checked: {
        default: false,
        parseHTML: (element) =>
          element.getAttribute("data-checked") === "true" ? true : false,
        renderHTML: (attributes) => {
          return {
            "data-checked": attributes.checked,
          };
        },
      },
    };
  },

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
