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
          <div className="bg-white  shadow-sm rounded-xl p-8 space-y-6 leading-relaxed">
            <h1 className="text-3xl font-semibold">Privacy Policy</h1>

            <p>Promo Carnivals ("us", "we", or "our") operates the <a href="https://promocarnivals.com/" style={{ color: '#f54a00'}}>PromoCarnivals.com</a> website.</p>
            <p>This page describes our rules for collecting, using, and disclosing your Personal Information when you use our Services.</p>
            <p>We will not use or disclose your information with anybody except as stated in this Privacy Policy.</p>
            <p>We use your Personal Information to offer and improve our Service.  By using the Service, you consent to the collection and use of information as outlined in this policy.  Unless otherwise indicated, term used in this Privacy Policy have the same meanings as in our term and Conditions, which are available at <a href="https://promocarnivals.com/" style={{ color: '#f54a00'}}>PromoCarnivals.com</a>.</p>

            <h2 className="text-xl font-medium mb-0">Collection of Information and Its Usage:</h2>
            <p>While using our Service, we may request that you provide us with personally identifying information that allows us to contact or identify you.  We collect your information so that we can deliver the Service, identify and interact with you, and answer your requests and enquiries.</p>
            

            <h2 className="text-xl font-medium mb-0">Log Data:</h2>
            <p>We may also collect information from your browser when you use our Service ("Log Data").  This <b>Log Data</b> include your computer's Internet Protocol ("IP") address, browser type, browser version, the pages you see on our Service, the time and date of your visit. Moreover, the time you spent on those pages, and other information.</p>
            <p>In addition, we may use third-party services such as <b>Google Analytics</b> to collect, monitor, and analyse this type of data to improve the performance of our Service.  These <b>third-party service providers</b> have their <b>privacy policies</b> controlling how they use such sensitive information.</p>

            <h2 className="text-xl font-medium mb-0">Cookies:</h2>
            <p>Cookies are files that contain small amounts of data, which may include an anonymous unique identification.  Cookies are sent to your browser from a website and saved on your device. We use <b>cookies</b> to gather information so that we can improve our services for you.</p>
            <p>You can set your browser to refuse all cookies or to notify you when a cookie is <b>transmitted</b>.  Most browsers' Help menus explain how to accept cookies, disable cookies, and be notified when a new cookie is received.</p>
            <p>However, if you do not accept cookies, you may be unable to utilise certain elements of our Service, so we recommend that you leave them enabled.</p>

            <h2 className="text-xl font-medium mb-0">Do Not Track Disclosure:</h2>
            <p>We also support <b>Do Not Track ("DNT")</b>. Do Not Track is a preference you can set in your browser to inform websites that you do not want to be tracked. You can enable or disable this by visiting the <b>Preferences or Settings</b> page of your browser.</p>

            <h2 className="text-xl font-medium mb-0">Service Providers:</h2>
            <p>We may use <b>third-party firms</b> and individuals to facilitate our Service, supply it on our behalf, execute Service-related services, and/or help us analyze how our Service is used.</p>
            <p>These <b>third parties</b> have access to your <b>Personal Information</b> only to execute particular duties on our behalf. But they are not permitted to disclose or use it for any other purposes.</p>

            <h2 className="text-xl font-medium mb-0">Compliance With Laws:</h2>
            <p>We will use your <b>Personal Information</b> as required by law or an order, or as we believe is necessary in order to fulfil the law and appropriate enquiries from <b>law enforcement</b>, or to maintain the security or integrity of our Service.</p>

            <h2 className="text-xl font-medium mb-0">Security:</h2>
            <p>We value the <b>security</b> of your <b>Personal Information</b> and make every effort to implement and maintain reasonable, commercially acceptable security procedures and practices appropriate to the nature of the information we store to protect it from unauthorized access, destruction, use, modification, and disclosure.</p>
            <p className="underline"><em>However, please be aware that no method of internet transmission or computer storage is completely safe, and we cannot ensure the total security of the Personal Information we have acquired from you.</em></p>

            <h2 className="text-xl font-medium mb-0">International Transfer:</h2>
            <p>Your information, including Personal Information, may be transferred to and stored on a computer located outside of your state, province, nation, or other governmental jurisdiction where data protection regulations differ from those in your jurisdiction.</p>
            <p>If you are located outside of the United Kingdom and want to offer us information, please be advised that the information, including <b>Personal Information</b>, will be transported to and processed in the United Kingdom.</p>
            <p>Your permission to this <b>Policy</b>, followed by your submission of such information, represents your agreement to that transfer.</p>

            <h2 className="text-xl font-medium mb-0">Links To Other Sites:</h2>
            <p>Our Service may contain links to other websites that are not operated by us.  Clicking on a <b>third-party</b> link will take you to the <b>third party's</b> website. We highly suggest you read the <b>Privacy Policies</b> of each website you visit.</p>
            <p className="underline"><em>We have no access over, and accept no responsibility for, the content, privacy policies, or other practices of third-party websites or services.</em></p>

            <h2 className="text-xl font-medium mb-0">Children's Privacy:</h2>
            <p>We only allow anyone above the age of 18 to use our service.  Anyone under the age of 13 <b>("Children")</b> should not use our Service.</p>
            <p>We do not collect personal information from under 13. If you are a parent or guardian and find out that your child has provided us your <b>Personal Information</b>, please notify us.  If we find that we have gotten <b>Personal Information</b> from children under the age of 13 without verification of <b>parental permission</b>, we will take steps to erase the information from our servers as soon as possible. </p>

            <h2 className="text-xl font-medium mb-0">Changes To This Privacy Policy:</h2>
            <p>This Privacy Policy is effective as of <b className="underline"><em>July 16, 2025</em></b> and will continue in effect, except any future changes to its provisions, which will take effect immediately after being posted on this page.</p>     
            <p>We reserve the right to alter or change this <b>Privacy Policy</b> at any time, and you should review it regularly.  Your continued use of the Service after we post any changes to the <b>Privacy Policy</b> on this page constitutes your acceptance of the changes and your agreement to follow and abide by the updated <b>Privacy Policy</b>.</p>
            <p>If we make any changes to this <b>Privacy Policy</b>, we will notify you either through the email address you have provided us or by placing a prominent notification on our website.</p>

            <h2 className="text-xl font-medium mb-0">Contact Us:</h2>
            <p>If you have any queries about our <b>Privacy Policy</b>, please email us at <a href="mailto:support@promocarnivals.com" style={{ color: '#f54a00'}}>support@promocarnivals.com</a>.</p>

            <p className="text-sm text-zinc-500">
              Last updated: July 16, 2025
            </p>
          </div>
        </div>
      </section>
    </WebLayout>
  );
};

export default Policy;
