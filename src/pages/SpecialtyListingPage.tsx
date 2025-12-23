import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Star,
  MapPin,
  Users,
  ChevronRight,
  Phone,
  TrendingUp,
  Loader2,
  AlertCircle,
  Award,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://medcasts-backend.onrender.com/api";

interface Treatment {
  id: number;
  name: string;
  slug: string;
  cost: string;
  description?: string;
  duration?: string;
  stay?: string;
  successRate?: number;
  procedureType?: string;
  isPopular?: boolean;
}

interface Hospital {
  id: number;
  name: string;
  slug: string;
  location: string;
  city: string;
  state: string;
  country: string;
  rating: number;
  description?: string;
  image?: string;
  accreditation?: string;
  phone?: string;
  email?: string;
  address?: string;
  bedCapacity?: number;
  establishedYear?: number;
  treatments?: Treatment[];
}

interface Specialty {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  imageUrl?: string;
}

interface ApiResponse {
  success: boolean;
  data: {
    specialty: Specialty;
    hospitals: Hospital[];
    count: number;
  };
}

const PAGE_SIZE = 3;

const SpecialtyListingPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [specialty, setSpecialty] = useState<Specialty | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) {
        setError("No specialty specified");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log(`Fetching: ${API_BASE_URL}/specialties/${slug}/hospitals`);

        const response = await fetch(
          `${API_BASE_URL}/specialties/${slug}/hospitals`
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("API Error:", response.status, errorText);
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const result: ApiResponse = await response.json();
        console.log("API Response:", result);

        if (result.success && result.data) {
          setSpecialty(result.data.specialty);
          setHospitals(result.data.hospitals);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !specialty) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Specialty Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              {error || "The specialty you're looking for doesn't exist."}
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition"
            >
              Back to Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const totalPages = Math.ceil(hospitals.length / PAGE_SIZE);
  const paginatedHospitals = hospitals.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // Calculate price range from treatments
  const getPriceRange = (hospital: Hospital) => {
    if (!hospital.treatments || hospital.treatments.length === 0) {
      return { min: "Contact", max: "for pricing" };
    }

    const prices = hospital.treatments
      .map((t) => {
        const match = t.cost.match(/\$?([\d,]+)/g);
        if (match) {
          return match.map((p) => parseInt(p.replace(/[$,]/g, "")));
        }
        return [];
      })
      .flat()
      .filter((p) => !isNaN(p));

    if (prices.length === 0) return { min: "Contact", max: "for pricing" };

    return {
      min: `$${Math.min(...prices).toLocaleString()}`,
      max: `$${Math.max(...prices).toLocaleString()}`,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-teal-700 via-teal-600 to-teal-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {specialty.name}
            </h1>
            <p className="text-xl text-teal-100 mb-6">
              {specialty.description ||
                `Find the best hospitals for ${specialty.name} treatment`}
            </p>
            <div className="inline-block bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-2">
              <span className="font-semibold">
                {hospitals.length} hospitals available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hospitals Listing */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {hospitals.length === 0 ? (
            <div className="text-center py-16">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No Hospitals Found
              </h3>
              <p className="text-gray-600">
                No hospitals currently offer {specialty.name} services.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {paginatedHospitals.map((hospital) => {
                  const priceRange = getPriceRange(hospital);
                  const treatmentCount = hospital.treatments?.length || 0;

                  return (
                    <div
                      key={hospital.id}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
                    >
                      <div className="flex flex-col lg:flex-row">
                        {/* Hospital Image */}
                        {hospital.image && (
                          <div className="lg:w-80 h-64 lg:h-auto relative overflow-hidden">
                            <img
                              src={hospital.image}
                              alt={hospital.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {hospital.accreditation && (
                              <div className="absolute top-4 left-4 bg-white bg-opacity-95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-teal-700">
                                {hospital.accreditation}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Hospital Details */}
                        <div className="flex-1 flex flex-col p-6 lg:p-8 justify-between">
                          <div>
                            {/* Header */}
                            <div className="flex flex-col lg:flex-row justify-between items-start mb-3 gap-2">
                              <div className="flex-1 min-w-0">
                                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-teal-600 mb-2">
                                  {hospital.name}
                                </h3>
                                <div className="flex flex-wrap items-center gap-3 text-gray-600 mb-2">
                                  <div className="flex items-center gap-1">
                                    <MapPin
                                      size={16}
                                      className="text-teal-600"
                                    />
                                    <span className="font-medium">
                                      {hospital.city}
                                    </span>
                                  </div>
                                  {hospital.establishedYear && (
                                    <span className="text-sm text-gray-500">
                                      Est. {hospital.establishedYear}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent">
                                  {priceRange.min}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Starting from
                                </div>
                              </div>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-4 mb-3">
                              <div className="flex items-center gap-1">
                                <Star
                                  className="fill-yellow-400 text-yellow-400"
                                  size={16}
                                />
                                <span className="font-bold text-gray-900">
                                  {hospital.rating || "4.5"}
                                </span>
                                <span className="text-gray-500 text-sm">
                                  (Reviews)
                                </span>
                              </div>
                              {treatmentCount > 0 && (
                                <div className="flex items-center gap-1 text-teal-600">
                                  <TrendingUp size={14} />
                                  <span className="font-semibold text-sm">
                                    {treatmentCount} treatments available
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Description */}
                            {hospital.description && (
                              <p className="text-gray-600 mb-3 leading-relaxed text-sm">
                                {hospital.description}
                              </p>
                            )}

                            {/* Key Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                              {hospital.bedCapacity && (
                                <div className="bg-teal-50 rounded-lg p-2 border border-teal-100">
                                  <div className="text-xs text-teal-600 uppercase tracking-wide font-semibold">
                                    Bed Capacity
                                  </div>
                                  <div className="text-gray-900 font-medium text-sm flex items-center gap-1">
                                    <Users
                                      size={12}
                                      className="text-teal-600"
                                    />
                                    {hospital.bedCapacity} beds
                                  </div>
                                </div>
                              )}
                              {treatmentCount > 0 && (
                                <div className="bg-teal-50 rounded-lg p-2 border border-teal-100">
                                  <div className="text-xs text-teal-600 uppercase tracking-wide font-semibold">
                                    Treatments
                                  </div>
                                  <div className="text-gray-900 font-medium text-sm">
                                    {treatmentCount} procedures
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Popular Treatments */}
                            {hospital.treatments &&
                              hospital.treatments.length > 0 && (
                                <div className="mb-4">
                                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                    Popular Treatments:
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {hospital.treatments
                                      .slice(0, 4)
                                      .map((treatment) => (
                                        <span
                                          key={treatment.id}
                                          className="px-2 py-1 bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 text-xs rounded-full font-medium border border-teal-200"
                                        >
                                          {treatment.name}
                                        </span>
                                      ))}
                                    {hospital.treatments.length > 4 && (
                                      <span className="px-2 py-1 text-teal-600 text-xs font-medium">
                                        +{hospital.treatments.length - 4} more
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 mt-auto pt-3 border-t border-gray-100">
                            <div className="text-sm text-gray-500">
                              Complete package: {priceRange.min} -{" "}
                              {priceRange.max}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                              {hospital.phone && (
                                <a
                                  href={`tel:${hospital.phone}`}
                                  className="flex-1 lg:flex-none border border-teal-600 text-teal-600 px-4 py-2 rounded-lg hover:bg-teal-50 transition font-semibold flex items-center justify-center gap-2 text-sm"
                                >
                                  <Phone size={14} />
                                  Contact
                                </a>
                              )}
                              <Link
                                to={`/hospital/${hospital.slug}/${specialty.slug}`}
                                className="flex-1 lg:flex-none bg-gradient-to-r from-teal-600 to-teal-700 text-white px-4 py-2 rounded-lg hover:from-teal-700 hover:to-teal-800 transition font-semibold flex items-center justify-center gap-2 text-sm"
                              >
                                View Details
                                <ChevronRight size={14} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <button
                    className="px-3 py-2 rounded-lg text-teal-700 bg-teal-50 font-semibold disabled:opacity-50 hover:bg-teal-100 transition-colors"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    <ChevronsLeft size={16} className="inline" /> Prev
                  </button>
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      className={`px-3 py-2 rounded text-sm font-semibold transition-colors ${
                        page === idx + 1
                          ? "bg-teal-600 text-white shadow-sm"
                          : "bg-white text-teal-700 border border-teal-200 hover:bg-teal-50"
                      }`}
                      key={idx}
                      onClick={() => setPage(idx + 1)}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button
                    className="px-3 py-2 rounded-lg text-teal-700 bg-teal-50 font-semibold disabled:opacity-50 hover:bg-teal-100 transition-colors"
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                  >
                    Next <ChevronsRight size={16} className="inline" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SpecialtyListingPage;
