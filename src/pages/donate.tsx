import * as React from 'react'
import Image from 'next/image'
import { BsArrow90DegDown } from 'react-icons/bs'

const DonatePage = () => {
  const [isCopied, setCopied] = React.useState(false)
  const copyToClipboard = (text: string) => {
    // Create a temporary textarea element to perform the copy operation
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)

    // Select the text inside the textarea
    textarea.select()
    textarea.setSelectionRange(0, 99999) // For mobile devices

    // Perform the copy operation
    document.execCommand('copy')

    // Clean up by removing the temporary textarea
    document.body.removeChild(textarea)
    setCopied(true)
  }
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="relative w-[30rem] h-[35rem]">
        <Image
          fill
          src={'/assets/donate-qr.jpg'}
          alt="Donate"
          onClick={() => {
            const number = '+46762621036'
            copyToClipboard(number)
          }}
          className="cursor-pointer"
        />
        <div
          className={' absolute -top-6 left-5 flex font-semibold items-center gap-1 justify-end'}
        >
          <BsArrow90DegDown className="" />
          <p>{isCopied ? 'Kopierade' : 'Klicka för att kopiera nummer'}</p>
        </div>
      </div>
    </div>
  )
}

export default DonatePage
