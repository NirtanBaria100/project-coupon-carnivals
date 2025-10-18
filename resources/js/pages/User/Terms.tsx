import PageMeta from "@/components/PageMeta";
import WebLayout from "@/layouts/web-layout";

const TermsOfService = () => {
  const FirstSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Service",
    "url": "https://promocarnivals.com/terms-of-service"
  };  
  return (
    <WebLayout FirstSchema={FirstSchema}>
      <PageMeta
        title="Terms of Service - Promo Carnivals"
        description="Review the terms and conditions that govern your use of our website."
        keywords="terms, service, conditions"
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white  shadow-sm rounded-xl p-8 space-y-6 leading-relaxed pri_pol_content">
            <h1 className="text-3xl font-semibold">Terms of Service</h1>
            <p>This page contains the terms and conditions ("Agreement") for using the <a href="https://promocarnivals.com/">https://promocarnivals.com/</a> website ("Website"), which is operated by Promo Carnivals.  Please be aware that by joining the Website and participating in the community, you agree to abide by the Agreement.</p>
           
            <h2 className="text-xl font-medium mb-0">About Website:</h2>
            <p>We have agreements with a variety of retailers to help cover the costs of hosting the website.  These sellers may pay us a commission on sales we generate.  We allow Website users to share any acceptable content, regardless of whether or not we receive a commission.</p>

            <h2 className="text-xl font-medium mb-0">Our Role:</h2>
            <h3>No Responsibility for Retailers</h3>
            <span>We are not responsible for:</span><br />
            <ul>
              <li>The quality, safety, or legality of goods or services from retailers.</li>
              <li>Whether a retailer can or will deliver products or services as promised.</li>
              <li>Users should exercise the same level of caution here as they would when shopping elsewhere.</li>
            </ul>
            <h3>Accuracy of Information:</h3>
            <span>We aim to share accurate deals, vouchers, and coupons. However:</span><br />
            <ul>
              <li>Much of our content is user-generated or crowd-sourced.</li>
              <li>Offers may be based on limited details or speculation.</li>
              <li>We do not always verify offers directly with third parties.</li>
            </ul>
            <h3>Check with Third Parties:</h3>
            <span>When you visit a third-party site from PC:</span><br />
            <ul>
              <li>Do not rely solely on our content.</li>
              <li>Always read the official information and terms provided by the third party.</li>
              <li>Double-check the details of any offer before participating.</li>
            </ul>
            <p>Our goal is to prevent misunderstandings and ensure you have the correct details directly from the source.</p>

            <h2 className="text-xl font-medium mb-0">Privacy (UK GDPR & Data Protection):</h2>
            <p>We respect your privacy and are committed to protecting your personal data. All personal information you provide is handled in compliance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. By using our Services, you consent to our collection and processing of personal data as described in our Privacy Policy.</p>
           
            <h2 className="text-xl font-medium mb-0">Consumer Rights:</h2>
            <p>Nothing in these Terms affects your statutory rights under the Consumer Rights Act 2015. While we strive to provide accurate and up-to-date information, please be aware that Promo Carnivals is not the seller or supplier of any goods or services listed on the Website. You should always review the retailer’s own terms before making a purchase.</p>

            <h2 className="text-xl font-medium mb-0">Alteration of Terms:</h2>
            <p>We may change these Terms from time to time and modify, add, or remove any feature of the Services at our sole discretion.  The continued use of the Services after revisions are posted implies acceptance of the updated Terms.</p>

            <h2 className="text-xl font-medium mb-0">Unauthorized Use:</h2>
            <p>You may not reproduce, distribute, copy, retransmit, publish, sell, or exploit any content, services, digital products, or tools from this Website for commercial or other purposes. Such unauthorized use is strictly prohibited.</p>

            <h2 className="text-xl font-medium mb-0">Information Accuracy:</h2>
            <p>We make no guarantees about the accuracy of deals, discount codes, or offers posted on the Website. We are not liable if a third-party retailer changes, cancels, or refuses to honor an offer.</p>

            <h2 className="text-xl font-medium mb-0">Disclaimer of Warranties:</h2>
            <p>The Services are provided “as is” and “as available.” Promo Carnivals makes no warranties, express or implied, regarding the operation of the Website, its content, or any products/services available through it.</p>

            <h2 className="text-xl font-medium mb-0">Release:</h2>
            <p>You are responsible for every interaction with other merchants and users. To the extent permitted by law, you release Promo Carnivals from claims or liability related to any product, service, or conduct of merchants or other users.</p>

            <h2 className="text-xl font-medium mb-0">Limitation of Liability:</h2>
            <p>Promo Carnivals will not be liable for any damages, including direct, indirect, incidental, or consequential damages, arising from your use of the Website or Services.</p>

            <h2 className="text-xl font-medium mb-0">End of Service:</h2>
            <p>We have the right to modify, suspend, or discontinue the Services at any time without giving any kind of notice.</p>

            <h2 className="text-xl font-medium mb-0">Injunctive Relief:</h2>
            <p>Any violation of these Terms may cause irreparable harm. We reserve the right to seek injunctive or other equitable relief in such cases, in addition to other legal remedies.</p>

            <h2 className="text-xl font-medium mb-0">Governing Law & Jurisdiction :</h2>
            <p>These Terms are governed and construed in accordance with the laws of England and Wales. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
          
            <p className="text-sm text-zinc-500">
              Last updated: August 8, 2025
            </p>
          </div>
        </div>
      </section>
    </WebLayout>
  );
};

export default TermsOfService;
