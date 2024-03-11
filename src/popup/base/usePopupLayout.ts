import { Layout } from "./Layout";

const DEFAULT_HORIZONTAL_PADDING = 100;
const DEFAULT_VERTICAL_PADDING = 50;

interface Props {
  layout: Layout;
}

export function usePopupLayout({ layout }: Props) {
  const x = layout.position?.[0] ?? DEFAULT_HORIZONTAL_PADDING;
  const y = layout.position?.[1] ?? DEFAULT_VERTICAL_PADDING;
  const left = layout.positionFromRight ? `calc(100% - ${x}px)` : x;
  const top = layout.positionFromBottom ? `calc(100% - ${y}px)` : y;
  const right = DEFAULT_HORIZONTAL_PADDING;
  const bottom = DEFAULT_VERTICAL_PADDING;
  const width = layout.size?.[0];
  const height = layout.size?.[1];

  return {
    left, top, right, bottom, width, height,
  };
}
