import { Editor, findChildren } from "@tiptap/react";

type Props = {
  editor: Editor;
};

export default function Menu({ editor }: Props) {
  const deleteAllCheckedTask = () => {
    const ids: string[] = findChildren(editor.state.doc, (node) => {
      return node.type.name === "task" && node.attrs.checked;
    }).map((item) => item.node.attrs.uniqueId);

    editor.commands.forEach(ids, (id, { tr, commands }) => {
      // deleteRangeの後に、新しい配置になった要素を取得し直すのが肝
      const item = findChildren(
        tr.doc,
        (node) => id === node.attrs.uniqueId
      )?.[0];

      return commands.deleteRange({
        from: item.pos,
        to: item.pos + item.node.nodeSize,
      });
    });
  };

  return (
    <div>
      <button onClick={deleteAllCheckedTask}>Done</button>
    </div>
  );
}
