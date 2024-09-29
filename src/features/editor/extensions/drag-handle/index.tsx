import { Editor } from "@tiptap/react";
import { DragEvent, useCallback, useEffect, useRef, useState } from "react";
import { NodeSelection } from "@tiptap/pm/state";
import { Slice } from "@tiptap/pm/model";

import { getRendererNode, isTopBlockAtomNode } from "../../libs/node";

class Dragging {
  constructor(
    readonly slice: Slice,
    readonly move: boolean,
    readonly node?: NodeSelection
  ) {}
}

type DragInfo = {
  dom: HTMLElement;
  nodeSelection: NodeSelection;
};

type Props = {
  editor: Editor;
};

export default function DragHandle({ editor }: Props) {
  const [dragInfo, setDragInfo] = useState<DragInfo | null>(null);
  const dragIconRef = useRef<HTMLDivElement>(null);

  const setTopBlockAtomDragInfo = useCallback(
    (pos: number) => {
      setDragInfo({
        dom: editor.view.nodeDOM(pos) as HTMLElement,
        nodeSelection: NodeSelection.create(editor.state.doc, pos),
      });
    },
    [editor]
  );

  const setTopBlockDragInfo = useCallback(
    (pos: number) => {
      const $pos = editor.state.doc.resolve(pos);

      let node = editor.view.domAtPos($pos.start(1)).node as HTMLElement;
      // nodeViewはコンテンツ箇所のdomを取得してしまうので、親要素を再取得する
      if (node.hasAttribute("data-node-view-content-react")) {
        node = getRendererNode(node);
      }

      setDragInfo({
        dom: node,
        nodeSelection: NodeSelection.create(editor.state.doc, $pos.before(1)),
      });
    },
    [editor]
  );

  const handleDragStart = useCallback(
    (ev: DragEvent) => {
      // ProseMirrorのDragStart参考に実装すれば良さそう。view.draggingに対象のNodeSelectionを入れる
      // https://github.com/ProseMirror/prosemirror-view/blob/b2e782ae7c8013505ba05683b185886585ef5939/src/input.ts

      if (dragInfo === null) return;

      ev.dataTransfer.setDragImage(dragInfo.dom, 0, 0);
      ev.dataTransfer.effectAllowed = "copyMove";
      editor.view.dragging = new Dragging(
        dragInfo.nodeSelection.content(),
        true,
        dragInfo.nodeSelection
      );
    },
    [editor, dragInfo]
  );

  useEffect(() => {
    const handleMouseMove = (ev: MouseEvent) => {
      const pos = editor.view.posAtCoords({
        left: ev.clientX,
        top: ev.clientY,
      });
      if (!pos) return;

      // リーフノードはNodeやDOMの取得方法が通常と異なるので、分けて処理する

      if (isTopBlockAtomNode(editor, pos.pos)) {
        // inside != -1の時、atomではposが上半分と下半分で異なる(pos.insideは同じ)
        setTopBlockAtomDragInfo(pos.inside >= 0 ? pos.inside : pos.pos);
      } else {
        setTopBlockDragInfo(
          Math.min(pos.pos, editor.state.doc.content.size - 1)
        );
      }
    };

    const handleMouseLeave = (ev: MouseEvent) => {
      if (dragIconRef.current?.contains(ev.relatedTarget as HTMLElement)) {
        return;
      }
      setDragInfo(null);
    };

    const handleKeyDown = () => setDragInfo(null);

    editor.view.dom.addEventListener("mousemove", handleMouseMove);
    editor.view.dom.addEventListener("mouseleave", handleMouseLeave);
    editor.view.dom.addEventListener("keydown", handleKeyDown);

    return () => {
      editor.view.dom.removeEventListener("mousemove", handleMouseMove);
      editor.view.dom.addEventListener("mouseleave", handleMouseLeave);
      editor.view.dom.removeEventListener("keydown", handleKeyDown);
    };
  }, [editor, setTopBlockAtomDragInfo, setTopBlockDragInfo]);

  if (dragInfo === null) return null;

  const rect = dragInfo.dom.getBoundingClientRect();

  return (
    <div
      draggable="true"
      className="absolute size-6 cursor-grab"
      onDragStart={handleDragStart}
      onClick={() =>
        editor
          .chain()
          .focus()
          .setNodeSelection(dragInfo.nodeSelection.from)
          .run()
      }
      onMouseLeave={() => setDragInfo(null)}
      style={{
        top: rect.top + window.scrollY,
        left: rect?.left + window.scrollX - 40,
      }}
      ref={dragIconRef}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 9h16.5m-16.5 6.75h16.5"
        />
      </svg>
    </div>
  );
}
