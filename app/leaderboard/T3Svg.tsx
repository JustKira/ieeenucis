"use client";
import React from "react";

interface SVGProps extends React.SVGProps<SVGSVGElement> {}

const T3Svg: React.FC<SVGProps> = ({ ...rest }) => {
  const [dark, setDark] = React.useState<boolean>(false);

  // Function to check if the theme is dark in localStorage
  const isDarkTheme = (): boolean => {
    const theme = localStorage.getItem("theme");
    return theme === "dark";
  };

  React.useEffect(() => {
    // Set the initial theme based on localStorage
    setDark(isDarkTheme());

    // Add an event listener to update the theme whenever localStorage changes
    const handleLocalStorageChange = () => {
      setDark(isDarkTheme());
    };

    window.addEventListener("storage", handleLocalStorageChange);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("storage", handleLocalStorageChange);
    };
  }, []);
  if (dark) {
    return (
      <svg
        width="101"
        height="306"
        viewBox="0 0 101 306"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M93.5 48C93.5 73.1537 73.3282 93.5 48.5 93.5C23.6718 93.5 3.5 73.1537 3.5 48C3.5 22.8463 23.6718 2.5 48.5 2.5C73.3282 2.5 93.5 22.8463 93.5 48Z"
          stroke="black"
          stroke-width="5"
        />
        <ellipse cx="48.5" cy="48" rx="15.5" ry="16" fill="black" />
        <path
          d="M49 95.4643V298M75.7969 84V84C90.012 98.1902 98 117.451 98 137.537V266.664"
          stroke="url(#paint0_linear_301_194)"
          stroke-width="5"
          stroke-linecap="round"
        />
        <path
          d="M49 121V121C31.5234 138.557 21.7119 162.322 21.7119 187.095V258.568C21.7119 275.294 14.9657 291.313 3 303V303"
          stroke="url(#paint1_linear_301_194)"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_301_194"
            x1="73.5"
            y1="84"
            x2="73.5"
            y2="298"
            gradientUnits="userSpaceOnUse"
          >
            <stop />
            <stop offset="1" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_301_194"
            x1="26"
            y1="121"
            x2="26"
            y2="303"
            gradientUnits="userSpaceOnUse"
          >
            <stop />
            <stop offset="1" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
  return (
    <>
      <svg
        width="101"
        height="306"
        viewBox="0 0 101 306"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M93.5 48C93.5 73.1537 73.3282 93.5 48.5 93.5C23.6718 93.5 3.5 73.1537 3.5 48C3.5 22.8463 23.6718 2.5 48.5 2.5C73.3282 2.5 93.5 22.8463 93.5 48Z"
          stroke="white"
          stroke-width="5"
        />
        <ellipse cx="48.5" cy="48" rx="15.5" ry="16" fill="white" />
        <path
          d="M49 95.4643V298M75.7969 84V84C90.012 98.1902 98 117.451 98 137.537V266.664"
          stroke="url(#paint0_linear_301_194)"
          stroke-width="5"
          stroke-linecap="round"
        />
        <path
          d="M49 121V121C31.5234 138.557 21.7119 162.322 21.7119 187.095V258.568C21.7119 275.294 14.9657 291.313 3 303V303"
          stroke="url(#paint1_linear_301_194)"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_301_194"
            x1="73.5"
            y1="84"
            x2="73.5"
            y2="298"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_301_194"
            x1="26"
            y1="121"
            x2="26"
            y2="303"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </>
  );
};

export default T3Svg;
