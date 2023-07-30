"use client";
import React from "react";

interface SVGProps extends React.SVGProps<SVGSVGElement> {}

const T1Svg: React.FC<SVGProps> = ({ ...rest }) => {
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
        width="165"
        height="349"
        viewBox="0 0 165 349"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M123.5 48C123.5 73.1537 103.328 93.5 78.5 93.5C53.6718 93.5 33.5 73.1537 33.5 48C33.5 22.8463 53.6718 2.5 78.5 2.5C103.328 2.5 123.5 22.8463 123.5 48Z"
          stroke="black"
          stroke-width="5"
        />
        <ellipse cx="78.5" cy="48" rx="38.5" ry="39" fill="black" />
        <path
          d="M79 95.4643V298M105.797 84V84C120.012 98.1902 128 117.451 128 137.537V266.664"
          stroke="url(#paint0_linear_301_195)"
          stroke-width="5"
          stroke-linecap="round"
        />
        <path
          d="M129.142 158V158C150.259 180.686 162 210.529 162 241.523V295.355M81 158V158C95.7313 173.779 103.925 194.561 103.925 216.148V279.39C103.925 304.358 113.816 328.308 131.434 346V346"
          stroke="url(#paint1_linear_301_195)"
          stroke-width="5"
          stroke-linecap="round"
        />
        <path
          d="M51 85V85C35.1457 100.7 26.2258 122.087 26.2258 144.399V209.723C26.2258 220.182 22.0446 230.207 14.6129 237.567V237.567C7.18121 244.926 3 254.951 3 265.41V315"
          stroke="url(#paint2_linear_301_195)"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M79 121V121C61.5234 138.557 51.7119 162.322 51.7119 187.095V258.568C51.7119 275.294 44.9657 291.313 33 303V303"
          stroke="url(#paint3_linear_301_195)"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_301_195"
            x1="103.5"
            y1="84"
            x2="103.5"
            y2="298"
            gradientUnits="userSpaceOnUse"
          >
            <stop />
            <stop offset="1" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_301_195"
            x1="121.5"
            y1="158"
            x2="121.5"
            y2="346"
            gradientUnits="userSpaceOnUse"
          >
            <stop />
            <stop offset="1" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_301_195"
            x1="27"
            y1="85"
            x2="27"
            y2="315"
            gradientUnits="userSpaceOnUse"
          >
            <stop />
            <stop offset="1" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_301_195"
            x1="56"
            y1="121"
            x2="56"
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
        width="165"
        height="349"
        viewBox="0 0 165 349"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M123.5 48C123.5 73.1537 103.328 93.5 78.5 93.5C53.6718 93.5 33.5 73.1537 33.5 48C33.5 22.8463 53.6718 2.5 78.5 2.5C103.328 2.5 123.5 22.8463 123.5 48Z"
          stroke="white"
          stroke-width="5"
        />
        <ellipse cx="78.5" cy="48" rx="38.5" ry="39" fill="white" />
        <path
          d="M79 95.4643V298M105.797 84V84C120.012 98.1902 128 117.451 128 137.537V266.664"
          stroke="url(#paint0_linear_301_195)"
          stroke-width="5"
          stroke-linecap="round"
        />
        <path
          d="M129.142 158V158C150.259 180.686 162 210.529 162 241.523V295.355M81 158V158C95.7313 173.779 103.925 194.561 103.925 216.148V279.39C103.925 304.358 113.816 328.308 131.434 346V346"
          stroke="url(#paint1_linear_301_195)"
          stroke-width="5"
          stroke-linecap="round"
        />
        <path
          d="M51 85V85C35.1457 100.7 26.2258 122.087 26.2258 144.399V209.723C26.2258 220.182 22.0446 230.207 14.6129 237.567V237.567C7.18121 244.926 3 254.951 3 265.41V315"
          stroke="url(#paint2_linear_301_195)"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M79 121V121C61.5234 138.557 51.7119 162.322 51.7119 187.095V258.568C51.7119 275.294 44.9657 291.313 33 303V303"
          stroke="url(#paint3_linear_301_195)"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_301_195"
            x1="103.5"
            y1="84"
            x2="103.5"
            y2="298"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_301_195"
            x1="121.5"
            y1="158"
            x2="121.5"
            y2="346"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_301_195"
            x1="27"
            y1="85"
            x2="27"
            y2="315"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_301_195"
            x1="56"
            y1="121"
            x2="56"
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

export default T1Svg;
