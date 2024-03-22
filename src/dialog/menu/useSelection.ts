import { useCallback, useEffect, useMemo, useState } from "react";
import { MenuModel } from "../model/MenuModel";

interface Props {
  menuData: MenuModel;
}

export function useSelection({ menuData }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scroll, setScroll] = useState(0);

  const scrollDown = useCallback(() => {
    const len = menuData.items.length.valueOf();
    setScroll(scroll => Math.min(len - (menuData.maxRows ?? len), scroll + 1));
  }, [setScroll, menuData]);
  const scrollUp = useCallback(() => setScroll(scroll => Math.max(0, scroll - 1)), [setScroll]);

  useEffect(() => {
    if (menuData.maxRows) {
      if (selectedIndex - scroll >= menuData.maxRows) {
        scrollDown();
      } else if (selectedIndex - scroll < 0) {
        scrollUp();
      }
    }
  }, [selectedIndex, scroll, menuData, scrollUp, scrollDown]);

  const select = useCallback((index: number) => {
    const len = menuData.items.length.valueOf();
    setSelectedIndex(Math.max(0, Math.min(index, len - 1)));
  }, [setSelectedIndex, menuData]);

  const moveSelection = useCallback((dy: number) => {
    if (dy) {
      const len = menuData.items.length.valueOf();
      setSelectedIndex(index => Math.max(0, Math.min(index + dy, len - 1)));
    }
  }, [setSelectedIndex, menuData]);

  const selectedItem = useMemo(() => menuData.items.at(selectedIndex), [menuData, selectedIndex]);

  return {
    select,
    moveSelection,
    selectedItem,
    scroll,
    scrollUp,
    scrollDown,
  }
}
