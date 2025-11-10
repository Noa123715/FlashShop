import React from 'react';

const AdminControls = ({ 
    isAdmin,
    editMode, 
    children,
    previewContent,
    adminControls,
}) => {
    if (!isAdmin) return children;

    return (
        <div>
            {editMode ? (
                // Show preview content or edit content based on preview mode
                adminControls.previewMode ? children : previewContent
            ) : (
                children
            )}
            
            <div className="mt-4">
                {!editMode ? (
                    <button onClick={() => adminControls.setEditMode(true)}>
                        ✏️ Edit
                    </button>
                ) : (
                    <>
                        <button onClick={adminControls.saveChanges}>
                            💾 Save
                        </button>
                        <button onClick={adminControls.cancelEdit} className="ml-2">
                            ❌ Cancel
                        </button>
                        <button 
                            onClick={() => adminControls.setPreviewMode(!adminControls.previewMode)} 
                            className="ml-2"
                        >
                            👁 {adminControls.previewMode ? "Edit" : "Preview"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminControls;