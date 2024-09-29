import { NodeSelection } from "@tiptap/pm/state";
import { useReducer } from "react";
import { Editor } from "@tiptap/react";
import { EditorView } from "@tiptap/pm/view";
import { getRendererNode } from "../../../libs/node";

export type DragInfo = {
  dom: HTMLElement;
  nodeSelection: NodeSelection;
};

export type ProseMirrorPosition = NonNullable<
  ReturnType<EditorView["posAtCoords"]>
>;

type ClearAction = "clear-action";
type SetAtomAction = "set-atom-action";
type SetBlockAction = "set-block-action";

type Action =
  | {
      type: ClearAction;
    }
  | {
      type: SetAtomAction;
      editor: Editor;
      pos: ProseMirrorPosition;
    }
  | {
      type: SetBlockAction;
      editor: Editor;
      pos: ProseMirrorPosition;
    };

type State = DragInfo | null;

function reducer(state: State, action: Action): State {
  if (action.type === "clear-action") {
    return null;
  } else if (action.type === "set-atom-action") {
    // inside != -1の時、atomではposが上半分と下半分で異なる(pos.insideは同じ)
    const pos = action.pos.inside >= 0 ? action.pos.inside : action.pos.pos;
    return {
      dom: action.editor.view.nodeDOM(pos) as HTMLElement,
      nodeSelection: NodeSelection.create(action.editor.state.doc, pos),
    };
  } else if (action.type === "set-block-action") {
    const $pos = action.editor.state.doc.resolve(
      Math.min(action.pos.pos, action.editor.state.doc.content.size - 1)
    );

    let node = action.editor.view.domAtPos($pos.start(1)).node as HTMLElement;
    // nodeViewはコンテンツ箇所のdomを取得してしまうので、親要素を再取得する
    if (node.hasAttribute("data-node-view-content-react")) {
      node = getRendererNode(node);
    }

    return {
      dom: node,
      nodeSelection: NodeSelection.create(
        action.editor.state.doc,
        $pos.before(1)
      ),
    };
  }

  return null;
}

export default function useDragInfo() {
  return useReducer(reducer, null);
}
