'use client';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { toastDirection } from '@/lib/utils/Constants';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import Select from 'react-select';
import { FormEventHandler, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import customSelectStyles from '@/components/ui/CustomSelectStyles';
import RichTextEditor from '@/components/Joditeditor/RichTextEditor';
interface Category {
    name: string,
    id: number,
}
interface Props {
    categories: Category[],
    csrfToken: string,

}
export default function Create({ categories, csrfToken }: Props) {
    const categoryOptions = categories?.map((cat) => ({ value: cat.id.toString(), label: cat.name })) ?? [];
    const [content, setContent] = useState();
    const [contentExtra, setContentExtra] = useState();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        slug: '',
        single_line_desc:'',
        desc: '',
        home_url: '',
        category_id: '',
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

        post(route('admin.stores.create'), {
            forceFormData: true, // Important for file upload
            onSuccess: () => toast.success('Coupon created!', { position: toastDirection }), // Optional: reset form after success,
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Stores', href: route('admin.stores.index') },
        { title: 'Create Store', href: route('admin.stores.create') },
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
                        <label className="block font-medium">Stores</label>
                        <Select
                            value={data.category_id}
                            options={categoryOptions}
                            onChange={(selected) => setData('category_id', selected)}
                            placeholder="Select store category"
                            styles={customSelectStyles}
                            isClearable={true}
                        />

                        <textarea
                            name="single_line_desc"
                            placeholder="Single Line Description"
                            value={data.single_line_desc}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2"
                        />
                        <label className="block font-medium">Description</label>
                        <RichTextEditor content={content} setContent={setContent} setFormData={setData} name={'desc'} csrfToken={csrfToken} path={'stores'} />
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

                        {/* <textarea
                            name="extra_info"
                            placeholder="Short Description Sidebar"
                            value={data.extra_info}
                            onChange={handleChange}
                            className="w-full rounded border px-3 py-2"
                        /> */}
                        <label className="block font-semibold text-sm">Short Description</label>
                        <RichTextEditor content={contentExtra} setContent={setContentExtra} setFormData={setData} name={'extra_info'} csrfToken={csrfToken} path={'stores'} />

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
