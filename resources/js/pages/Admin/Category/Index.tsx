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
import DragAndDropTable from '@/components/ui/DragAndDropTable';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PaginatedData } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';

import { useState } from 'react';

interface Category {
    id: number;
    name: string;
    slug: string;
    parent_cat?: number | null;
    desc?: string;
    icon?: string | null;
    single_line_desc?: string | null;
    is_popular: boolean;
    created_at: string;
    updated_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Categories', href: '/admin/categories' }];

export default function Index() {
    const { props, url } = usePage<{
        categories: PaginatedData<Category>;
        filters: {
            search?: string;
            sort?: string;
            direction?: string;
        };
    }>();

    const { filters, categories } = props;
    const { delete: destroy } = useForm();
    const [search, setSearch] = useState(filters?.search && '');
    const [sortField, setSortField] = useState(filters?.sort && '');
    const [sortDirection, setSortDirection] = useState(filters?.direction && 'asc');
    const [page, setPage] = useState(new URLSearchParams(url.split('?')[1]).get('page') || '1');

    const handleSearch = () => {
        setPage('1');
        router.get(
            '/admin/categories',
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

    const sortBy = (field: string) => {
        const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortDirection(direction);

        router.get(
            '/admin/categories',
            {
                search,
                sort: field,
                direction,
                page,
            },
            {
                preserveState: true,
            },
        );
    };

    const deleteCategory = (category: any) => {
        router.delete(route('admin.categories.destroy', category.id), { preserveScroll: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="p-5">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Categories</h1>
                    <Link href="/admin/categories/create">
                        <Button>Add Category</Button>
                    </Link>
                </div>

                <div className="mb-4 flex gap-2">
                    <Input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search categories..."
                        className="w-full md:w-1/3"
                    />
                    <Button onClick={handleSearch}>Search</Button>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead onClick={() => sortBy('name')} className="cursor-pointer">
                                Name
                            </TableHead>
                            <TableHead onClick={() => sortBy('slug')} className="cursor-pointer">
                                Slug
                            </TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Parent</TableHead>
                            <TableHead>Icon</TableHead>
                            <TableHead>Popular</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                          {categories.data.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="py-6 text-center">
                                    No categories found.
                                </TableCell>
                            </TableRow>
                        )}
                        {categories.data.map((category: any) => (
                            <TableRow key={category.id}>
                                <TableCell className="flex items-center gap-2">
                                    {category.image_icon && (
                                        <img src={category.image_icon} alt={category.name} className="h-6 w-6 rounded object-cover" />
                                    )}
                                    <span>{category.name}</span>
                                </TableCell>
                                <TableCell>{category.slug}</TableCell>
                                <TableCell>{category.desc || '-'}</TableCell>
                                <TableCell>{category.parent?.name || '-'}</TableCell>
                                <TableCell>{category.icon || '-'}</TableCell>
                                <TableCell>{category.is_popular ? 'Yes' : 'No'}</TableCell>
                                <TableCell className="space-x-2 text-right">
                                    <Link href={`/admin/categories/${category.id}/edit`}>
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
                                                <AlertDialogAction onClick={() => deleteCategory(category)}>Continue</AlertDialogAction>
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
                    meta={categories.meta}
                    links={categories.links}
                    onPageChange={(newPage) => {
                        setPage(newPage);
                        router.get(
                            '/admin/categories',
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
