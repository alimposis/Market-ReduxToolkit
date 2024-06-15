import { Skeleton } from '@mui/material'

export const Loading =()=>{
    const count = 12
    return(
        <>
        {(() => {
            const arr = [];
            for (let i = 0; i < count; i++) {
                arr.push(
                    <Skeleton key={Math.random()} variant="rounded" width={300} height={500} sx={{ m: 2 }} />
                );
            }
            return arr;
        })()}
        </>
    )
}