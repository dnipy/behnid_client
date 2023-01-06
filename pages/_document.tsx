import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="fa">
        <Head>
          <link rel="manifest" href="/manifest.webmanifest" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
          <meta name="theme-color" content="#fff" />
          <meta
            name="description"
            content="به نید با تجربه 16 ساله افتخار همکاری با شرکت های بزرگ در حوزه ی موادغذایی ،شوینده ،بهداشتی و نوشیدنی را دارد.
            همچنین افتخار ارتباط با بیش از 4000 کسب و کار ، خریدار و فروشنده عمده در کارنامه خود را دارد و با بهره گیری بیش از 20 نیروی متخصص در راه کسب سود بیشتر برای عمده فروشان تلاش می کند  "
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
