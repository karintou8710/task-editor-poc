import { Editor } from "@tiptap/react";

export function isTopBlockAtomNode(editor: Editor, pos: number) {
  const $pos = editor.state.doc.resolve(pos);
  const node = editor.state.doc.nodeAt(pos);

  return $pos.node().type.name === "doc" && node?.isAtom && node?.isBlock;
}

export function getRendererNode(node: HTMLElement) {
  let tmpNode: HTMLElement = node;
  while (tmpNode.parentElement) {
    tmpNode = tmpNode.parentElement;
    if (tmpNode.classList.contains("react-renderer")) {
      return tmpNode;
    }
  }

  throw new Error("not in node-view");
}
