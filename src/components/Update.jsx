import React from "react";
import { useLoaderData } from "react-router-dom";

const Update = () => {
  const loadedUser = useLoaderData();
  console.log(loadedUser.name);

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const mdUser = { name, email };
    console.log(name, email);
    fetch(`http://localhost:3000/users/${loadedUser._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(mdUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          alert("user data updated");
        }
      });
  };
  return (
    <div>
      <p>Update page of {loadedUser.name}</p>
      <form onSubmit={handleUpdate}>
        <input type="text" name="name" id="" defaultValue={loadedUser.name} />
        <br />
        <input
          type="email"
          name="email"
          id=""
          defaultValue={loadedUser.email}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Update;
