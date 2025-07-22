import PageMeta from "@/components/PageMeta";
import WebLayout from "@/layouts/web-layout";

const Imprint = () => {

  const FirstSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Imprint",
    "url": "https://promocarnivals.com/imprint"
  };
  return (
    <WebLayout FirstSchema={FirstSchema}>
      <PageMeta
        title="Imprint - Promo Carnivals"
        description="View our company’s legal details, contact information, and ownership disclosures on this page."
        keywords="imprint, company information, contact, Nexura Systems"
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white  shadow-sm rounded-xl p-8 space-y-6 leading-relaxed">
            <h1 className="text-3xl font-semibold">Imprint</h1>

            <div>
              <p><strong>Owner:</strong> Nexura Systems Ltd</p><br />
              <p><strong>Company Number:</strong> 15966170</p><br />
              <p><strong>Address:</strong> 124 City Road, London, United Kingdom, EC1V 2NX</p>
            </div>

            <div>
              <h2 className="text-xl font-medium">Contact:</h2>
              <p>
                For inquiries about content or partnerships, please get in touch with us:
              </p>
              <p><strong>Email:</strong> <a href="mailto:support@promocarnivals.com" style={{ color: '#f54a00'}}>support@promocarnivals.com</a></p>
              <p><strong>Phone:</strong> +44 7878 491627</p>
            </div>

            {/* <div>
              <h2 className="text-xl font-medium">Disclaimer</h2>
              <p>
                Classics Trend is a blog and content website designed to provide
                informative and engaging articles on various topics, including fashion,
                lifestyle, technology, and home improvement. While we strive to ensure the
                accuracy and reliability of the information presented on our site, we
                make no guarantees or representations regarding the completeness,
                timeliness, or accuracy of the content.
              </p>
              <p>
                We ensure our content is accurate and up-to-date, but we are not
                responsible for errors, omissions, or external links. The linked pages are
                the responsibility of their respective operators. If we discover or are
                informed about any issues, we will promptly correct or remove the relevant
                content.
              </p>
            </div> */}

            {/* <div>
              <h2 className="text-xl font-medium">Site Manager</h2>
              <p><strong>Name:</strong> Ruth Morales</p>
              <p><strong>Address:</strong> 45 Coast Rd, KIRKHOPE, UK, TD7 5YS</p>
              <p><strong>Email:</strong> ruthmorales@classicstrend.com</p>
            </div> */}
          </div>
        </div>
      </section>
    </WebLayout>
  );
};

export default Imprint;
