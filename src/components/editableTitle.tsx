import { useEffect, useState } from 'react';

interface EditableTitleProps {
    initialTitle: string;
    onTitleChange: (newTitle: string) => void;
}

const EditableTitle: React.FC<EditableTitleProps> = ({ initialTitle, onTitleChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(initialTitle);

    // Atualiza o estado do título interno quando initialTitle mudar
    useEffect(() => {
        setTitle(initialTitle);
    }, [initialTitle]);

    const handleBlur = () => {
        if (!title.trim()) {
            setTitle("Título");
        }
        setIsEditing(false);
        onTitleChange(title);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleBlur();
        }
    };

    return (
        <div className="flex h-10 items-center gap-2 rounded border bg-background px-4">
            <label htmlFor="project-title" className="md:block hidden text-sm text-muted-foreground">
                Nome do projeto:
            </label>
            {isEditing ? (
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className="block rounded border bg-background border-gray-300 px-2 font-medium"
                />
            ) : (
                <span
                    id="project-title"
                    className="block cursor-pointer font-medium"
                    onClick={() => setIsEditing(true)}
                >
                    {title}
                </span>
            )}
        </div>
    );
};

export default EditableTitle;
