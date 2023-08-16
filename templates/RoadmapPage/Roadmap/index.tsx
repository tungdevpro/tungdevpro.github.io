import Image from "@/components/Image";
import Section from "@/components/Section";
import Tagline from "@/components/Tagline";
import { roadmapFull } from "@/mocks/roadmap";

type RoadmapProps = {};

const Roadmap = ({}: RoadmapProps) => (
    <Section>
        <div className="container max-w-[70rem]">
            <ul className="-mb-15 md:mb-0">
                {roadmapFull.map((item) => (
                    <li
                        className="relative mb-15 md:flex md:mb-0"
                        key={item.id}
                    >
                        <div className="flex items-center h-14 mb-3 md:w-[16rem] md:h-[6.5rem] md:mb-0 lg:h-[9.5rem]">
                            <Tagline className="mr-8">{item.date}</Tagline>
                            <div className="w-32 h-0.25 bg-n-6 md:flex-1"></div>
                        </div>
                        <div className="md:flex md:flex-1 md:p-6 md:border-l md:border-n-6 lg:py-12 lg:px-20">
                            <div className="mb-6 md:flex-shrink-0 md:w-14 md:mr-6 md:mb-0">
                                <Image
                                    src={
                                        item.status === "done"
                                            ? "/images/roadmap/done.svg"
                                            : "/images/roadmap/undone.svg"
                                    }
                                    width={56}
                                    height={56}
                                    alt="Done"
                                />
                            </div>
                            <div className="md:flex-1">
                                <div className="mb-5 md:flex md:items-center md:justify-between md:min-h-[3.5rem] md:mb-6">
                                    <h5 className="h5">{item.title}</h5>
                                    {item.status === "progress" && (
                                        <div className="absolute top-4 right-0 flex items-center px-4 py-1 bg-n-1 rounded text-n-8 md:static md:flex-shrink-0 md:self-start md:mt-4 md:ml-6">
                                            <Image
                                                className="mr-2.5"
                                                src="/images/icons/loading-01.svg"
                                                width={16}
                                                height={16}
                                                alt="In progress"
                                            />
                                            <div className="tagline">WIP</div>
                                        </div>
                                    )}
                                </div>
                                <p className="body-2 text-n-4">{item.text}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </Section>
);

export default Roadmap;
