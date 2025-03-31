import '@/app/_fonts/inter-4.1-web/inter.css';

 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <h3 className='bg-[#cecece] font-[16px]'>This is layout of @fontdemo</h3>
        {children}
    </>
            
  )
}