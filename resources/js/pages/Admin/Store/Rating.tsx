import Pagination from '@/components/pagination'; // <-- You’ll create this
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Badge, BadgeAlert, BadgeCheck, BadgeInfo, BadgeXIcon } from 'lucide-react';
import { useState } from 'react';

interface Rating {
    id: number;
    ip_address: string;
    ratings?: number;
    is_approved?: number;
}
interface PaginatedData<T> {
    data: T[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        [key: string]: any;
    };
    links: {
        first?: string;
        last?: string;
        prev?: string;
        next?: string;
        [key: string]: any;
    };
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Store Ratings', href: route('admin.stores.index') }];

export default function Rating() {
    const { props, url } = usePage<{
        ratings: PaginatedData<Rating>;
        store_id: number,
        store_name: string,
        filters: { search?: string; sort?: string; direction?: string };
    }>();
    const { ratings, filters, store_id, store_name } = props;

    const [sort, setSort] = useState(filters.sort && 'created_at');
    const [direction, setDirection] = useState(filters.direction && 'desc');
    const [localRatings, setLocalRatings] = useState<Rating[]>(props.ratings.data);

    const [page, setPage] = useState(new URLSearchParams(url.split('?')[1]).get('page') || '1');

    const handleSort = (column: string) => {
        const newDirection = sort === column && direction === 'asc' ? 'desc' : 'asc';
        setSort(column);
        setDirection(newDirection);
        router.get(route('admin.stores.ratings', store_id), { search, sort: column, direction: newDirection }, { preserveScroll: true });
    };
    const changeStatus = (id: number, newStatus: number) => {
        setLocalRatings(prev =>
            prev.map(rating =>
                rating.id === id ? { ...rating, is_approved: newStatus } : rating
            )
        );
        router.post(route('admin.stores.update.ratings'), {
            data: { id: id, status: newStatus }
        })
    };
    const deleteRating = (rating: Rating) => {
        router.get(route('admin.stores.ratings.destroy', rating.id), { preserveScroll: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Stores" />
            <div className="p-5">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Ratings for Store: ( {store_name} )</h1>
                    <Link href={route("admin.stores.index")}>
                        <Button className='cursor-pointer'>Back to Listing</Button>
                    </Link>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead onClick={() => handleSort('ip_address')} className="cursor-pointer">
                                Ip Address {sort === 'ip_address' && (direction === 'asc' ? '↑' : '↓')}
                            </TableHead>
                            <TableHead onClick={() => handleSort('ratings')} className="cursor-pointer">
                                Rating {sort === 'ratings' && (direction === 'asc' ? '↑' : '↓')}
                            </TableHead>
                            <TableHead onClick={() => handleSort('is_approved')} className="cursor-pointer">
                                Status {sort === 'is_approved' && (direction === 'asc' ? '↑' : '↓')}
                            </TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {localRatings.map((rating) => (

                            <TableRow>
                                <TableCell>{rating?.ip_address}</TableCell>
                                <TableCell>{rating?.ratings}</TableCell>
                                <TableCell>
                                    <select
                                        value={rating?.is_approved}
                                        onChange={(e) => changeStatus(rating.id, parseInt(e.target.value))}
                                        className="bg-transparent border rounded-2xl px-2 py-1 text-white"
                                        style={{
                                            backgroundColor:
                                                'black'
                                        }}
                                    >
                                        <option value={0}>Pending</option>
                                        <option value={1}>Approved</option>
                                        <option value={2}>Rejected</option>
                                    </select>
                                </TableCell>
                                <TableCell className="space-x-2 text-right">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="sm">
                                                Delete
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action will permanently delete this store. This cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => deleteRating(rating)}>Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>

                <Pagination meta={ratings.meta} links={ratings.links} />
            </div>
        </AppLayout>
    );
}
