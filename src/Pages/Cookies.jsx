import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Cookies = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />

            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Page Title */}
                <h1 className="text-5xl font-roboto font-bold text-gray-900 mb-10 border-b pb-3">
                    Cookie Policy
                </h1>

                {/* Policy Sections */}
                <div className="space-y-8 font-nunito text-gray-800 leading-relaxed">
                    {/* Monthly Leave & CL Allowance */}


                    {/* General Rules */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-3">What Cookies Are</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <div> We use cookies to:</div>
                            <li>Make the ResumeMint work smoothly and properly.</li>
                            <li>Remember your settings and preferences for a better experience.</li>
                            <li>Understand how users interact with the website to help us improve it.</li>
                        </ul>
                    </section>

                    {/* Permission Time */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-3">Types of Cookies</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li><span className="text-2xl font-semibold">Essential Cookies:</span> These are necessary for the ResumeMint to work properly.</li>

                            <li><span className="text-2xl font-semibold">Performance Cookies:</span> These help us see how the website is used and how we can make it better.</li>
                            <li><span className="text-2xl font-semibold">Functional Cookies:</span> These remember your choices and settings to give you a smoother experience.</li>
                        </ul>
                    </section>

                    {/* Login After 10:30 AM */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-3">Managing Cookies</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>You can control or delete cookies through your browser settings at any time. Keep in mind that some features of the ResumeMint might not work properly if cookies are turned off.</li>
                           
                        </ul>
                    </section>

                    {/* Working Hours & Break Time */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-3">Consent</h2>
                        <ul className="list-disc list-inside space-y-2">
                            By continuing to use our ResumeMint website, you agree to our use of cookies as explained in this policy.
                        </ul>
                    </section>

                    {/*  */}



                    <section>
                        <h2 className="text-2xl font-semibold mb-3">User Content & Intellectual Property</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>The resumes and documents you create using our ResumeMint belong to you. You own the rights to the content you generate.</li>
                            <li>By using our platform, you give us permission to store, process, and display your content as needed to provide the service. We respect your privacy and won’t use your personal information for other purposes without your consent.</li>
                            <li>

                                You are responsible for the content you upload or create. Make sure it doesn’t violate any laws or the rights of others.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3">Privacy & Data Collection</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>We collect some information when you use our ResumeMint, such as your name, email, and any content you create. This information is stored securely and used only to provide and improve our services</li>
                            <li>We respect your privacy and follow applicable Indian data protection laws. For more details on how we handle your information and your rights, please read our Privacy Policy.</li>

                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3">Disclaimers & Limitations of Liability</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>We work hard to make sure our ResumeMint works well, but we cannot guarantee that every resume will be error-free or perfectly formatted. We are not responsible for any loss of data, or for how your resume is used by employers.</li>
                            <li>Using our service does not guarantee that you will get a job or specific results. The resumes you create are your responsibility, and any outcomes from using them are beyond our control.</li>

                        </ul>
                    </section>


                    <section>
                        <h2 className="text-2xl font-semibold mb-3">Termination of Access</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>We may suspend or close your account if you break these Terms, misuse the platform, or engage in illegal activity.</li>
                            <li>After your account is terminated, you may lose access to your resumes, templates, and other content stored on the platform. You are responsible for saving any important information before termination. Some rights, like obligations to pay for subscriptions, may still apply even after your account is closed..</li>

                        </ul>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold mb-3">Modifications to Terms</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>We may update or change these Terms from time to time to improve our services or comply with laws. When we do, the latest version will be posted on this page.</li>
                            <li>It’s your responsibility to check for updates. Continuing to use the ResumeMint after changes have been posted means you accept the new Terms. For major updates, we may notify you directly, but even if we don’t, the updated Terms will still apply.</li>

                        </ul>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold mb-3">Governing Law & Dispute Resolution</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>These Terms are governed by the laws of India. Any disputes related to the use of this ResumeMint will be handled under Indian law and within the courts of India.</li>
                            <li>We encourage you to reach out to us directly if any issues arise. Where possible, disputes may be resolved through discussion or mediation before involving the courts.</li>

                        </ul>
                    </section>



                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Cookies;