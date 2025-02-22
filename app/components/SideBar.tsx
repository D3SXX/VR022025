"use client"
import React from 'react'
import {Input, Stack} from '@chakra-ui/react'
import { InputGroup } from "@/components/ui/input-group"
import { AiOutlineSearch } from "react-icons/ai";
import Image from 'next/image'
import AddChartModal from './AddChartModal'
import ChartsList from './ChartsList'



const SideBar = ({ selectedChart }: { selectedChart?: string }) => {
  return (
    <div className='hidden md:block w-1/6 mt-3 border-gray-200 bg-white'>
            <Stack gap={4} className='m-3'>
              <p><Image src="/logoipsum.svg" alt="U+1F50D" width={120} height={120} /></p>
              <InputGroup
        flex="1"
        className='bg-neutral-200 rounded-sm'
        startElement={<AiOutlineSearch className='w-6 h-6 ml-1 text-gray-600' />}
      >
        <Input ps={12} placeholder="Search..." _placeholder={{ color: 'gray.600'}} />
      </InputGroup>
                <AddChartModal />
              <div className="text-sm text-gray-500 text-center">
                <ChartsList selectedChart={selectedChart} />
              </div>
              </Stack>
    </div>
  )
}

export default SideBar
