import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import { useCartStore } from '../store/cartStore';
import axios from 'axios';

const PhotoDevelopmentPage = ({ onNavigate, onNavigateToEditor }) => {
    const [images, setImages] = useState([]);
    const [priceList, setPriceList] = useState([]);
    const [isUploading, setIsUploading] = useState(false); // New state for loading
    const addToCart = useCartStore((state) => state.addToCart);
    const navigate = useNavigate();

    // 1. Fetch prices from the Server on load
    useEffect(() => {
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

    return (
        <div className="min-h-screen bg-white relative">
            {/* Loading Overlay */}
            {isUploading && (
                <div className="fixed inset-0 bg-black/50 z-50 flex flex-col items-center justify-center text-white backdrop-blur-sm">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mb-4"></div>
                    <h2 className="text-xl font-bold">מעלה תמונות...</h2>
                    <p>אנא המתן, זה עשוי לקחת מספר רגעים</p>
                </div>
            )}

            <Hero
                onStartEditor={onNavigateToEditor}
                onFilesSelected={handleFilesSelected}
                backgroundImage="https://res.cloudinary.com/dwqywo11u/image/upload/v1764668010/a3b33323-3745-44b6-a4c0-a6749513d957.png"
                title="גרירת תמונות לכאן"
                subtitle="צור מתנות מרגשות עם התמונות שאתה אוהב" 
                primaryButtonText="בחירת קבצים"
                secondaryButtonText=""
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
};

export default PhotoDevelopmentPage;