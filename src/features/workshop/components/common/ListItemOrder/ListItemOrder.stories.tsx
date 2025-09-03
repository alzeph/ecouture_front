import type { Meta, StoryObj } from '@storybook/react';
import { ListItemOrder } from './ListItemOrder';
import { CustomerWorkshopReadGenreEnum, OrderWorkshopReadGenderEnum, OrderWorkshopReadPaymentStatusEnum, OrderWorkshopReadStatusEnum, OrderWorkshopReadTypeOfClothingEnum, type OrderWorkshopRead } from '@shared/api';
import { useAuth } from '@features/core/hook';
import { useMemo } from 'react';

const meta: Meta<typeof ListItemOrder> = {
  title: 'features/workshop/components/common/ListItemOrder',
  component: ListItemOrder,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ListItemOrder>;

export const Default: Story = {
  render: () => {
    const { worker, workshop } = useAuth()
    const order = useMemo<OrderWorkshopRead>(() => (
      {
        id: 1,
        number: "4512478622",
        gender: OrderWorkshopReadGenderEnum.MAN,
        type_of_clothing: OrderWorkshopReadTypeOfClothingEnum.SHIRT,
        description: "description",
        measurement: {
          chest: 0,
          waist: 0,
          hips: 0,
          neck: 0,
          arm: 0,
          thigh: 0,
          calf: 0
        },
        description_of_fabric:"description_of_fabric",
        photo_of_fabric: null,
        clothing_model: "clothing_model",
        description_of_model: "description_of_model",
        photo_of_clothing_model: null,
        amount: "amount",
        down_payment: "down_payment",
        payment_status: OrderWorkshopReadPaymentStatusEnum.PAID,
        status: OrderWorkshopReadStatusEnum.IN_PROGRESS,
        is_urgent: true,
        assign_date: null,
        is_deleted: false,
        estimated_delivery_date: "estimated_delivery_date",
        promised_delivery_date: "promised_delivery_date",
        actual_delivery_date: null,
        createdAt: "2025-12-6",
        updatedAt: "2025-12-6",
        worker: worker as unknown as any,
        customer: {
          id: 1,
          last_name: "cedric herve",
          first_name: "Youan",
          nickname: "La boule",
          genre: CustomerWorkshopReadGenreEnum.MAN,
          email: null,
          phone: "0777537954",
          photo: null,
          is_active: true,
          createdAt: "2025-12-6",
          updatedAt: "2025-12-6",
          total_orders: "1",
          ongoing_orders: "1",
          urgent_orders: "1",
        },
        workshop: workshop,
        fittings: []
      }
    ), [worker, workshop])

    return <ListItemOrder order={order} />
  },
  args:{}
};
