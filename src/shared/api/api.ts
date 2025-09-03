/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ArticleInHaberdasheryRead {
  /** ID */
  pk: number;
  type_article: string;
  /** @maxLength 255 */
  name: string;
  /**
   * @format int64
   * @min -9223372036854776000
   * @max 9223372036854776000
   */
  quantity?: number;
  is_delete?: boolean;
  is_out?: boolean;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface ArticleInHaberdasheryWriteRequest {
  /** @minLength 1 */
  type_article: string;
  /**
   * @minLength 1
   * @maxLength 255
   */
  name: string;
  /**
   * @format int64
   * @min -9223372036854776000
   * @max 9223372036854776000
   */
  quantity?: number;
  is_out?: boolean;
}

export interface BarChartItem {
  date: string;
  Clients: number;
  Commandes: number;
}

export interface CustomerWorkshopRead {
  id: number;
  last_name: string;
  first_name: string;
  nickname: string;
  /**
   * * `MAN` - Homme
   * * `WOMAN` - Femme
   * * `CHILDREN` - Enfant
   */
  genre: CustomerWorkshopReadGenreEnum;
  /** @format email */
  email: string | null;
  phone: string | null;
  /**
   * Photo du client, optionnelle
   * @format uri
   */
  photo: string | null;
  is_active: boolean;
  total_orders: string;
  ongoing_orders: string;
  urgent_orders: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface CustomerWorkshopWriteRequest {
  /**
   * @minLength 1
   * @maxLength 255
   */
  last_name?: string;
  /**
   * @minLength 1
   * @maxLength 255
   */
  first_name?: string;
  /**
   * @minLength 1
   * @maxLength 255
   */
  nickname?: string;
  /**
   * * `MAN` - Homme
   * * `WOMAN` - Femme
   * * `CHILDREN` - Enfant
   */
  genre?: CustomerWorkshopWriteRequestGenreEnum;
  /**
   * @format email
   * @maxLength 254
   */
  email?: string | null;
  /** @maxLength 20 */
  phone?: string | null;
  /**
   * Photo du client, optionnelle
   * @format binary
   */
  photo?: File | null;
}

export interface ExistsResponse {
  exists: boolean;
}

/** Serializer for reading ExternalNotification data. */
export interface ExternalNotificationRead {
  id: number;
  /**
   * * `email` - Email
   * * `sms` - SMS
   * * `push` - Push Notification
   */
  type: ExternalNotificationReadTypeEnum;
  /** @format date */
  scheduled_for?: string | null;
  /** @maxLength 255 */
  title: string;
  message: string;
  is_sent?: boolean;
}

export interface FittingRead {
  id: number;
  fitting_number: number;
  /** @format date-time */
  scheduled_date: string;
  /** @format date-time */
  actual_date: string | null;
  notes: string | null;
  adjustments_needed: string | null;
  /**
   * * `SCHEDULED` - Scheduled
   * * `COMPLETED` - Completed
   * * `CANCELLED` - Cancelled
   * * `NEEDS_MAJOR_ADJUSTMENTS` - Needs Major Adjustments
   */
  status: FittingReadStatusEnum;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface FittingWriteRequest {
  order: number;
  /** @format date-time */
  scheduled_date?: string;
  /** @format date-time */
  actual_date?: string | null;
  notes?: string | null;
  adjustments_needed?: string | null;
  /**
   * * `SCHEDULED` - Scheduled
   * * `COMPLETED` - Completed
   * * `CANCELLED` - Cancelled
   * * `NEEDS_MAJOR_ADJUSTMENTS` - Needs Major Adjustments
   */
  status?: FittingWriteRequestStatusEnum;
}

export interface GroupRead {
  id: number;
  /** @maxLength 150 */
  name: string;
  permissions: PermissionRead[];
}

export interface HaberdasheryRead {
  workers: WorkerRead[];
  is_active?: boolean;
  /** @format date */
  end_date?: string | null;
}

/** Serializer for reading InternalNotification data. */
export interface InternalNotificatinoRead {
  id: number;
  /**
   * * `info` - Information
   * * `warning` - Avertissement
   * * `error` - Erreur
   * * `success` - Succès
   */
  type?: InternalNotificatinoReadTypeEnum;
  /** @format date-time */
  read_at?: string | null;
  /**
   * * `WORKER_CREATION` - Worker Creation
   * * `WORKER_UPDATE` - Worker Update
   * * `CUSTOMER_CREATION` - Customer Creation
   * * `CUSTOMER_UPDATE` - Customer Update
   * * `CUSTOMER_DELETION` - Customer Deletion
   * * `ORDER_CREATION` - Order Creation
   * * `ORDER_UPDATE` - Order Update
   * * `ORDER_DELETION` - Order Deletion
   * * `ORDER_GROUP_CREATION` - Order Group Creation
   * * `ORDER_GROUP_UPDATE` - Order Group Update
   * * `ORDER_GROUP_DELETION` - Order Group Deletion
   * * `FITTING_CREATION` - Fitting Creation
   * * `FITTING_UPDATE` - Fitting Update
   * * `FITTING_DELETION` - Fitting Deletion
   * * `WORKSHOP_CREATION` - Workshop Creation
   * * `WORKSHOP_UPDATE` - Workshop Update
   * * `AUTHORISATION_ACCEPT` - Authorisation Accept
   * * `AUTHORISATION_REJECT` - Authorisation Reject
   * * `SETTING_CREATION` - Setting Creation
   * * `SETTING_UPDATE` - Setting Update
   */
  category?: InternalNotificatinoReadCategoryEnum;
  /** @maxLength 255 */
  title: string;
  message: string;
  is_read?: boolean;
  /** @format date-time */
  createdAt: string;
}

export interface LineChartItem {
  date: string;
  orders: number;
}

export interface NotFound404Response {
  detail: string;
}

export interface OrderWorkshopGroupRead {
  id: number;
  number: string;
  description: string;
  orders: OrderWorkshopRead[];
  /**
   * @format decimal
   * @pattern ^-?\d{0,10}(?:\.\d{0,2})?$
   */
  total_amount: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface OrderWorkshopGroupWriteRequest {
  /**
   * @minLength 1
   * @maxLength 255
   */
  description?: string;
  orders: number[];
}

export interface OrderWorkshopRead {
  id: number;
  number: string;
  worker: WorkerRead;
  customer: CustomerWorkshopRead;
  /**
   * * `MAN` - Man
   * * `WOMAN` - Woman
   * * `CHILDREN` - Children
   */
  gender: OrderWorkshopReadGenderEnum;
  /**
   * * `SHIRT` - Shirt
   * * `PANTS` - Pants
   * * `DRESS` - Dress
   */
  type_of_clothing: OrderWorkshopReadTypeOfClothingEnum;
  description: string | null;
  measurement: any;
  description_of_fabric: string;
  /** @format uri */
  photo_of_fabric: string | null;
  clothing_model: string;
  description_of_model: string | null;
  /** @format uri */
  photo_of_clothing_model: string | null;
  /**
   * @format decimal
   * @pattern ^-?\d{0,8}(?:\.\d{0,2})?$
   */
  amount: string;
  /**
   * @format decimal
   * @pattern ^-?\d{0,8}(?:\.\d{0,2})?$
   */
  down_payment: string;
  /**
   * * `PENDING` - Pending
   * * `PARTIAL` - Partial
   * * `PAID` - Paid
   */
  payment_status: OrderWorkshopReadPaymentStatusEnum;
  /**
   * * `NEW` - New
   * * `IN_PROGRESS` - In Progress
   * * `COMPLETED` - Completed
   * * `CANCELLED` - Cancelled
   * * `DELETED` - Deleted
   */
  status: OrderWorkshopReadStatusEnum;
  is_urgent: boolean;
  /** @format date */
  assign_date: string | null;
  is_deleted: boolean;
  /** @format date */
  estimated_delivery_date: string;
  /** @format date */
  promised_delivery_date: string;
  /** @format date */
  actual_delivery_date: string | null;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  fittings: FittingRead[];
}

export interface OrderWorkshopWriteRequest {
  customer?: number;
  worker?: number;
  /**
   * * `MAN` - Man
   * * `WOMAN` - Woman
   * * `CHILDREN` - Children
   */
  gender?: OrderWorkshopWriteRequestGenderEnum;
  /**
   * * `SHIRT` - Shirt
   * * `PANTS` - Pants
   * * `DRESS` - Dress
   */
  type_of_clothing?: OrderWorkshopWriteRequestTypeOfClothingEnum;
  measurement?: any;
  description?: string | null;
  /**
   * @minLength 1
   * @maxLength 255
   */
  description_of_fabric?: string;
  /** @format binary */
  photo_of_fabric?: File | null;
  /**
   * @minLength 1
   * @maxLength 255
   */
  clothing_model?: string;
  description_of_model?: string | null;
  /** @format binary */
  photo_of_clothing_model?: File | null;
  /**
   * @format decimal
   * @pattern ^-?\d{0,8}(?:\.\d{0,2})?$
   */
  amount?: string;
  /**
   * @format decimal
   * @pattern ^-?\d{0,8}(?:\.\d{0,2})?$
   */
  down_payment?: string;
  /**
   * * `NEW` - New
   * * `IN_PROGRESS` - In Progress
   * * `COMPLETED` - Completed
   * * `CANCELLED` - Cancelled
   * * `DELETED` - Deleted
   */
  status?: OrderWorkshopWriteRequestStatusEnum;
  /** @format date */
  estimated_delivery_date?: string;
  /** @format date */
  promised_delivery_date?: string;
  /** @format date */
  actual_delivery_date?: string | null;
  is_urgent?: boolean;
}

export interface PackageHistoryRead {
  name: string;
  /**
   * @format decimal
   * @pattern ^-?\d{0,10}(?:\.\d{0,0})?$
   */
  price: string;
  /** @format date */
  start_date: string;
  info_paiement: any;
  /** @format date */
  end_date: string | null;
  is_active: boolean | null;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface PackageRead {
  /** ID */
  pk: number;
  /**
   * * `DEMO` - Demo
   * * `BASIC` - Basic
   * * `PREMIUM` - Premium
   * * `PRO` - Pro
   */
  name: PackageReadNameEnum;
  description: string;
  features: any;
  /**
   * @format decimal
   * @pattern ^-?\d{0,10}(?:\.\d{0,0})?$
   */
  price: string;
  duration: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface PaginatedArticleInHaberdasheryReadList {
  /** @example 123 */
  count: number;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=4"
   */
  next?: string | null;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=2"
   */
  previous?: string | null;
  results: ArticleInHaberdasheryRead[];
}

export interface PaginatedCustomerWorkshopReadList {
  /** @example 123 */
  count: number;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=4"
   */
  next?: string | null;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=2"
   */
  previous?: string | null;
  results: CustomerWorkshopRead[];
}

export interface PaginatedExternalNotificationReadList {
  /** @example 123 */
  count: number;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=4"
   */
  next?: string | null;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=2"
   */
  previous?: string | null;
  results: ExternalNotificationRead[];
}

export interface PaginatedGroupReadList {
  /** @example 123 */
  count: number;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=4"
   */
  next?: string | null;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=2"
   */
  previous?: string | null;
  results: GroupRead[];
}

export interface PaginatedInternalNotificatinoReadList {
  /** @example 123 */
  count: number;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=4"
   */
  next?: string | null;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=2"
   */
  previous?: string | null;
  results: InternalNotificatinoRead[];
}

export interface PaginatedOrderWorkshopGroupReadList {
  /** @example 123 */
  count: number;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=4"
   */
  next?: string | null;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=2"
   */
  previous?: string | null;
  results: OrderWorkshopGroupRead[];
}

export interface PaginatedOrderWorkshopReadList {
  /** @example 123 */
  count: number;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=4"
   */
  next?: string | null;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=2"
   */
  previous?: string | null;
  results: OrderWorkshopRead[];
}

export interface PaginatedPackageHistoryReadList {
  /** @example 123 */
  count: number;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=4"
   */
  next?: string | null;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=2"
   */
  previous?: string | null;
  results: PackageHistoryRead[];
}

export interface PaginatedPackageReadList {
  /** @example 123 */
  count: number;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=4"
   */
  next?: string | null;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=2"
   */
  previous?: string | null;
  results: PackageRead[];
}

export interface PaginatedPermissionReadList {
  /** @example 123 */
  count: number;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=4"
   */
  next?: string | null;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=2"
   */
  previous?: string | null;
  results: PermissionRead[];
}

export interface PaginatedTypeArticleInHaberdasheryReadList {
  /** @example 123 */
  count: number;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=4"
   */
  next?: string | null;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=2"
   */
  previous?: string | null;
  results: TypeArticleInHaberdasheryRead[];
}

export interface PaginatedWorkerReadList {
  /** @example 123 */
  count: number;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=4"
   */
  next?: string | null;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=2"
   */
  previous?: string | null;
  results: WorkerRead[];
}

export interface PaginatedWorkshopReadList {
  /** @example 123 */
  count: number;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=4"
   */
  next?: string | null;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=2"
   */
  previous?: string | null;
  results: WorkshopRead[];
}

export interface PatchedArticleInHaberdasheryWriteRequest {
  /** @minLength 1 */
  type_article?: string;
  /**
   * @minLength 1
   * @maxLength 255
   */
  name?: string;
  /**
   * @format int64
   * @min -9223372036854776000
   * @max 9223372036854776000
   */
  quantity?: number;
  is_out?: boolean;
}

export interface PatchedCustomerWorkshopWriteRequest {
  /**
   * @minLength 1
   * @maxLength 255
   */
  last_name?: string;
  /**
   * @minLength 1
   * @maxLength 255
   */
  first_name?: string;
  /**
   * @minLength 1
   * @maxLength 255
   */
  nickname?: string;
  /**
   * * `MAN` - Homme
   * * `WOMAN` - Femme
   * * `CHILDREN` - Enfant
   */
  genre?: PatchedCustomerWorkshopWriteRequestGenreEnum;
  /**
   * @format email
   * @maxLength 254
   */
  email?: string | null;
  /** @maxLength 20 */
  phone?: string | null;
  /**
   * Photo du client, optionnelle
   * @format binary
   */
  photo?: File | null;
}

export interface PatchedFittingWriteRequest {
  order?: number;
  /** @format date-time */
  scheduled_date?: string;
  /** @format date-time */
  actual_date?: string | null;
  notes?: string | null;
  adjustments_needed?: string | null;
  /**
   * * `SCHEDULED` - Scheduled
   * * `COMPLETED` - Completed
   * * `CANCELLED` - Cancelled
   * * `NEEDS_MAJOR_ADJUSTMENTS` - Needs Major Adjustments
   */
  status?: PatchedFittingWriteRequestStatusEnum;
}

/** Serializer for writing InternalNotification data. */
export interface PatchedInternalNotificationWriteRequest {
  is_read?: boolean;
}

export interface PatchedOrderWorkshopGroupWriteRequest {
  /**
   * @minLength 1
   * @maxLength 255
   */
  description?: string;
  orders?: number[];
}

export interface PatchedOrderWorkshopWriteRequest {
  customer?: number;
  worker?: number;
  /**
   * * `MAN` - Man
   * * `WOMAN` - Woman
   * * `CHILDREN` - Children
   */
  gender?: PatchedOrderWorkshopWriteRequestGenderEnum;
  /**
   * * `SHIRT` - Shirt
   * * `PANTS` - Pants
   * * `DRESS` - Dress
   */
  type_of_clothing?: PatchedOrderWorkshopWriteRequestTypeOfClothingEnum;
  measurement?: any;
  description?: string | null;
  /**
   * @minLength 1
   * @maxLength 255
   */
  description_of_fabric?: string;
  /** @format binary */
  photo_of_fabric?: File | null;
  /**
   * @minLength 1
   * @maxLength 255
   */
  clothing_model?: string;
  description_of_model?: string | null;
  /** @format binary */
  photo_of_clothing_model?: File | null;
  /**
   * @format decimal
   * @pattern ^-?\d{0,8}(?:\.\d{0,2})?$
   */
  amount?: string;
  /**
   * @format decimal
   * @pattern ^-?\d{0,8}(?:\.\d{0,2})?$
   */
  down_payment?: string;
  /**
   * * `NEW` - New
   * * `IN_PROGRESS` - In Progress
   * * `COMPLETED` - Completed
   * * `CANCELLED` - Cancelled
   * * `DELETED` - Deleted
   */
  status?: PatchedOrderWorkshopWriteRequestStatusEnum;
  /** @format date */
  estimated_delivery_date?: string;
  /** @format date */
  promised_delivery_date?: string;
  /** @format date */
  actual_delivery_date?: string | null;
  is_urgent?: boolean;
}

export interface PatchedSettingWriteRequest {
  worker_authorization_is_order?: number[];
  worker_authorization_is_fitting?: number[];
  worker_authorization_is_customer?: number[];
  worker_authorization_is_worker?: number[];
  worker_authorization_is_setting?: number[];
}

export interface PatchedTypeArticleInHaberdasheryWriteRequest {
  /**
   * @minLength 1
   * @maxLength 255
   */
  name?: string;
  /** @minLength 1 */
  description?: string;
}

export interface PatchedUserWriteRequest {
  /**
   * @minLength 1
   * @maxLength 150
   */
  first_name?: string;
  /**
   * @minLength 1
   * @maxLength 150
   */
  last_name?: string;
  /**
   * @format email
   * @minLength 1
   * @maxLength 254
   */
  email?: string;
  /**
   * @minLength 1
   * @maxLength 20
   */
  phone?: string;
  /** @format binary */
  photo?: File | null;
  /**
   * @minLength 1
   * @maxLength 128
   */
  password?: string;
  groups?: number[];
}

export interface PatchedWorkerWriteRequest {
  user?: UserWriteRequest;
  is_active?: boolean;
  is_allowed?: boolean;
  /** @format date-time */
  start_date?: string | null;
  /** @format date-time */
  end_date?: string | null;
  is_owner?: boolean;
}

export interface PatchedWorkshopWriteRequest {
  /**
   * @minLength 1
   * @maxLength 255
   */
  name?: string;
  /** @minLength 1 */
  description?: string;
  /**
   * @format email
   * @maxLength 254
   */
  email?: string | null;
  /**
   * @minLength 1
   * @maxLength 20
   */
  phone?: string;
  /**
   * @minLength 1
   * @maxLength 100
   */
  country?: string;
  /** @maxLength 100 */
  city?: string | null;
  /** @maxLength 255 */
  address?: string | null;
}

export interface PermissionRead {
  id: number;
  /** @maxLength 255 */
  name: string;
  /** @maxLength 100 */
  codename: string;
  content_type: number;
}

export interface PieChartItem {
  name: string;
  value: number;
}

export interface SettingRead {
  /** @format date */
  start_date: string | null;
  /** @format date */
  end_date: string | null;
  max_workers: number;
  max_orders: number;
  max_customers: number;
  max_fittings: number;
  max_order_groups: number;
  max_order_ongoing_by_worker: number;
  worker_authorization_is_order: number[];
  worker_authorization_is_fitting: number[];
  worker_authorization_is_customer: number[];
  worker_authorization_is_worker: number[];
  worker_authorization_is_setting: number[];
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface StatCustomersWorkshop {
  total_customers: number;
}

export interface StatOrdersWorkshop {
  total_orders: number;
  /** @format double */
  total_amount: number;
  total_paid: number;
  total_in_progress: number;
  /** @format double */
  avg_orders_per_client: number;
  bar_chart: BarChartItem[];
  line_chart: LineChartItem[];
  pie_chart: PieChartItem[];
}

export interface TokenObtainPair {
  access: string;
  refresh: string;
}

export interface TokenObtainPairRequest {
  /** @minLength 1 */
  email: string;
  /** @minLength 1 */
  password: string;
}

export interface TokenRefresh {
  access: string;
}

export interface TokenRefreshRequest {
  /** @minLength 1 */
  refresh: string;
}

export interface TypeArticleInHaberdasheryRead {
  /**
   * Slug
   * @maxLength 255
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  pk: string;
  /** @maxLength 255 */
  name: string;
  /**
   * @maxLength 255
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug: string;
  description: string;
  is_delete?: boolean;
}

export interface TypeArticleInHaberdasheryWriteRequest {
  /**
   * @minLength 1
   * @maxLength 255
   */
  name: string;
  /** @minLength 1 */
  description: string;
}

export interface UserRead {
  id: number;
  first_name: string;
  last_name: string;
  /** @format email */
  email: string;
  phone: string;
  /** @format uri */
  photo: string | null;
  /** @format date-time */
  last_login: string | null;
  is_staff: boolean;
  is_active: boolean;
  is_superuser: boolean;
  groups: GroupRead[];
  user_permissions: PermissionRead[];
  /** @format date-time */
  date_joined: string;
}

export interface UserWrite {
  id: number;
  /** @maxLength 150 */
  first_name?: string;
  /** @maxLength 150 */
  last_name?: string;
  /**
   * @format email
   * @maxLength 254
   */
  email?: string;
  /** @maxLength 20 */
  phone?: string;
  /** @format uri */
  photo?: string | null;
  groups?: number[];
}

export interface UserWriteRequest {
  /**
   * @minLength 1
   * @maxLength 150
   */
  first_name?: string;
  /**
   * @minLength 1
   * @maxLength 150
   */
  last_name?: string;
  /**
   * @format email
   * @minLength 1
   * @maxLength 254
   */
  email?: string;
  /**
   * @minLength 1
   * @maxLength 20
   */
  phone?: string;
  /** @format binary */
  photo?: File | null;
  /**
   * @minLength 1
   * @maxLength 128
   */
  password?: string;
  groups?: number[];
}

export interface ValidationError400 {
  /** Liste des messages d'erreur liés à ce champ. */
  field_name: string[];
}

export interface VerifyFieldRequest {
  /**
   * @format email
   * @minLength 1
   */
  verify: string;
  /**
   * @format email
   * @minLength 1
   */
  exclude?: string;
}

export interface WorkerAuthorisationRequest {
  worker_pk: number;
}

export interface WorkerRead {
  id: number;
  user: UserRead;
  workshop: WorkshopRead;
  is_active: boolean;
  is_owner: boolean;
  is_allowed: boolean;
  /** @format date-time */
  start_date: string | null;
  /** @format date-time */
  end_date: string | null;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  total_orders: string;
  ongoing_orders: string;
  ongoing_orders_by_days: string;
}

export interface WorkerWriteForWorkshop {
  id: number;
  user?: UserWrite;
  workshop?: WorkshopWrite;
  is_active?: boolean;
  is_allowed?: boolean;
  /** @format date-time */
  start_date?: string | null;
  /** @format date-time */
  end_date?: string | null;
  is_owner?: boolean;
}

export interface WorkerWriteForWorkshopRequest {
  user?: UserWriteRequest;
  workshop?: WorkshopWriteRequest;
  is_active?: boolean;
  is_allowed?: boolean;
  /** @format date-time */
  start_date?: string | null;
  /** @format date-time */
  end_date?: string | null;
  is_owner?: boolean;
}

export interface WorkerWriteRequest {
  user?: UserWriteRequest;
  is_active?: boolean;
  is_allowed?: boolean;
  /** @format date-time */
  start_date?: string | null;
  /** @format date-time */
  end_date?: string | null;
  is_owner?: boolean;
}

export interface WorkshopRead {
  name: string;
  /** @pattern ^[-a-zA-Z0-9_]+$ */
  slug: string;
  description: string;
  /** @format email */
  email: string | null;
  phone: string;
  country: string;
  city: string | null;
  address: string | null;
  /** @format date-time */
  createdAt: string;
  settings: SettingRead;
  /** @format date-time */
  updatedAt: string;
}

export interface WorkshopWrite {
  /** @maxLength 255 */
  name?: string;
  description?: string;
  /**
   * @format email
   * @maxLength 254
   */
  email?: string | null;
  /** @maxLength 20 */
  phone?: string;
  /** @maxLength 100 */
  country?: string;
  /** @maxLength 100 */
  city?: string | null;
  /** @maxLength 255 */
  address?: string | null;
  /** @pattern ^[-a-zA-Z0-9_]+$ */
  slug: string;
}

export interface WorkshopWriteRequest {
  /**
   * @minLength 1
   * @maxLength 255
   */
  name?: string;
  /** @minLength 1 */
  description?: string;
  /**
   * @format email
   * @maxLength 254
   */
  email?: string | null;
  /**
   * @minLength 1
   * @maxLength 20
   */
  phone?: string;
  /**
   * @minLength 1
   * @maxLength 100
   */
  country?: string;
  /** @maxLength 100 */
  city?: string | null;
  /** @maxLength 255 */
  address?: string | null;
}

/**
 * * `MAN` - Homme
 * * `WOMAN` - Femme
 * * `CHILDREN` - Enfant
 */
export enum CustomerWorkshopReadGenreEnum {
  MAN = "MAN",
  WOMAN = "WOMAN",
  CHILDREN = "CHILDREN",
}

/**
 * * `MAN` - Homme
 * * `WOMAN` - Femme
 * * `CHILDREN` - Enfant
 */
export enum CustomerWorkshopWriteRequestGenreEnum {
  MAN = "MAN",
  WOMAN = "WOMAN",
  CHILDREN = "CHILDREN",
}

/**
 * * `email` - Email
 * * `sms` - SMS
 * * `push` - Push Notification
 */
export enum ExternalNotificationReadTypeEnum {
  Email = "email",
  Sms = "sms",
  Push = "push",
}

/**
 * * `SCHEDULED` - Scheduled
 * * `COMPLETED` - Completed
 * * `CANCELLED` - Cancelled
 * * `NEEDS_MAJOR_ADJUSTMENTS` - Needs Major Adjustments
 */
export enum FittingReadStatusEnum {
  SCHEDULED = "SCHEDULED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  NEEDS_MAJOR_ADJUSTMENTS = "NEEDS_MAJOR_ADJUSTMENTS",
}

/**
 * * `SCHEDULED` - Scheduled
 * * `COMPLETED` - Completed
 * * `CANCELLED` - Cancelled
 * * `NEEDS_MAJOR_ADJUSTMENTS` - Needs Major Adjustments
 */
export enum FittingWriteRequestStatusEnum {
  SCHEDULED = "SCHEDULED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  NEEDS_MAJOR_ADJUSTMENTS = "NEEDS_MAJOR_ADJUSTMENTS",
}

/**
 * * `info` - Information
 * * `warning` - Avertissement
 * * `error` - Erreur
 * * `success` - Succès
 */
export enum InternalNotificatinoReadTypeEnum {
  Info = "info",
  Warning = "warning",
  Error = "error",
  Success = "success",
}

/**
 * * `WORKER_CREATION` - Worker Creation
 * * `WORKER_UPDATE` - Worker Update
 * * `CUSTOMER_CREATION` - Customer Creation
 * * `CUSTOMER_UPDATE` - Customer Update
 * * `CUSTOMER_DELETION` - Customer Deletion
 * * `ORDER_CREATION` - Order Creation
 * * `ORDER_UPDATE` - Order Update
 * * `ORDER_DELETION` - Order Deletion
 * * `ORDER_GROUP_CREATION` - Order Group Creation
 * * `ORDER_GROUP_UPDATE` - Order Group Update
 * * `ORDER_GROUP_DELETION` - Order Group Deletion
 * * `FITTING_CREATION` - Fitting Creation
 * * `FITTING_UPDATE` - Fitting Update
 * * `FITTING_DELETION` - Fitting Deletion
 * * `WORKSHOP_CREATION` - Workshop Creation
 * * `WORKSHOP_UPDATE` - Workshop Update
 * * `AUTHORISATION_ACCEPT` - Authorisation Accept
 * * `AUTHORISATION_REJECT` - Authorisation Reject
 * * `SETTING_CREATION` - Setting Creation
 * * `SETTING_UPDATE` - Setting Update
 */
export enum InternalNotificatinoReadCategoryEnum {
  WORKER_CREATION = "WORKER_CREATION",
  WORKER_UPDATE = "WORKER_UPDATE",
  CUSTOMER_CREATION = "CUSTOMER_CREATION",
  CUSTOMER_UPDATE = "CUSTOMER_UPDATE",
  CUSTOMER_DELETION = "CUSTOMER_DELETION",
  ORDER_CREATION = "ORDER_CREATION",
  ORDER_UPDATE = "ORDER_UPDATE",
  ORDER_DELETION = "ORDER_DELETION",
  ORDER_GROUP_CREATION = "ORDER_GROUP_CREATION",
  ORDER_GROUP_UPDATE = "ORDER_GROUP_UPDATE",
  ORDER_GROUP_DELETION = "ORDER_GROUP_DELETION",
  FITTING_CREATION = "FITTING_CREATION",
  FITTING_UPDATE = "FITTING_UPDATE",
  FITTING_DELETION = "FITTING_DELETION",
  WORKSHOP_CREATION = "WORKSHOP_CREATION",
  WORKSHOP_UPDATE = "WORKSHOP_UPDATE",
  AUTHORISATION_ACCEPT = "AUTHORISATION_ACCEPT",
  AUTHORISATION_REJECT = "AUTHORISATION_REJECT",
  SETTING_CREATION = "SETTING_CREATION",
  SETTING_UPDATE = "SETTING_UPDATE",
  Value = "",
}

/**
 * * `MAN` - Man
 * * `WOMAN` - Woman
 * * `CHILDREN` - Children
 */
export enum OrderWorkshopReadGenderEnum {
  MAN = "MAN",
  WOMAN = "WOMAN",
  CHILDREN = "CHILDREN",
}

/**
 * * `SHIRT` - Shirt
 * * `PANTS` - Pants
 * * `DRESS` - Dress
 */
export enum OrderWorkshopReadTypeOfClothingEnum {
  SHIRT = "SHIRT",
  PANTS = "PANTS",
  DRESS = "DRESS",
}

/**
 * * `PENDING` - Pending
 * * `PARTIAL` - Partial
 * * `PAID` - Paid
 */
export enum OrderWorkshopReadPaymentStatusEnum {
  PENDING = "PENDING",
  PARTIAL = "PARTIAL",
  PAID = "PAID",
}

/**
 * * `NEW` - New
 * * `IN_PROGRESS` - In Progress
 * * `COMPLETED` - Completed
 * * `CANCELLED` - Cancelled
 * * `DELETED` - Deleted
 */
export enum OrderWorkshopReadStatusEnum {
  NEW = "NEW",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  DELETED = "DELETED",
}

/**
 * * `MAN` - Man
 * * `WOMAN` - Woman
 * * `CHILDREN` - Children
 */
export enum OrderWorkshopWriteRequestGenderEnum {
  MAN = "MAN",
  WOMAN = "WOMAN",
  CHILDREN = "CHILDREN",
}

/**
 * * `SHIRT` - Shirt
 * * `PANTS` - Pants
 * * `DRESS` - Dress
 */
export enum OrderWorkshopWriteRequestTypeOfClothingEnum {
  SHIRT = "SHIRT",
  PANTS = "PANTS",
  DRESS = "DRESS",
}

/**
 * * `NEW` - New
 * * `IN_PROGRESS` - In Progress
 * * `COMPLETED` - Completed
 * * `CANCELLED` - Cancelled
 * * `DELETED` - Deleted
 */
export enum OrderWorkshopWriteRequestStatusEnum {
  NEW = "NEW",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  DELETED = "DELETED",
}

/**
 * * `DEMO` - Demo
 * * `BASIC` - Basic
 * * `PREMIUM` - Premium
 * * `PRO` - Pro
 */
export enum PackageReadNameEnum {
  DEMO = "DEMO",
  BASIC = "BASIC",
  PREMIUM = "PREMIUM",
  PRO = "PRO",
}

/**
 * * `MAN` - Homme
 * * `WOMAN` - Femme
 * * `CHILDREN` - Enfant
 */
export enum PatchedCustomerWorkshopWriteRequestGenreEnum {
  MAN = "MAN",
  WOMAN = "WOMAN",
  CHILDREN = "CHILDREN",
}

/**
 * * `SCHEDULED` - Scheduled
 * * `COMPLETED` - Completed
 * * `CANCELLED` - Cancelled
 * * `NEEDS_MAJOR_ADJUSTMENTS` - Needs Major Adjustments
 */
export enum PatchedFittingWriteRequestStatusEnum {
  SCHEDULED = "SCHEDULED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  NEEDS_MAJOR_ADJUSTMENTS = "NEEDS_MAJOR_ADJUSTMENTS",
}

/**
 * * `MAN` - Man
 * * `WOMAN` - Woman
 * * `CHILDREN` - Children
 */
export enum PatchedOrderWorkshopWriteRequestGenderEnum {
  MAN = "MAN",
  WOMAN = "WOMAN",
  CHILDREN = "CHILDREN",
}

/**
 * * `SHIRT` - Shirt
 * * `PANTS` - Pants
 * * `DRESS` - Dress
 */
export enum PatchedOrderWorkshopWriteRequestTypeOfClothingEnum {
  SHIRT = "SHIRT",
  PANTS = "PANTS",
  DRESS = "DRESS",
}

/**
 * * `NEW` - New
 * * `IN_PROGRESS` - In Progress
 * * `COMPLETED` - Completed
 * * `CANCELLED` - Cancelled
 * * `DELETED` - Deleted
 */
export enum PatchedOrderWorkshopWriteRequestStatusEnum {
  NEW = "NEW",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  DELETED = "DELETED",
}

export interface HaberdasheryArticlesListParams {
  /** A page number within the paginated result set. */
  page?: number;
}

export interface HaberdasheryTypesListParams {
  /** A page number within the paginated result set. */
  page?: number;
}

export interface NotificationExternalListParams {
  /** A page number within the paginated result set. */
  page?: number;
  workshopPk: string;
}

export interface NotificationInternalListParams {
  /** A page number within the paginated result set. */
  page?: number;
}

export interface UserGroupsListParams {
  /** A page number within the paginated result set. */
  page?: number;
}

export interface UserUserPermissionsListParams {
  /** A page number within the paginated result set. */
  page?: number;
}

export interface WorkshopListParams {
  /** A page number within the paginated result set. */
  page?: number;
}

export interface WorkshopCustomersWorkshopsListParams {
  /** Filtrer par genre */
  genre?: string;
  /** Filtrer si le client est actif ou non */
  is_active?: boolean;
  /** Nombre de résultats par page */
  limit?: number;
  /** Filtrer par plusieurs noms (last_name, first_name ou nickname). Exemple : ?name=cedric&name=paul */
  name?: string[];
  /** Numéro de la page à récupérer */
  page?: number;
  /** A unique value identifying this workshop. */
  slug: string;
}

export interface WorkshopOrdersListParams {
  /** Commandes créées après cette date */
  created_after?: string;
  /** Commandes créées avant cette date */
  created_before?: string;
  /** Filtrer par plusieurs noms (last_name, first_name ou nickname). Exemple : ?name=cedric&name=paul */
  customer?: number[];
  /** Commandes les commande a livrer après cette date */
  delivery_after?: string;
  /** Commandes a liver avant cette date */
  delivery_before?: string;
  /** Genre du client (choices: MAN, WOMAN, CHILDREN) */
  gender?: string;
  /** Filtrer les commandes urgentes */
  is_urgent?: boolean;
  /** Nombre de résultats par page */
  limit?: number;
  /** Numéro de la page à récupérer */
  page?: number;
  /** Statut du paiement (choices: PENDING, PARTIAL, PAID) */
  payment_status?: string;
  /** Recherche libre (descriptions, tissus, modèle) */
  q?: string;
  /** Statut de la commande (choices: NEW, IN_PROGRESS, COMPLETED, CANCELLED, DELETED) */
  status?: StatusEnum;
  /** Type de vêtement (choices: SHIRT, PANTS, DRESS) */
  type_of_clothing?: string;
  /** Filtrer par plusieurs noms (last_name, first_name ou nickname). Exemple : ?name=cedric&name=paul */
  worker?: number[];
  /** A unique value identifying this workshop. */
  slug: string;
}

/** Statut de la commande (choices: NEW, IN_PROGRESS, COMPLETED, CANCELLED, DELETED) */
export enum StatusEnum {
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
  DELETED = "DELETED",
  IN_PROGRESS = "IN_PROGRESS",
  NEW = "NEW",
}

/** Statut de la commande (choices: NEW, IN_PROGRESS, COMPLETED, CANCELLED, DELETED) */
export enum WorkshopOrdersListParams1StatusEnum {
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
  DELETED = "DELETED",
  IN_PROGRESS = "IN_PROGRESS",
  NEW = "NEW",
}

export interface WorkshopOrdersGroupsListParams {
  /** A page number within the paginated result set. */
  page?: number;
  /** A unique value identifying this workshop. */
  slug: string;
}

export interface WorkshopPackageHistoryListParams {
  /** A page number within the paginated result set. */
  page?: number;
  /** A unique value identifying this workshop. */
  slug: string;
}

export interface WorkshopStatsOrdersRetrieveParams {
  /** Commandes créées après cette date */
  created_after?: string;
  /** Commandes créées avant cette date */
  created_before?: string;
  /** ID du client */
  customer?: number;
  /** Genre du client (choices: MAN, WOMAN, CHILDREN) */
  gender?: string;
  /** Filtrer les commandes urgentes */
  is_urgent?: boolean;
  /** Nombre de résultats par page */
  limit?: number;
  /** Numéro de la page à récupérer */
  page?: number;
  /** Statut du paiement (choices: PENDING, PARTIAL, PAID) */
  payment_status?: string;
  /** Recherche libre (descriptions, tissus, modèle) */
  q?: string;
  /** Statut de la commande (choices: NEW, IN_PROGRESS, COMPLETED, CANCELLED, DELETED) */
  status?: string;
  /** Type de vêtement (choices: SHIRT, PANTS, DRESS) */
  type_of_clothing?: string;
  /** ID du tailleur/ouvrier */
  worker?: number;
  /** A unique value identifying this workshop. */
  slug: string;
}

export interface WorkshopUsersWorkersListParams {
  /** Filtrer sur l’état actif du worker */
  is_active?: boolean;
  /** Filtrer sur l’autorisation du worker */
  is_allowed?: boolean;
  /** Nombre de résultats par page */
  limit?: number;
  /** Numéro de la page à récupérer */
  page?: number;
  /** A unique value identifying this workshop. */
  slug: string;
}

export interface WorkshopPackageListListParams {
  /** A page number within the paginated result set. */
  page?: number;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title E-Couture API
 * @version 1.0.0
 *
 * Documentation de l’API E-Couture
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Takes a set of user credentials and returns an access and refresh JSON web token pair to prove the authentication of those credentials.
     *
     * @tags auth
     * @name AuthTokenCreate
     * @request POST:/api/auth/token/
     */
    authTokenCreate: (
      data: TokenObtainPairRequest,
      params: RequestParams = {},
    ) =>
      this.request<TokenObtainPair, any>({
        path: `/api/auth/token/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Takes a refresh type JSON web token and returns an access type JSON web token if the refresh token is valid.
     *
     * @tags auth
     * @name AuthTokenRefreshCreate
     * @request POST:/api/auth/token/refresh/
     */
    authTokenRefreshCreate: (
      data: TokenRefreshRequest,
      params: RequestParams = {},
    ) =>
      this.request<TokenRefresh, any>({
        path: `/api/auth/token/refresh/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Permet de vérifier si un email est déjà utilisé. Possibilité d'exclure un email existant.
     *
     * @tags haberdashery
     * @name HaberdasheryArticleNamesUniqueCreate
     * @summary Vérifie si un email existe
     * @request POST:/api/haberdashery/article-names-unique/{type_article_in_haberdashery_pk}/
     * @secure
     */
    haberdasheryArticleNamesUniqueCreate: (
      typeArticleInHaberdasheryPk: string,
      data: VerifyFieldRequest,
      params: RequestParams = {},
    ) =>
      this.request<ExistsResponse, ValidationError400>({
        path: `/api/haberdashery/article-names-unique/${typeArticleInHaberdasheryPk}/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Voir tous les articles
     *
     * @tags haberdashery
     * @name HaberdasheryArticlesList
     * @summary Voir tous les articles
     * @request GET:/api/haberdashery/articles/
     * @secure
     */
    haberdasheryArticlesList: (
      query: HaberdasheryArticlesListParams,
      params: RequestParams = {},
    ) =>
      this.request<PaginatedArticleInHaberdasheryReadList, NotFound404Response>(
        {
          path: `/api/haberdashery/articles/`,
          method: "GET",
          query: query,
          secure: true,
          format: "json",
          ...params,
        },
      ),

    /**
     * @description Crée un article
     *
     * @tags haberdashery
     * @name HaberdasheryArticlesCreate
     * @summary Crée un article
     * @request POST:/api/haberdashery/articles/
     * @secure
     */
    haberdasheryArticlesCreate: (
      data: ArticleInHaberdasheryWriteRequest,
      params: RequestParams = {},
    ) =>
      this.request<ArticleInHaberdasheryRead, NotFound404Response>({
        path: `/api/haberdashery/articles/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Voir un article
     *
     * @tags haberdashery
     * @name HaberdasheryArticlesRetrieve
     * @summary Voir un article
     * @request GET:/api/haberdashery/articles/{article_in_haberdashery_pk}/
     * @secure
     */
    haberdasheryArticlesRetrieve: (
      articleInHaberdasheryPk: string,
      params: RequestParams = {},
    ) =>
      this.request<ArticleInHaberdasheryRead, NotFound404Response>({
        path: `/api/haberdashery/articles/${articleInHaberdasheryPk}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Modifier un article
     *
     * @tags haberdashery
     * @name HaberdasheryArticlesPartialUpdate
     * @summary Modifier un article
     * @request PATCH:/api/haberdashery/articles/{article_in_haberdashery_pk}/
     * @secure
     */
    haberdasheryArticlesPartialUpdate: (
      articleInHaberdasheryPk: string,
      data: PatchedArticleInHaberdasheryWriteRequest,
      params: RequestParams = {},
    ) =>
      this.request<ArticleInHaberdasheryRead, NotFound404Response>({
        path: `/api/haberdashery/articles/${articleInHaberdasheryPk}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Supprimer un article
     *
     * @tags haberdashery
     * @name HaberdasheryArticlesDestroy
     * @summary Supprimer un article
     * @request DELETE:/api/haberdashery/articles/{article_in_haberdashery_pk}/
     * @secure
     */
    haberdasheryArticlesDestroy: (
      articleInHaberdasheryPk: string,
      params: RequestParams = {},
    ) =>
      this.request<ArticleInHaberdasheryRead, NotFound404Response>({
        path: `/api/haberdashery/articles/${articleInHaberdasheryPk}/`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Voir la haberdashery
     *
     * @tags haberdashery
     * @name HaberdasheryHaberdasheriesRetrieve
     * @summary Voir la haberdashery
     * @request GET:/api/haberdashery/haberdasheries/
     * @secure
     */
    haberdasheryHaberdasheriesRetrieve: (params: RequestParams = {}) =>
      this.request<HaberdasheryRead, NotFound404Response>({
        path: `/api/haberdashery/haberdasheries/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Voir tous les types d'article
     *
     * @tags haberdashery
     * @name HaberdasheryTypesList
     * @summary Voir tous les types d'article
     * @request GET:/api/haberdashery/types/
     * @secure
     */
    haberdasheryTypesList: (
      query: HaberdasheryTypesListParams,
      params: RequestParams = {},
    ) =>
      this.request<
        PaginatedTypeArticleInHaberdasheryReadList,
        NotFound404Response
      >({
        path: `/api/haberdashery/types/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Crée un type d'article
     *
     * @tags haberdashery
     * @name HaberdasheryTypesCreate
     * @summary Crée un type d'article
     * @request POST:/api/haberdashery/types/
     * @secure
     */
    haberdasheryTypesCreate: (
      data: TypeArticleInHaberdasheryWriteRequest,
      params: RequestParams = {},
    ) =>
      this.request<TypeArticleInHaberdasheryRead, NotFound404Response>({
        path: `/api/haberdashery/types/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Voir un type d'article
     *
     * @tags haberdashery
     * @name HaberdasheryTypesRetrieve
     * @summary Voir un type d'article
     * @request GET:/api/haberdashery/types/{type_article_in_haberdashery_pk}/
     * @secure
     */
    haberdasheryTypesRetrieve: (
      typeArticleInHaberdasheryPk: string,
      params: RequestParams = {},
    ) =>
      this.request<TypeArticleInHaberdasheryRead, NotFound404Response>({
        path: `/api/haberdashery/types/${typeArticleInHaberdasheryPk}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Modifier un type d'article
     *
     * @tags haberdashery
     * @name HaberdasheryTypesPartialUpdate
     * @summary Modifier un type d'article
     * @request PATCH:/api/haberdashery/types/{type_article_in_haberdashery_pk}/
     * @secure
     */
    haberdasheryTypesPartialUpdate: (
      typeArticleInHaberdasheryPk: string,
      data: PatchedTypeArticleInHaberdasheryWriteRequest,
      params: RequestParams = {},
    ) =>
      this.request<TypeArticleInHaberdasheryRead, NotFound404Response>({
        path: `/api/haberdashery/types/${typeArticleInHaberdasheryPk}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Supprimer un type d'article
     *
     * @tags haberdashery
     * @name HaberdasheryTypesDestroy
     * @summary Supprimer un type d'article
     * @request DELETE:/api/haberdashery/types/{type_article_in_haberdashery_pk}/
     * @secure
     */
    haberdasheryTypesDestroy: (
      typeArticleInHaberdasheryPk: string,
      params: RequestParams = {},
    ) =>
      this.request<TypeArticleInHaberdasheryRead, NotFound404Response>({
        path: `/api/haberdashery/types/${typeArticleInHaberdasheryPk}/`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Permet de vérifier si un email est déjà utilisé. Possibilité d'exclure un email existant.
     *
     * @tags haberdashery
     * @name HaberdasheryValidatorsNamesUniqueCreate
     * @summary Vérifie si un email existe
     * @request POST:/api/haberdashery/validators-names-unique/
     * @secure
     */
    haberdasheryValidatorsNamesUniqueCreate: (
      data: VerifyFieldRequest,
      params: RequestParams = {},
    ) =>
      this.request<ExistsResponse, ValidationError400>({
        path: `/api/haberdashery/validators-names-unique/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Voir si le worker est autorisé
     *
     * @tags haberdashery
     * @name HaberdasheryWorkerAuthorizedCreate
     * @summary Voir si le worker est autorisé
     * @request POST:/api/haberdashery/worker-authorized/
     * @secure
     */
    haberdasheryWorkerAuthorizedCreate: (params: RequestParams = {}) =>
      this.request<ExistsResponse, NotFound404Response>({
        path: `/api/haberdashery/worker-authorized/`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Voir les notifications externes
     *
     * @tags notification
     * @name NotificationExternalList
     * @summary Voir les notifications externes
     * @request GET:/api/notification/external/{workshop_pk}/
     * @secure
     */
    notificationExternalList: (
      { workshopPk, ...query }: NotificationExternalListParams,
      params: RequestParams = {},
    ) =>
      this.request<PaginatedExternalNotificationReadList, NotFound404Response>({
        path: `/api/notification/external/${workshopPk}/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Voir les notifications internes
     *
     * @tags notification
     * @name NotificationInternalList
     * @summary Voir les notifications internes
     * @request GET:/api/notification/internal/
     * @secure
     */
    notificationInternalList: (
      query: NotificationInternalListParams,
      params: RequestParams = {},
    ) =>
      this.request<PaginatedInternalNotificatinoReadList, NotFound404Response>({
        path: `/api/notification/internal/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Modifier une notification interne
     *
     * @tags notification
     * @name NotificationInternalPartialUpdate
     * @summary Modifier une notification interne
     * @request PATCH:/api/notification/internal/{notification_id}/
     * @secure
     */
    notificationInternalPartialUpdate: (
      notificationId: string,
      data: PatchedInternalNotificationWriteRequest,
      params: RequestParams = {},
    ) =>
      this.request<InternalNotificatinoRead, ValidationError400>({
        path: `/api/notification/internal/${notificationId}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description ViewSet pour la gestion des utilisateurs et la réinitialisation des mots de passe. Combine les actions de UserMixin et UserPasswordMixin.
     *
     * @tags user
     * @name UserForgotPasswordCreate
     * @request POST:/api/user/forgot-password/
     * @secure
     */
    userForgotPasswordCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/user/forgot-password/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description permet de mettre recuperer la liste des groupes
     *
     * @tags user
     * @name UserGroupsList
     * @summary recuperer la liste des groupes
     * @request GET:/api/user/groups/
     * @secure
     */
    userGroupsList: (query: UserGroupsListParams, params: RequestParams = {}) =>
      this.request<PaginatedGroupReadList, any>({
        path: `/api/user/groups/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description permet de recuperer les infos d'un utilisateur
     *
     * @tags user
     * @name UserInfoDetailRetrieve
     * @summary recuperer les infos d'un utilisateur
     * @request GET:/api/user/info-detail/
     * @secure
     */
    userInfoDetailRetrieve: (params: RequestParams = {}) =>
      this.request<WorkerRead, any>({
        path: `/api/user/info-detail/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Modifier le mot de passe d'un utilisateur donné.
     *
     * @tags user
     * @name UserModifyPasswordUpdate
     * @request PUT:/api/user/modify-password/{user_id}/
     * @secure
     */
    userModifyPasswordUpdate: (userId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/user/modify-password/${userId}/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * @description Modifier le mot de passe d'un utilisateur donné.
     *
     * @tags user
     * @name UserModifyPasswordPartialUpdate
     * @request PATCH:/api/user/modify-password/{user_id}/
     * @secure
     */
    userModifyPasswordPartialUpdate: (
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/user/modify-password/${userId}/`,
        method: "PATCH",
        secure: true,
        ...params,
      }),

    /**
     * @description permet de mettre à jour un utilisateur
     *
     * @tags user
     * @name UserModifyUpdate
     * @summary metre a jour un utilisateur
     * @request PUT:/api/user/modify/{user_id}/
     * @secure
     */
    userModifyUpdate: (
      userId: string,
      data: UserWriteRequest,
      params: RequestParams = {},
    ) =>
      this.request<UserRead, any>({
        path: `/api/user/modify/${userId}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description permet de mettre à jour un utilisateur
     *
     * @tags user
     * @name UserModifyPartialUpdate
     * @summary metre a jour un utilisateur
     * @request PATCH:/api/user/modify/{user_id}/
     * @secure
     */
    userModifyPartialUpdate: (
      userId: string,
      data: PatchedUserWriteRequest,
      params: RequestParams = {},
    ) =>
      this.request<UserRead, any>({
        path: `/api/user/modify/${userId}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description ViewSet pour la gestion des utilisateurs et la réinitialisation des mots de passe. Combine les actions de UserMixin et UserPasswordMixin.
     *
     * @tags user
     * @name UserResetPasswordCreate
     * @request POST:/api/user/reset-password/
     * @secure
     */
    userResetPasswordCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/user/reset-password/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description permet de mettre recuperer la liste des permissions
     *
     * @tags user
     * @name UserUserPermissionsList
     * @summary recuperer la liste des permissions
     * @request GET:/api/user/user-permissions/
     * @secure
     */
    userUserPermissionsList: (
      query: UserUserPermissionsListParams,
      params: RequestParams = {},
    ) =>
      this.request<PaginatedPermissionReadList, any>({
        path: `/api/user/user-permissions/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Permet de vérifier si un email est déjà utilisé. Possibilité d'exclure un email existant.
     *
     * @tags user
     * @name UserVerifyEmailCreate
     * @summary Vérifie si un email existe
     * @request POST:/api/user/verify-email/
     * @secure
     */
    userVerifyEmailCreate: (
      data: VerifyFieldRequest,
      params: RequestParams = {},
    ) =>
      this.request<ExistsResponse, any>({
        path: `/api/user/verify-email/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Vérifie que le mot de passe fourni correspond au mot de passe actuel de l'utilisateur.
     *
     * @tags user
     * @name UserVerifyPasswordActualCreate
     * @request POST:/api/user/verify-password-actual/{user_id}/
     * @secure
     */
    userVerifyPasswordActualCreate: (
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/user/verify-password-actual/${userId}/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description Permet de vérifier si un phone est déjà utilisé. Possibilité d'exclure un phone existant.
     *
     * @tags user
     * @name UserVerifyPhoneCreate
     * @summary Vérifie si un phone existe
     * @request POST:/api/user/verify-phone/
     * @secure
     */
    userVerifyPhoneCreate: (
      data: VerifyFieldRequest,
      params: RequestParams = {},
    ) =>
      this.request<ExistsResponse, any>({
        path: `/api/user/verify-phone/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description ViewSet for managing workshops.
     *
     * @tags workshop
     * @name WorkshopList
     * @request GET:/api/workshop/
     * @secure
     */
    workshopList: (query: WorkshopListParams, params: RequestParams = {}) =>
      this.request<PaginatedWorkshopReadList, any>({
        path: `/api/workshop/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description ViewSet for managing workshops.
     *
     * @tags workshop
     * @name WorkshopCreate
     * @request POST:/api/workshop/
     * @secure
     */
    workshopCreate: (
      data: WorkerWriteForWorkshopRequest,
      params: RequestParams = {},
    ) =>
      this.request<WorkerWriteForWorkshop, any>({
        path: `/api/workshop/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description ViewSet for managing workshops.
     *
     * @tags workshop
     * @name WorkshopRetrieve
     * @request GET:/api/workshop/{slug}/
     * @secure
     */
    workshopRetrieve: (slug: string, params: RequestParams = {}) =>
      this.request<WorkshopRead, any>({
        path: `/api/workshop/${slug}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description ViewSet for managing workshops.
     *
     * @tags workshop
     * @name WorkshopUpdate
     * @request PUT:/api/workshop/{slug}/
     * @secure
     */
    workshopUpdate: (
      slug: string,
      data: WorkshopWriteRequest,
      params: RequestParams = {},
    ) =>
      this.request<WorkshopWrite, any>({
        path: `/api/workshop/${slug}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description ViewSet for managing workshops.
     *
     * @tags workshop
     * @name WorkshopPartialUpdate
     * @request PATCH:/api/workshop/{slug}/
     * @secure
     */
    workshopPartialUpdate: (
      slug: string,
      data: PatchedWorkshopWriteRequest,
      params: RequestParams = {},
    ) =>
      this.request<WorkshopWrite, any>({
        path: `/api/workshop/${slug}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description ViewSet for managing workshops.
     *
     * @tags workshop
     * @name WorkshopDestroy
     * @request DELETE:/api/workshop/{slug}/
     * @secure
     */
    workshopDestroy: (slug: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/workshop/${slug}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description permet de recuperer la liste des clients de l'atelier
     *
     * @tags workshop
     * @name WorkshopCustomersWorkshopsList
     * @summary recuperer la liste des clients de l'atelier
     * @request GET:/api/workshop/{slug}/customers-workshops/
     * @secure
     */
    workshopCustomersWorkshopsList: (
      { slug, ...query }: WorkshopCustomersWorkshopsListParams,
      params: RequestParams = {},
    ) =>
      this.request<
        PaginatedCustomerWorkshopReadList,
        ValidationError400 | NotFound404Response
      >({
        path: `/api/workshop/${slug}/customers-workshops/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description permet de créer un client de l'atelier
     *
     * @tags workshop
     * @name WorkshopCustomersWorkshopsCreate
     * @summary créer un client de l'atelier
     * @request POST:/api/workshop/{slug}/customers-workshops/
     * @secure
     */
    workshopCustomersWorkshopsCreate: (
      slug: string,
      data: CustomerWorkshopWriteRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        CustomerWorkshopRead,
        ValidationError400 | NotFound404Response
      >({
        path: `/api/workshop/${slug}/customers-workshops/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description permet de recuperer un client
     *
     * @tags workshop
     * @name WorkshopCustomersWorkshopsRetrieve
     * @summary recuperer un client
     * @request GET:/api/workshop/{slug}/customers-workshops/{customer_pk}/
     * @secure
     */
    workshopCustomersWorkshopsRetrieve: (
      customerPk: string,
      slug: string,
      params: RequestParams = {},
    ) =>
      this.request<
        CustomerWorkshopRead,
        ValidationError400 | NotFound404Response
      >({
        path: `/api/workshop/${slug}/customers-workshops/${customerPk}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description permet de mettre a jour un client
     *
     * @tags workshop
     * @name WorkshopCustomersWorkshopsPartialUpdate
     * @summary mettre a jour un client
     * @request PATCH:/api/workshop/{slug}/customers-workshops/{customer_pk}/
     * @secure
     */
    workshopCustomersWorkshopsPartialUpdate: (
      customerPk: string,
      slug: string,
      data: PatchedCustomerWorkshopWriteRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        CustomerWorkshopRead,
        ValidationError400 | NotFound404Response
      >({
        path: `/api/workshop/${slug}/customers-workshops/${customerPk}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description permet de supprimer un client
     *
     * @tags workshop
     * @name WorkshopCustomersWorkshopsDestroy
     * @summary supprimer un client
     * @request DELETE:/api/workshop/{slug}/customers-workshops/{customer_pk}/
     * @secure
     */
    workshopCustomersWorkshopsDestroy: (
      customerPk: string,
      slug: string,
      params: RequestParams = {},
    ) =>
      this.request<void, ValidationError400 | NotFound404Response>({
        path: `/api/workshop/${slug}/customers-workshops/${customerPk}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description permet de verifier le numero de telephone d'un client existe ou non
     *
     * @tags workshop
     * @name WorkshopCustomersVerifyNumbersCreate
     * @summary verifier le numero de telephone d'un client existe ou non
     * @request POST:/api/workshop/{slug}/customers/verify-numbers/
     * @secure
     */
    workshopCustomersVerifyNumbersCreate: (
      slug: string,
      data: VerifyFieldRequest,
      params: RequestParams = {},
    ) =>
      this.request<ExistsResponse, ValidationError400 | NotFound404Response>({
        path: `/api/workshop/${slug}/customers/verify-numbers/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Crée un nouveau fitting dans l’atelier.
     *
     * @tags workshop
     * @name WorkshopFittingsCreate
     * @summary Créer un fitting
     * @request POST:/api/workshop/{slug}/fittings/
     * @secure
     */
    workshopFittingsCreate: (
      slug: string,
      data: FittingWriteRequest,
      params: RequestParams = {},
    ) =>
      this.request<FittingRead, ValidationError400 | NotFound404Response>({
        path: `/api/workshop/${slug}/fittings/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description permet de recuperer la liste des commandes
     *
     * @tags workshop
     * @name WorkshopOrdersList
     * @summary recuperer la liste des commandes
     * @request GET:/api/workshop/{slug}/orders/
     * @secure
     */
    workshopOrdersList: (
      { slug, ...query }: WorkshopOrdersListParams,
      params: RequestParams = {},
    ) =>
      this.request<
        PaginatedOrderWorkshopReadList,
        ValidationError400 | NotFound404Response
      >({
        path: `/api/workshop/${slug}/orders/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description permet de créer une commande
     *
     * @tags workshop
     * @name WorkshopOrdersCreate
     * @summary creer une commande
     * @request POST:/api/workshop/{slug}/orders/
     * @secure
     */
    workshopOrdersCreate: (
      slug: string,
      data: OrderWorkshopWriteRequest,
      params: RequestParams = {},
    ) =>
      this.request<OrderWorkshopRead, ValidationError400 | NotFound404Response>(
        {
          path: `/api/workshop/${slug}/orders/`,
          method: "POST",
          body: data,
          secure: true,
          type: ContentType.Json,
          format: "json",
          ...params,
        },
      ),

    /**
     * @description permet de recuperer une commande
     *
     * @tags workshop
     * @name WorkshopOrdersRetrieve
     * @summary recuperer une commande
     * @request GET:/api/workshop/{slug}/orders/{order_pk}/
     * @secure
     */
    workshopOrdersRetrieve: (
      orderPk: string,
      slug: string,
      params: RequestParams = {},
    ) =>
      this.request<OrderWorkshopRead, ValidationError400 | NotFound404Response>(
        {
          path: `/api/workshop/${slug}/orders/${orderPk}/`,
          method: "GET",
          secure: true,
          format: "json",
          ...params,
        },
      ),

    /**
     * @description permet de mettre a jour une commande
     *
     * @tags workshop
     * @name WorkshopOrdersPartialUpdate
     * @summary mettre a jour une commande
     * @request PATCH:/api/workshop/{slug}/orders/{order_pk}/
     * @secure
     */
    workshopOrdersPartialUpdate: (
      orderPk: string,
      slug: string,
      data: PatchedOrderWorkshopWriteRequest,
      params: RequestParams = {},
    ) =>
      this.request<OrderWorkshopRead, ValidationError400 | NotFound404Response>(
        {
          path: `/api/workshop/${slug}/orders/${orderPk}/`,
          method: "PATCH",
          body: data,
          secure: true,
          type: ContentType.Json,
          format: "json",
          ...params,
        },
      ),

    /**
     * @description permet de supprimer une commande
     *
     * @tags workshop
     * @name WorkshopOrdersDestroy
     * @summary supprimer une commande
     * @request DELETE:/api/workshop/{slug}/orders/{order_pk}/
     * @secure
     */
    workshopOrdersDestroy: (
      orderPk: string,
      slug: string,
      params: RequestParams = {},
    ) =>
      this.request<void, ValidationError400 | NotFound404Response>({
        path: `/api/workshop/${slug}/orders/${orderPk}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Modifie un fitting dans l’atelier.
     *
     * @tags workshop
     * @name WorkshopOrdersFittingsPartialUpdate
     * @summary Modifier un fitting
     * @request PATCH:/api/workshop/{slug}/orders/fittings/{fitting_pk}/
     * @secure
     */
    workshopOrdersFittingsPartialUpdate: (
      fittingPk: string,
      slug: string,
      data: PatchedFittingWriteRequest,
      params: RequestParams = {},
    ) =>
      this.request<FittingRead, ValidationError400 | NotFound404Response>({
        path: `/api/workshop/${slug}/orders/fittings/${fittingPk}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Supprime un fitting dans l’atelier.
     *
     * @tags workshop
     * @name WorkshopOrdersFittingsDestroy
     * @summary Supprimer un fitting
     * @request DELETE:/api/workshop/{slug}/orders/fittings/{fitting_pk}/
     * @secure
     */
    workshopOrdersFittingsDestroy: (
      fittingPk: string,
      slug: string,
      params: RequestParams = {},
    ) =>
      this.request<void, ValidationError400 | NotFound404Response>({
        path: `/api/workshop/${slug}/orders/fittings/${fittingPk}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description permet de recuperer la liste des groupes de commandes
     *
     * @tags workshop
     * @name WorkshopOrdersGroupsList
     * @summary recuperer la liste des groupes de commandes
     * @request GET:/api/workshop/{slug}/orders/groups/
     * @secure
     */
    workshopOrdersGroupsList: (
      { slug, ...query }: WorkshopOrdersGroupsListParams,
      params: RequestParams = {},
    ) =>
      this.request<
        PaginatedOrderWorkshopGroupReadList,
        ValidationError400 | NotFound404Response
      >({
        path: `/api/workshop/${slug}/orders/groups/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description permet de créer un groupe de commandes
     *
     * @tags workshop
     * @name WorkshopOrdersGroupsCreate
     * @summary creer un groupe de commandes
     * @request POST:/api/workshop/{slug}/orders/groups/
     * @secure
     */
    workshopOrdersGroupsCreate: (
      slug: string,
      data: OrderWorkshopGroupWriteRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        OrderWorkshopGroupRead,
        ValidationError400 | NotFound404Response
      >({
        path: `/api/workshop/${slug}/orders/groups/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description permet de recuperer un groupe de commandes
     *
     * @tags workshop
     * @name WorkshopOrdersGroupsRetrieve
     * @summary recuperer un groupe de commandes
     * @request GET:/api/workshop/{slug}/orders/groups/{order_group_pk}/
     * @secure
     */
    workshopOrdersGroupsRetrieve: (
      orderGroupPk: string,
      slug: string,
      params: RequestParams = {},
    ) =>
      this.request<
        OrderWorkshopGroupRead,
        ValidationError400 | NotFound404Response
      >({
        path: `/api/workshop/${slug}/orders/groups/${orderGroupPk}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description permet de mettre a jour un groupe de commandes
     *
     * @tags workshop
     * @name WorkshopOrdersGroupsPartialUpdate
     * @summary mettre a jour un groupe de commandes
     * @request PATCH:/api/workshop/{slug}/orders/groups/{order_group_pk}/
     * @secure
     */
    workshopOrdersGroupsPartialUpdate: (
      orderGroupPk: string,
      slug: string,
      data: PatchedOrderWorkshopGroupWriteRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        OrderWorkshopGroupRead,
        ValidationError400 | NotFound404Response
      >({
        path: `/api/workshop/${slug}/orders/groups/${orderGroupPk}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description permet de supprimer un groupe de commandes
     *
     * @tags workshop
     * @name WorkshopOrdersGroupsDestroy
     * @summary supprimer un groupe de commandes
     * @request DELETE:/api/workshop/{slug}/orders/groups/{order_group_pk}/
     * @secure
     */
    workshopOrdersGroupsDestroy: (
      orderGroupPk: string,
      slug: string,
      params: RequestParams = {},
    ) =>
      this.request<void, ValidationError400 | NotFound404Response>({
        path: `/api/workshop/${slug}/orders/groups/${orderGroupPk}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Permet de recupere la lsite de tout les abonnements
     *
     * @tags workshop
     * @name WorkshopPackageHistoryList
     * @summary recupere hytorique des abonnements
     * @request GET:/api/workshop/{slug}/package-history/
     * @secure
     */
    workshopPackageHistoryList: (
      { slug, ...query }: WorkshopPackageHistoryListParams,
      params: RequestParams = {},
    ) =>
      this.request<PaginatedPackageHistoryReadList, NotFound404Response>({
        path: `/api/workshop/${slug}/package-history/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Permet de payer un nouvelle abonnement
     *
     * @tags workshop
     * @name WorkshopPackageHistoryCreate
     * @summary payer un nouvelle abonnement
     * @request POST:/api/workshop/{slug}/package-history/
     * @secure
     */
    workshopPackageHistoryCreate: (slug: string, params: RequestParams = {}) =>
      this.request<PackageHistoryRead, NotFound404Response>({
        path: `/api/workshop/${slug}/package-history/`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Modifie un setting dans l’atelier.
     *
     * @tags workshop
     * @name WorkshopSettingPartialUpdate
     * @summary Modifier un setting
     * @request PATCH:/api/workshop/{slug}/setting/
     * @secure
     */
    workshopSettingPartialUpdate: (
      slug: string,
      data: PatchedSettingWriteRequest,
      params: RequestParams = {},
    ) =>
      this.request<SettingRead, ValidationError400 | NotFound404Response>({
        path: `/api/workshop/${slug}/setting/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Voir si il le quota de clients est atteint
     *
     * @tags workshop
     * @name WorkshopSettingCustomersAuthorisedRetrieve
     * @summary Voir si il le quota de clients est atteint
     * @request GET:/api/workshop/{slug}/setting/customers/authorised/
     * @secure
     */
    workshopSettingCustomersAuthorisedRetrieve: (
      slug: string,
      params: RequestParams = {},
    ) =>
      this.request<ExistsResponse, NotFound404Response>({
        path: `/api/workshop/${slug}/setting/customers/authorised/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Voir si il le quota de ajustements est atteint
     *
     * @tags workshop
     * @name WorkshopSettingFittingsAuthorisedRetrieve
     * @summary Voir si il le quota de ajustements est atteint
     * @request GET:/api/workshop/{slug}/setting/fittings/authorised/
     * @secure
     */
    workshopSettingFittingsAuthorisedRetrieve: (
      slug: string,
      params: RequestParams = {},
    ) =>
      this.request<ExistsResponse, NotFound404Response>({
        path: `/api/workshop/${slug}/setting/fittings/authorised/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Voir si il le quota de commandes est atteint
     *
     * @tags workshop
     * @name WorkshopSettingOrdersAuthorisedRetrieve
     * @summary Voir si il le quota de commandes est atteint
     * @request GET:/api/workshop/{slug}/setting/orders/authorised/
     * @secure
     */
    workshopSettingOrdersAuthorisedRetrieve: (
      slug: string,
      params: RequestParams = {},
    ) =>
      this.request<ExistsResponse, NotFound404Response>({
        path: `/api/workshop/${slug}/setting/orders/authorised/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Voir si il le quota de tralleurs est atteint
     *
     * @tags workshop
     * @name WorkshopSettingWorkersAuthorisedRetrieve
     * @summary Voir si il le quota de tralleurs est atteint
     * @request GET:/api/workshop/{slug}/setting/workers/authorised/
     * @secure
     */
    workshopSettingWorkersAuthorisedRetrieve: (
      slug: string,
      params: RequestParams = {},
    ) =>
      this.request<ExistsResponse, NotFound404Response>({
        path: `/api/workshop/${slug}/setting/workers/authorised/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Voir si le tralleur est autorisé à créer un client
     *
     * @tags workshop
     * @name WorkshopSettingsCustomersWorkerAuthorisedCreate
     * @summary Voir si le tralleur est autorisé à créer un client
     * @request POST:/api/workshop/{slug}/settings/customers/worker-authorised/
     * @secure
     */
    workshopSettingsCustomersWorkerAuthorisedCreate: (
      slug: string,
      data: WorkerAuthorisationRequest,
      params: RequestParams = {},
    ) =>
      this.request<ExistsResponse, NotFound404Response>({
        path: `/api/workshop/${slug}/settings/customers/worker-authorised/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Voir si le tralleur est autorisé à créer un ajustement
     *
     * @tags workshop
     * @name WorkshopSettingsFittingsWorkerAuthorisedCreate
     * @summary Voir si le tralleur est autorisé à créer un ajustement
     * @request POST:/api/workshop/{slug}/settings/fittings/worker-authorised/
     * @secure
     */
    workshopSettingsFittingsWorkerAuthorisedCreate: (
      slug: string,
      data: WorkerAuthorisationRequest,
      params: RequestParams = {},
    ) =>
      this.request<ExistsResponse, NotFound404Response>({
        path: `/api/workshop/${slug}/settings/fittings/worker-authorised/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Voir si le tralleur est autorisé à créer une commande
     *
     * @tags workshop
     * @name WorkshopSettingsOrdersWorkerAuthorisedCreate
     * @summary Voir si le tralleur est autorisé à créer une commande
     * @request POST:/api/workshop/{slug}/settings/orders/worker-authorised/
     * @secure
     */
    workshopSettingsOrdersWorkerAuthorisedCreate: (
      slug: string,
      data: WorkerAuthorisationRequest,
      params: RequestParams = {},
    ) =>
      this.request<ExistsResponse, NotFound404Response>({
        path: `/api/workshop/${slug}/settings/orders/worker-authorised/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Voir si le tralleur est autorisé à créer un ajustement
     *
     * @tags workshop
     * @name WorkshopSettingsSettingsWorkerAuthorisedCreate
     * @summary Voir si le tralleur est autorisé à créer un ajustement
     * @request POST:/api/workshop/{slug}/settings/settings/worker-authorised/
     * @secure
     */
    workshopSettingsSettingsWorkerAuthorisedCreate: (
      slug: string,
      data: WorkerAuthorisationRequest,
      params: RequestParams = {},
    ) =>
      this.request<ExistsResponse, NotFound404Response>({
        path: `/api/workshop/${slug}/settings/settings/worker-authorised/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Voir si le tralleur est autorisé à créer un ajustement
     *
     * @tags workshop
     * @name WorkshopSettingsWorkersWorkerAuthorisedCreate
     * @summary Voir si le tralleur est autorisé à créer un ajustement
     * @request POST:/api/workshop/{slug}/settings/workers/worker-authorised/
     * @secure
     */
    workshopSettingsWorkersWorkerAuthorisedCreate: (
      slug: string,
      data: WorkerAuthorisationRequest,
      params: RequestParams = {},
    ) =>
      this.request<ExistsResponse, NotFound404Response>({
        path: `/api/workshop/${slug}/settings/workers/worker-authorised/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Statistiques sur les clients
     *
     * @tags workshop
     * @name WorkshopStatsCustomersRetrieve
     * @summary Statistiques sur les clients
     * @request GET:/api/workshop/{slug}/stats/customers/
     * @secure
     */
    workshopStatsCustomersRetrieve: (
      slug: string,
      params: RequestParams = {},
    ) =>
      this.request<StatCustomersWorkshop, NotFound404Response>({
        path: `/api/workshop/${slug}/stats/customers/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Statistiques sur les commandes
     *
     * @tags workshop
     * @name WorkshopStatsOrdersRetrieve
     * @summary Statistiques sur les commandes
     * @request GET:/api/workshop/{slug}/stats/orders/
     * @secure
     */
    workshopStatsOrdersRetrieve: (
      { slug, ...query }: WorkshopStatsOrdersRetrieveParams,
      params: RequestParams = {},
    ) =>
      this.request<StatOrdersWorkshop, NotFound404Response>({
        path: `/api/workshop/${slug}/stats/orders/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Retourne la liste paginée des workers d’un atelier.
     *
     * @tags workshop
     * @name WorkshopUsersWorkersList
     * @summary Récupérer les workers
     * @request GET:/api/workshop/{slug}/users/workers/
     * @secure
     */
    workshopUsersWorkersList: (
      { slug, ...query }: WorkshopUsersWorkersListParams,
      params: RequestParams = {},
    ) =>
      this.request<
        PaginatedWorkerReadList,
        ValidationError400 | NotFound404Response
      >({
        path: `/api/workshop/${slug}/users/workers/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Crée un nouveau worker dans l’atelier.
     *
     * @tags workshop
     * @name WorkshopUsersWorkersCreate
     * @summary Créer un worker
     * @request POST:/api/workshop/{slug}/users/workers/
     * @secure
     */
    workshopUsersWorkersCreate: (
      slug: string,
      data: WorkerWriteRequest,
      params: RequestParams = {},
    ) =>
      this.request<WorkerRead, ValidationError400 | NotFound404Response>({
        path: `/api/workshop/${slug}/users/workers/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description permet de recuperer un worker
     *
     * @tags workshop
     * @name WorkshopUsersWorkersRetrieve
     * @summary recuperer un worker
     * @request GET:/api/workshop/{slug}/users/workers/{worker_pk}/
     * @secure
     */
    workshopUsersWorkersRetrieve: (
      slug: string,
      workerPk: string,
      params: RequestParams = {},
    ) =>
      this.request<WorkerRead, ValidationError400 | NotFound404Response>({
        path: `/api/workshop/${slug}/users/workers/${workerPk}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description permet de mettre a jour un worker
     *
     * @tags workshop
     * @name WorkshopUsersWorkersPartialUpdate
     * @summary mettre a jour un worker
     * @request PATCH:/api/workshop/{slug}/users/workers/{worker_pk}/
     * @secure
     */
    workshopUsersWorkersPartialUpdate: (
      slug: string,
      workerPk: string,
      data: PatchedWorkerWriteRequest,
      params: RequestParams = {},
    ) =>
      this.request<WorkerRead, ValidationError400 | NotFound404Response>({
        path: `/api/workshop/${slug}/users/workers/${workerPk}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description permet de supprimer un worker
     *
     * @tags workshop
     * @name WorkshopUsersWorkersDestroy
     * @summary supprimer un worker
     * @request DELETE:/api/workshop/{slug}/users/workers/{worker_pk}/
     * @secure
     */
    workshopUsersWorkersDestroy: (
      slug: string,
      workerPk: string,
      params: RequestParams = {},
    ) =>
      this.request<void, ValidationError400 | NotFound404Response>({
        path: `/api/workshop/${slug}/users/workers/${workerPk}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Permet de recupere la liste des package disponibles
     *
     * @tags workshop
     * @name WorkshopPackageListList
     * @summary Liste des package
     * @request GET:/api/workshop/package-list/
     * @secure
     */
    workshopPackageListList: (
      query: WorkshopPackageListListParams,
      params: RequestParams = {},
    ) =>
      this.request<PaginatedPackageReadList, any>({
        path: `/api/workshop/package-list/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Permet de vérifier si un email est déjà utilisé. Possibilité d'exclure un email existant.
     *
     * @tags workshop
     * @name WorkshopValidatorsNamesUniqueCreate
     * @summary Vérifie si un email existe
     * @request POST:/api/workshop/validators-names-unique/
     * @secure
     */
    workshopValidatorsNamesUniqueCreate: (
      data: VerifyFieldRequest,
      params: RequestParams = {},
    ) =>
      this.request<ExistsResponse, ValidationError400>({
        path: `/api/workshop/validators-names-unique/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
