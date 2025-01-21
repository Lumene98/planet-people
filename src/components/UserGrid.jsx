import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/userSlice";
import GridCell from "./GridCell";
import GridRow from "./GridRow";
import GridHeader from "./GridHeader";
import { useMemo } from "react";
import PlanetLink from "./PlanetLink";
import { useState } from "react";
import Input from "./Input";
import { useCallback } from "react";
import { resetPage } from "../features/userSlice";
import SkeletonRow from "./SkeletonRows";

const UserGrid = () => {
  const dispatch = useDispatch();
  const {
    data: users,
    status,
    error,
    next,
    previous,
    count,
    page,
  } = useSelector((state) => state.user);

  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsersCallback = useCallback(
    (page) => {
      dispatch(fetchUsers({ search: searchQuery, page }));
    },
    [searchQuery, dispatch],
  );

  const userNumber = useMemo(() => {
    if (page === 1) {
      return users.length;
    }
    return (page - 1) * 10 + users.length;
  }, [page, users.length]);

  const handleSearch = (e) => {
    dispatch(resetPage());
    setSearchQuery(e.target.value);
  };

  const handleNext = () => {
    if (next) {
      fetchUsersCallback(page + 1);
    }
  };

  const handlePrevious = () => {
    if (previous) {
      fetchUsersCallback(page - 1);
    }
  };

  useEffect(() => {
    fetchUsersCallback(1);
  }, []);

  useEffect(() => {
    fetchUsersCallback(page);
  }, [searchQuery, page]);

  if (status === "rejected") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="pt-2">
      <h1 className="text-2xl font-bold mb-4">Star Wars Characters</h1>
      <Input
        placeholder={"Query by name"}
        value={searchQuery}
        onChange={handleSearch}
      />
      <div className="grid min-h-[352px] content-start">
        {status === "pending" ? (
          <SkeletonRow size={11} />
        ) : (
          <>
            <GridHeader />
            {users.map((user, key) => {
              return (
                <GridRow key={key}>
                  <GridCell>{user.name}</GridCell>
                  <GridCell>{user.height} cm</GridCell>
                  <GridCell>{user.mass} kg</GridCell>
                  <GridCell>
                    {new Date(user.created).toISOString().split("T")[0]}
                  </GridCell>
                  <GridCell>
                    {new Date(user.edited).toISOString().split("T")[0]}
                  </GridCell>
                  <GridCell>
                    <PlanetLink planetUrl={user.homeworld}></PlanetLink>
                  </GridCell>
                </GridRow>
              );
            })}
          </>
        )}
      </div>

      <div className="flex justify-end mt-2 spacing gap-2 items-center">
        {users.length > 0 && (
          <div className="text-gray-700">
            {userNumber} of {count} results
          </div>
        )}

        <button
          className="text-gray-300 min-h-9 rounded-md py-2 px-3 bg-black disabled:opacity-50"
          onClick={handlePrevious}
          disabled={!previous | (status === "pending")}
        >
          Previous
        </button>
        <button
          className="text-gray-300 min-h-9 rounded-md py-2 px-3 bg-black disabled:opacity-50"
          onClick={handleNext}
          disabled={!next | (status === "pending")}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserGrid;
