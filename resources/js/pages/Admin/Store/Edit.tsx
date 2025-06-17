'use client';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { toastDirection } from '@/lib/utils/Constants';
import { BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Store {
    id: number;
    name: string;
    slug: string;
    desc?: string;
    home_url?: string;
    affiliate_irl?: string;
    thumbnail?: string;
    is_featured: boolean;
    extra_info?: string;
    focus_keyphrase?: string;
    seo_title?: string;
    meta_description?: string;
    category_ids: number[];
    tag_ids: number[];
}

interface Category {
    id: number;
    name: string;
}

interface Tag {
    id: number;
    name: string;
}

export default function Edit() {
    const { props } = usePage<{
        store: Store;
        categories: Category[];
        tags: Tag[];
    }>();
    const { store } = props;

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: store.name ?? '',
        slug: store.slug ?? '',
        desc: store.desc ?? '',
        home_url: store.home_url ?? '',
        affiliate_irl: store.affiliate_irl ?? '',
        thumbnail: null as File | null,
        is_featured: store.is_featured ?? false,
        extra_info: store.extra_info ?? '',
        focus_keyphrase: store.focus_keyphrase ?? '',
        seo_title: store.seo_title ?? '',
        meta_description: store.meta_description ?? '',
       
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(name as keyof typeof data, value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('thumbnail', file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSwitch = (name: string, value: boolean) => {
        setData(name as keyof typeof data, value);
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'category_ids' | 'tag_ids') => {
        const value = parseInt(e.target.value, 10);
        const checked = e.target.checked;
        setData(field, checked ? [...data[field], value] : data[field].filter((id) => id !== value));
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('_method', 'PUT');
        formData.append('name', data.name);
        formData.append('slug', data.slug);
        formData.append('desc', data.desc);
        formData.append('home_url', data.home_url);
        formData.append('affiliate_irl', data.affiliate_irl);
        formData.append('is_featured', data.is_featured ? '1' : '0');
        formData.append('extra_info', data.extra_info);
        formData.append('focus_keyphrase', data.focus_keyphrase);
        formData.append('seo_title', data.seo_title);
        formData.append('meta_description', data.meta_description);

    

        if (data.thumbnail) {
            formData.append('thumbnail', data.thumbnail);
        }

        router.post(route('admin.stores.update', store.id), formData, {
            forceFormData: true,
            preserveScroll: true,
            preserveState: false,
            onSuccess: () => toast.success('Store updated!', { position: toastDirection }),
            onError: (errs) => {
                Object.values(errs).forEach((msg) =>
                    toast.error(msg, {
                        position: toastDirection,
                    }),
                );
            },
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Stores', href: '/admin/stores' },
        { title: 'Edit Store', href: `/admin/stores/${store.id}/edit` },
    ];

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
            <Head title="Edit Store" />
            <div className="p-5">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Store</h1>
                    <Button onClick={handleSubmit} variant="default" disabled={processing}>
                        {processing ? 'Saving...' : 'Update Changes'}
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
                        {imagePreview ? (
                            <img src={imagePreview} alt="Selected Thumbnail" className="mt-2 h-16 w-16 rounded object-cover" />
                        ) : (
                            store.thumbnail && (
                                <img
                                    src={store.thumbnail.startsWith('http') ? store.thumbnail : `http://127.0.0.1:8000${store.thumbnail}`}
                                    alt="Store thumbnail"
                                    className="mt-2 h-16 w-16 rounded object-cover"
                                />
                            )
                        )}

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

                      
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
