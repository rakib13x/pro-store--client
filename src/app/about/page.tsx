import PageTitle from "@/components/page-title";
import AboutUs from "@/components/sections/about-us";
import OurChefs from "@/components/sections/our-chefs";

import Testimonial from "@/components/sections/testimonial";

export default function About() {
  return (
    <>
      <PageTitle path="About" title="About" />

      {/* Start Content Section */}
      <div className="container">
        {/* Section 1 - About us */}
        <AboutUs>
          <AboutUs.Subtitle>Our History</AboutUs.Subtitle>
          <AboutUs.Text>
            Founded with a resolute commitment to addressing the pervasive issue
            of food deserts, [Your Website Name] has been empowering communities
            since its inception. Our journey began with a deep understanding of
            the challenges faced by individuals living in areas devoid of
            accessible, nutritious food options. Driven by the desire to make a
            meaningful impact, we set out to create sustainable solutions that
            ensure everyone has the opportunity to enjoy fresh, healthy, and
            affordable meals.
          </AboutUs.Text>
        </AboutUs>

        <div className="pb-10 pt-3 lg:pb-20 lg:pt-6">
          <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-10">
                <h4 className="text-caption-1 text-primary-100">01</h4>
              </div>
              <h5 className="text-heading-5 mt-6">Collective Collaboration</h5>
              <p className="text-body-2-regular mt-4 text-secondary-50">
                We believe that real change happens when we join forces. By
                partnering with local residents, organizations, farmers, and
                businesses, we create a network of support, working together to
                establish sustainable solutions that break down barriers to food
                access.
              </p>
            </div>
            <div className="lg:mt-14">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-10">
                <h4 className="text-caption-1 text-primary-100">02</h4>
              </div>
              <h5 className="text-heading-5 mt-6">Commitment to Community</h5>
              <p className="text-body-2-regular mt-4 text-secondary-50">
                At Fofood, our mission is simple - ensuring equitable access to
                fresh, healthy, and affordable food for all. We are dedicated to
                empowering communities affected by food deserts and improving
                overall well-being.
              </p>
            </div>
            <div className="lg:mt-28">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-10">
                <h4 className="text-caption-1 text-primary-100">03</h4>
              </div>
              <h5 className="text-heading-5 mt-6">Technology-driven Impact</h5>
              <p className="text-body-2-regular mt-4 text-secondary-50">
                Embracing the power of technology, we leverage our online
                platform to reach and empower a wider audience. Through our
                website, we provide valuable resources, including recipes, tips,
                and educational content, making healthy eating accessible to all
                and fostering positive change.
              </p>
            </div>
          </div>
        </div>

        <div className="py-10 lg:py-20">
          <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-0">
            <div className="order-last lg:order-first">
              <h2 className="text-heading-4 lg:text-heading-2 text-secondary-100">
                One Meal at a Time
              </h2>
              <p className="text-body-2-regular mt-4 text-secondary-50">
                Through collaborative efforts with local residents,
                organizations, and key stakeholders, we have established a
                strong network of support. Over the years, we have implemented
                various initiatives such as community gardens, mobile markets,
                and educational programs focused on nutrition and culinary
                skills. By fostering community engagement and leveraging
                technology, we have amplified our impact and connected
                individuals to vital resources. Our history is rooted in the
                success stories of individuals and families who have gained
                improved access to nutritious food, leading to enhanced
                well-being and a stronger sense of community.
              </p>
            </div>
            <div className="h-52 rounded-[20px] bg-green-500 lg:h-80 lg:rounded-[32px] overflow-hidden">
              <video
                src="/assets/video/about.mp4"
                autoPlay
                controls
                loop
                muted
              />
            </div>
          </div>
        </div>

        {/* Section 2 - Our Chefs */}
        <OurChefs />

        {/* Section 3 - Testimonial */}
        <Testimonial />
      </div>
      {/* End Content Section */}
    </>
  );
}
