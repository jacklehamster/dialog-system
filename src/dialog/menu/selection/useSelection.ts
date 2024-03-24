import { List } from "abstract-list";
import { useCallback, useEffect, useMemo, useState } from "react";

interface Props<T> {
  items: List<T>;
  maxRows?: number;
}

export function useSelection<T>({ items, maxRows }: Props<T>) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scroll, setScroll] = useState(0);

  const scrollDown = useCallback(() => {
    const len = items.length.valueOf();
    setScroll(scroll => Math.min(len - (maxRows ?? len), scroll + 1));
  }, [setScroll, items, maxRows]);
  const scrollUp = useCallback(() => setScroll(scroll => Math.max(0, scroll - 1)), [setScroll]);

  useEffect(() => {
    if (maxRows) {
      if (selectedIndex - scroll >= maxRows) {
        scrollDown();
      } else if (selectedIndex - scroll < 0) {
        scrollUp();
      }
    }
  }, [selectedIndex, scroll, maxRows, scrollUp, scrollDown]);

  const select = useCallback((index: number) => {
    const len = items.length.valueOf();
    setSelectedIndex(Math.max(0, Math.min(index, len - 1)));
  }, [setSelectedIndex, items]);

  const moveSelection = useCallback((dy: number) => {
    if (dy) {
      const len = items.length.valueOf();
      setSelectedIndex(index => Math.max(0, Math.min(index + dy, len - 1)));
    }
  }, [setSelectedIndex, items]);

  const selectedItem = useMemo(() => items.at(selectedIndex), [items, selectedIndex]);

  return {
    select,
    moveSelection,
    selectedItem,
    scroll,
    scrollUp,
    scrollDown,
    selectedIndex,
  }
}
