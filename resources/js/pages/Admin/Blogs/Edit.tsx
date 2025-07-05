import RichTextEditor from '@/components/Joditeditor/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { toastDirection } from '@/lib/utils/Constants';
import { Head, router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
// import ' react-quill/dist/quill.snow.css';

import { lazy, Suspense } from 'react';
import toast from 'react-hot-toast';

// const ReactQuill = lazy(() => import('react-quill'));

interface Category {
    id: number;
    name: string;
}

interface Blog {
    id: number;
    title: string;
    slug: string;
    content: string;
    image: string | null;
    is_published: boolean;
    category_id: number | null;
    focus_keyphrase: string | null;
    seo_title: string | null;
    meta_description: string | null;
}

interface Props {
    blog: Blog;
    categories: Category[];
    csrfToken: string,
}

export default function Edit({ blog, categories, csrfToken }: Props) {
    const [content, setContent] = useState('');
    const { data, setData, patch, processing, errors } = useForm({
        id : blog.id,
        title: blog.title || '',
        slug: blog.slug || '',
        content: blog.content || '',
        image: blog.image || '',
        is_published: blog.is_published || false,
        category_id: blog.category_id || '',
        focus_keyphrase: blog.focus_keyphrase || '',
        seo_title: blog.seo_title || '',
        meta_description: blog.meta_description || '',
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('_method', 'PUT');
        formData.append('title', data.title);
        formData.append('slug', data.slug);
        formData.append('content', data.content);
        formData.append('category_id', data.category_id);
        formData.append('focus_keyphrase', data.focus_keyphrase);
        formData.append('seo_title', data.seo_title);
        formData.append('is_published', data.is_published ? '1' : '0');
        formData.append('focus_keyphrase', data.focus_keyphrase);
        formData.append('seo_title', data.seo_title);
        formData.append('meta_description', data.meta_description);



        if (data.image) {
            formData.append('image', data.image);
        }

        router.post(route('admin.blogs.update', data.id), formData, {
            forceFormData: true,
            preserveScroll: true,
            preserveState: false,
            onSuccess: () => toast.success('Blog updated!', { position: toastDirection }),
            onError: (errs) => {
                Object.values(errs).forEach((msg) =>
                    toast.error(msg, {
                        position: toastDirection,
                    }),
                );
            },
        });
    };
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            Object.values(errors).forEach((msg) => toast.error(msg));
        }
    }, [errors]);
return (
    <AppLayout>
        <Head title="Edit Blog" />
        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-6 rounded-xl bg-white p-6 shadow">
            <h1 className="text-xl font-semibold">Edit Blog</h1>

            <div>
                <Label>Title</Label>
                <Input value={data.title} onChange={(e) => setData('title', e.target.value)} required />
            </div>

            <div>
                <Label>Slug</Label>
                <Input value={data.slug} onChange={(e) => setData('slug', e.target.value)} required />
            </div>

            <div>
                <label className="block font-medium">Content</label>
                <RichTextEditor content={data.content} setContent={setContent} setFormData={setData} name={'content'} csrfToken={csrfToken} path={'post'} />
            </div>

            <label className="block font-medium">Image</label>
            <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full rounded border px-3 py-2"
            />
            {imagePreview ? (
                <img src={imagePreview} alt="Selected Thumbnail" className="mt-2 h-16 w-16 rounded object-cover" />
            ) : (
                data.image && (
                    <img
                        src={data.image.startsWith('http') ? data.image : `http://127.0.0.1:8000${data.image}`}
                        alt="Store thumbnail"
                        className="mt-2 h-16 w-16 rounded object-cover"
                    />
                )
            )}


            <div>
                <Label>Category</Label>
                <select
                    value={data.category_id ?? ''}
                    onChange={(e) => setData('category_id', Number(e.target.value))}
                    className="w-full rounded border px-3 py-2"
                >
                    <option value="">Select a Category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <Label>SEO Title</Label>
                <Input value={data.seo_title ?? ''} onChange={(e) => setData('seo_title', e.target.value)} />
            </div>

            <div>
                <Label>Focus Keyphrase</Label>
                <Input value={data.focus_keyphrase ?? ''} onChange={(e) => setData('focus_keyphrase', e.target.value)} />
            </div>

            <div>
                <Label>Meta Description</Label>
                <Textarea value={data.meta_description ?? ''} onChange={(e) => setData('meta_description', e.target.value)} />
            </div>

            <div className="flex items-center justify-between">
                <Label>Publish</Label>
                <Switch checked={data.is_published} onCheckedChange={(val) => setData('is_published', val)} />
            </div>

            <Button type="submit" disabled={processing} className="w-full">
                Update Blog
            </Button>
        </form>
    </AppLayout>
);
}
