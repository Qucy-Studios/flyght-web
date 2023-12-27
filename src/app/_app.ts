import {Advent_Pro, Inter, Josefin_Sans, Lora, Playfair_Display} from 'next/font/google'
import localFont from 'next/font/local'
export const adventPro = Advent_Pro({
    subsets:  ['latin'],
    variable: '--font-advent-pro',
})
export const lora = Lora({
    subsets:  ['latin'],
    variable: '--font-lora',
})

export const playfairDisplay = Playfair_Display({
    subsets:  ['latin'],
    variable: '--font-playfair',
})


export const josefinSans = Josefin_Sans({
    subsets:  ['latin'],
    variable: '--font-josefin-sans',
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