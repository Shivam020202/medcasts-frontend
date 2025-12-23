import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Loader2, ExternalLink, Building2, Stethoscope } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://medcasts-backend.onrender.com/api";
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL || "https://medcasts-backend.onrender.com";

interface HospitalSpecialty {
  id: number;
  hospitalId: number;
  specialtyId: number;
  isActive: boolean;
  hospital: {
    id: number;
    name: string;
    slug: string;
    location: string;
    city: string;
    image?: string;
  };
  specialty: {
    id: number;
    name: string;
    slug: string;
    icon?: string;
    imageUrl?: string;
  };
}

const HospitalSpecialtyDirectory: React.FC = () => {
  const navigate = useNavigate();
  const [combinations, setCombinations] = useState<HospitalSpecialty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCombinations = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/hospitals/specialty-combinations`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch combinations");
        }

        const result = await response.json();
        if (result.success) {
          setCombinations(result.data);
        } else {
          throw new Error(result.message || "Failed to load data");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCombinations();
  }, []);

  const handleNavigate = (hospitalSlug: string, specialtySlug: string) => {
    navigate(`/hospital/${hospitalSlug}/${specialtySlug}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{error}</h2>
        <Button onClick={() => navigate("/")}>Return Home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Hospital-Specialty Directory
            </h1>
            <p className="text-lg text-gray-600">
              Browse all available hospital and specialty combinations
            </p>
            {combinations.length === 0 && (
              <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 font-medium mb-2">
                  No hospital-specialty combinations found!
                </p>
                <p className="text-sm text-yellow-700">
                  Go to the admin panel and assign specialties to hospitals to
                  create dynamic pages.
                </p>
                <Button
                  className="mt-4"
                  onClick={() =>
                    window.open(`${SERVER_BASE_URL}/admin.html`, "_blank")
                  }
                >
                  Open Admin Panel
                </Button>
              </div>
            )}
          </div>

          {combinations.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {combinations.map((combo) => (
                <Card
                  key={combo.id}
                  className="hover:shadow-xl transition-all cursor-pointer border-2 hover:border-blue-500"
                  onClick={() =>
                    handleNavigate(combo.hospital.slug, combo.specialty.slug)
                  }
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-gray-900 truncate">
                          {combo.hospital.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {combo.hospital.city}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4 p-3 bg-green-50 rounded-lg">
                      <Stethoscope className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-700">
                        {combo.specialty.name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        /hospital/{combo.hospital.slug}/{combo.specialty.slug}
                      </code>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-lg text-blue-900 mb-2">
              💡 Quick Start Guide
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-blue-800">
              <li>
                <strong>Login to Admin:</strong> Visit{" "}
                <a
                  href={`${SERVER_BASE_URL}/admin.html`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {SERVER_BASE_URL}
                  /admin.html
                </a>
              </li>
              <li>
                <strong>Edit Hospital:</strong> Go to Hospitals section, click
                edit button
              </li>
              <li>
                <strong>Select Specialties:</strong> Check the specialties this
                hospital offers
              </li>
              <li>
                <strong>Save:</strong> Click Save to create the combinations
              </li>
              <li>
                <strong>Visit Pages:</strong> Click any card above or use the
                URL pattern
              </li>
            </ol>
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalSpecialtyDirectory;
