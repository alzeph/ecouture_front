// Configuration des routes
export const ROUTES = {
  DASHBOARD: "/dashboard",
  CLIENTS: {
    LIST: "/dashboard/clients/liste",
  },
  WORKERS: {
    LIST: "/dashboard/ouvriers/liste",
    ASSIGNMENTS: "/dashboard/ouvriers/affectations",
    SKILLS: "/dashboard/ouvriers/competences",
    SCHEDULES: "/dashboard/ouvriers/horaires",
  },
  ORDERS: {
    ALL: "/dashboard/commandes",
    IN_PROGRESS: "/dashboard/commandes/en-cours",
    DELIVERED: "/dashboard/commandes/livrees",
  },
  TASKS: "/dashboard/taches",
  AGENDA: "/dashboard/agenda",
  // PAYMENTS: {
  //   HISTORY: "/dashboard/paiements",
  //   INCOME: "/dashboard/paiements/entrees",
  //   EXPENSES: "/dashboard/paiements/sorties",
  // },
  MERCERIE: "/dashboard/mercerie",
  // INVOICES: "/dashboard/factures",
  // REPORTS: "/dashboard/rapports",
  PROFILE: "/dashboard/profil",
  SETTINGS: "/dashboard/parametres",
} as const;