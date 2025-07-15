import PageMeta from "@/components/PageMeta";
import WebLayout from "@/layouts/web-layout";

const TermsOfService = () => {
  return (
    <WebLayout>
      <PageMeta
        title="Terms of Service"
        description="Review the terms and conditions of using our services."
        keywords="terms, service, conditions"
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white  shadow-sm rounded-xl p-8 space-y-6 leading-relaxed">
            <h1 className="text-3xl font-semibold">Terms of Service</h1>

            <p>Please carefully read these <b>Terms and Conditions</b> before using the <a href="https://promocarnivals.com/" style={{ color: '#f54a00'}}>PromoCarnivals.com</a> website (the "Service") provided by <b>Promo Carnivals</b> ("us", "we", or "our").</p>
            <p>Your approval and approval of these Terms is required before you may access or use the Service.  These Terms apply to all customers, users, and others who want to or use the Service.</p>
            <p>By using or accessing the following Service, you agree to be tied by these terms.  If you do not agree with any of these terms, you are not allow to use the Service.</p>

            <h2 className="text-xl font-medium mb-0">Intellectual Property:</h2>
            <p><b><em>Promo Carnivals</em></b> and its licensees own the Service, including all of its unique content, features, and functionality.  The Service is shielded by copyright, trademark, and other laws in the United States and abroad.  Our trademark and trade dress may not be used in conjunction with any product or service without Promo Carnivals’ written approval.</p>

            <h2 className="text-xl font-medium mb-0">Links To Other Websites:</h2>
            <p>Links to external websites or services that we do not own or control may be included in our service.</p>
            <p>The content, privacy practices, and policies of third-party websites or services are beyond our control and we disclaim all liability for them.</p>
            <p>You acknowledge and agree that <b>Promo Carnivals</b> is not accountable or liable, either directly or indirectly, for any damage or loss caused by or in connection with the use of or reliance on any such content, or services available on or through any such <b>third-party websites or services</b>.</p>
            <p>We strongly recommend that you read the terms and conditions and privacy policies of any <b>third-party websites or services</b> that you visit.</p>

            <h2 className="text-xl font-medium mb-0">Termination:</h2>
            <p>We have the right to cancel or suspend your access to the Service immediately, without warning or liability, for any cause and without limitation, including but not limited to a breach of the Terms.</p>
            <p>All provisions of the <b>Terms</b> that, by their nature, should survive termination shall do so, including, without limitation, ownership sections, warranty disclaimers, and liability limitations.</p>

            <h2 className="text-xl font-medium mb-0">Indemnification:</h2>
            <p>You agree to defend, indemnify, and hold harmless <b>Promo Carnivals</b>, its licensees and licensors, and their respective employees, contractors, agents, officers, and directors from and against any and all claims, damages, obligations, losses, liabilities, costs, or debts, and expenses (including, but not limited to, attorney's fees) arising from or related to: 
            <br />
            a) your use of or access to the Service; or <br />
            b) your violation of these Terms.
            </p>

            <h2 className="text-xl font-medium mb-0">Limitation Of Liability:</h2>
            <p><b><em>Promo Carnivals</em></b> and its team (including directors, employees, partners, agents, suppliers, and affiliates) are not liable for any indirect, special, accidental, or consequential damages. This includes things like lost profits, lost data, loss of goodwill, or other intangible losses.</p>
            <ul>
              This applies even if the damage is caused by:
              <li>Your use of — or inability to use — our service</li>
              <li>Someone else's actions or content on our service</li>
              <li>Any content you got through our service</li>
              <li>Unauthorized access or changes to your information</li>
            </ul>

            <h2 className="text-xl font-medium mb-0">Disclaimer:</h2>
            <p>Your use of the Service is at your own risk. The Service is offered <b>"AS IS"</b> and <b>"AS AVAILABLE"</b> basis.  The Service is given without any warranty, either express or implied, including but not limited to implied warranties of merchantability, fitness for a specific purpose, non-infringement, or course of performance.</p>
            <p><b><em>Promo Carnivals</em></b>, its subsidiaries, affiliates, and licensors make no warranty that: a) the Service will function uninterrupted, secure, or available at any time b) any errors will be corrected; c) the Service is free of viruses or other harmful issues; or d) the results of using the Service will meet your expectations with ease. </p>

            <h2 className="text-xl font-medium mb-0">Exclusions:</h2>
            <p>Certain countries prohibit the exclusion of certain warranties or limit or exclude any kind of liability for consequences or incidental damages, so the limitations listed above may not apply to you.</p>

            <h2 className="text-xl font-medium mb-0">Governing Law:</h2>
            <p>These Terms will be governed and construed by the laws of Delaware, United States, notwithstanding its conflict of law provisions.</p>
            <p>Our mission to enforce any right or provision of these Terms does not constitute a waiver of those rights.  If a court finds any provision of these Terms unlawful or unenforceable, the remaining provisions will continue in effect.  These Terms are the complete agreement between us regarding our Service, and they supersede and replace any previous agreements we may have had.</p>

            <h2 className="text-xl font-medium mb-0">Changes:</h2>
            <p>We retain the right to change or replace these Terms at any time.  If a revision is major, we will offer at least 60 days' notice before any new terms take effect.  What constitutes a major change shall be evaluated solely at our discretion.</p>
            <p>By continuing to access or use our Service after such adjustments take effect, you agree to be bound by the following terms.  If you do not accept the new conditions, you are no longer authorised to use the Service.</p>

            <h2 className="text-xl font-medium mb-0">Contact Us:</h2>
            <p>If you have any queries about our Terms, please email us at <a href="mailto:support@promocarnivals.com" style={{ color: '#f54a00'}}>support@promocarnivals.com</a>.</p>

            <p className="text-sm text-zinc-500">
              Last updated: July 16, 2025
            </p>
          </div>
        </div>
      </section>
    </WebLayout>
  );
};

export default TermsOfService;
