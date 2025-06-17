'use client';

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { toastDirection } from '@/lib/utils/Constants';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Create() {
    // Use Inertia's useForm to handle form data, errors, and submission state
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        desc: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Send POST request to the store route
        post(route('admin.tags.store'));
    };

    // ✅ Show individual error messages on load or validation fail
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            Object.values(errors).forEach((msg) =>
                toast.error(msg, {
                    position: toastDirection,
                }),
            );
        }
    }, [errors]);
    const breadcrumbs = [
        { title: 'Tags', href: '/admin/tags/' },
        { title: 'Create Tag', href: '/admin/tags/create' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Tag" />
            <div className="p-5">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Tag</h1>
                    <Button type="submit" form="create-tag-form" disabled={processing}>
                        {processing ? 'Saving...' : 'Save'}
                    </Button>
                </div>

                <form id="create-tag-form" onSubmit={handleSubmit} className="max-w-2xl space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-black">
                    <input
                        name="name"
                        placeholder="Tag Name"
                        
                        value={data.name}
                        onChange={handleChange}
                        className="w-full rounded border px-3 py-2"
                    />

                    <input
                        name="slug"
                        placeholder="Slug"
                        
                        value={data.slug}
                        onChange={handleChange}
                        className="w-full rounded border px-3 py-2"
                    />

                    <textarea
                        name="desc"
                        placeholder="Description"
                        value={data.desc}
                        onChange={handleChange}
                        className="w-full rounded border px-3 py-2"
                    />
                </form>
            </div>
        </AppLayout>
    );
}
