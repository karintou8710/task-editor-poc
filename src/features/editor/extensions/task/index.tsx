import {
  findChildren,
  mergeAttributes,
  Node,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import TaskView from "./view";
import { getTodayDate } from "../../libs/date";

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    task: {
      deleteCheckedTask: () => ReturnType;
      setTodayDeadline: () => ReturnType;
      clearDeadline: () => ReturnType;
    };
  }
}

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
      deadline: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-deadline"),
        renderHTML: (attributes) => {
          return {
            "data-deadline": attributes.deadline,
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

  addKeyboardShortcuts() {
    return {
      "Mod-d": ({ editor }) => {
        const { selection } = editor.state;

        if (!selection.empty || selection.$from.node().type.name !== this.name)
          return false;

        return editor.commands.deleteRange({
          from: selection.$from.before(),
          to: selection.$from.after(),
        });
      },
      "Mod-e": ({ editor }) => {
        const { selection } = editor.state;

        if (!selection.empty || selection.$from.node().type.name !== this.name)
          return false;

        return editor.commands.setTodayDeadline();
      },
      "Mod-Shift-e": ({ editor }) => {
        const { selection } = editor.state;

        if (!selection.empty || selection.$from.node().type.name !== this.name)
          return false;

        return editor.commands.clearDeadline();
      },
    };
  },

  addCommands() {
    return {
      setTodayDeadline:
        () =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, {
            deadline: getTodayDate(),
          });
        },

      clearDeadline:
        () =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, {
            deadline: null,
          });
        },

      deleteCheckedTask:
        () =>
        ({ commands, tr }) => {
          const ids: string[] = findChildren(tr.doc, (node) => {
            return node.type.name === "task" && node.attrs.checked;
          }).map((item) => item.node.attrs.uniqueId);

          if (ids.length === 0) return false;

          // deleteRangeの後に、新しい配置になった要素を取得し直すのが肝
          return commands.forEach(ids, (id, { tr, commands }) => {
            const item = findChildren(
              tr.doc,
              (node) => id === node.attrs.uniqueId
            )?.[0];

            return commands.deleteRange({
              from: item.pos,
              to: item.pos + item.node.nodeSize,
            });
          });
        },
    };
  },
});

export default Task;
