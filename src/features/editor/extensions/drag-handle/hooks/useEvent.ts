import { Editor } from "@tiptap/react";
import { Dispatch, RefObject, useEffect } from "react";

import { isTopBlockAtomNode } from "../../../libs/node";
import { DragInfoAction } from "./useDragInfo";

export default function useEvent(
  editor: Editor,
  dispatch: Dispatch<DragInfoAction>,
  dragIconRef: RefObject<HTMLElement>
) {
  useEffect(() => {
    const handleMouseMove = (ev: MouseEvent) => {
      const pos = editor.view.posAtCoords({
        left: ev.clientX,
        top: ev.clientY,
      });
      if (!pos) return;

      // リーフノードはNodeやDOMの取得方法が通常と異なるので、分けて処理する
      if (isTopBlockAtomNode(editor, pos.pos)) {
        dispatch({
          type: "set-atom-action",
          editor: editor,
          pos: pos,
        });
      } else {
        dispatch({
          type: "set-block-action",
          editor: editor,
          pos: pos,
        });
      }
    };

    const handleMouseLeave = (ev: MouseEvent) => {
      if (dragIconRef.current?.contains(ev.relatedTarget as HTMLElement)) {
        return;
      }
      dispatch({ type: "clear-action" });
    };

    const handleKeyDown = () => dispatch({ type: "clear-action" });

    editor.view.dom.addEventListener("mousemove", handleMouseMove);
    editor.view.dom.addEventListener("mouseleave", handleMouseLeave);
    editor.view.dom.addEventListener("keydown", handleKeyDown);

    return () => {
      editor.view.dom.removeEventListener("mousemove", handleMouseMove);
      editor.view.dom.addEventListener("mouseleave", handleMouseLeave);
      editor.view.dom.removeEventListener("keydown", handleKeyDown);
    };
  }, [editor, dispatch, dragIconRef]);
}
