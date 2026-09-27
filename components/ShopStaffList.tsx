import Image from "next/image"
import type { Staff } from "@/types/staff"

export default function ShopStaffList({ staffs }: { staffs: Staff[] }) {
  if (staffs.length === 0) {
    return <p className="text-sm text-slate-500">スタッフ情報は準備中です。</p>
  }

  return (
    <div className="flex flex-col gap-4">
      {staffs.map((staff) => (
        <div
          key={staff.id}
          className="flex items-start gap-4 rounded-2xl border border-slate-200 p-5"
        >
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
            <Image src={staff.imageUrl} alt={staff.name} fill className="object-cover" />
          </div>
          <div>
            <p className="font-medium text-slate-950">{staff.name}</p>
            <p className="mt-1 text-sm text-rose-600">{staff.specialty}</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">{staff.bio}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
