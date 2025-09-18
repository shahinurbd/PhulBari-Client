import '@fontsource/poppins';
import '@fontsource/poppins/500.css';
const Footer = () => {
    
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 px-6 font-[Poppins]">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 text-sm">

        {/* MY ACCOUNT */}
        <div>
          <h4 className="font-semibold mb-4 text-white">MY ACCOUNT</h4>
          <ul className="space-y-2">
            {['My account', 'Checkout', 'Contact us', 'Shopping Cart', 'Wishlist'].map((item, i) => (
              <li className='text-gray-400 py-1' key={i}>
                <a href="#" className=" hover:text-pink-600 transition">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="font-semibold mb-4 text-white">QUICK LINKS</h4>
          <ul className="space-y-2">
            {['Store Location', 'Orders Tracking', 'Size Guide', 'My account', 'FAQs'].map((item, i) => (
              <li className='text-gray-400 py-1' key={i}>
                <a href="#" className="hover:text-pink-500 transition">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* INFORMATION */}
        <div>
          <h4 className="font-semibold mb-4 text-white">INFORMATION</h4>
          <ul className="space-y-2">
            {['Privacy Page', 'About us', 'Careers', 'Delivery Information', 'Term & Conditions'].map((item, i) => (
              <li className='text-gray-400 py-1' key={i}>
                <a href="#" className="hover:text-pink-500 transition">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* CUSTOMER SERVICE */}
        <div>
          <h4 className="font-semibold mb-4 text-white">CUSTOMER SERVICE</h4>
          <ul className="space-y-2">
            {['Shipping Policy', 'Help & Contact Us', 'Returns & Refunds', 'Online Stores', 'Terms and Conditions'].map((item, i) => (
              <li className='text-gray-400 py-1' key={i}>
                <a href="#" className="hover:text-pink-500 transition">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* ABOUT OUR SHOP */}
        <div>
          <h4 className="font-semibold mb-4 text-white">ABOUT OUR SHOP</h4>
          <p className="mb-4 text-sm text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod incididunt ut labore et dolore
          </p>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-white">📍</span> Brooklyn, New York, United States
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white">☎</span> +0123-456789
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white">✉</span> example@example.com
            </li>
          </ul>
          <div className="flex gap-2 mt-4">
            <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-6" />
            <img src="https://img.icons8.com/color/48/paypal.png" alt="PayPal" className="h-6" />
            <img src="https://img.icons8.com/color/48/amex.png" alt="Amex" className="h-6" />
            <img src="https://img.icons8.com/color/48/discover.png" alt="Discover" className="h-6" />
            </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
        © 2025 – MUHAMMAD SHAHINUR
        <div className="mt-3 flex justify-center gap-4 text-white">
          <a href="#"><i className="fab fa-facebook-f hover:text-pink-500" /></a>
          <a href="#"><i className="fab fa-twitter hover:text-pink-500" /></a>
          <a href="#"><i className="fab fa-pinterest hover:text-pink-500" /></a>
          <a href="#"><i className="fab fa-instagram hover:text-pink-500" /></a>
        </div>
      </div>
    </footer>
    );
};

export default Footer;