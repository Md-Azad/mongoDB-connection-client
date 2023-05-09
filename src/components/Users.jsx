import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Users = () => {
  const loadedUser = useLoaderData();
  const [user, setUser] = useState(loadedUser);
  const handleDelete = (_id) => {
    console.log("delete", _id);
    fetch(`http://localhost:3000/users/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount === 1) {
          const remaining = user.filter((u) => u._id !== _id);
          setUser(remaining);
          alert("user deleted successfully");
        }
      });
  };
  return (
    <div>
      <p> total user : {user.length}</p>
      <div>
        {user.map((u) => (
          <p key={u._id}>
            {u.name} : {u.email} --- {u._id}{" "}
            <Link to={`/update/${u._id}`}>
              <button>Update</button>
            </Link>
            <button onClick={() => handleDelete(u._id)}>X</button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Users;
