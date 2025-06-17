// resources/js/Pages/Admin/Coupons/Reorder.tsx
import React, { useCallback, useRef, useState } from 'react';
// import { Inertia } from '@inertiajs/inertia'
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { toastDirection } from '@/lib/utils/Constants';
import { Head, router } from '@inertiajs/react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import toast from 'react-hot-toast';

const ItemType = 'COUPON';

interface Store {
    id: number;
    name: string;
}

interface Props {
    storeId: number;
    stores: Store[];
    coupons: Coupon[];
}
interface Coupon {
    id: number;
    title: string;
    featured_image: string;
}

interface Props {
    storeId: number;
    coupons: Coupon[];
}

interface DragItem {
    id: number;
    index: number;
}

const DraggableCoupon: React.FC<{
    coupon: Coupon;
    index: number;
    move: (from: number, to: number) => void;
}> = ({ coupon, index, move }) => {
    const ref = useRef<HTMLDivElement>(null);

    const [, drop] = useDrop<DragItem>({
        accept: ItemType,
        hover(item) {
            if (item.index === index) return;
            move(item.index, index);
            item.index = index;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { id: coupon.id, index },
        collect: (m) => ({ isDragging: m.isDragging() }),
    });

    drag(drop(ref));

    return (
        <div
            ref={ref}
            className={`flex flex-col items-center gap-4 rounded-lg bg-white p-4 shadow transition-opacity ${isDragging ? 'opacity-50' : 'opacity-100'}`}
        >
            <img src={coupon.featured_image} className="h-80 w-80 rounded" alt="" />
            <span>{coupon.title}</span>
        </div>
    );
};

export default function Reorder({ storeId, stores, coupons: initial }: Props) {
    const [selectedStoreId, setSelectedStoreId] = useState<number>(storeId);
    const [items, setItems] = useState<Coupon[]>(initial);

    const move = useCallback((from: number, to: number) => {
        setItems((prev) => {
            const next = [...prev];
            const [moved] = next.splice(from, 1);
            next.splice(to, 0, moved);
            return next;
        });
    }, []);

    const saveOrder = () => {
        const orderedIds = items.map((c) => c.id);
        router.post(
            route('admin.coupons.reorder', selectedStoreId),
            { orderedIds },
            {
                onSuccess: () => {
                    toast.success('Reordering of coupon done!😍', { position: toastDirection });
                },
            },
        );
    };

    const handleStoreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newId = parseInt(e.target.value);
        setSelectedStoreId(newId);
        router.visit(route('admin.coupons.reorder.edit', newId));
    };

    return (
        <AppLayout>
            <Head title="Reorder Coupons" />
            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Reorder Coupons</h1>
                    <select value={selectedStoreId} onChange={handleStoreChange} className="rounded border border-gray-300 px-3 py-2">
                        {stores.map((store) => (
                            <option key={store.id} value={store.id}>
                                {store.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mt-6 mb-1.5 flex justify-end">
                    <Button className="cursor-pointer" onClick={saveOrder}>
                        Save Order
                    </Button>
                </div>
                {!storeId && (
                    <TableRow>
                        <TableCell colSpan={6} className="py-6 text-center">
                            Result not found please select a store.
                        </TableCell>
                    </TableRow>
                )}
                <DndProvider backend={HTML5Backend}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {items.map((coupon, i) => (
                            <DraggableCoupon key={coupon.id} coupon={coupon} index={i} move={move} />
                        ))}
                    </div>
                </DndProvider>
            </div>
        </AppLayout>
    );
}
