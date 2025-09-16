import Tag from "@shared/components/tag/Tag";
import ButtonCheck from "@shared/components/button-check/ButtonCheck";
import { cn } from "@shared/utils/cn";

interface ChatListItemProps {
  profileImage?: string;
  isEditing: boolean;
  clientName: string;
  tagTitle: string;
  lastChat: string;
  lastChatTime: string;
  unreadCount: number;
  isChecked: boolean;
  handleCheckChange: (_checked: boolean) => void;
}

export default function ChatListItem({
  profileImage,
  isEditing,
  clientName,
  tagTitle,
  lastChat,
  lastChatTime,
  unreadCount,
  isChecked,
  handleCheckChange,
}: ChatListItemProps) {
  return (
    <div
      className={cn(
        "flex w-full items-center gap-[1.8rem] px-[2rem] py-[1.4rem]",
        "transition-colors duration-200",
        {
          "bg-primary-25": isChecked && isEditing,
          "bg-white": !isChecked || !isEditing,
        }
      )}
    >
      {isEditing && (
        <ButtonCheck
          isChecked={isChecked}
          handleToggle={() => handleCheckChange(!isChecked)}
        />
      )}

      <div className="border-grayscale-200 h-[5.2rem] w-[5.2rem] flex-shrink-0 overflow-hidden rounded-full border">
        {profileImage ? (
          <img
            src={profileImage}
            alt={`${clientName} profile`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="bg-grayscale-200 h-full w-full bg-cover" />
        )}
      </div>

      <div className="flex flex-1 items-start justify-between gap-[1rem] overflow-hidden">
        <div className="flex flex-1 flex-col gap-[0.4rem] overflow-hidden">
          <div className="flex items-center gap-[0.6rem] overflow-hidden">
            <span className="text-grayscale-900 title-sb-16 block truncate leading-[1.5rem]">
              {clientName}
            </span>
            <Tag title={tagTitle} />
          </div>
          <span
            className={`caption-m-12 block truncate leading-[1.5rem] ${unreadCount > 0 ? "text-grayscale-900" : "text-grayscale-500"}`}
          >
            {lastChat}
          </span>
        </div>

        <div className="flex w-[5rem] flex-shrink-0 flex-col items-end gap-[0.6rem] pt-[0.3rem]">
          <span className="text-grayscale-500 caption-m-11 whitespace-nowrap">
            {lastChatTime}
          </span>
          {unreadCount > 0 && (
            <div className="bg-primary-500 caption-m-12 flex h-[1.8rem] items-center justify-center whitespace-nowrap rounded-full px-[0.5rem] text-white">
              {unreadCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
