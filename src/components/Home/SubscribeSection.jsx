import bg from "../../assets/bg.jpg"
import '@fontsource/poppins';
import '@fontsource/poppins/500.css';

const SubscribeSection = () => {
    return (
       <div
      className="relative bg-cover bg-center py-36 px-4 font-[Poppins] mt-20"
      style={{
        backgroundImage:
          `url(${bg})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center text-white">
        <h2 className="text-4xl md:text-6xl">
          Get The Latest Deals
        </h2>
        <p className="mt-2 text-sm md:text-lg">
          $30 coupon for first shopping
        </p>

        {/* Input + Button */}
        <form className="mt-6 flex flex-col sm:flex-row w-full max-w-lg gap-3 sm:gap-0">
          <input
            type="email"
            placeholder="Email*"
            className="flex-1 px-4 py-3 bg-white rounded-full sm:rounded-l-full sm:rounded-r-none focus:outline-none text-black"
          />
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full sm:rounded-r-full sm:rounded-l-none "
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </div>
    );
};

export default SubscribeSection;