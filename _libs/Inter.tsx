import localFont from 'next/font/local'

const inter = localFont({
    src: [
        {
          path: '../public/Inter-4.1/web/Inter-Thin.woff2',
          weight: '100',
          style: 'normal',
        },
        {
          path: '../public/Inter-4.1/web/Inter-ThinItalic.woff2',
          weight: '100',
          style: 'italic',
        },
        {
          path: '../public/Inter-4.1/web/Inter-ExtraLight.woff2',
          weight: '200',
          style: 'normal',
        },
        {
          path: '../public/Inter-4.1/web/Inter-ExtraLightItalic.woff2',
          weight: '200',
          style: 'italic',
        },
        {
          path: '../public/Inter-4.1/web/Inter-Light.woff2',
          weight: '300',
          style: 'normal',
        },
        {
          path: '../public/Inter-4.1/web/Inter-LightItalic.woff2',
          weight: '300',
          style: 'italic',
        },
        {
          path: '../public/Inter-4.1/web/Inter-Regular.woff2',
          weight: '400',
          style: 'normal',
        },
        {
          path: '../public/Inter-4.1/web/Inter-Italic.woff2',
          weight: '400',
          style: 'italic',
        },
        {
          path: '../public/Inter-4.1/web/Inter-Medium.woff2',
          weight: '500',
          style: 'normal',
        },
        {
          path: '../public/Inter-4.1/web/Inter-MediumItalic.woff2',
          weight: '500',
          style: 'italic',
        },
        {
          path: '../public/Inter-4.1/web/Inter-SemiBold.woff2',
          weight: '600',
          style: 'normal',
        },
        {
          path: '../public/Inter-4.1/web/Inter-SemiBoldItalic.woff2',
          weight: '600',
          style: 'italic',
        },
        {
          path: '../public/Inter-4.1/web/Inter-Bold.woff2',
          weight: '700',
          style: 'normal',
        },
        {
          path: '../public/Inter-4.1/web/Inter-BoldItalic.woff2',
          weight: '700',
          style: 'italic',
        },
        {
          path: '../public/Inter-4.1/web/Inter-ExtraBold.woff2',
          weight: '800',
          style: 'normal',
        },
        {
          path: '../public/Inter-4.1/web/Inter-ExtraBoldItalic.woff2',
          weight: '800',
          style: 'italic',
        },
        {
          path: '../public/Inter-4.1/web/Inter-Black.woff2',
          weight: '900',
          style: 'normal',
        },
        {
          path: '../public/Inter-4.1/web/Inter-BlackItalic.woff2',
          weight: '900',
          style: 'italic',
        },
    ],
    display: 'swap'
})
export default inter