// components/TopSpecialties.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://medcasts-backend.onrender.com/api";
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL || "https://medcasts-backend.onrender.com";

interface Specialty {
  id: number;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
}

const TopSpecialties: React.FC = () => {
  const navigate = useNavigate();
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/specialties?isActive=true&limit=8`
        );
        const data = await response.json();
        if (data.success && data.data.specialties) {
          console.log("Specialties data:", data.data.specialties);
          setSpecialties(data.data.specialties);
        }
      } catch (error) {
        console.error("Error fetching specialties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  const handleSpecialtyClick = (specialty: Specialty) => {
    // Navigate to dynamic specialty page
    navigate(`/specialty/${specialty.slug}`);
  };

  const getImageUrl = (imagePath?: string): string => {
    if (!imagePath) return "/images/default-specialty.jpg";

    // If it's already a full URL, return as-is
    if (/^https?:\/\//i.test(imagePath)) {
      return imagePath;
    }

    // If it starts with /uploads, it's on the backend server
    if (imagePath.startsWith("/uploads")) {
      const fullUrl = `${SERVER_BASE_URL}${imagePath}`;
      console.log("Backend image URL:", imagePath, "→", fullUrl);
      return fullUrl;
    }

    // Otherwise it's a static image in the frontend public folder
    const normalizedPath = imagePath.startsWith("/")
      ? imagePath
      : `/${imagePath}`;
    console.log("Frontend static image:", imagePath, "→", normalizedPath);
    return normalizedPath;
  };

  const bgColors = [
    "bg-gradient-to-br from-blue-50 to-blue-100",
    "bg-gradient-to-br from-purple-50 to-purple-100",
    "bg-gradient-to-br from-pink-50 to-pink-100",
    "bg-gradient-to-br from-yellow-50 to-yellow-100",
    "bg-gradient-to-br from-green-50 to-green-100",
    "bg-gradient-to-br from-indigo-50 to-indigo-100",
    "bg-gradient-to-br from-red-50 to-red-100",
    "bg-gradient-to-br from-teal-50 to-teal-100",
  ];

  if (loading) {
    return (
      <section className="py-6 mt-6 max-w-7xl mx-auto border border-green-200 bg-gradient-to-b from-teal-50/5 to-teal-100/30 rounded-3xl">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-12">
            <Loader2 className="w-12 h-12 text-teal-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading specialties...</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-6 mt-6 max-w-7xl mx-auto border border-green-200 bg-gradient-to-b from-teal-50/5 to-teal-100/30 rounded-3xl">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Top-searched specialties
          </h2>
          <p className="text-lg text-gray-600">
            More than 2,000 clinics across multiple specialties
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialties.map((specialty, index) => (
            <div
              key={specialty.id}
              onClick={() => handleSpecialtyClick(specialty)}
              className={`${
                bgColors[index % bgColors.length]
              } rounded-3xl border border-teal-500 p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden h-40`}
            >
              {/* Header with name */}
              <div className="mb-4 relative z-20">
                <h3 className="font-bold text-base text-gray-900 leading-tight mb-1">
                  {specialty.name}
                </h3>
                {specialty.description && (
                  <span className="text-xs text-gray-500 font-medium line-clamp-2">
                    {specialty.description}
                  </span>
                )}
              </div>

              {/* Background Icon/Image */}
              {specialty.imageUrl && (
                <img
                  src={getImageUrl(specialty.imageUrl)}
                  alt={`${specialty.name} icon`}
                  className="absolute bottom-4 right-4 w-20 h-20 opacity-60 select-none pointer-events-none object-contain"
                  onError={(e) => {
                    console.error("Failed to load image:", specialty.imageUrl);
                    e.currentTarget.style.display = "none";
                  }}
                  onLoad={() =>
                    console.log("Image loaded successfully:", specialty.name)
                  }
                />
              )}

              {/* Arrow Button */}
              <div className="absolute bottom-6 left-6">
                <ArrowRight size={16} className="text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopSpecialties;
