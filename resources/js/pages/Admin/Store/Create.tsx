'use client';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { toastDirection } from '@/lib/utils/Constants';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        slug: '',
        desc: '',
        home_url: '',
        affiliate_irl: '',
        thumbnail: null as File | null,
        is_featured: false,
        extra_info: '',
        focus_keyphrase: '',
        seo_title: '',
        meta_description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(name as keyof typeof data, value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('thumbnail', file);
    };

    const handleSwitch = (name: string, value: boolean) => {
        setData(name as keyof typeof data, value);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post('/admin/stores/create', {
            forceFormData: true, // Important for file upload
            onSuccess: () => toast.success('Coupon created!', { position: toastDirection }), // Optional: reset form after success,
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Stores', href: '/admin/stores' },
        { title: 'Create Store', href: '/admin/stores/create' },
    ];

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Store" />
            <div className="p-5">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Store</h1>
                    <Button onClick={handleSubmit} variant="default" disabled={processing}>
                        {processing ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-black">
                        <input
                            name="name"
                            placeholder="Store Name"
                            required
                            value={data.name}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2"
                        />

                        <input
                            name="slug"
                            placeholder="Slug"
                            required
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

                        <input
                            name="home_url"
                            placeholder="Homepage URL"
                            value={data.home_url}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2"
                        />

                        <input
                            name="affiliate_irl"
                            placeholder="Affiliate URL"
                            value={data.affiliate_irl}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2"
                        />

                        <label className="block font-medium">Thumbnail</label>
                        <input
                            type="file"
                            name="thumbnail"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full rounded border px-3 py-2"
                        />

                        <label className="flex items-center justify-between">
                            Featured
                            <Switch checked={data.is_featured} onCheckedChange={(checked) => handleSwitch('is_featured', checked)} />
                        </label>

                        <textarea
                            name="extra_info"
                            placeholder="Extra Info"
                            value={data.extra_info}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2"
                        />
                        <hr />
                        <h1>SEO</h1>
                        <input
                            name="focus_keyphrase"
                            placeholder="Focus Keyphrase"
                            value={data.focus_keyphrase}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2"
                        />

                        <input
                            name="seo_title"
                            placeholder="SEO Title"
                            value={data.seo_title}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2"
                        />

                        <textarea
                            name="meta_description"
                            placeholder="Meta Description"
                            value={data.meta_description}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2"
                        />

                        {/* <Button type="submit" variant="default" disabled={processing}>
                            {processing ? 'Creating...' : 'Create Store'}
                        </Button> */}
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
