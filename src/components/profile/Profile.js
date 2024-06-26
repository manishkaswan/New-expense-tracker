import { useEffect, useRef, useState } from "react";

const Profile = () => {
  const fullNameRef = useRef();
  const urlRef = useRef();
  const [intialName, setIntialName] = useState("");
  const [intialUrl, setIntialUrl] = useState("");

  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDNb4smayxCQ2Fx1fRPC9g6VJjCwWiDC60",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("token"),
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Authentication error");
        }
      })
      .then((res) => {
        console.log(res.users[0].displayName);
        setIntialName(res.users[0].displayName);
        setIntialUrl(res.users[0].photoUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateFormDataHandler = (event) => {
    event.preventDefault();
    const nameRefValue = fullNameRef.current.value;
    const urlRefValue = urlRef.current.value;
    const localstr = localStorage.getItem("token");

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDNb4smayxCQ2Fx1fRPC9g6VJjCwWiDC60",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localstr,
          displayName: nameRefValue,
          photoUrl: urlRefValue,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Authentication error");
        }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

 
  

  return (
    <form onSubmit={updateFormDataHandler}>
      <div>
        <h2>Contact details</h2>
      </div>

      <label>Full Name</label>
      <input type="text" ref={fullNameRef} defaultValue={intialName} />

      <label>Profile Photo URL</label>
      <input type="text" ref={urlRef} defaultValue={intialUrl} />

      <button>UPDATE</button>
    </form>
  );
};

export default Profile;