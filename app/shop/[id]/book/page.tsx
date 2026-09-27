// "use client"
import SectionHeading from '@/components/SectionHeading';
import { getShop } from '@/lib/services/shops';
import { notFound } from 'next/navigation';
// useState を使えるようにする場合は、"use client" を有効にする必要があります。
// import { useState } from 'react'

type BookingPageProps = {
    params: Promise<{ id: string }>;
};

export default async function BookingPage({ params }: BookingPageProps) {
    const { id } = await params;
    const shop = await getShop(id)
    if (!shop) notFound()

    return (
        <div>
            <SectionHeading
                eyebrow="Booking"
                title={`${shop.name} の予約`}
            description="メニュー・スタッフ・日時を選んで予約します。"
            />
        </div>
    )
}
