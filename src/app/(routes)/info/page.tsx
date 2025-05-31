import Link from "next/link";

export default function Info() {
    return (
        <>
            <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                <h2 className="mb-8 text-center text-4xl tracking-tight font-bold">Information</h2>
                <div className="grid pt-8 text-left border-t border-gray-950/5 md:gap-16 dark:border-white/20 md:grid-cols-2">
                    <div>
                        <div className="mb-10">
                            <h3 className="items-center mb-4 text-lg font-medium">What are we</h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur sint error cumque itaque dolorum exercitationem nesciunt dignissimos veniam, assumenda illum deleniti ipsam voluptate minima enim corrupti perferendis voluptatum nobis dolore?
                            </p>
                        </div>
                        <div className="mb-10">
                            <h3 className="items-center mb-4 text-lg font-medium">How does it work</h3>
                            <p className="text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo earum repellendus fuga rerum alias minus consequatur minima, iste amet voluptate incidunt pariatur fugiat! Magnam, corrupti. Rem architecto accusantium alias libero.</p>
                        </div>
                        <div className="mb-10">
                            <h3 className="items-center mb-4 text-lg font-medium">What did it take</h3>
                            <p className="text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia adipisci rem eius quaerat delectus aliquid suscipit provident possimus, recusandae totam. Voluptatum eius, earum similique fugiat vel maxime doloribus deleniti sint.</p>
                        </div>
                        <div className="mb-10">
                            <h3 className="items-center mb-4 text-lg font-medium">I want to build more than one project. Is that allowed?</h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                You can use Windster for an unlimited amount of projects, whether it's a personal website, a SaaS app, or a website for a client. As long as you don't build a product that will directly compete with Windster either as a UI
                                kit, theme, or template, it's fine.
                            </p>{" "}
                        </div>
                    </div>
                    <div>
                        <div className="mb-10">
                            <h3 className="items-center mb-4 text-lg font-medium">What does "free updates" include?</h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                The free updates that will be provided is based on the{" "}
                                <a href="#" className="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline">
                                    roadmap
                                </a>{" "}
                                that we have laid out for this project. It is also possible that we will provide extra updates outside of the roadmap as well.
                            </p>
                        </div>
                        <div className="mb-10">
                            <h3 className="items-center mb-4 text-lg font-medium">What does the free version include?</h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                The{" "}
                                <a href="#" className="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline">
                                    free version
                                </a>{" "}
                                of Windster includes a minimal style guidelines, component variants, and a dashboard page with the mobile version alongside it.
                            </p>
                            <p className="text-gray-500 dark:text-gray-400">You can use this version for any purposes, because it is open-source under the MIT license.</p>
                        </div>
                        <div className="mb-10">
                            <h3 className="items-center mb-4 text-lg font-medium">What is the difference between Windster and Tailwind UI?</h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                Although both Windster and Tailwind UI are built for integration with Tailwind CSS, the main difference is in the design, the pages, the extra components and UI elements that Windster includes.
                            </p>
                            <p className="text-gray-500 dark:text-gray-400">Additionally, Windster is a project that is still in development, and later it will include both the application, marketing, and e-commerce UI interfaces.</p>
                        </div>
                        <div className="mb-10">
                            <h3 className="items-center mb-4 text-lg font-medium">Can I use Windster in open-source projects?</h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                Generally, it is accepted to use Windster in open-source projects, as long as it is not a UI library, a theme, a template, a page-builder that would be considered as an alternative to Windster itself.
                            </p>
                            <p className="text-gray-500 dark:text-gray-400">With that being said, feel free to use this design kit for your open-source projects.</p>
                            <p className="text-gray-500 dark:text-gray-400">
                                Find out more information by{" "}
                                <a href="#" className="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline">
                                    reading the license
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}