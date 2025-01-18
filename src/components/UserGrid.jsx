import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/userSlice";

const UserGrid = () => {
  const dispatch = useDispatch();
  const {
    data: users,
    status,
    error,
    next,
    previous,
  } = useSelector((state) => state.user);

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

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "rejected") {
    return <div>Error: {error}</div>;
  }

  console.log(users);

  return (
    <>
      <button className="bg-white" onClick={handleNext}>
        Next
      </button>

      <button className="bg-white" onClick={handlePrevious}>
        Previous
      </button>
    </>
  );
};

export default UserGrid;
