import { useState } from 'react';
import axios from 'axios';

export const useAdminControl = (initialData, endpoint) => {
    const [page, setPage] = useState(initialData);
    const [editMode, setEditMode] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    const [draft, setDraft] = useState(initialData);

    const saveChanges = async () => {
        try {
            await axios.put(`http://localhost:4000/api/page/${endpoint}`, draft);
            setPage(draft);
            setEditMode(false);
            setPreviewMode(false);
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };

    const cancelEdit = () => {
        setDraft(page);
        setEditMode(false);
        setPreviewMode(false);
    };

    const updateDraft = (changes) => {
        setDraft(prev => ({ ...prev, ...changes }));
    };

    return {
        page,
        setPage,
        editMode,
        setEditMode,
        previewMode,
        setPreviewMode,
        draft,
        setDraft,
        saveChanges,
        cancelEdit,
        updateDraft
    };
};