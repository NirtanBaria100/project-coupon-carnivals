import PageMeta from "@/components/PageMeta";
import WebLayout from "@/layouts/web-layout";

const Policy = () => {

  const FirstSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy",
    "url": "https://promocarnivals.com/privacy-policy"
  };
  return (
    <WebLayout FirstSchema={FirstSchema}>
      {/* SEO helpers — tweak as needed */}
      <PageMeta
        title="Privacy Policy - Promo Carnivals"
        description="Read our privacy policy to understand how we collect, use, and protect your data."
        keywords="privacy, policy, data protection"
      />

      {/* Page body */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Card */}
          <div className="bg-white  shadow-sm rounded-xl p-8 space-y-6 leading-relaxed pri_pol_content">
            <h1 className="text-3xl font-semibold">Privacy Policy</h1>
            <p>At Promo Carnivals, we offer the most latest and hand-tested voucher code, discount code and also publish informative blog posts of our valuable visitors that can save money as well as they can get enough information on different  topics they are looking for.</p>
            <p>We have a team of experts who collect different and amazing deals from various online sources like the company's social media profiles, online news and their networks to help our customers save handsome money on online orders. Moving further, we care so much about our visitors' privacy. Please go through our policy carefully before sharing any kind of personal information with us.</p>

            <h2 className="text-xl font-medium mb-0">Affiliates:</h2>
            <p>We promote merchant stores on our site. We rely on merchants for offers and deals, so in case you do not get a discount from a merchant, we are not responsible for any claim made by visitors to our site regarding this. We are also not responsible if the voucher code or discount code does not work because not all offers have an expiry date. In such cases, we are totally dependent on the merchant.</p>
            
            <h2 className="text-xl font-medium mb-0">Use of Cookies:</h2>
            <p>We may use third-party cookies for tracking affiliate sales or improving user experience. You can disable cookies from your browser settings.</p>
            
            <h2 className="text-xl font-medium mb-0">Personal Data Collection:</h2>
            <p>We may collect basic information like name and email address only when you subscribe to our newsletter, enter a contest, or contact us through our forms. No sensitive data is collected.</p>
            
            <h2 className="text-xl font-medium mb-0">Why We Collect Personal Data:</h2>
            <p>We collect personal data to process and deliver your orders, maintain a smooth commercial relationship, and improve your shopping experience. It also helps us recommend products that match your interests and keep you updated with our latest offers through newsletters.</p>

            <h2 className="text-xl font-medium mb-0">How We Use and Share Your Data:</h2>
            <p>Your data is stored securely within the European Union and used only with your consent. It may be shared with:</p>
            <ul>
              <li>Service providers assisting with marketing, IT support, or loyalty programs</li>
              <li>Legal authorities, if required by law</li>
            </ul>
            <p>We never sell or share your data for commercial gain without your permission.</p>

            <h2 className="text-xl font-medium mb-0">Data Retention:</h2>
            <p>We retain your basic info (like name/email) only as long as needed to fulfill the purpose for which it was collected, or as required by law.</p>

            <h2 className="text-xl font-medium mb-0">Data Security:</h2>
            <p>We use strict measures to protect your personal data from unauthorized loss, or misuse. Only authorized staff and partners have limited access to your information.</p>
            
            <h2 className="text-xl font-medium mb-0">Your Rights:</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access, update, or delete your data</li>
              <li>Withdraw consent at any time</li>
              <li>Unsubscribe from marketing emails</li>
              <li>File a complaint with a supervisory authority</li>
            </ul>

            <h2 className="text-xl font-medium mb-0">Contact Us:</h2>
            <p>If you have any questions related to our Privacy Policy, please feel free to contact us on <a href="mailto:support@promocarnivals.com">Email</a>. Or you can also reach out with our social channels on <a href="https://www.facebook.com/promocarnivals/">facebook</a>, <a href="https://www.instagram.com/promocarnivals/">instagram</a> and <a href="https://www.pinterest.com/promocarnivals/">pinterest</a>.</p>
          
            <p className="text-sm text-zinc-500">
              Last updated: August 7, 2025
            </p>
          </div>
        </div>
      </section>
    </WebLayout>
  );
};

export default Policy;
