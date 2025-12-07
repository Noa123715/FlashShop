import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import { useCartStore } from '../store/cartStore';
import axios from 'axios';
import AdminControls from '../components/AdminControls';
import { useAdminControl } from '../hooks/useAdminControl';
import { getPage } from '../api/pages';

const PhotoDevelopmentPage = ({ onNavigate, onNavigateToEditor }) => {
    const [images, setImages] = useState([]);
    const [priceList, setPriceList] = useState([]);
    const [isUploading, setIsUploading] = useState(false); // New state for loading
    const addToCart = useCartStore((state) => state.addToCart);
    const navigate = useNavigate();

    const adminControls = useAdminControl({
        img: "",
        title: "",
        subtitle: "",
        btnText: "",
    }, "photos");
    const { draft, updateDraft, editMode } = adminControls;

    // 1. Fetch prices from the Server on load
    useEffect(() => {
        getPage("photos").then((data) => {
            adminControls.setPage(data);
            adminControls.setDraft(data);
        }).catch(error => console.error("Error fetching main photos page data:", error));
        const fetchPrices = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/photo-prices');
                setPriceList(data);
            } catch (err) {
                console.error("Failed to load prices from DB:", err);
                setPriceList([]);
            }
        };
        fetchPrices();
    }, []);

    // 2. Helper to get price based on size
    const getPriceBySize = (size) => {
        if (priceList.length > 0) {
            const found = priceList.find(p => p.size === size);
            return found ? found.price : 1.20;
        }
        switch (size) {
            case '13x18': return 1.50;
            case '20x30': return 2.50;
            case '10x15': default: return 1.20;
        }
    };

    // 3. Upload Logic (Used later in handleSendOrder)
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ml_default");

        try {
            const response = await fetch(
                "https://api.cloudinary.com/v1_1/dwqywo11u/image/upload",
                { method: "POST", body: formData }
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Cloudinary Error:", errorData);
                return null;
            }

            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    };

    // Modified: Only creates local preview, does NOT upload yet
    const handleFilesSelected = (files) => {
        const defaultSize = priceList.length > 0 ? priceList[0].size : '10x15';

        const newImages = Array.from(files).map((file) => {
            return {
                id: Date.now() + Math.random(),
                src: URL.createObjectURL(file), // Local preview URL
                file: file, // Store the actual file for later upload
                alt: file.name,
                quantity: 1,
                size: defaultSize
            };
        });

        setImages(prev => [...prev, ...newImages]);
    };

    // 4. State Management Handlers
    const handleQuantityChange = (id, delta) => {
        setImages(prev => prev.map(img =>
            img.id === id ? { ...img, quantity: Math.max(0, img.quantity + delta) } : img
        ));
    };

    const handleRemove = (id) => {
        setImages(prev => prev.filter(img => img.id !== id));
    };

    const handleSizeChange = (id, newSize) => {
        setImages(prev => prev.map(img =>
            img.id === id ? { ...img, size: newSize } : img
        ));
    };

    // 5. Checkout Logic - Uploads images here
    const handleSendOrder = async () => {
        setIsUploading(true);
        const defaultSize = priceList.length > 0 ? priceList[0].size : '10x15';

        try {
            // Process all images in parallel
            const cartItemsPromises = images.map(async (img) => {
                let imageUrl = img.src;

                // If it's a local file, upload it now
                if (img.file) {
                    const uploadedUrl = await uploadImage(img.file);
                    if (uploadedUrl) {
                        imageUrl = uploadedUrl;
                    } else {
                        console.error(`Failed to upload ${img.alt}`);
                        // You might want to handle this error gracefully (e.g. skip item or alert user)
                    }
                }

                const size = img.size || defaultSize;
                return {
                    id: img.id,
                    size: size,
                    name: `פיתוח תמונה ${size} (${img.alt})`,
                    price: getPriceBySize(size),
                    quantity: img.quantity,
                    image: imageUrl
                };
            });

            // Wait for all uploads to finish
            const cartItems = await Promise.all(cartItemsPromises);

            addToCart(cartItems);
            navigate('/cart');
        } catch (error) {
            console.error("Error processing order:", error);
            alert("אירעה שגיאה בהעלאת התמונות. אנא נסה שוב.");
        } finally {
            setIsUploading(false);
        }
    };

    const EditContent = (
        <div className="bg-white p-6 rounded-lg space-y-4 text-right" dir="rtl">
            <h3 className="font-bold text-lg border-b pb-2">עריכת עמוד פיתוח תמונות</h3>

            <div>
                <label className="block text-sm font-bold text-gray-700">תמונת רקע עליונה (URL):</label>
                <input
                    type="text"
                    value={draft.img}
                    onChange={(e) => updateDraft({ img: e.target.value })}
                    className="w-full border p-2 rounded ltr"
                />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700">כותרת ראשית:</label>
                <input
                    type="text"
                    value={draft.title}
                    onChange={(e) => updateDraft({ title: e.target.value })}
                    className="w-full border p-2 rounded"
                />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700">כותרת משנית:</label>
                <textarea
                    value={draft.subtitle}
                    onChange={(e) => updateDraft({ subtitle: e.target.value })}
                    className="w-full border p-2 rounded h-20"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-bold text-gray-700">טקסט כפתור ראשי:</label>
                    <input
                        type="text"
                        value={draft.btnText}
                        onChange={(e) => updateDraft({ btnText: e.target.value })}
                        className="w-full border p-2 rounded"
                    />
                </div>
            </div>
        </div>
    );

    const ViewContent = (
        <div className="min-h-screen bg-white">
            <Hero
                onStartEditor={onNavigateToEditor}
                onFilesSelected={handleFilesSelected}
                backgroundImage={draft.img}
                title={draft.title}
                subtitle={draft.subtitle}
                btnText={draft.btnText}
            />
            <Gallery
                images={images}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
                onSizeChange={handleSizeChange}
                onSendOrder={handleSendOrder}
                availableSizes={priceList}
            />
        </div>
    );

    return (
        <AdminControls
            editMode={editMode}
            previewContent={EditContent}
            adminControls={adminControls}
        >
            {ViewContent}
        </AdminControls>
    );
};

export default PhotoDevelopmentPage;