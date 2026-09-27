export type Reservation = {
  id: string
  shopId: string
  menuId: string
  staffId: string | null
  date: string
  time: string
  notes: string
  status: "pending"
  createdAt: string
}
