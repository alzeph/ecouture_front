import styles from './list-item-notification.module.css';

import type { InternalNotificatinoRead } from "@shared/api";
import { ListItemSewing } from "../ListItemSewing/ListItemSewing";
import { useState } from "react";
import { ActionIcon, ThemeIcon } from "@mantine/core";


import {
  IconUserPlus,
  IconUserEdit,
  IconUserMinus,
  IconPackage,
  IconPackageExport,
  IconPackageOff,
  IconFolders,
  IconFolder,
  IconFolderMinus,
  IconRulerMeasure,
  IconBuildingFactory2,
  IconCheck,
  IconX,
  IconSettings,
} from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useAuth, useWindow } from "@features/core/hook";

type CategoryIconMap = Record<
  Exclude<InternalNotificatinoRead['category'], undefined | null | "">,
  React.ReactNode
>;

const CATEGORIES_ICONS: CategoryIconMap = {
  WORKER_CREATION: <IconUserPlus />,
  WORKER_UPDATE: <IconUserEdit />,

  CUSTOMER_CREATION: <IconUserPlus />,
  CUSTOMER_UPDATE: <IconUserEdit />,
  CUSTOMER_DELETION: <IconUserMinus />,

  ORDER_CREATION: <IconPackage />,
  ORDER_UPDATE: <IconPackageExport />,
  ORDER_DELETION: <IconPackageOff />,

  ORDER_GROUP_CREATION: <IconFolders />,
  ORDER_GROUP_UPDATE: <IconFolder />,
  ORDER_GROUP_DELETION: <IconFolderMinus />,

  FITTING_CREATION: <IconRulerMeasure />,
  FITTING_UPDATE: <IconRulerMeasure />,
  FITTING_DELETION: <IconRulerMeasure />,

  WORKSHOP_CREATION: <IconBuildingFactory2 />,
  WORKSHOP_UPDATE: <IconBuildingFactory2 />,

  AUTHORISATION_ACCEPT: <IconCheck size={20} color="green" />,
  AUTHORISATION_REJECT: <IconX size={20} color="red" />,

  SETTING_CREATION: <IconSettings />,
  SETTING_UPDATE: <IconSettings />,
};

export interface ListItemNotificationProps {
  notification: InternalNotificatinoRead,
  skeleton?: boolean,
  test?: boolean,
  separator?:boolean
}

export const ListItemNotification = ({
  notification,
  skeleton = false,
  test = false,
  separator=false
}: ListItemNotificationProps) => {
  const [visible, setVisible] = useState<boolean>(true)
  const {moreThan : {windowMobile}} = useWindow()
  const { proxy } = useAuth()

  const notificationMutateRead = useMutation({
    mutationFn: async ({ notificationId }: { notificationId: string }) => {
      if (test) {
        return true
      }
      const response = await proxy.api.apiNotificationInternalPartialUpdate(notificationId, { is_read: true })
      return response.data
    },
    onSuccess: () => setVisible(false)
  })

  return (
    <div
    {...(separator && {style:{  borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }})}
    className={visible ? '' : styles.fade}>
      <ListItemSewing
        skeleton={skeleton}
        title={notification.title}
        titleProps={{ c: notification.type }}
        description={notification.message}
        leftSection={
          notification.category && (
            <ThemeIcon radius="xl" color={notification.type} size={windowMobile ? 30 : 50}>
              {CATEGORIES_ICONS[notification.category]}
            </ThemeIcon>
          )
        }
        rightSection={
          <ActionIcon
            color={notification.type}
            variant="transparent"
            size={20}
            onClick={() => notificationMutateRead.mutate({ notificationId: String(notification.id) })}
          >
            <IconX />
          </ActionIcon>
        }
      />
    </div>
  );
};
