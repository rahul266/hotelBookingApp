'use client'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { Next13ProgressBar } from 'next13-progressbar'

export function NavigationEvents({children}) {
    return (
        <div>
            {children}
            {/* <ProgressBar
                height="50px"
                color="#000000"
                options={{ showSpinner: true }}
                shallowRouting
            /> */}
            {/* <Next13ProgressBar color="#29D" startPosition={0.3} stopDelayMs={200} height={500} showOnShallow={true} /> */}
        </div>
    )
}