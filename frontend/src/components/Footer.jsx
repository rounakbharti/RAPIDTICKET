import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import HashLoader from "react-spinners/HashLoader";
import { useDispatch } from "react-redux";
import { showLoginModal, showSignModal } from "../reducers/authSlice";

export const Footer = () => {
  const [locationData, setLocationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  let pageName;
  const loc = "Cinepolis, Phoenix Mall, Lucknow, Uttar Pradesh";
  const location = useLocation();

  location.pathname === "/" ? (pageName = "home") : (pageName = "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/locationDetails`
        );
        setLocationData(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const locations = locationData.map((location, idx) => {
    return (
      <p key={idx} className="address">
        {location.location_details}
      </p>
    );
  });

  return (
    <section className="section-footer container">
      {pageName === "home" ? (
        <HashLink className="footer-logo-container" to="#headerTop">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="footer-logo-icon"
            viewBox="0 0 512 512"
          >
            <path
              d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="32"
            />
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M360 94.59V296M443.13 212.87L296 360M417.41 360H216M299.13 443.13l-144-144M152 416V216M68.87 299.13l144-144M94.59 152H288M212.87 68.87L360 216"
            />
          </svg>
          <h1 className="footer-logo-text">RapidTicket</h1>
        </HashLink>
      ) : (
        <Link className="footer-logo-container" to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="footer-logo-icon"
            viewBox="0 0 512 512"
          >
            <path
              d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="32"
            />
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M360 94.59V296M443.13 212.87L296 360M417.41 360H216M299.13 443.13l-144-144M152 416V216M68.87 299.13l144-144M94.59 152H288M212.87 68.87L360 216"
            />
          </svg>
          <h1 className="footer-logo-text">RapidTicket</h1>
        </Link>
      )}

      <div className="footer-link-container foot-reg">
        <button
          className="footer-btn"
          onClick={() => {
            dispatch(showSignModal());
          }}
        >
          Create account
        </button>
      </div>

      <div className="footer-link-container">
        <button
          className="footer-btn"
          onClick={() => {
            dispatch(showLoginModal());
          }}
        >
          Sign in
        </button>
      </div>

      <div className="footer-link-container">
        <Link className="footer-link" to="/aboutus">
          About us
        </Link>
      </div>

      <h3 className="footer-heading">Our Theatres</h3>

      <p className="copyright">
        Copyright &copy; 2024 by Rounak Bharti, Inc. This work is licensed under
        the terms of the{" "}
        <a href="https://github.com/rounakbharti">
          GNU General Public License, version 3 or later (GPL-3.0-or-later)
        </a>
        .
      </p>

      <div className="footer-address-container">
        <p className="add">{loc}</p>
      </div>
    </section>
  );
};
