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
  clinics?: string;
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
    // Navigate to dynamic specialty page using slug
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

  // Background colors for cards - cycling through these
  const bgColors = [
    "bg-blue-50",
    "bg-purple-50",
    "bg-pink-50",
    "bg-yellow-50",
    "bg-green-50",
    "bg-indigo-50",
    "bg-red-50",
    "bg-teal-50",
  ];

  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-12">
            <Loader2 className="w-12 h-12 text-teal-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading specialties...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Top-searched specialties</h2>
          <p className="text-lg text-gray-600">More than 2,000 clinics across 116 specialties</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialties.map((specialty, index) => (
            <div
              key={specialty.id}
              onClick={() => handleSpecialtyClick(specialty)}
              className={`${bgColors[index % bgColors.length]} rounded-3xl p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100 relative overflow-hidden h-40`}
            >
              {/* Header with name and clinic count */}
              <div className="mb-4 relative z-20">
                <h3 className="font-bold text-base text-gray-900 leading-tight mb-1">
                  {specialty.name}
                </h3>
                <span className="text-xs text-gray-500 font-medium">
                  {specialty.clinics || specialty.description || "Multiple clinics"}
                </span>
              </div>

              {/* Large Background Icon - Using IMG tag */}
              {specialty.imageUrl && (
                <img
                  src={getImageUrl(specialty.imageUrl)}
                  alt={`${specialty.name} icon`}
                  className="absolute bottom-4 left-24 w-24 h-24 opacity-50 select-none pointer-events-none object-contain"
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
              <div className="absolute bottom-6 right-6">
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
