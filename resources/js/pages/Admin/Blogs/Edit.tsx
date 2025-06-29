import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';

import { lazy, Suspense } from 'react';

const ReactQuill = lazy(() => import('react-quill'));

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
}

export default function Edit({ blog, categories }: Props) {
    const { data, setData, patch, processing } = useForm({
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

    const [preview, setPreview] = useState(data.image ? `/storage/${data.image}` : '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('admin.blogs.update', blog.id));
    };

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
                    <Label>Content</Label>
                    <Suspense fallback={<div>Loading editor...</div>}>
                        <ReactQuill value={data.content} onChange={(val) => setData('content', val)} />
                    </Suspense>
                </div>

                <div>
                    <Label>Image URL</Label>
                    <Input type="file" onChange={(e) => setData('image', e.target.value)} />
                </div>

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
