import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-900 text-white flex justify-between  p-5">
      {" "}
      <h2 className="text-lg font-bold font-sans">Next13</h2>
      <Link href="/">Home</Link>
      <Link href="/articles">articles</Link>
    </header>
  );
};

export default Header;
