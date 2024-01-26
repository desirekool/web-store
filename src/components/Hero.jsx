import hero1 from '../assets/hero1.webp';
import hero2 from '../assets/hero2.webp';
import hero3 from '../assets/hero3.webp';
import hero4 from '../assets/hero4.webp';

const carouselImages = [hero1, hero2, hero3, hero4];

const Hero = () => {
  return (
    <div className='grid lg:grid-cols-2 gap-24 items-center'>
      <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl flex flex-wrap gap-5">
        <span className="grow">Welcome to</span>
        <span className="bg-primary rounded-2xl grow-0 p-4 text-center"> WebStore</span>
      </h1>
      <div className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
        {carouselImages.map((image, index) => (
          <div key={index} className="carousel-item">
            <img src={image} alt="Hero" className="rounded-box h-full w-80 object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;