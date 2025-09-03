//import styles from './nav-bar.module.css';

import { useAuth, useDrawerManager, useWindow } from "@features/core/hook";
import { ActionIcon, Flex, Group, Menu, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { IconLogin2, IconMoodNerd, IconSearch, IconSettings, IconSunHigh, IconTrash, IconUserEdit } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { AvatarSewing } from "../AvatarSewing/AvatarSewing";
import { ListNotification, ListSearchCustomer } from "@shared/components/list";
import logoCouture from "@assets/logo/logo.png"
import { useNavigate } from "react-router-dom";
import { openModal } from "@features/core/slides";
import { ROUTES } from "@shared/constants";
import { CUSTOMER_WORKSHOP_SEARCH_MODAL, LOGIN_FORM_MODAL } from "@shared/constants/modal_id";
import { LoginForm, UserForm } from "@features/users/components/form";


export interface NavBarProps {
  test?: boolean
}

export const NavBar = ({ test }: NavBarProps) => {
  const { isAuthenticated, worker } = useAuth()
  const { moreThan: { windowMobile } } = useWindow()
  const theme = useMantineTheme()
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const toggleColorScheme = () =>
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { openDrawer } = useDrawerManager()

  return (
    <Flex justify="space-between" align="center" w="100%">
      <Group>
        <img src={logoCouture} style={{ height: 20, width: 20, marginInlineStart: theme.spacing.sm }} />
        <ActionIcon
          variant='transparent'
          onClick={toggleColorScheme}
          size="lg">
          {colorScheme === 'dark' ? (
            <IconMoodNerd />
          ) : (
            <IconSunHigh />
          )}
        </ActionIcon>
        <ListSearchCustomer test={test} />
      </Group>

      <Group>


        <ListNotification test={test} />

        {/* menu principale */}
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <AvatarSewing photo={worker?.user?.photo || undefined} name={worker?.user?.last_name || ''} username={worker?.user?.first_name || ''} noName={windowMobile} />
          </Menu.Target>
          <Menu.Dropdown>
            {!isAuthenticated &&
              <Menu.Item
                onClick={() => openDrawer({ id: LoginForm.id })}
                color="primary"
                leftSection={<IconLogin2 size={14} />}>
                connexion
              </Menu.Item>}
            <Menu.Label>Application</Menu.Label>
            <Menu.Item
              onClick={() => openDrawer({ id: UserForm.id, data: { worker } })}
              disabled={!isAuthenticated}
              leftSection={<IconUserEdit size={14} />}>
              Profil
            </Menu.Item>

            <Menu.Divider />
            <Menu.Item
              disabled={!isAuthenticated}
              onClick={() => dispatch(openModal({ id: CUSTOMER_WORKSHOP_SEARCH_MODAL }))}
              leftSection={<IconSearch size={14} />}>Search</Menu.Item>

            <Menu.Divider />

            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item
              onClick={() => navigate(ROUTES.SETTINGS)}
              disabled={!isAuthenticated}
              leftSection={<IconSettings size={14} />}>Settings</Menu.Item>
            {isAuthenticated &&
              <Menu.Item
                onClick={() => dispatch(openModal({ id: LOGIN_FORM_MODAL }))}
                color="red"
                leftSection={<IconTrash size={14} />}>
                deconnexion
              </Menu.Item>}
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Flex>
  );
};
