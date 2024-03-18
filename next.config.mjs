/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: '/:path*',
				destination: 'https://nathan.tasa.develop.simplitec.io/webhook/simplimuv/:path*',
			},
		];
	},
};

export default nextConfig;
