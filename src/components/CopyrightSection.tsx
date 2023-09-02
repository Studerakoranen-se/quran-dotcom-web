import React from 'react'
import Link from 'next/link'

const CopyrightSection = () => {
  return (
    <div className="bg-white text-sm">
      <div className="container py-3 flex flex-wrap items-center justify-between font-semibold gap-2">
        <p>© 2023 ALLA RÄTTIGHETER FÖRBEHÅLLNA</p>
        <p>
          <Link href={'https://novatech-solutions.se/'}>
            Drivs av <span>Novatech Solutions</span>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default CopyrightSection
