import { useEffect, useState } from "react";
import axios from "axios";

export default function AboutPage({ isAdmin }: { isAdmin: boolean }) {
    const [page, setPage] = useState < { title: string; content: string } > ({ title: "", content: "" });
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:4000/api/page/about").then((res) => {
            setPage({ title: res.data.title, content: res.data.content });
        });
    }, []);

    const saveChanges = async () => {
        await axios.put("http://localhost:4000/api/page/about", page);
        setEditMode(false);
    };

    return (
        <div style={{ padding: "20px", maxWidth: 800, margin: "auto" }}>
            {isAdmin && editMode ? (
                <>
                    <input
                        style={{ width: "100%", fontSize: "1.5rem", marginBottom: "10px" }}
                        value={page.title}
                        onChange={(e) => setPage({ ...page, title: e.target.value })}
                    />
                    <textarea
                        style={{ width: "100%", height: "250px" }}
                        value={page.content}
                        onChange={(e) => setPage({ ...page, content: e.target.value })}
                    />
                    <br />
                    <button onClick={saveChanges}>💾 Save</button>
                    <button onClick={() => setEditMode(false)} style={{ marginLeft: "10px" }}>
                        Cancel
                    </button>
                </>
            ) : (
                <>
                    <h1>{page.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: page.content }} />
                    {isAdmin && (
                        <button style={{ marginTop: "10px" }} onClick={() => setEditMode(true)}>
                            ✏️ Edit
                        </button>
                    )}
                </>
            )}
        </div>
    );
}