// pages/AdminSpecialties.tsx
import React, { useState, useEffect } from "react";
import { X, Plus, Edit2, Trash2, Save } from "lucide-react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_BASE_URL || "https://medcasts-backend.onrender.com/api";

interface Specialty {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  clinicsCount?: number;
  bgColor?: string;
  iconBg?: string;
  iconColor?: string;
  imageUrl?: string;
  isActive: boolean;
}

interface SpecialtyFormData {
  name: string;
  slug: string;
  description: string;
  icon: string;
  bgColor: string;
  iconBg: string;
  iconColor: string;
}

const AdminSpecialties: React.FC = () => {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingSpecialty, setEditingSpecialty] = useState<Specialty | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [formData, setFormData] = useState<SpecialtyFormData>({
    name: "",
    slug: "",
    description: "",
    icon: "",
    bgColor: "#10b981",
    iconBg: "#d1fae5",
    iconColor: "#059669",
  });

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const fetchSpecialties = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/specialties`);
      setSpecialties(response.data.data?.specialties || []);
    } catch (error) {
      console.error("Error fetching specialties:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setFormData({ ...formData, icon: emojiData.emoji });
    setShowEmojiPicker(false);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name),
    });
  };

  const openCreateModal = () => {
    setEditingSpecialty(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      icon: "",
      bgColor: "#10b981",
      iconBg: "#d1fae5",
      iconColor: "#059669",
    });
    setShowModal(true);
  };

  const openEditModal = (specialty: Specialty) => {
    setEditingSpecialty(specialty);
    setFormData({
      name: specialty.name,
      slug: specialty.slug,
      description: specialty.description || "",
      icon: specialty.icon || "",
      bgColor: specialty.bgColor || "#10b981",
      iconBg: specialty.iconBg || "#d1fae5",
      iconColor: specialty.iconColor || "#059669",
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Note: You'll need to get the auth token from your auth system
      const token = localStorage.getItem("adminToken");

      if (editingSpecialty) {
        // Update existing specialty
        await axios.put(
          `${API_URL}/specialties/${editingSpecialty.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        // Create new specialty
        await axios.post(`${API_URL}/specialties`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }

      setShowModal(false);
      fetchSpecialties();
    } catch (error) {
      console.error("Error saving specialty:", error);
      alert(
        "Error saving specialty. Please make sure you are logged in as admin."
      );
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this specialty?")) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API_URL}/specialties/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchSpecialties();
    } catch (error) {
      console.error("Error deleting specialty:", error);
      alert(
        "Error deleting specialty. Please make sure you are logged in as admin."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Specialty Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage medical specialties and their icons
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors shadow-lg"
          >
            <Plus size={20} />
            <span>Add Specialty</span>
          </button>
        </div>

        {/* Specialties Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading specialties...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialties.map((specialty) => (
              <div
                key={specialty.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
                    style={{ backgroundColor: specialty.iconBg || "#d1fae5" }}
                  >
                    {specialty.icon || "?"}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditModal(specialty)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(specialty.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {specialty.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {specialty.description || "No description"}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {specialty.slug}
                  </span>
                  <span
                    className={`px-2 py-1 rounded ${
                      specialty.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {specialty.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center rounded-t-2xl">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingSpecialty ? "Edit Specialty" : "Create Specialty"}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialty Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="e.g., Cardiac Surgery"
                    required
                  />
                </div>

                {/* Icon Picker */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-4 text-left hover:border-emerald-500 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center space-x-3">
                        {formData.icon ? (
                          <>
                            <span className="text-4xl">{formData.icon}</span>
                            <span className="text-gray-700 font-medium">
                              Selected Icon
                            </span>
                          </>
                        ) : (
                          <span className="text-gray-400">
                            Click to select an emoji icon
                          </span>
                        )}
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {showEmojiPicker && (
                      <div className="absolute top-full left-0 mt-2 z-50 shadow-2xl rounded-lg overflow-hidden">
                        <EmojiPicker
                          onEmojiClick={handleEmojiClick}
                          width={350}
                          height={400}
                          searchPlaceholder="Search icons..."
                        />
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Select an emoji icon to represent this specialty
                  </p>
                </div>

                {/* Slug Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="e.g., cardiac-surgery"
                    required
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    URL-friendly version (auto-generated from name)
                  </p>
                </div>

                {/* Description Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    rows={4}
                    placeholder="Brief description of the specialty..."
                  />
                </div>

                {/* Color Pickers */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Background Color
                    </label>
                    <input
                      type="color"
                      value={formData.bgColor}
                      onChange={(e) =>
                        setFormData({ ...formData, bgColor: e.target.value })
                      }
                      className="w-full h-12 border-2 border-gray-300 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icon Background
                    </label>
                    <input
                      type="color"
                      value={formData.iconBg}
                      onChange={(e) =>
                        setFormData({ ...formData, iconBg: e.target.value })
                      }
                      className="w-full h-12 border-2 border-gray-300 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icon Color
                    </label>
                    <input
                      type="color"
                      value={formData.iconColor}
                      onChange={(e) =>
                        setFormData({ ...formData, iconColor: e.target.value })
                      }
                      className="w-full h-12 border-2 border-gray-300 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Preview */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50">
                  <p className="text-sm font-medium text-gray-700 mb-4">
                    Preview
                  </p>
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-20 h-20 rounded-xl flex items-center justify-center text-4xl shadow-md"
                      style={{ backgroundColor: formData.iconBg }}
                    >
                      {formData.icon || "?"}
                    </div>
                    <div>
                      <p className="font-bold text-xl text-gray-900">
                        {formData.name || "Specialty Name"}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {formData.description || "Description will appear here"}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        /{formData.slug || "slug"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center space-x-2 shadow-lg"
                  >
                    <Save size={20} />
                    <span>
                      {editingSpecialty ? "Update" : "Create"} Specialty
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AdminSpecialties;
