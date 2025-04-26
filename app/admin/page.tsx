"use client";

import { useState, useEffect } from "react";
import { addPage, getPages, deletePage } from "../actions/pageActions";

interface Page {
    _id: string;
    title: string;
    url: string;
}

export default function AdminPage() {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const [pages, setPages] = useState<Page[]>([]);

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        const res = await getPages();
        if (res.success) {
            setPages(res.pages);
        }
    };


    const handleAddPage = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !url || !password) {
            setMessage("⚠️ Please fill out all fields.");
            return;
        }

        const result = await addPage({ title, url, password });

        if (result.success) {
            setMessage("✅ Page added successfully!");
            setTitle("");
            setUrl("");
        } else if (result.error === "Unauthorized") {
            setMessage("❌ Wrong password.");
        } else {
            setMessage("❌ Failed to add page.");
        }
    };


    const handleDeletePage = async (pageId: string) => {
        if (!password) {
            setMessage("⚠️ Enter admin password to delete.");
            return;
        }

        const result = await deletePage({ id: pageId, password: password });

        if (result.success) {
            setMessage("✅ Page deleted successfully!");
            fetchPages();
        } else if (result.error === "Unauthorized") {
            setMessage("❌ Wrong password.");
        } else {
            setMessage("❌ Failed to delete page.");
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="shadow-lg rounded-xl p-8 w-full max-w-2xl">
                <h1 className="text-3xl font-bold text-center mb-8">
                    📄 Add New Page
                </h1>

                <form onSubmit={handleAddPage} className="space-y-6">
                    <div>
                        <label className="block mb-2 text-sm font-semibold">
                            Page Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter page title"
                            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-semibold">
                            Page URL
                        </label>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Enter page URL"
                            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-semibold">
                            Admin Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter admin password"
                            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
                    >
                        ➕ Add Page
                    </button>

                    {message && (
                        <p className="text-center text-md font-medium  pt-4">
                            {message}
                        </p>
                    )}
                </form>


                {/* List Pages */}
                <div className="mt-10">
                    <h2 className="text-xl font-semibold mb-4">📃 All Pages</h2>

                    <div className="space-y-3">
                        {pages.map((page) => (
                            <div key={page._id} className="p-4 border rounded-lg flex justify-between items-center">
                                <a href={page.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    {page.title} {page.url}
                                </a>
                                <button
                                    onClick={() => handleDeletePage(page._id)}
                                    className="text-red-600 hover:text-red-800 font-semibold"
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
