import PageMeta from "@/components/PageMeta";
import WebLayout from "@/layouts/web-layout";

const HowToUseCoupons = () => {
  return (
    <WebLayout>
      <PageMeta
        title="How to Make Money"
        description="Explore practical tips and strategies to earn money online and offline."
        keywords="make money, earn online, side hustle, passive income"
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white  shadow-sm rounded-xl p-8 space-y-6 leading-relaxed">
            <h1 className="text-3xl font-semibold">How to Use a Discount Code</h1>

            <h2 className="text-xl font-medium mb-0">How can I get a discount code?</h2>
            <p>You can find a discount code at <b>Promo Carnivals</b> by looking through the discount codes listed on our homepage, searching for a brand in our search bar, or browsing our category pages for the latest updates.</p>
            <p>Further, you may browse through the many discount codes, offers, and sales information available for your preferred retailer.</p>

            <h2 className="text-xl font-medium mb-0">How can I use a discount code?</h2>
            <h3 className="mb-0 text-md font-medium">1. Choose your offer:</h3>
            <p>When you find a offer you like, click the orange button that says “Get Code”, or “Get Offer.”</p>
            <p><b>Get Code:</b> A pop-up will show you a code, copy it. A new tab will open with the retailer’s website.</p>
            <p><b>Get Offer:</b> No code needed, you’ll be taken straight to the deal on the retailer’s site. Exclusions may apply.</p>
            <h3 className="mb-0 text-md font-medium">Start shopping:</h3>
            <p>Add the items you want to buy. Make sure your order meets any requirements (like minimum spend or specific products) for the code or offer to work.</p>
            <h3 className="mb-0 text-md font-medium">Use your code at checkout:</h3>
            <p>At checkout, paste the code into the promo/discount box. If no code is required, your discount should apply automatically. <br />
            Note: Some retailers, like travel sites, may place the code box at different stages during checkout, so keep an eye on it.
            </p>

            <h2 className="text-xl font-medium mb-0">I’m trying to use a code from your website, but it won’t work. What can I do?</h2>
            <p>We at <b>Promo Carnivals</b> make every effort to ensure that the codes and offers you see on our website are valid and up to date.  Sometimes, you may discover that an advertised code does not work when you try to use it.  Retailers have the right to stop discount coupons quickly, which can result in expired discount codes showing on our site.</p>

            <h2 className="text-xl font-medium mb-0">I’m facing issues with my discount code. How do I contact you?</h2>
            <p>If you find that your code does not work, or if you're having any other problems with our site, please email us at <a href="mailto:support@promocarnivals.com" style={{ color: '#f54a00'}}>support@promocarnivals.com</a>.</p>

            <h2 className="text-xl font-medium mb-0">Is it possible for me to use multiple codes at the same time?</h2>
            <p>Retailers generally do not allow this, while certain companies do allow customers to 'stack' codes when purchasing online.  This is particularly typical on product-specific items, and we always recommend that you read the terms and conditions provided by your merchant regarding discount codes and how they may or may not be applied.</p>

          
          </div>
        </div>
      </section>
    </WebLayout>
  );
};

export default HowToUseCoupons;
