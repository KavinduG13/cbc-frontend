import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

export default function Footer() {

    const handleComingSoon = (platform) => {
        alert(`Coming soon on ${platform}😉`);
    };

    return (
        <footer className="w-full bg-accent text-white pt-12 pb-6 px-6 md:px-16">
            
            {/* Top Section */}
            <div className="grid md:grid-cols-3 gap-10 border-b border-white/20 pb-10">
                
                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-semibold text-white mb-4">
                        Crystal Beauty Clear
                    </h2>
                    <p className="text-sm text-white leading-relaxed">
                        Discover premium beauty products crafted with elegance and care.
                        Quality, trust and style in every purchase.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
                    <ul className="space-y-2 text-white">
                        <li><a href="/" className="hover:text-secondary transition">Home</a></li>
                        <li><a href="/products" className="hover:text-secondary transition">Products</a></li>
                        <li><a href="/about" className="hover:text-secondary transition">About Us</a></li>
                        <li><a href="/contact" className="hover:text-secondary transition">Contact</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
                    <div className="flex gap-4 text-xl">
                        <button
                            onClick={() => handleComingSoon("Facebook")}
                            className="p-3 bg-white/10 rounded-full hover:bg-secondary/60 transition"
                        >
                            <FaFacebookF />
                        </button>

                        <button
                            onClick={() => handleComingSoon("Instagram")}
                            className="p-3 bg-white/10 rounded-full hover:bg-secondary/60 transition"
                        >
                            <FaInstagram />
                        </button>

                        <button
                            onClick={() => handleComingSoon("TikTok")}
                            className="p-3 bg-white/10 rounded-full hover:bg-secondary/60 transition"
                        >
                            <FaTiktok />
                        </button>

                        <button
                            onClick={() => handleComingSoon("YouTube")}
                            className="p-3 bg-white/10 rounded-full hover:bg-secondary/60 transition"
                        >
                            <FaYoutube />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="text-center text-sm text-white mt-6">
                {new Date().getFullYear()} Crystal Beauty. All rights reserved.
            </div>

        </footer>
    );
}