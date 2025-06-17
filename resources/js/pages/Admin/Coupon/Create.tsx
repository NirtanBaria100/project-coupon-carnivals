'use client';

import { Button } from '@/components/ui/button';
import customSelectStyles from '@/components/ui/CustomSelectStyles';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { toastDirection } from '@/lib/utils/Constants';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Select from 'react-select';





interface CreateProps {
    stores: { id: number; name: string }[];
    tags: { id: number; name: string }[];
    categories: { id: number; name: string }[];
}

export default function Create({ stores, tags, categories }: CreateProps) {

    const storeOptions = stores?.map((store) => ({ value: store.id.toString(), label: store.name })) ?? [];
    const tagOptions = tags?.map((tag) => ({ value: tag.id.toString(), label: tag.name })) ?? [];
    const categoryOptions = categories?.map((cat) => ({ value: cat.id.toString(), label: cat.name })) ?? [];

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        long_desc: '',
        coupon_type: '',
        code: '',
        coupon_url: '',
        expires: '',
        featured_image: null as File | null,
        is_exclusive: false,
        is_featured: false,
        is_verified: false,
        is_published: false,
        stores: [] as string[],
        tags: [] as string[],
        categories: [] as string[]
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSwitch = (name: string, value: boolean) => {
        setData(name, value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('featured_image', file);
    };

    const handleMultiChange = (name: string, selectedOptions: any) => {
        setData(
            name,
            selectedOptions.map((opt: any) => opt.value),
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((val) => payload.append(`${key}[]`, val));
            } else if (value instanceof File) {
                payload.append(key, value);
            } else {
                payload.append(key, value?.toString() ?? '');
            }
        });

        post(route('admin.coupons.store'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => toast.success('Coupon create!', { position: toastDirection }),
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Coupons',
            href: '/admin/coupons/',
        },
        {
            title: 'Create Coupon',
            href: '/admin/coupons/create',
        },
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
            <Head title="Coupons" />
            <div className="p-5">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Store</h1>
                    <Button onClick={handleSubmit} variant="default" disabled={processing}>
                        {processing ? 'Saving...' : 'Save'}
                    </Button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-3 md:px-0">
                        <div className="space-y-6 rounded-xl bg-white p-4 shadow-md md:col-span-2 md:p-6 dark:bg-black">
                            <input
                                name="title"
                                placeholder="Title"
                                required
                                value={data.title}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2"
                            />

                            <textarea
                                name="long_desc"
                                placeholder="Description"
                                required
                                value={data.long_desc}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2"
                            />

                            <select name="coupon_type" value={data.coupon_type} onChange={handleChange} className="w-full rounded border px-3 py-2">
                                <option className="text-black" value="">
                                    Select type
                                </option>
                                <option className="text-black" value="code">
                                    Code
                                </option>
                                <option className="text-black" value="deal">
                                    Deal
                                </option>
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

                        <div className="space-y-6 rounded-xl bg-white p-4 shadow-md md:p-6 dark:bg-black">
                            <div className="space-y-6">
                                <label className="block font-medium">Stores</label>
                                <Select
                                    isMulti
                                    options={storeOptions}
                                    onChange={(selected) => handleMultiChange('stores', selected)}
                                    placeholder="Search and select stores"
                                    styles={customSelectStyles}
                                />
                            </div>

                            <div className="space-y-6">
                                <label className="block font-medium">Tags</label>
                                <Select
                                    isMulti
                                    options={tagOptions}
                                    onChange={(selected) => handleMultiChange('tags', selected)}
                                    placeholder="Search and select tags"
                                    styles={customSelectStyles}
                                />
                            </div>

                            <div className="space-y-6">
                                <label className="block font-medium">Categories</label>
                                <Select
                                    isMulti
                                    options={categoryOptions}
                                    onChange={(selected) => handleMultiChange('categories', selected)}
                                    placeholder="Search and select categories"
                                    styles={customSelectStyles}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { name: 'is_exclusive', label: 'Exclusive' },
                                    { name: 'is_featured', label: 'Featured' },
                                    { name: 'is_verified', label: 'Verified' },
                                    { name: 'is_published', label: 'Published' },
                                ].map((item) => (
                                    <div className="flex items-center justify-between" key={item.name}>
                                        <label>{item.label}</label>
                                        <Switch
                                            name={item.name}
                                            checked={data[item.name as keyof typeof data] as boolean}
                                            onCheckedChange={(checked) => handleSwitch(item.name, checked)}
                                        />
                                    </div>
                                ))}
                            </div>
                            {/* <hr />
                            <h1>SEO</h1> */}
                            {/* <input
                                name="seo_title"
                                placeholder="SEO Title"
                                required
                                value={data.seo_title}
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
                                name="meta_desc"
                                placeholder="Meta Description"
                                required
                                value={data.meta_desc}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2"
                            /> */}
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
