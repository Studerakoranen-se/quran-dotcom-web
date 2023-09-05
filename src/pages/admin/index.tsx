import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { setPageTitle } from '~/store/themeConfigSlice'
import { IRootState } from '~/store/index'
import Dropdown from '~/components/admin/Dropdown'
import DefaultLayout from '~/components/Layout/DefaultLayout'

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

const AdminDashboard = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(setPageTitle('Dashboard'))
  })

  // const isDark = useSelector((state: IRootState) => state.themeConfig.theme) === 'dark'
  const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl'

  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  // totalVisitOptions
  const totalVisit: any = {
    series: [{ data: [21, 9, 36, 12, 44, 25, 59, 41, 66, 25] }],
    options: {
      chart: {
        height: 58,
        type: 'line',
        fontFamily: 'Nunito, sans-serif',
        sparkline: {
          enabled: true,
        },
        dropShadow: {
          enabled: true,
          blur: 3,
          color: '#009688',
          opacity: 0.4,
        },
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      colors: ['#009688'],
      grid: {
        padding: {
          top: 5,
          bottom: 5,
          left: 5,
          right: 5,
        },
      },
      tooltip: {
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: () => {
              return ''
            },
          },
        },
      },
    },
  }

  return (
    <DefaultLayout>
      <div>
        <ul className="flex space-x-2 rtl:space-x-reverse">
          <li>
            <Link href="/" className="text-primary hover:underline">
              Dashboard
            </Link>
          </li>
        </ul>
        <div className="pt-5">
          <div className="grid gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="h-full panel sm:col-span-2 lg:col-span-1">
              {/* statistics */}
              <div className="flex justify-between mb-5 dark:text-white-light">
                <h5 className="text-lg font-semibold ">Statistics</h5>
                <div className="dropdown">
                  <Dropdown
                    offset={[0, 5]}
                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                    btnClassName="hover:text-primary"
                    button={
                      <svg
                        className="h-5 w-5 text-black/70 hover:!text-primary dark:text-white/70"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                        <circle
                          opacity="0.5"
                          cx="12"
                          cy="12"
                          r="2"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    }
                  >
                    <ul>
                      <li>
                        <button type="button">This Week</button>
                      </li>
                      <li>
                        <button type="button">Last Week</button>
                      </li>
                      <li>
                        <button type="button">This Month</button>
                      </li>
                      <li>
                        <button type="button">Last Month</button>
                      </li>
                    </ul>
                  </Dropdown>
                </div>
              </div>
              <div className="grid gap-8 text-sm font-bold text-[#515365]">
                <div>
                  <div>
                    <div>Total Visits</div>
                    <div className="text-lg text-[#f8538d]">423,964</div>
                  </div>
                  {isMounted && (
                    <ReactApexChart
                      series={totalVisit.series}
                      options={totalVisit.options}
                      type="line"
                      height={58}
                      width={'100%'}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="h-full panel">
              <div className="flex justify-between mb-5 dark:text-white-light">
                <h5 className="text-lg font-semibold ">Total Courses</h5>
              </div>
              <div className=" my-10 text-5xl font-bold text-[#e95f2b]">
                <span>100 </span>
              </div>
            </div>
            <div className="h-full panel">
              <div className="flex justify-between mb-5 dark:text-white-light">
                <h5 className="text-lg font-semibold ">Total Students</h5>
              </div>
              <div className=" my-10 text-5xl font-bold text-[#e95f2b]">
                <span>100 </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default AdminDashboard
