import React, { useEffect, useState } from "react";
import { getAuth, clearAuth, setAuth } from "../lib/auth";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { userAPI } from "../lib/api";

export default function Account() {
    const nav = useNavigate();
    const initialAuth = getAuth();
    const [user, setLocalUser] = useState(initialAuth?.user);
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({ fullName: "", phone: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [profileImageFile, setProfileImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState(null);
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize form state when user data changes (e.g., on first load)
    useEffect(() => {
        if (user) {
            setForm({ fullName: user.fullName || user.name || "", phone: user.phone || "", password: "" });
        }

        // Effect to clean up the object URLs to prevent memory leaks
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
            if (profileImageUrl) URL.revokeObjectURL(profileImageUrl);
        };
        // Re-run if user object or previews change (for cleanup)
    }, [user, imagePreview, profileImageUrl]);

    // Fetch fresh user data on mount (and handle 401 Unauthorized)
    useEffect(() => {
        let mounted = true;
        if (!getAuth()?.token) {
            setIsLoading(false);
            if (!initialAuth?.user) {
                // Only navigate if there's also no user data in local storage
                nav("/login");
            }
            return;
        }

        (async () => {
            try {
                // Fetch user text data
                const r = await userAPI.me();
                if (!mounted) return;
                
                const u = r.data;
                // Reconstruct user object, preserving properties like 'role' from local storage
                const userObj = { 
                    id: u.id, 
                    fullName: u.fullName, 
                    email: u.email, 
                    phone: u.phone, 
                    role: initialAuth?.user?.role,
                    // Make sure to include the profileImagePath from the fetched data
                    hasProfileImage: u.hasProfileImage 
                };
                
                setLocalUser(userObj);
                setAuth({ ...getAuth(), user: userObj }); // Update local storage with fresh data

                // Fetch profile image data if it exists
                if (u.hasProfileImage) {
                    const imageResponse = await userAPI.profileImage();
                    if (!mounted) return;
                    setProfileImageUrl(URL.createObjectURL(imageResponse.data));
                }
                
            } catch (err) {
                // Handle 401 and 403 similarly: clear session and redirect to login
                const status = err?.response?.status;
                if (status === 401 || status === 403) {
                    console.error("Auth error (401/403). Clearing session and redirecting.");
                    clearAuth();
                    setLocalUser(null); // Clear local state immediately

                    nav("/login");
                    return; // Stop the async function from executing further
                }
                console.error("Failed to fetch user data:", err);
            } finally {
                if (mounted) {
                    setIsLoading(false); // Done fetching/checking auth status
                }
            }
        })();
        
        return () => { mounted = false; };
        // We include dependencies for correctness
    }, [nav, initialAuth?.user?.role]); 

    const logout = () => {
        clearAuth();
        setLocalUser(null); // Clear local state immediately
        // Dispatch event for other components to react to the auth change
        window.dispatchEvent(new Event("auth:update"));
        // Refresh page after logout
        setTimeout(() => {
            window.location.href = "/";
            window.location.reload();
        }, 100);
    };

    const save = async (e) => {
        e?.preventDefault?.();
        setMessage(null);
        setLoading(true);
        
        try {
            // Use FormData to handle both text and file data
            const formData = new FormData();
            formData.append('fullName', form.fullName);
            formData.append('phone', form.phone);
            if (form.password) {
                formData.append('password', form.password);
            }
            if (profileImageFile) {
                formData.append('profileImage', profileImageFile);
            }
            
            const r = await userAPI.update(formData);
            
            const updated = r.data.user;
            const userObj = { 
                id: updated.id, 
                fullName: updated.fullName, 
                email: updated.email, 
                phone: updated.phone, 
                role: initialAuth?.user?.role,
                hasProfileImage: updated.hasProfileImage // Use the boolean flag from the backend
            };
            setLocalUser(userObj);
            setAuth({ ...getAuth(), user: userObj });

            // If a new image was uploaded, it will be the new profile image.
            // We can use the local preview as the new source until a page refresh.
            // We must be careful not to revoke the URL we are about to use.
            if (imagePreview) {
                // If there was an old database image, its URL can be revoked.
                if (profileImageUrl) {
                    try { URL.revokeObjectURL(profileImageUrl); } catch(e) {}
                }
                setProfileImageUrl(imagePreview);
                setImagePreview(null); // The preview is now the main image, clear the preview state.
            }

            setEditing(false);
            setMessage(r.data.message || "Profile Saved.");
            setProfileImageFile(null); // Clear the selected file after successful upload
            setForm((f) => ({ ...f, password: "" })); 
            
        } catch (err) {
            // Handle 401/403 during update: clear session and redirect
            const status = err?.response?.status;
            if (status === 401 || status === 403) {
                clearAuth();
                nav("/login");
                return; // Stop processing after redirect
            }
            setMessage(err?.response?.data?.message || err?.message || "Failed to save profile.");
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ["image/jpeg", "image/png", "image/svg+xml"];
            if (!allowedTypes.includes(file.type)) {
                setMessage("Invalid file type. Please select a PNG, JPG, or SVG image.");
                return;
            }
            // Clean up old preview if one exists
            if (imagePreview) {
                try { URL.revokeObjectURL(imagePreview); } catch (e) {}
            }
            setProfileImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Show a loading state until authentication is checked or user data is fetched.
    if (isLoading || !user) {
        return (
            <div className="max-w-3xl py-10 mx-auto">
                <div className="p-6 bg-white rounded shadow">
                    <h2 className="mb-4 text-xl font-semibold">My Account</h2>
                    <p className="text-sm text-slate-600">Loading user data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl py-10 mx-auto">
            <div className="p-6 bg-white rounded shadow">
                <h2 className="flex items-center justify-between mb-4 text-xl font-semibold">
                    My Account 
                    { !editing && 
                        <button 
                            onClick={() => {
                                setEditing(true);
                                setMessage(null); // Clear any old messages
                            }} 
                            className="ml-4 text-sm text-[#003366] bg-white border border-[#003366] px-3 py-1 rounded hover:bg-[#003366] hover:text-white transition"
                        >
                            Edit
                        </button> 
                    }
                </h2>

                {message && (
                    <div 
                        className={`p-3 mb-4 text-sm border rounded ${
                            message.includes("Failed") || message.includes("Invalid") 
                            ? "text-red-700 border-red-200 bg-red-50" 
                            : "text-green-700 border-green-200 bg-green-50"
                        }`}
                    >
                        {message}
                    </div>
                )}

                {editing ? (
                    <form onSubmit={save} className="space-y-4">
                        <div className="flex flex-col items-center mb-4">
                            <label htmlFor="profile-image-upload" className="cursor-pointer">
                                <img
                                    src={
                                        imagePreview || 
                                        profileImageUrl || "https://via.placeholder.com/100?text=Avatar"
                                    }
                                    alt="Profile Preview"
                                    className="object-cover w-24 h-24 border-2 rounded-full border-slate-300"
                                />
                            </label>
                            <input
                                id="profile-image-upload"
                                type="file"
                                accept="image/png, image/jpeg, image/svg+xml"
                                onChange={handleImageChange}
                                className="hidden"
                                disabled={loading}
                            />
                            <p className="mt-2 text-xs text-slate-500">Click image to change</p>
                        </div>

                        <div>
                            <label className="block text-sm text-slate-600">Full Name</label>
                            <input 
                                value={form.fullName} 
                                onChange={(e) => setForm({ ...form, fullName: e.target.value })} 
                                className="w-full px-3 py-2 mt-1 border rounded" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-600">Email</label>
                            <input 
                                value={user.email} 
                                disabled 
                                className="w-full px-3 py-2 mt-1 border rounded cursor-not-allowed bg-slate-100" 
                            />
                            <p className="mt-1 text-xs text-slate-500">Email address cannot be changed here.</p>
                        </div>
                        <div>
                            <label className="block text-sm text-slate-600">Phone</label>
                            <input 
                                value={form.phone} 
                                onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                                className="w-full px-3 py-2 mt-1 border rounded" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-600">New Password (optional)</label>
                            <input 
                                type="password" 
                                value={form.password} 
                                onChange={(e) => setForm({ ...form, password: e.target.value })} 
                                className="w-full px-3 py-2 mt-1 border rounded" 
                            />
                            <p className="mt-1 text-xs text-slate-500">Leave blank to keep current password.</p>
                        </div>
                        <div className="flex gap-2 pt-2">
                            <button 
                                type="submit" 
                                disabled={loading} 
                                className="bg-[#003366] text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-[#004488] transition"
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button 
                                type="button" 
                                onClick={() => { 
                                    setEditing(false); 
                                    // Reset form to current user values
                                    setForm({ fullName: user.fullName || '', phone: user.phone || '', password: '' }); 
                                    setMessage(null); 
                                    setImagePreview(null); // Clear preview on cancel
                                    setProfileImageFile(null); // Clear file on cancel
                                }} 
                                className="px-4 py-2 transition border border-gray-300 rounded hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center gap-6">
                            <div className="flex-shrink-0">
                                {profileImageUrl ? (
                                    <img
                                        src={profileImageUrl}
                                        alt="Profile"
                                        className="object-cover w-24 h-24 border-2 rounded-full border-slate-200"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-24 h-24 bg-gray-100 border-2 rounded-full border-slate-200">
                                        <User size={40} className="text-gray-400" />
                                    </div>
                                )}
                            </div>
                            <div className="grid flex-1 grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-slate-500">Name</p>
                                    <p className="font-medium text-gray-800">{user.fullName || user.name || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Email</p>
                                    <p className="font-medium text-gray-800">{user.email}</p>
                                </div>
                                <div>
                                <p className="text-sm text-slate-500">Phone</p>
                                <p className="font-medium text-gray-800">{user.phone || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Role</p>
                                <p className="font-medium text-gray-800">{user.role || "User"}</p>
                            </div>
                        </div>
                        </div>
                        <div className="pt-4 border-t border-gray-200">
                            <button onClick={logout} className="px-4 py-2 text-white transition bg-red-600 rounded hover:bg-red-700">Logout</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}