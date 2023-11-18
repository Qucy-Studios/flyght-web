import {Advent_Pro, Inter} from 'next/font/google'
import localFont from 'next/font/local'
export const adventPro = Advent_Pro({
    subsets:  ['latin'],
    variable: '--font-advent-pro',
})
export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
export const ggsans = localFont({
    src: [
        {
            path: "./_fonts/ggsans-Normal.ttf",
            weight: '400',
            style: 'normal'
        },
        {
            path: "./_fonts/ggsans-Bold.ttf",
            weight: '800',
            style: 'normal'
        },
    ]
})