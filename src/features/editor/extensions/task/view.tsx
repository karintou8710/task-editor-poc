import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import clsx from "clsx";
import { useRef } from "react";
import {
  getDiffDays,
  isBeforeDay,
  isInOneWeek,
  isToday,
  isTomorrow,
  isTowDaysAgo,
} from "../../libs/date";
import { twMerge } from "tailwind-merge";
import { BiCalendarEvent } from "react-icons/bi";

export default function TaskView({
  node,
  updateAttributes,
  deleteNode,
  getPos,
  editor,
}: NodeViewProps) {
  const ref = useRef<HTMLInputElement>(null);

  const getDeadlineText = (deadline: string | null) => {
    if (deadline == null) return "未定";

    if (isToday(deadline)) {
      return "今日";
    } else if (isTomorrow(deadline)) {
      return "明日";
    } else if (isTowDaysAgo(deadline)) {
      return "明後日";
    } else if (isInOneWeek(deadline)) {
      return `${getDiffDays(deadline)}日後`;
    }

    return deadline;
  };

  return (
    <NodeViewWrapper className="my-2 border-b">
      <div className="flex items-center">
        <label
          contentEditable="false"
          suppressContentEditableWarning
          className="h-5 mr-4"
        >
          <button
            onClick={() => {
              editor.chain().focus(getPos()).run();
              deleteNode();
            }}
            className="size-5 border border-black flex-[0_0_auto] hover:bg-gray-200"
          />
        </label>

        <div className="flex-auto">
          <NodeViewContent
            className={clsx(node.attrs.checked && "text-gray-500 line-through")}
          />
        </div>
      </div>

      <div
        contentEditable="false"
        suppressContentEditableWarning
        className="flex items-center ml-10"
      >
        <button
          onClick={() => ref.current?.showPicker()}
          className={twMerge(
            clsx(
              "text-gray-600 font-bold flex gap-2 items-center",
              node.attrs.deadline == null && "text-gray-400",
              node.attrs.deadline &&
                isToday(node.attrs.deadline) &&
                " text-orange-400",
              node.attrs.deadline &&
                isTomorrow(node.attrs.deadline) &&
                "text-orange-400",
              node.attrs.deadline &&
                isBeforeDay(node.attrs.deadline) &&
                "text-red-400"
            )
          )}
        >
          <BiCalendarEvent size={15} />
          <span className="text-xs pt-0.5">
            {getDeadlineText(node.attrs.deadline)}
          </span>
        </button>

        <input
          type="date"
          value={node.attrs.deadline ?? ""}
          className="invisible w-0.5 inline"
          onChange={(e) => {
            updateAttributes({ deadline: e.target.value });
          }}
          ref={ref}
        />
      </div>
    </NodeViewWrapper>
  );
}
