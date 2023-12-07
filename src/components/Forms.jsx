import React, { useState, useEffect, useRef } from 'react';

const Forms = () => {
  const [data, setData] = useState({
    mail: "",
    username: "",
    firstname: "",
    lastname: "",
    img: "",
    password: "",
  });

  const [showCard, setShowCard] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const buttonRef = useRef(null);

  const { mail, username, firstname, lastname, img, password } = data;

  useEffect(() => {
    const isValidData = validateData();
    setButtonDisabled(!isValidData);
  }, [data]);

  const validateData = () => {
    return (
      password.length >= 8 &&
      img.startsWith("http") &&
      mail !== "" &&
      username !== "" &&
      firstname !== "" &&
      lastname !== ""
    );
  };

  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      alert("Şifre en az 8 karakter olmalıdır.");
      return;
    }

    if (!data.img.startsWith("http")) {
      alert("Image URL must start with 'http' or 'https'");
      return;
    }

    setButtonClicked(true);
    setAnimationClass("animate");

    setTimeout(() => {
      setShowCard(true);
      setFormData({ ...data });
      setData({
        mail: "",
        username: "",
        firstname: "",
        lastname: "",
        img: "",
        password: "",
      });

      setButtonDisabled(true);
      setButtonClicked(false);
      setAnimationClass("");
    }, 1000);
  };

  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  const cardContent = {
    mail: formData?.mail || "",
    username: formData?.username || "",
    firstname: formData?.firstname || "",
    lastname: formData?.lastname || "",
    img: formData?.img || "",
  };

  const handleHoverEnter = () => {
    if (!validateData() && buttonRef.current) {
      buttonRef.current.style.transform = "translateX(-20px)";
    }
  };

  const handleHoverLeave = () => {
    if (!validateData() && buttonRef.current) {
      buttonRef.current.style.transform = "translateX(0)";
    }
  };

  return (
    <div>
      <div className={`d-flex align-items-center justify-content-center flex-column gap-5 ${animationClass}`}>
        <form onSubmit={handleFormSubmit} className='container mt-5 ' style={{ width: "40rem" }}>
          <div className="input-group input-group-sm mb-3" style={{ height: "2.4rem" }}>
            <span className="input-group-text" id="inputGroup-sizing-sm">Email-Adress</span>
            <input
              type="email"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              placeholder='Enter e-mail adress'
              onChange={handleData}
              value={mail || ""}
              name="mail"
            />
          </div>

          <div className="input-group input-group-sm mb-3" style={{ height: "2.5rem" }}>
            <span className="input-group-text" id="inputGroup-sizing-sm">UserName</span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              placeholder='Enter username'
              onChange={handleData}
              value={username || ""}
              name="username"
            />
          </div>

          <div className="input-group input-group-sm mb-3" style={{ height: "2.5rem" }}>
            <span className="input-group-text" id="inputGroup-sizing-sm">FirstName</span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              placeholder='Enter FirstName'
              onChange={handleData}
              value={firstname || ""}
              name="firstname"
            />
          </div>

          <div className="input-group input-group-sm mb-3" style={{ height: "2.5rem" }}>
            <span className="input-group-text" id="inputGroup-sizing-sm">LastName</span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              placeholder='Enter LastName'
              onChange={handleData}
              value={lastname || ""}
              name="lastname"
            />
          </div>

          <div className="input-group input-group-sm mb-3" style={{ height: "2.5rem" }}>
            <span className="input-group-text" id="inputGroup-sizing-sm">Image</span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              placeholder='Enter image url'
              onChange={handleData}
              value={img || ""}
              name="img"
            />
          </div>

          <div className="input-group input-group-sm mb-3" style={{ height: "2.5rem" }}>
            <span className="input-group-text" id="inputGroup-sizing-sm">Password</span>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              placeholder='Enter password'
              onChange={handleData}
              value={password || ""}
              name="password"
            />
            <button type="button" className="btn btn-success" onClick={handleShow}>
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
          </div>

          <button
            ref={buttonRef}
            type="submit"
            className={`btn btn-success animate-button`}
            style={{ cursor: buttonClicked || !validateData() ? "not-allowed" : "pointer" }}
            onMouseEnter={() => {
              setIsButtonHovered(true);
              handleHoverEnter();
            }}
            onMouseLeave={() => {
              setIsButtonHovered(false);
              handleHoverLeave();
            }}
          >
            {buttonClicked ? "Processing..." : "Submit"}
          </button>
        </form>

        {showCard && (
          <div className='cards'>
            <div className="card" style={{ width: "18rem" }}>
              <img src={cardContent.img} className="card-img-top" alt="..." />
              <div className="card-body">
                <h3 className='car-title'>{cardContent.username}</h3>
                <h5 className="card-text">{cardContent.firstname}</h5>
                <p className="card-text">{cardContent.mail}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forms;
