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
import { type BreadcrumbItem, type PaginatedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
interface Tag {
    id: number;
    name: string;
    slug: string;
    desc?: string;
    created_at: string;
    updated_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tags',
        href: '/tags',
    },
];

// Import your Pagination component
import Pagination from '@/components/pagination';
import { useState } from 'react';

export default function Index() {
    const { tags, filters, url } = usePage<{
        tags: PaginatedData<Tag>;
        filters: {
            search?: string;
            sort?: string;
            direction?: 'asc' | 'desc';
        };
        url: string;
    }>().props;

    // Local state for search input & sort
    const [searchInput, setSearchInput] = useState(filters.search || '');
    const [sortField, setSortField] = useState(filters.sort || 'created_at');
    const [sortDirection, setSortDirection] = useState(filters.direction || 'desc');

    // Delete tag handler
    const deleteTag = (id: number) => {
        if (confirm('Are you sure you want to delete this tag?')) {
            router.delete(route('admin.tags.destroy', id), {
                preserveState: true,
            });
        }
    };

    // Trigger search on button click
    const handleSearch = () => {
        router.get(
            route('admin.tags.index'),
            {
                search: searchInput,
                sort: sortField,
                direction: sortDirection,
                page: 1, // reset to first page on new search
            },
            { preserveState: true, replace: true },
        );
    };

    // Handle sorting column header click
    const handleSort = (field: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortField === field) {
            direction = sortDirection === 'asc' ? 'desc' : 'asc';
        }
        setSortField(field);
        setSortDirection(direction);

        router.get(
            route('admin.tags.index'),
            {
                search: searchInput,
                sort: field,
                direction,
                page: 1, // reset page when sorting changes
            },
            { preserveState: true, replace: true },
        );
    };

    // Sort icon renderer
    const renderSortIcon = (field: string) => {
        if (sortField !== field) return null;
        return sortDirection === 'asc' ? <span>▲</span> : <span>▼</span>;
    };

    // Handle pagination page change
    const handlePageChange = (newPage: number) => {
        router.get(
            route('admin.tags.index'),
            {
                search: searchInput,
                sort: sortField,
                direction: sortDirection,
                page: newPage,
            },
            { preserveState: true },
        );
    };

      const deleteStore = (tag: Tag) => {
            router.delete(route('admin.tags.destroy', tag.id), { preserveScroll: true });
        };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tags" />
            <div className="p-5">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Tags</h1>
                    <Link href={route('admin.tags.create')}>
                        <Button>Add Tag</Button>
                    </Link>
                </div>

                <div className="mb-4 flex max-w-md items-center gap-2">
                    <Input type="text" placeholder="Search tags..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                    <Button onClick={handleSearch}>Search</Button>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead onClick={() => handleSort('name')} className="cursor-pointer select-none">
                                Name {renderSortIcon('name')}
                            </TableHead>
                            <TableHead onClick={() => handleSort('slug')} className="cursor-pointer select-none">
                                Slug {renderSortIcon('slug')}
                            </TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tags.data.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="py-6 text-center">
                                    No tags found.
                                </TableCell>
                            </TableRow>
                        )}
                        {tags.data.map((tag) => (
                            <TableRow key={tag.id}>
                                <TableCell>{tag.name}</TableCell>
                                <TableCell>{tag.slug}</TableCell>
                                <TableCell>{tag.desc || '-'}</TableCell>
                                <TableCell className="space-x-2 text-right">
                                    <Link href={route('admin.tags.edit', tag.id)}>
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
                                                <AlertDialogAction onClick={() => deleteStore(tag)}>Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Pagination meta={tags.meta} links={tags.links} onPageChange={handlePageChange} />
            </div>
        </AppLayout>
    );
}
