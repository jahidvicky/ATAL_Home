const SiteContentNotice = () => {
    const sections = [
        {
            title: "Intellectual Property Notice",
            content: (
                <p>
                    All content, images, designs, graphics, logos, product names, and other materials displayed on the Atal Optical
                    website are the exclusive property of Atal Optical unless otherwise stated. This includes all creative,
                    written, digital, and visual assets protected under Canadian and international copyright, trademark, and
                    intellectual property laws.
                    <br /><br />
                    By accessing the website, you agree not to misuse, copy, or distribute any protected material without
                    permission.
                </p>
            )
        },
        {
            title: "Ownership of Content",
            content: (
                <>
                    <p className="mb-3">
                        All content on the Atal Optical website (the “Site”) is owned by Atal Optical or licensed by authorized
                        providers. This includes:
                    </p>

                    <ul className="list-disc list-inside space-y-1">
                        <li>Images, graphics, photos, videos, and illustrations</li>
                        <li>Website layout, UI design, structure, and styling</li>
                        <li>Text, descriptions, articles, and written content</li>
                        <li>Product names, titles, labels, and descriptions</li>
                        <li>Source code, software, and digital assets</li>
                        <li>Data compilations, metadata, icons, and visual components</li>
                    </ul>

                    <p className="mt-4">
                        All rights, title, and interest—including enhancements, formatting, and arrangement—are reserved by Atal
                        Optical. Unauthorized use is strictly prohibited.
                    </p>
                </>
            )
        },
        {
            title: "Restrictions on Use",
            content: (
                <>
                    <p>Without written consent from Atal Optical, you MAY NOT:</p>

                    <ul className="list-disc list-inside space-y-1 mt-3">
                        <li>Republish, reproduce, or distribute any website content</li>
                        <li>Use images, graphics, or text for commercial purposes</li>
                        <li>Modify, edit, or alter any content</li>
                        <li>Remove or hide copyright or trademark notices</li>
                        <li>Create derivative works from any content</li>
                        <li>Reverse-engineer or tamper with website software</li>
                    </ul>

                    <p className="mt-3 text-[15px]">
                        Unauthorized use may result in legal action under Canadian and international laws.
                    </p>
                </>
            )
        },
        {
            title: "Permitted Personal Use",
            content: (
                <>
                    <p>You may download or print small portions of website content ONLY if:</p>

                    <ul className="list-disc list-inside mt-3 space-y-1">
                        <li>Use is personal and non-commercial</li>
                        <li>Content remains unmodified</li>
                        <li>Copyright and proprietary notices remain intact</li>
                    </ul>

                    <p className="mt-3">
                        Personal use does not grant ownership, transfer of rights, or permission to redistribute content.
                    </p>
                </>
            )
        },
        {
            title: "Trademarks",
            content: (
                <>
                    <p>
                        All trademarks, logos, product names, and brand identifiers displayed on the Site are the exclusive property
                        of Atal Optical or their respective owners.
                    </p>

                    <p className="mt-3">
                        Use of these trademarks without express written permission is strictly prohibited.
                    </p>
                </>
            )
        },
        {
            title: "Software & Licensing",
            content: (
                <>
                    <p>
                        Any software, application, or digital tools provided on the Site are protected and licensed for limited use.
                        Unless stated otherwise, software is provided:
                    </p>

                    <ul className="list-disc list-inside mt-3 space-y-1">
                        <li>On a non-transferable basis</li>
                        <li>For personal and non-commercial use only</li>
                        <li>Without permission for redistribution or modification</li>
                    </ul>

                    <p className="mt-3">Prohibited actions include:</p>

                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Reverse engineering or modifying software</li>
                        <li>Copying or distributing software</li>
                        <li>Using software for commercial or public purposes without consent</li>
                    </ul>
                </>
            )
        },
        {
            title: "Website Links",
            content: (
                <>
                    <p>
                        External links provided on this website are offered for convenience only. Atal Optical is not responsible
                        for the content, accuracy, or privacy practices of third-party websites.
                    </p>
                </>
            )
        },
        {
            title: "Disclaimer",
            content: (
                <>
                    <p>
                        While Atal Optical strives for accuracy, we do not guarantee that website content is free from errors,
                        omissions, or inaccuracies. Content may be updated or modified at any time without notice.
                    </p>
                </>
            )
        },
        {
            title: "Licensing & Permission Requests",
            content: (
                <>
                    <p>For commercial, academic, or publication use of any content:</p>

                    <p className="mt-2">
                        <strong>Email:</strong> info@ataloptical@gmail.com
                    </p>

                    <p className="mt-3">Written permission is required prior to any use outside personal viewing.</p>
                </>
            )
        }
    ];

    return (
        <>
            {/* HEADER */}
            <header className="mb-10 bg-gradient-to-r from-black via-red-600 to-black py-14 text-center shadow-md">
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
                    Website Content & Intellectual Property Notice
                </h1>
                <div className="border-b border-white w-24 mx-auto mt-4 opacity-70"></div>
            </header>

            {/* BODY CONTENT */}
            <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10 pb-16">
                <div className="space-y-10">
                    {sections.map((section, idx) => (
                        <div
                            key={idx}
                            className="bg-white shadow-sm p-6 md:p-8 rounded-xl border border-red-400"
                        >
                            <h2 className="text-2xl font-semibold text-red-600 mb-3">
                                {section.title}
                            </h2>
                            <div className="text-gray-700 leading-relaxed text-[15px] md:text-base">
                                {section.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SiteContentNotice;
