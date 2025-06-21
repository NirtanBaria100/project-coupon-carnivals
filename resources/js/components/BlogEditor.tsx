import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';

// import './blog-editor.css'; // optional custom CSS

interface Props {
    content: string;
    onChange: (value: string) => void;
}

export default function BlogEditor({ content, onChange }: Props) {
    const editor = useEditor({
        extensions: [StarterKit, Underline],
        content,
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    return (
        <div className="border rounded-md px-3 py-2 bg-white">
            {editor && <MenuBar editor={editor} />}
            <EditorContent editor={editor} />
        </div>
    );
}

function MenuBar({ editor }: any) {
    return (
        <div className="mb-2 flex gap-2 border-b pb-2">
            <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'font-bold' : ''}>
                Bold
            </button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'italic' : ''}>
                Italic
            </button>
            <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'underline' : ''}>
                Underline
            </button>
        </div>
    );
}
