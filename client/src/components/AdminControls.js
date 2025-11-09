import React from 'react';

const AdminControls = ({ editMode, setEditMode, saveChanges, cancelEdit, previewMode, setPreviewMode }) => {
    return (
        <div className="mt-4">
            {!editMode ? (
                <button onClick={() => setEditMode(true)}>✏️ Edit</button>
            ) : (
                <>
                    <button onClick={saveChanges}>💾 Save</button>
                    <button onClick={cancelEdit} className="ml-2">Cancel</button>
                    <button onClick={() => setPreviewMode(!previewMode)} className="ml-2">
                        👁 {previewMode ? "Edit" : "Preview"}
                    </button>
                </>
            )}
        </div>
    );
};

export default AdminControls;