import Head from 'next/head';

const CustomHead = ({ title }: CustomHeadProps) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default CustomHead;
