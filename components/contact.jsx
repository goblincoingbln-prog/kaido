const contact = [
  { 
    name: 'Pärna Vastemõisa Viljandi mk, 71301',
    icon: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"   strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  { 
    name: '+372 58047111',
    href:"tel:+37258047111",
    icon: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  },
  { 
    name: 'kaidolink333@gmail.com',
    href:"mailto:kaidolink333@gmail.com",
    icon: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
      </svg>
    )
  },
  { 
    name: 'Reg nr 12094510',
    icon: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  }
]

export default function Contact() {
    return (
      <div className='bg-gray-100 p-8 lg:rounded-t-xl shadow-lg'>
          <div className='mb-6 text-xl text-medium text-blue-500 text-center lg:text-left lg:text-3xl '> Kontakt </div>
          {contact.map((item,i) => (
            <div className='flex items-center py-1 font-medium' key={i}>
              <div>
                <item.icon stroke="#3d83f6" className="h-7 w-7 mr-1 block" />
              </div>
              {item.href ? 
                <a href={item.href} className='text-black'>{item.name}</a> : 
                <div className='text-black'>{item.name}</div>}
            </div>
          ))}
      </div>
    );
}