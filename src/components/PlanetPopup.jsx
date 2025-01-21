import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPlanet } from "../features/planetSlice";

const PlanetPopup = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { planet, status, error } = useSelector((state) => state.planet);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchPlanet(id));
  }, [id]);

  if (status === "pending") {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-96 mb-96">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (status === "rejected") {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-96 mb-96">
          <div>Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-index-1"
      onClick={() => navigate("..")}
    >
      <div
        className="bg-white p-6 rounded-lg w-96 mb-96"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold">{planet?.name}</h2>
          <button
            className=" text-gray-300 min-h-9 rounded-md py-2 px-3 bg-black align-end"
            onClick={() => navigate("..")}
          >
            Close
          </button>
        </div>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Diameter:</span> {planet?.diameter}
          </p>
          <p>
            <span className="font-medium">Climate:</span> {planet?.climate}
          </p>
          <p>
            <span className="font-medium">Population:</span>{" "}
            {planet?.population}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlanetPopup;
