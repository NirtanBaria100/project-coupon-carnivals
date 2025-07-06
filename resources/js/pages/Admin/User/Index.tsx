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
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';


interface User {
    id: number;
    name: string;
    email:string | '',
    email_verified_at: string | "",
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

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Users', href: route('admin.users.index') }];

export default function Index() {
    const { props, url } = usePage<{
        users: PaginatedData<User>;
        filters: { search?: string; sort?: string; direction?: string };
    }>();
    const { users, filters } = props;
    const { patch, delete: destroy } = useForm();

    const [search, setSearch] = useState(filters.search && '');
    const [sort, setSort] = useState(filters.sort && 'created_at');
    const [direction, setDirection] = useState(filters.direction && 'desc');
    const [page, setPage] = useState(new URLSearchParams(url.split('?')[1]).get('page') || '1');

    const handleSearch = () => {
        setPage('1');
        router.get(
            route('admin.users.index'),
            {
                search,
                sort,
                direction,
                page: 1,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleSort = (column: string) => {
        const newDirection = sort === column && direction === 'asc' ? 'desc' : 'asc';
        setSort(column);
        setDirection(newDirection);
        router.get(route('admin.stores.index'), { search, sort: column, direction: newDirection }, { preserveScroll: true });
    };
    const toggleStatus = (id: number, field: keyof Coupon, value: boolean) => {
        patch(route(`admin.coupons.toggle`,id), {
            [field]: value,
            preserveScroll: true,
        });
    };
    const deleteStore = (store: Store) => {
        router.delete(route('admin.stores.destroy', store.id), { preserveScroll: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Stores" />
            <div className="p-5">


                <div className="mb-4 flex gap-2">
                    <Input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search stores..."
                        className="w-full md:w-1/3"
                    />
                    <Button onClick={handleSearch}>Search</Button>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
                                Name {sort === 'name' && (direction === 'asc' ? '↑' : '↓')}
                            </TableHead>
                            <TableHead onClick={() => handleSort('email')} className="cursor-pointer">
                                Email {sort === 'email' && (direction === 'asc' ? '↑' : '↓')}
                            </TableHead>
                            <TableHead  className="cursor-pointer">
                                Account Verified
                            </TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.data.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="py-6 text-center">
                                    No stores found.
                                </TableCell>
                            </TableRow>
                        )}
                        {users.data.map((user) => (
                            <TableRow key={user.id}>

                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Switch checked={user.email_verified_at} onCheckedChange={(val) => toggleStatus(user.id, 'email_verified_at', val)} />
                                </TableCell>
                                    <TableCell className="space-x-2 text-right">
                                        <Link href={route("admin.users.edit",user.id)}>
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
                                                    <AlertDialogAction onClick={() => deleteStore(user)}>Continue</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Pagination meta={users.meta} links={users.links} />
            </div>
        </AppLayout>
    );
}
