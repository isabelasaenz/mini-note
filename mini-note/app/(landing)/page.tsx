import {LandingImage} from "./_components/landingimage";
import {Heading} from "./_components/heading";
import {Footer} from "./_components/footer";

const LandingPage = () => {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-star text-center gap-y-8 flex-1 px-6 pb-10">
        <LandingImage />
        <Heading />
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;