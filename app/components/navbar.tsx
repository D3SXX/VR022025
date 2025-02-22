import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { Input, Stack } from '@chakra-ui/react'
import { InputGroup } from '@/components/ui/input-group'
import { AiOutlineSearch } from 'react-icons/ai'
import { BiMenu } from "react-icons/bi";
import { BsX } from "react-icons/bs";
import ChartsList from './ChartsList'
import AddChartModal from './AddChartModal'
const navbar = ({ selectedChart }: { selectedChart?: string }) => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const toggleSearch = () => {
        setIsSearchVisible(true);
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      };
    
      const handleBlur = () => {
        setIsSearchVisible(false);
      };

      const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
      };
  
  
    return (
        <div className='md:hidden h-14 border-gray-200 bg-white'>
        <div className='flex justify-between items-center mt-2 mr-4 ml-4'>
          <div className='flex items-center'>
            <Image src="/logoipsum.svg" className='ml-2' alt="logo" width={120} height={120} />
            {isSearchVisible && (
              <InputGroup
                flex="1"
                className='bg-neutral-200 rounded-sm ml-2'
                startElement={<AiOutlineSearch className='w-6 h-6 ml-1 text-gray-600' />}
              >
                <Input
                  ref={inputRef}
                  ps={12}
                  placeholder="Search..."
                  _placeholder={{ color: 'gray.600'}}
                  onBlur={handleBlur}
                />
              </InputGroup>
            )}
          </div>
          <div className='flex items-center'>
            {!isSearchVisible && (
              <button onClick={toggleSearch} className='p-2'>
                <AiOutlineSearch className='w-7 h-7 text-gray-600' />
              </button>
            )}
            <button onClick={toggleMenu} className='p-2'>
              {isMenuVisible ? (
       <div>
       <BsX className='w-7 h-7 text-gray-600' />
       <div className='absolute top-16 z-50 left-0 w-full bg-white h-4/5 flex flex-col justify-between'>
         <div className='m-2'>
           <ChartsList selectedChart={selectedChart} />
         </div>
         <div className='m-2'>
           <AddChartModal />
         </div>
       </div>
     </div>
              ) : (
                <BiMenu className='w-7 h-7 text-gray-600' />
              )}
            </button>
          </div>
        </div>
      </div>
  )
}

export default navbar