import React from 'react';
import { CContainer , CAlert} from '@coreui/react';

export default function ErrorPage() {
  return (
    <div>
        <CContainer lg className='bg-transparent px-4 mt-8'>
            <CAlert color="danger">
                Survey suspended
            </CAlert>
        </CContainer>
    </div>
  )
}
