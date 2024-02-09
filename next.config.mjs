/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images1.dentalkart.com',
                port: '',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'dentalkart-application-media.s3.ap-south-1.amazonaws.com',
                port: '',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: '**',
                port: '',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
