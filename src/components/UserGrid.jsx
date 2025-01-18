import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/userSlice";
import GridCell from "./GridCell";
import GridRow from "./GridRow";
import GridHeader from "./GridHeader";
import { useMemo } from "react";

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

  const userNumber = useMemo(() => {
    console.log(page, users.length);
    if (page === 1) {
      return users.length;
    }
    return (page - 1) * 10 + users.length;
  }, [page, users.length]);

  const handleNext = () => {
    if (next) {
      dispatch(fetchUsers(next));
    }
  };

  const handlePrevious = () => {
    if (previous) {
      dispatch(fetchUsers(previous));
    }
  };

  useEffect(() => {
    if (status === "") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  if (status === "rejected") {
    return <div>Error: {error}</div>;
  }

  console.log(users);

  return (
    <div>
      <div className="grid min-h-[352px] content-start">
        {status === "pending" ? (
          <div className="h-[352px]">
            <div>Loading...</div>{" "}
          </div>
        ) : (
          <>
            <GridHeader />
            {users.map((user, key) => {
              return (
                <GridRow key={key}>
                  <GridCell>{user.name}</GridCell>
                  <GridCell>{user.height}</GridCell>
                  <GridCell>{user.mass}</GridCell>
                  <GridCell>{user.created}</GridCell>
                  <GridCell>{user.edited}</GridCell>
                  <GridCell>{user.homeworld}</GridCell>
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
          disabled={!previous}
        >
          Previous
        </button>
        <button
          className="text-gray-300 min-h-9 rounded-md py-2 px-3 bg-black disabled:opacity-50"
          onClick={handleNext}
          disabled={!next}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserGrid;
