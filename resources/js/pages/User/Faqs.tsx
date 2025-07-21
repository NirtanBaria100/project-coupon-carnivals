import PageMeta from "@/components/PageMeta";
import WebLayout from "@/layouts/web-layout";

const FAQ = () => {
  return (
    <WebLayout>
      <PageMeta
        title="Frequently Asked Questions - Promo Carnivals"
        description="Find answers to the most frequently asked questions about our coupons, stores, and website."
        keywords="faq, help, questions, support"
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white  shadow-sm rounded-xl p-8 space-y-6 leading-relaxed">
            <h1 className="text-3xl font-semibold">Frequently Asked Questions</h1>

            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-medium">Q: What are Promo Carnivals?</h2>
                <p>
                  A: Promo Carnivals is the greatest source for the best bargains, discounts, and promotions.  We are committed to saving you money by giving access to a wide choice of coupons and unique offers from leading brands and stores.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-medium">Q: How can I Contact You?</h2>
                <p>
                  A: If you have any queries regarding our service you can contact us with our team member through our email address: <a href="mailto:support@promocarnivals.com" style={{ color: '#f54a00'}}>support@promocarnivals.com</a>.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-medium">Q: Are your discount codes trustworthy?</h2>
                <p>
                  A: Yes! Our team of experts searches daily for valid and tested offers. We also work directly with retailers to bring our users the best discounts, deals, and exclusive rewards.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-medium">Q: Are your discount codes free to use?</h2>
                <p>
                  A: Absolutely. All discount codes are free to use.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-medium">Q: What should I do if my discount code doesn't work?</h2>
                <p>
                  A: If your code is not working, feel free to contact us at <a href="mailto:support@promocarnivals.com" style={{ color: '#f54a00'}}>support@promocarnivals.com</a>. Our team will get back to you as soon as possible.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-medium">Q: What is a student discount?</h2>
                <p>
                  A: A student discount is a special offer just for students. It lets you save on items like clothing, electronics, beauty products and even food.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-medium">Q: Who can use Promo Carnivals?</h2>
                <p>
                  A: Anyone! Whether you're a regular online shopper, a deal hunter, or just someone who wants to save money, <a href="https://promocarnivals.com/" style={{ color: '#f54a00'}}>https://promocarnivals.com/</a> is for you.
                </p>
              </div>
            </div>

            <p className="text-sm text-zinc-500">
              Still have questions? <span className="underline"><a href="mailto:support@promocarnivals.com" style={{ color: '#f54a00'}}>Contact</a></span> our support team anytime.
            </p>
          </div>
        </div>
      </section>
    </WebLayout>
  );
};

export default FAQ;
