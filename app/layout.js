export const metadata = {
  title: 'LittleBit\'s Message Board',
  description: 'A very simple message board.',
  icons:{
    icon: '/MessageBoardIcon.png'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
