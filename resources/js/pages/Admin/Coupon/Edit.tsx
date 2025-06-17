'use client';

import { Button } from '@/components/ui/button';
import customSelectStyles from '@/components/ui/CustomSelectStyles';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { toastDirection } from '@/lib/utils/Constants';
import { BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';
import toast from 'react-hot-toast';
import Select from 'react-select';

interface Coupon {
    id: number;
    title: string;
    long_desc: string;
    coupon_type: string;
    code: string;
    coupon_url: string;
    expires: string;
    is_exclusive: boolean;
    is_featured: boolean;
    is_verified: boolean;
    is_published: boolean;
    stores: { id: number }[];
    tags: { id: number }[];
    categories: { id: number }[];
    seo_title: string;
    slug: string;
    meta_desc: string;
}

interface EditProps {
    stores: { id: number; name: string }[];
    tags: { id: number; name: string }[];
    categories: { id: number; name: string }[];
    coupon: Coupon;
}

export default function Edit({ stores, tags, categories, coupon }: EditProps) {
    const storeOptions = stores?.map((s) => ({ value: s.id.toString(), label: s.name })) ?? [];
    const tagOptions = tags?.map((t) => ({ value: t.id.toString(), label: t.name })) ?? [];
    const categoryOptions = categories?.map((c) => ({ value: c.id.toString(), label: c.name })) ?? [];

    const { data, setData, post, processing, errors } = useForm({
        title: coupon.title || '',
        long_desc: coupon.long_desc || '',
        coupon_type: coupon.coupon_type || '',
        code: coupon.code || '',
        coupon_url: coupon.coupon_url || '',
        expires: coupon.expires || '',
        featured_image: null as File | null,
        is_exclusive: coupon.is_exclusive || false,
        is_featured: coupon.is_featured || false,
        is_verified: coupon.is_verified || false,
        is_published: coupon.is_published || false,
        stores: coupon.stores.map((s) => s.id.toString()) || [],
        tags: coupon.tags.map((t) => t.id.toString()) || [],
        categories: coupon.categories.map((c) => c.id.toString()) || [],
        seo_title: coupon.seo_title || '',
        slug: coupon.slug || '',
        meta_desc: coupon.meta_desc || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSwitch = (name: string, value: boolean) => setData(name, value);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('featured_image', file);
    };

    const handleMultiChange = (name: string, selected: any) => {
        const values = selected.map((opt: { value: string }) => opt.value);
        setData(name, values);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('_method', 'PUT');
        formData.append('title', data.title);
        formData.append('long_desc', data.long_desc);
        formData.append('coupon_type', data.coupon_type);
        formData.append('code', data.code);
        formData.append('coupon_url', data.coupon_url);
        formData.append('expires', data.expires);
        formData.append('is_exclusive', data.is_exclusive ? '1' : '0');
        formData.append('is_featured', data.is_featured ? '1' : '0');
        formData.append('is_verified', data.is_verified ? '1' : '0');
        formData.append('is_published', data.is_published ? '1' : '0');

        data.stores.forEach((id) => formData.append('store_ids[]', id));
        data.tags.forEach((id) => formData.append('tag_ids[]', id));
        data.categories.forEach((id) => formData.append('category_ids[]', id));

        if (data.featured_image instanceof File) {
            formData.append('featured_image', data.featured_image);
        }

        formData.append('seo_title', data.seo_title);
        formData.append('slug', data.slug);
        formData.append('meta_desc', data.meta_desc);

        router.post(route('admin.coupons.update', coupon.id), formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => toast.success('Coupon updated!', { position: toastDirection }),
            onError: (errors) => Object.values(errors).forEach((msg) => toast.error(msg, { position: toastDirection })),
        });
    };



    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Coupons', href: '/admin/coupons/' },
        { title: 'Edit Coupon', href: `/admin/coupons/${coupon.id}/edit` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Coupon" />
            <div className="p-5">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Edit Coupon</h1>
                    <Button onClick={handleSubmit} disabled={processing}>
                        {processing ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="space-y-4 md:col-span-2">
                            <input
                                name="title"
                                placeholder="Title"
                                value={data.title}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2"
                                required
                            />
                            <textarea
                                name="long_desc"
                                placeholder="Description"
                                value={data.long_desc}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2"
                                required
                            />
                            <select name="coupon_type" value={data.coupon_type} onChange={handleChange} className="w-full rounded border px-3 py-2">
                                <option value="">Select type</option>
                                <option value="code">Code</option>
                                <option value="deal">Deal</option>
                            </select>

                            {data.coupon_type === 'code' && (
                                <input
                                    name="code"
                                    placeholder="Coupon Code"
                                    value={data.code}
                                    onChange={handleChange}
                                    className="w-full rounded border px-3 py-2"
                                />
                            )}

                            <input
                                name="coupon_url"
                                placeholder="Coupon URL"
                                value={data.coupon_url}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2"
                            />
                            <input
                                name="expires"
                                type="datetime-local"
                                value={data.expires}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2"
                            />

                            <label className="block font-medium">Featured Image</label>
                            <input type="file" name="featured_image" onChange={handleFileChange} className="w-full rounded border px-3 py-2" />
                        </div>

                        <div className="space-y-4">
                            <label>Stores</label>
                            <Select
                                isMulti
                                options={storeOptions}
                                value={storeOptions.filter((opt) => data.stores.includes(opt.value))}
                                onChange={(selected) => handleMultiChange('stores', selected)}
                                styles={customSelectStyles}
                            />

                            <label>Tags</label>
                            <Select
                                isMulti
                                options={tagOptions}
                                value={tagOptions.filter((opt) => data.tags.includes(opt.value))}
                                onChange={(selected) => handleMultiChange('tags', selected)}
                                styles={customSelectStyles}
                            />

                            <label>Categories</label>
                            <Select
                                isMulti
                                options={categoryOptions}
                                value={categoryOptions.filter((opt) => data.categories.includes(opt.value))}
                                onChange={(selected) => handleMultiChange('categories', selected)}
                                styles={customSelectStyles}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                {['is_exclusive', 'is_featured', 'is_verified', 'is_published'].map((key) => (
                                    <div key={key} className="flex items-center justify-between">
                                        <label className="capitalize">{key.replace('is_', '').replace('_', ' ')}</label>
                                        <Switch
                                            name={key}
                                            checked={data[key as keyof typeof data] as boolean}
                                            onCheckedChange={(checked) => handleSwitch(key, checked)}
                                        />
                                    </div>
                                ))}
                            </div>

                            <hr />

                            <input
                                name="seo_title"
                                placeholder="SEO Title"
                                value={data.seo_title}
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
                                name="meta_desc"
                                placeholder="Meta Description"
                                value={data.meta_desc}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
