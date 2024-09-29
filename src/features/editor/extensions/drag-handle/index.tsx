import { Editor } from "@tiptap/react";
import { DragEvent, useCallback, useRef } from "react";
import { NodeSelection } from "@tiptap/pm/state";
import { Slice } from "@tiptap/pm/model";

import useDragInfo from "./hooks/useDragInfo";
import useEvent from "./hooks/useEvent";

class Dragging {
  constructor(
    readonly slice: Slice,
    readonly move: boolean,
    readonly node?: NodeSelection
  ) {}
}

type Props = {
  editor: Editor;
};

export default function DragHandle({ editor }: Props) {
  const [dragInfo, dragInfoDispatch] = useDragInfo();
  const dragIconRef = useRef<HTMLDivElement>(null);

  useEvent(editor, dragInfoDispatch, dragIconRef);

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

  if (dragInfo === null) return null;

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
      onMouseLeave={() => dragInfoDispatch({ type: "clear-action" })}
      style={{
        top: dragInfo.dom.getBoundingClientRect().top + window.scrollY,
        left: dragInfo.dom.getBoundingClientRect().left + window.scrollX - 40,
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
