import React from "react";
import Link from "next/link";


const CopyrightSection = () => {
  return (
    <div className="bg-white">
      <div className="container h-14 flex items-center justify-between font-semibold">
        <p>© 2023 ALLA RÄTTIGHETER FÖRBEHÅLLNA</p>
        <p>
          <Link href={"https://novatech-solutions.se/"}>
          Drivs av <span>Novatech Solutions</span>
          </Link>

        </p>
      </div>
    </div>
  );
};

export default CopyrightSection;
