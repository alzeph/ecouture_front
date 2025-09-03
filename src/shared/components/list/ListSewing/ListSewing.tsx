import { ScrollArea } from '@mantine/core';
// import styles from './list-sewing.module.css';
import { ListItemSewing } from '../ListItemSewing/ListItemSewing';
import React, { useMemo } from 'react';
import { useRef } from 'react';

export interface ListSewingProps {
  children?: React.ReactNode;
  separator?: boolean;
  skeleton?: boolean;
  infinite?: {
    limit: number
    total: number
    refresh: ({ page, limit }: { page: number, limit?: number }) => void
  }
  handleScrollBottom?: () => void
}

export const ListSewing = ({ children, separator = true, skeleton = false, handleScrollBottom }: ListSewingProps) => {
  const items = useMemo(() => React.Children.toArray(children), [children])
  const ref = useRef<HTMLDivElement>(null);

  return (
    <ScrollArea.Autosize
      h={"100%"}
      viewportRef={ref}
      onScrollPositionChange={() => {
        const elt = ref.current
        if (!elt) return
        const scrollTop = elt.scrollTop
        const clientHeight = elt.clientHeight;
        const scrollHeight = elt.scrollHeight;
        const isBottom = scrollTop + clientHeight >= scrollHeight - 60
        if (isBottom) {
          handleScrollBottom && handleScrollBottom();
        }
      }}
    >
      {skeleton || !items ? Array(5).fill(null).map((_, index) => <ListItemSewing key={index} skeleton />) : (
        items.map((child, index) => {
          return (
            <React.Fragment key={index}>
              {child}
              {separator && index < items.length - 1 && (
                <div style={{ height: '1px', backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />
              )}
            </React.Fragment>
          )
        })
      )}
    </ScrollArea.Autosize>
  );
};
