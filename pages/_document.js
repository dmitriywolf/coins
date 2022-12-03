import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta charSet='UTF-8' />
        <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
        <link
          href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap'
          rel='stylesheet'
        />
        <link rel='shortcut icon' href='/favicon.svg' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
