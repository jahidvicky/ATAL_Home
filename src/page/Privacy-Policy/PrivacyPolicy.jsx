// import { title } from "process";
import React from "react";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "1. Introduction",
      content: `At Atal Optical Corp ("we", "us", or "our"), protecting your privacy and personal information is a fundamental priority. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, purchase our products, or use our services. By using our website or services, you agree to the terms described herein.`
    },
    {
      title: "2. Information We Collect",
      content: (
        <>
          <div className="mb-3 font-semibold">a. Personal Information</div>
          <div>We collect personal data you provide directly when you:</div>
          <ul className="list-disc list-inside mb-3">
            <li>Create an account</li>
            <li>Place an order for eyeglasses, contact lenses, or related products</li>
            <li>Book appointments or consultations</li>
            <li>Subscribe to newsletters or promotional communications</li>
            <li>Contact customer support</li>
          </ul>
          <div>Personal information may include your:</div>
          <ul className="list-disc list-inside mb-3">
            <li>Full name</li>
            <li>Contact details (email, phone number, mailing address)</li>
            <li>Date of birth</li>
            <li>Payment information (processed securely via third-party processors)</li>
            <li>Prescription details provided by you or your eye care professional</li>
            <li>Health-related data necessary for product fulfillment</li>
          </ul>
          <div className="mb-3 font-semibold">b. Automatically Collected Information</div>
          <div>When you visit our website, we automatically collect:</div>
          <ul className="list-disc list-inside">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>Pages visited and time spent</li>
            <li>Cookies and tracking technologies (see Section 6)</li>
          </ul>
        </>
      )
    },
    {
      title: "3. How We Use Your Information",
      content: (
        <ul className="list-disc list-inside">
          <li>Process and fulfill your orders and appointments</li>
          <li>Verify prescriptions and communicate with your eye care provider as needed</li>
          <li>Provide customer service and support</li>
          <li>Send order confirmations, updates, and receipts</li>
          <li>Send newsletters, marketing, and promotional offers (with your consent)</li>
          <li>Improve our website, products, and services</li>
          <li>Prevent fraud and unauthorized transactions</li>
          <li>Comply with legal and regulatory obligations</li>
        </ul>
      )
    },
    {
      title: "4. Sharing and Disclosure",
      content: (
        <div>
          We do not sell or rent your personal information to third parties. We may share your information with:
          <ul className="list-disc list-inside mt-2">
            <li>Affiliated companies within Atal Optical Corp for operational and marketing purposes</li>
            <li>Third-party service providers who assist with order fulfillment, payment processing, delivery, IT services, marketing, and customer support — all under strict confidentiality agreements</li>
            <li>Eye care professionals or clinics, strictly for verifying your prescription or related healthcare services</li>
            <li>Legal authorities or regulatory bodies, if required by law or to protect our rights</li>
          </ul>
        </div>
      )
    },
    {
      title: "5. Your Privacy Rights",
      content: (
        <>
          <div>You have the right to:</div>
          <ul className="list-disc list-inside mb-3">
            <li>Access and obtain a copy of your personal information we hold</li>
            <li>Request correction of inaccurate or incomplete data</li>
            <li>Withdraw consent for marketing communications at any time by using the unsubscribe link or contacting us</li>
            <li>Request deletion or restriction of your personal information, subject to legal and operational requirements</li>
            <li>Object to certain processing activities</li>
            <li>Lodge a complaint with a relevant privacy regulator if you believe your rights have been violated</li>
          </ul>
          <div>
            To exercise your rights, please contact our Privacy Officer at{" "}
            <a href="mailto:privacy@ataloptical.com" className="text-red-600 underline">
              privacy@ataloptical.com
            </a>{" "}
            or call <span className="font-semibold">1-866-242-3545</span>.
          </div>
        </>
      )
    },
    {
      title: "6. Cookies and Tracking Technologies",
      content: (
        <ul className="list-disc list-inside">
          <li>Enhance website functionality and user experience</li>
          <li>Analyze site traffic and usage patterns</li>
          <li>Personalize marketing and advertising efforts</li>
        </ul>
      )
    },
    {
      title: "7. Data Retention",
      content: `We retain your personal information only as long as necessary to fulfill the purposes outlined in this Policy, comply with legal, tax, and accounting obligations, resolve disputes, and enforce our agreements. When data is no longer required, we securely delete or anonymize it.`
    },
    {
      title: "8. Data Security",
      content: `We implement industry-standard security measures, including encryption, access controls, and secure servers, to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no data transmission over the internet can be guaranteed 100% secure.`
    },
    {
      title: "9. International Transfers",
      content: `If you access our services from outside Canada, your information may be transferred to and processed in Canada. By using our services, you consent to this transfer and processing.`
    },
    {
      title: "10. Children’s Privacy",
      content: `Our services are not intended for individuals under 16 years old. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe we have collected such information, please contact us immediately.`
    },
    {
      title: "11. Changes to This Privacy Policy",
      content: `We may update this Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this Policy periodically.`
    },
    {
        title:"12. Contact Us",
        content: (
        <ul className="list-disc list-inside">
          <li>34 Shining Willow Crescent, Brampton, Ontario, Canada</li>
          <li>privacy@ataloptical.com</li>
          <li>1-866-242-3545</li>
        </ul>
      )
    }
  ];

  return (
    <>
    <header className="mb-8 bg-gradient-to-r from-black via-red-600 to-black py-12">
        <h1 className="text-5xl font-bold text-white text-center">
          Privacy Policy
        </h1>
        <hr className="border-white w-100 mt-2 mx-120"></hr>
    </header>
    <div className="px-6 ">
      <div className=" mx-auto p-8 ">
        {sections.map((section, idx) => (
          <div key={idx} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
            <div className="text-gray-700 leading-relaxed">{section.content}</div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
