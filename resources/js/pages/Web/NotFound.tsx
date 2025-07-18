// src/components/HomePage.jsx
import WebLayout from '@/layouts/web-layout';

interface Props {
    Image: string;
}
const HomePage = ({ Image }: Props) => {
    return (
        <WebLayout>
            <div className="flex flex-col items-center justify-center bg-[var(--page-bg)] px-4 text-center py-20">
                <h1 className="mb-4 text-2xl font-bold md:text-3xl">Sorry, the page you requested can't be found</h1>
                <h3 className="mb-6 text-base md:text-lg">The URL may be misspelled or the page you're looking for isn't available.</h3>
                <img src={Image} alt="404 Illustration" className=" max-w-md" />
            </div>
        </WebLayout>
    );
};

export default HomePage;
