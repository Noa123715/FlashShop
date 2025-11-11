import AdminControls from '../components/AdminControls.jsx';
import { useAdminControl } from '../hooks/useAdminControl.jsx';
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    // Check admin status from localStorage - need to fix that
    const isAdmin = localStorage.getItem("admin");
    const adminControls = useAdminControl({
        title: "",
        mainImg: "",
        products: [],
        goToAll: "",
        goToAbout: "",
        textAbout: "",
        goToTips: ""
    }, "home");
    const { draft, updateDraft, editMode, previewMode } = adminControls;
    const Navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:4000/api/page/home").then((res) => {
            const data = res.data;
            if (typeof data.products === "string") {
                try {
                    const fixedJson = data.products.trim();
                    const jsonToParse = fixedJson.startsWith("[") ? fixedJson : `[${fixedJson}]`;
                    data.products = JSON.parse(jsonToParse);
                } catch (err) {
                    console.error("Failed to parse products JSON:", err);
                    data.products = [];
                }
            }
            adminControls.setPage(data);
            adminControls.setDraft(data);
        });
    }, []);

    const EditContent = (
        <>
            <input
                type="text"
                value={draft.title}
                style={{ width: "100%", height: "250px" }}
                onChange={(e) => updateDraft({ title: e.target.value })}
            />
            <label>🔗 Main Image URL:</label>
            <input
                type="text"
                value={draft.mainImg}
                onChange={(e) => updateDraft({ mainImg: e.target.value })}
                style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            />
            <div className='container'>
                {Array.isArray(draft.products) && draft.products.map((prod, index) => (
                    <div key={index} className='product-card'>
                        <input
                            type="text"
                            placeholder="שם המוצר"
                            value={prod.name || ''}
                            onChange={(e) => {
                                const updatedProducts = [...draft.products];
                                updatedProducts[index] = {
                                    ...updatedProducts[index],
                                    name: e.target.value
                                };
                                updateDraft({ products: updatedProducts });
                            }}
                            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                        />
                        <input
                            type="text"
                            placeholder="URL התמונה"
                            value={prod.image || ''}
                            onChange={(e) => {
                                const updatedProducts = [...draft.products];
                                updatedProducts[index] = {
                                    ...updatedProducts[index],
                                    image: e.target.value
                                };
                                updateDraft({ products: updatedProducts });
                            }}
                            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                        />
                        {prod.image && (
                            <img
                                src={prod.image}
                                alt={`Preview ${prod.name || index + 1}`}
                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                            />
                        )}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={draft.goToAll}
                style={{ width: "100%", height: "50px", marginTop: "10px" }}
                onChange={(e) => updateDraft({ goToAll: e.target.value })}
            />
            <input
                type="text"
                value={draft.goToAbout}
                style={{ width: "100%", height: "50px", marginTop: "10px" }}
                onChange={(e) => updateDraft({ goToAbout: e.target.value })}
            />
            <textarea
                style={{ width: "100%", height: "150px", marginTop: "10px" }}
                value={draft.textAbout}
                onChange={(e) => updateDraft({ textAbout: e.target.value })}
            />
            <input
                type="text"
                value={draft.goToTips}
                style={{ width: "100%", height: "50px", marginTop: "10px" }}
                onChange={(e) => updateDraft({ goToTips: e.target.value })}
            />
        </>
    );

    const ViewContent = (
        <div className="preview-content">
            <h1>{draft.title}</h1>
            {draft.mainImg && (
                <img
                    src={draft.mainImg}
                    alt="main home image"
                    style={{ marginTop: "20px", maxWidth: "100%" }}
                />
            )}
            {Array.isArray(draft.products) && draft.products.length > 0 && (
                <div className='container'>
                    {draft.products.map((prod, index) => (
                        <div key={index} className='product-card'>
                            <img
                                src={prod.image}
                                alt={prod.name || `Product ${index + 1}`}
                                className='product-image'
                            />
                        </div>
                    ))}
                </div>
            )}
            <br />
            
            <button className='see-more-button'>{draft.goToAll}</button>
            <br />
            <button onClick={(e) => Navigate('/about')}>{draft.goToAbout}</button>
            <p>{draft.textAbout}</p>
            <p>כאן הלקוחות המרוצים שלנו יספרו לכם על החוייה אצלנו
                כמה כיף לקנות כאן ואיזה שירות פצצה יש לנו

                לקוח מרוצה . עד הגג

                . . .</p>
            <button onClick={(e) => Navigate('/tips')}>{draft.goToTips}</button>
        </div>
    );

    return (
        <div style={{ padding: "20px", maxWidth: 800, margin: "auto" }}>
            {/* Admin Controls */}
            {isAdmin && (
                <AdminControls
                    isAdmin={isAdmin}
                    editMode={editMode}
                    previewContent={EditContent}
                    adminControls={adminControls}
                >
                    {ViewContent}
                </AdminControls>
            )}
        </div>
    );
}