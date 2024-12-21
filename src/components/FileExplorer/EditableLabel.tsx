import { useState, useRef, useEffect } from 'react';

interface EditableLabelProps {
  value: string;
  isEditing: boolean;
  onSubmit: (value: string) => void;
  onCancel: () => void;
}

export function EditableLabel({ value, isEditing, onSubmit, onCancel }: EditableLabelProps) {
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      // Select filename without extension
      const lastDotIndex = value.lastIndexOf('.');
      if (lastDotIndex > 0) {
        inputRef.current.setSelectionRange(0, lastDotIndex);
      } else {
        inputRef.current.select();
      }
    }
  }, [isEditing, value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit(editValue);
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  const handleBlur = () => {
    onCancel();
  };

  if (!isEditing) {
    return <span>{value}</span>;
  }

  return (
    <input
      ref={inputRef}
      type="text"
      value={editValue}
      onChange={(e) => setEditValue(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      className="bg-[#3c3c3c] text-[#cccccc] px-1 outline-none border border-[#0e639c] rounded w-full"
    />
  );
}