import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import clsx from "clsx";
import { useRef } from "react";
import { BsCalendarDate } from "react-icons/bs";
import { isBeforeDay, isToday } from "../../libs/date";

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

      <div
        contentEditable="false"
        suppressContentEditableWarning
        className="mr-4 flex items-center gap-2"
      >
        <span className="w-28 text-center">
          <span
            className={clsx(
              "text-sm py-1 px-3 bg-blue-400 text-white font-bold rounded-full",
              node.attrs.deadline == null && "bg-gray-200 text-black",
              node.attrs.deadline &&
                isToday(new Date(node.attrs.deadline)) &&
                "bg-orange-400 text-white",
              node.attrs.deadline &&
                isBeforeDay(new Date(node.attrs.deadline)) &&
                "bg-red-400 text-white"
            )}
          >
            {node.attrs.deadline == null
              ? "未定"
              : isToday(new Date(node.attrs.deadline))
              ? "今日"
              : node.attrs.deadline}
          </span>
        </span>

        <button onClick={() => ref.current?.showPicker()}>
          <BsCalendarDate size={20} />
        </button>
        <input
          type="date"
          value={node.attrs.deadline ?? ""}
          className="invisible w-0.5"
          onChange={(e) => {
            updateAttributes({ deadline: e.target.value });
          }}
          ref={ref}
        />
      </div>

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
