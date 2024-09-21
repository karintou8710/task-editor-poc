import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { useRef } from "react";
import { BsCalendarDate } from "react-icons/bs";

export default function TaskView({ node, updateAttributes }: NodeViewProps) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <NodeViewWrapper className="items-center my-4 flex">
      <label
        contentEditable="false"
        suppressContentEditableWarning
        className="h-6 mr-2"
      >
        <input
          type="checkbox"
          onChange={(e) => {
            updateAttributes({ checked: e.target.checked });
          }}
          checked={node.attrs.checked}
          className="size-6 border border-black flex-[0_0_auto]"
        />
      </label>

      <label
        contentEditable="false"
        suppressContentEditableWarning
        className="mr-4 flex items-center gap-2"
      >
        <span> {node.attrs.deadline ?? "未定"}</span>
        <button onClick={() => ref.current?.showPicker()}>
          <BsCalendarDate size={20} />
        </button>
        <input
          type="date"
          value={node.attrs.deadline}
          className="invisible w-0.5"
          onChange={(e) => {
            updateAttributes({ deadline: e.target.value });
          }}
          ref={ref}
        />
      </label>

      <div className="flex-auto">
        <NodeViewContent
          className={`${
            node.attrs.checked ? "text-gray-500 line-through" : ""
          }`}
        />
      </div>
    </NodeViewWrapper>
  );
}
