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
import { useState } from 'react';

interface Rating {
    id: number;
    name: string;
    slug: string;
    desc?: string;
    home_url?: string;
    is_featured: boolean;
    created_at: string;
    updated_at: string;
    thumbnail?: string;
    ratings: number | 0,
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

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Store Ratings', href: '/admin/stores' }];

export default function Rating() {
    const { props, url } = usePage<{
        stores: PaginatedData<Store>;
        filters: { search?: string; sort?: string; direction?: string };
    }>();
    const { stores, filters } = props;

    const [search, setSearch] = useState(filters.search && '');
    const [sort, setSort] = useState(filters.sort && 'created_at');
    const [direction, setDirection] = useState(filters.direction && 'desc');
    const [page, setPage] = useState(new URLSearchParams(url.split('?')[1]).get('page') || '1');

    const handleSearch = () => {
        setPage('1');
        router.get(
            '/admin/stores',
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

    const deleteStore = (store: Store) => {
        router.delete(route('admin.stores.destroy', store.id), { preserveScroll: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Stores" />
            <div className="p-5">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Stores</h1>
                    <Link href="/admin/stores/create">
                        <Button>Add Store</Button>
                    </Link>
                </div>

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
                            <TableHead>Image</TableHead>
                            <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
                                Name {sort === 'name' && (direction === 'asc' ? '↑' : '↓')}
                            </TableHead>
                            <TableHead onClick={() => handleSort('slug')} className="cursor-pointer">
                                Slug {sort === 'slug' && (direction === 'asc' ? '↑' : '↓')}
                            </TableHead>
                            <TableHead onClick={() => handleSort('ratings')} className="cursor-pointer">
                                Rating {sort === 'ratings' && (direction === 'asc' ? '↑' : '↓')}
                            </TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead onClick={() => handleSort('is_featured')} className="cursor-pointer">
                                Featured {sort === 'is_featured' && (direction === 'asc' ? '↑' : '↓')}
                            </TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                    </TableBody>
                </Table>

                <Pagination meta={ratings.meta} links={ratings.links} />
            </div>
        </AppLayout>
    );
}
