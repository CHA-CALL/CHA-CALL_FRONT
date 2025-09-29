interface ToggleSwitchProps {
  isToggled: boolean;
  handleToggle: () => void;
}

export default function ToggleSwitch({
  isToggled,
  handleToggle,
}: ToggleSwitchProps) {
  return (
    <button
      type='button'
      onClick={handleToggle}
      className={`
        relative inline-flex items-center
        w-[4.8rem] h-[3rem] ml-[2.1rem]
        rounded-full duration-200 ease-in-out
        ${isToggled ? 'bg-primary-500' : 'bg-grayscale-200'}
      `}
    >
      <span
        className={`
          inline-block w-[2.6rem] h-[2.6rem] mx-[0.2rem]
          bg-white rounded-full duration-200 ease-in-out
          shadow-[0_0_8px_rgba(0,0,0,0.08)]
          ${isToggled ? 'translate-x-[1.8rem]' : 'translate-x-[0]'}
        `}
      />
    </button>
  );
}