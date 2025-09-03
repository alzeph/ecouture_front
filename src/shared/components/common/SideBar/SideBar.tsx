//import styles from './side-bar.module.css';

import { useDrawerManager, usePlatform } from "@features/core/hook";
import { CustomerWorkshopForm, UserForm } from "@features/users/components/form";
import { NavLink } from "@mantine/core";
import { ROUTES } from "@shared/constants";
import { IconBoxSeam, IconHammer, IconHome, IconSettings, IconUser, IconUserPlus, IconUsersGroup } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';


export interface SideBarProps { 
}

export const SideBar = ({ }: SideBarProps) => {

  const [linkActive, setLinkActive] = useState<string>()
  const {isWeb} = usePlatform()
  const navigate = useNavigate();
  const {openDrawer} = useDrawerManager()
  const navigateTo = useCallback((route: string) => {
    navigate(route);
    // setLinkActive(route);
  }, []);

   const location = useLocation()

   useEffect(()=> {
    if(location){
      setLinkActive(location.pathname)
    }
   }, [location])

  return (
    <>
      <NavLink
        label="Tableau de bord"
        leftSection={<IconHome size={18} />}
        onClick={() => navigateTo(isWeb ? ROUTES.DASHBOARD : '/')}
        active={ isWeb ? linkActive === ROUTES.DASHBOARD : linkActive === '/'}
      />

      {/* gestion client */}
      <NavLink
        label="Cliens de l'atelier"
        leftSection={<IconUser size={16} />}
      >
        <NavLink
          label="Liste des clients"
          leftSection={<IconHome size={18} />}
          onClick={() => navigateTo(ROUTES.CLIENTS.LIST)}
          active={linkActive === ROUTES.CLIENTS.LIST}
        />
        <NavLink
          label="Ajouter"
          leftSection={<IconHome size={18} />}
          onClick={() => openDrawer({id: CustomerWorkshopForm.id})}
        />
      </NavLink>

      {/* gestion worker */}

      <NavLink
        label="Mes ouvriers"
        leftSection={<IconHammer size={16} />}
      >
        <NavLink
          label="Liste des ouvriers"
          leftSection={<IconUsersGroup size={18} />}
          onClick={() => navigateTo(ROUTES.WORKERS.LIST)}
          active={linkActive === ROUTES.WORKERS.LIST}
        />
        <NavLink
          label="Ajouter"
          leftSection={<IconUserPlus size={18} />}
          onClick={() => openDrawer({id: UserForm.id})}
        />
      </NavLink>

      {/* taches */}
      <NavLink
        label="Agenda"
        leftSection={<IconBoxSeam size={18} />}
        onClick={() => navigateTo(ROUTES.AGENDA)}
        active={linkActive === ROUTES.AGENDA}
      />

      {/* mercerie */}
      {/* <NavLink
        label="Mercerie"
        leftSection={<IconBoxSeam size={18} />}
        onClick={() => navigateTo(ROUTES.MERCERIE)}
        active={linkActive === ROUTES.MERCERIE}
      /> */}

      {/* parametre */}
      {/* <NavLink
        label="Profil"
        leftSection={<IconSettings size={18} />}
        onClick={() => navigateTo(ROUTES.PROFILE)}
        active={linkActive === ROUTES.PROFILE}
      /> */}

      {/* parametre */}
      <NavLink
        label="Parametre"
        leftSection={<IconSettings size={18} />}
        onClick={() => navigateTo(ROUTES.SETTINGS)}
        active={linkActive === ROUTES.SETTINGS}
      />
    </>
  );
};
