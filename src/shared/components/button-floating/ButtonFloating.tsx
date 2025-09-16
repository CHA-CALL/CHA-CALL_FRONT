import { useState, useEffect } from "react";
import { Icon } from "@components/icon/Icon";

export default function ButtonFloating() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsVisible(scrollTop > 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      className={`fixed bottom-[2.6rem] right-[2.4rem] flex h-[5rem] w-[5rem] items-center justify-center rounded-full bg-white pb-[0.3rem] pr-[0.1rem] shadow-[0_0_8px_0_rgba(0,0,0,0.08)]`}
    >
      <Icon name="ic_up" />
    </button>
  );
}
