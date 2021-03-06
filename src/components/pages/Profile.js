import React, { Component } from "react";
import fire from "../../config/Fire";
/*import { BrowserRouter as Router,Switch,Route,Redirect }from 'react-router-dom';
import Home from './Home';*/
import { Redirect } from "react-router-dom";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: "",
      phoneno: "",
      email: "",
      city: "",
      formTitle: "UserProfile",
      msg: "",
    };
  }
  handleChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  handleSub = (e) => {
    e.preventDefault();
    const { uname, phoneno, email, city } = this.state;
    const keyId = fire.auth().currentUser.uid;
    const db = fire.firestore();
    if (uname === "" || phoneno === "" || email === "" || city === "") {
      window.alert("Fill out all the fields");
      return;
    } else {
      db.collection("UserDetails")
        .doc(keyId)
        .set({
          uname,
          phoneno,
          email,
          city,
        })
        .then(() => {
          this.setState({
            ...this.state,
            uname: "",
            phoneno: "",
            email: "",
            city: "",
          });
          window.alert("Profile updated");
          this.setState({ ...this.state, msg: "Profile updated" });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          window.alert("Error adding");
        });
    }
  };

  render() {
    if (this.state.msg === "Profile updated") {
      return <Redirect to="/mapsPage" />;
    }
    return (
      <div className="bgimg">
        <div className="form_block">
          <div id="title">{this.state.formTitle}</div>
          <div className="body" style={{ position: "relative" }}>
            <form>
              User Name{" "}
              <span
                style={{
                  color: "rgb(248, 58, 58)",
                  fontSize: "17px",
                  fontWeight: "lighter",
                }}
              >
                *
              </span>
              <br />
              <input
                type="text"
                value={this.state.uname}
                placeholder="UserName"
                onChange={this.handleChange}
                required
                name="uname"
                autoComplete="off"
              />
              Phone Number{" "}
              <span
                style={{
                  color: "rgb(248, 58, 58)",
                  fontSize: "17px",
                  fontWeight: "lighter",
                }}
              >
                *
              </span>
              <br />
              <input
                type="text"
                required
                inputmode="numeric"
                value={this.state.phoneno}
                placeholder="PhoneNumber"
                onChange={this.handleChange}
                name="phoneno"
                autoComplete="off"
              />
              Email ID{" "}
              <span
                style={{
                  color: "rgb(248, 58, 58)",
                  fontSize: "17px",
                  fontWeight: "lighter",
                }}
              >
                *
              </span>
              <br />
              <input
                type="text"
                value={this.state.email}
                placeholder="EmailID"
                required
                onChange={this.handleChange}
                name="email"
                autoComplete="off"
              />
              City{" "}
              <span
                style={{
                  color: "rgb(248, 58, 58)",
                  fontSize: "17px",
                  fontWeight: "lighter",
                }}
              >
                *
              </span>
              <br />
              <input
                type="text"
                value={this.state.city}
                onChange={this.handleChange}
                placeholder="CityName"
                required
                name="city"
                autoComplete="off"
              />
              <br />
              <br />
              <button
                className="registerBtn"
                style={{
                  position: "relative",
                  marginBottom: "15px",
                  marginTop: "1px",
                  marginRight: "125px",
                  float: "center",
                }}
                onClick={this.handleSub}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
