// Assets
import Image from "../assets/img/house-banner-2.png";
// Components
import Search from "./Search";

const Banner: React.FC = () => {
  return (
    <section
      className="h-full max-h-[640px] mb-8
    xl:mb-24"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0">
          <h2 className="text-4xl lg:text-[58px] font-semibold leading-none">
            <span className="text-blue-600">Rent</span> Your Dream House
          </h2>
          <p className="max-w-[480px] my-2 text-2xl px-6 lg:px-0">
            Discover your perfect refuge. Book now and make your getaways
            unforgettable!
          </p>
        </div>

        {/* Image */}
        <div className="hidden flex-1 lg:flex justify-end items-end ">
          <img
            src={Image}
            alt="House"
            className="rounded-tl-[90px] rounded-br-[90px]"
          />
        </div>
      </div>
      <Search />
    </section>
  );
};

export default Banner;
