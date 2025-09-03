//import styles from './search-sheet.module.css';

import { useWindow } from "@features/core/hook";
import { closeModal } from "@features/core/slides";
import { Drawer, rgba, useMantineTheme } from "@mantine/core";
import type { RootState } from "@shared/services";
import { useDispatch, useSelector } from "react-redux";

export interface SearchSheetProps extends Omit<React.ComponentProps<
  typeof Drawer>,
  'children' | 'opened' | 'onClose' | 'title' | 'styles'> {
  children?: React.ReactNode;
  id: string;
  field?: React.ReactNode;
  onClose?: () => void;
  contentStyle?: React.CSSProperties;
}

export const SearchSheet = ({
  children,
  id,
  field,
  onClose,
  contentStyle,
  ...rest
}: SearchSheetProps) => {

  const { moreThan: { windowMobile } } = useWindow()
  const theme = useMantineTheme()
  const dispatch = useDispatch()
  const opened = useSelector((state: RootState) => state.modals.modals.some((m) => m.id === id));

  const handleClose = () => {
    onClose && onClose()
    dispatch(closeModal(id))
  }

  return (
    <Drawer
      offset={windowMobile ? 0 : 8}
      radius='lg'
      opened={opened}
      onClose={handleClose}
      title={
        <section style={{ borderBottom: `2px solid ${theme.colors.primary[4]}`, padding: theme.spacing.sm }}>
          {field}
        </section>
      }
      position='bottom'
      size={"sm"}
      overlayProps={{
        backgroundOpacity: 0.5,
        blur: 4,
        bg: rgba(theme.colors.secondary[9], 0.5),
      }}
      styles={{
        "root": {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        ...(windowMobile ? {} : {
          inner: {
            justifyContent: 'center',
            alignItems: 'center',
          },
        }),
        "content": {
          display: 'flex',
          width: windowMobile ? '100%' : 'auto',
          maxWidth: windowMobile ? '100%' : '600px',
          flexDirection: 'column',
          borderRadius: windowMobile ? `${theme.spacing.lg} ${theme.spacing.lg} 0 0` : theme.spacing.lg,

        },
        "body": {
          padding: 0,
          overflow: 'hidden',
        },
        "header": {
          display: 'flex',
          justifyContent: 'center',
          padding: 0,
          gap: 0,
        },
        "close": {
          display: 'none'
        },
        "title": { flex: 1 }
      }}
      {...rest}
    >
      <div style={{padding: theme.spacing.md}}>
        {children}
      </div>
    </Drawer>
  );
};
