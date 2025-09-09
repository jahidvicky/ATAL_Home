import image from '../../assets/promotion/woman.jpg'

export default function DisclaimerPage() {
  return (
    <>
      <header className="mb-8 bg-gradient-to-r from-black via-red-600 to-black py-12">
        <h1 className="text-5xl font-bold text-white text-center">
           Disclaimer of Warranty
        </h1>
        <hr className="border-white w-156 mt-2 mx-90"></hr>
      </header>
      <div className="mx-auto">
        <article className="rounded-2xl p-6 flex flex-col lg:flex-row gap-8">
          <div className="max-w-lg">
            <img
              src={image}
              alt="Optical Store"
              loading='lazy'
              decoding='async'
              className="rounded-xl hover:grow transition-transform duration-400 hover:scale-103 hover:shadow-lg h-full object-cover"/>
          </div>

          <section className="prose max-w-none leading-relaxed text-gray-800 lg:w-2/3">
            <p>
              The content ("Content") provided on this website by{" "}
              <strong>Atal Optical Corp</strong> ("we", "us", or "our") is
              offered solely as a service to our customers. This Site does not
              encompass information about all eye diseases, nor does it provide
              comprehensive medical information relevant to your individual
              eyecare needs.
            </p>
            <p>
              The information contained herein is intended solely as general
              health information and is designed to facilitate communication
              between you and your professional eyecare provider. This Site does
              not provide medical diagnoses for any individual and must not be
              used as a substitute for professional medical advice, diagnosis,
              treatment, or care.
            </p>
            <p>
              All specific medical questions regarding your personal medical
              condition, treatment, care, or diagnosis should be directed to
              your licensed eyecare professional. You should never disregard or
              delay seeking professional medical advice based on any information
              presented on or linked to this Site.
            </p>
            <p>
              Except as expressly and unambiguously stated otherwise, Atal
              Optical Corp does not endorse, operate, control, or assume
              responsibility for any product, brand, method, treatment,
              information, or service referenced on this Site.
            </p>
            <p>
              All information, services, and products provided on this Site are
              offered "as is", without any warranty of any kind, either express
              or implied. Atal Optical Corp, along with our medical advisors,
              consultants, and staff, hereby expressly disclaim and exclude all
              warranties related to the information, services, and products on
              this Site, including but not limited to warranties of
              merchantability, fitness for a particular purpose, and
              non-infringement.
            </p>
            <p>
              This Site may contain Content provided by third parties or users.
              In such cases, Atal Optical Corp acts as a distributor and not a
              publisher of such third-party Content, and therefore exercises no
              editorial control over it— similar to the role of a public library
              or newsstand.
            </p>
            <p>
              Any opinions, advice, statements, services, offers, or other
              information expressed or made available by third parties
              (including merchants and licensors) are those of the respective
              authors or distributors, and not of Atal Optical Corp or its
              affiliates, officers, directors, employees, or agents.
            </p>
            <p>
              No warranties are made regarding the completeness, accuracy,
              currency, or reliability of the information published by Atal
              Optical Corp. We do not warrant that the information, services, or
              products on this Site will meet your requirements or are free from
              defects or errors.
            </p>
            <div className="text-sm text-gray-700">
            <strong>Need help?</strong>
            <div>
              Contact your licensed eyecare professional for any medical
              concerns.
            </div>
          </div>
          </section>
        </article>
      </div>

    </>
  );
}
