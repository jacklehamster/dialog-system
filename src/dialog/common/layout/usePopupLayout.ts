import { useLayoutContext } from "../../context/layout/LayoutContextProvider";
import { Layout } from "./Layout";

const DEFAULT_HORIZONTAL_PADDING = 100;
const DEFAULT_VERTICAL_PADDING = 50;

interface Props {
  layout: Layout;
}

export function usePopupLayout({ layout }: Props) {
  const { getLayout } = useLayoutContext();
  const layoutModel = getLayout(layout);
  const x = layoutModel.position?.[0] || DEFAULT_HORIZONTAL_PADDING;
  const y = layoutModel.position?.[1] || DEFAULT_VERTICAL_PADDING;
  const left = layoutModel.positionFromRight ? `calc(100% - ${x}px)` : x;
  const top = layoutModel.positionFromBottom ? `calc(100% - ${y}px)` : y;
  const right = DEFAULT_HORIZONTAL_PADDING;
  const bottom = DEFAULT_VERTICAL_PADDING;
  const width = layoutModel.size?.[0] || undefined;
  const height = layoutModel.size?.[1] || undefined;

  return { left, top, right, bottom, width, height };
}
