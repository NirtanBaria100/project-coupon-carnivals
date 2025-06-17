import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { PaginatedData, type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

import Pagination from '@/components/pagination';
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

interface Coupon {
    id: number;
    title: string;
    is_published: boolean;
    is_featured: boolean;
    is_verified: boolean;
    is_exclusive: boolean;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Coupons',
        href: '/coupons',
    },
];

export default function Index() {
    const { patch, delete: destroy } = useForm();
    const { props, url } = usePage<{
        coupons: PaginatedData<Coupon>;
        filters: {
            search?: string;
            sort?: string;
            direction?: string;
        };
    }>();
    const coupons = props?.coupons;
    const filters = props?.filters || {};

    const [search, setSearch] = useState(filters.search && '');
    const [sortField, setSortField] = useState(filters.sort && 'created_at');
    const [sortDirection, setSortDirection] = useState(filters.direction && 'desc');
    const [page, setPage] = useState(new URLSearchParams(url.split('?')[1]).get('page') || '1');

    const handleSearch = () => {
        setPage('1');
        router.get(
            '/admin/coupons',
            {
                search,
                sort: sortField,
                direction: sortDirection,
                page: 1,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const toggleStatus = (id: number, field: keyof Coupon, value: boolean) => {
        patch(`/admin/coupons/${id}/toggle`, {
            [field]: value,
            preserveScroll: true,
        });
    };

    const deleteCoupon = (coupon: any) => {
        router.delete(route('admin.coupons.destroy', coupon.id), { preserveScroll: true });
    };

    const handleSort = (field: string) => {
        const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
        router.get(url.split('?')[0], { ...filters, sort: field, direction }, { preserveState: true, replace: true });
    };

    const renderSortIcon = (field: string) => {
        if (sortField !== field) return null;
        return sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Coupons" />
            <div className="p-5">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Coupons</h1>
                    <Link href="/admin/coupons/create">
                        <Button>Add Coupon</Button>
                    </Link>
                </div>

                <div className="mb-4 flex gap-2">
                    <Input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search Coupons..."
                        className="w-full md:w-1/3"
                    />
                    <Button onClick={handleSearch}>Search</Button>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead onClick={() => handleSort('title')} className="cursor-pointer">
                                Title {renderSortIcon('title')}
                            </TableHead>
                            <TableHead>Published</TableHead>
                            <TableHead>Featured</TableHead>
                            <TableHead>Verified</TableHead>
                            <TableHead>Exclusive</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                          {coupons.data.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="py-6 text-center">
                                    No coupons found.
                                </TableCell>
                            </TableRow>
                        )}
                        {coupons.data.map((coupon) => (
                            <TableRow key={coupon.id}>
                                <TableCell>{coupon.title}</TableCell>
                                <TableCell>
                                    <Switch checked={coupon.is_published} onCheckedChange={(val) => toggleStatus(coupon.id, 'is_published', val)} />
                                </TableCell>
                                <TableCell>
                                    <Switch checked={coupon.is_featured} onCheckedChange={(val) => toggleStatus(coupon.id, 'is_featured', val)} />
                                </TableCell>
                                <TableCell>
                                    <Switch checked={coupon.is_verified} onCheckedChange={(val) => toggleStatus(coupon.id, 'is_verified', val)} />
                                </TableCell>
                                <TableCell>
                                    <Switch checked={coupon.is_exclusive} onCheckedChange={(val) => toggleStatus(coupon.id, 'is_exclusive', val)} />
                                </TableCell>
                                <TableCell className="space-x-2 text-right">
                                    <Link href={`/admin/coupons/${coupon.id}/edit`}>
                                        <Button variant="outline" size="sm">
                                            Edit
                                        </Button>
                                    </Link>

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
                                                    This action will permanently delete this coupon. This cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => deleteCoupon(coupon)}>Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Pagination */}
                <Pagination
                    meta={coupons.meta}
                    links={coupons.links}
                    onPageChange={(newPage: any) => {
                        setPage(newPage);
                        router.get(
                            '/admin/coupons',
                            {
                                search,
                                sort: sortField,
                                direction: sortDirection,
                                page: newPage,
                            },
                            {
                                preserveState: true,
                            },
                        );
                    }}
                />
            </div>
        </AppLayout>
    );
}
