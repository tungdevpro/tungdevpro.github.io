import Image from "../Image";

type NotificationProps = {
    className?: string;
    title: string;
};

const Notification = ({ className, title }: NotificationProps) => (
    <div
        className={`flex items-center p-4 pr-6 bg-[#474060]/40 backdrop-blur border border-n-1/10 rounded-2xl ${
            className || ""
        }`}
    >
        <div className="mr-5">
            <Image
                className="w-full rounded-xl"
                src="/images/notification/image-1.png"
                width={52}
                height={52}
                alt="Image"
            />
        </div>
        <div className="flex-1">
            <h6 className="mb-1 font-semibold text-base">{title}</h6>
            <div className="flex items-center justify-between">
                <ul className="flex -m-0.5">
                    {[
                        "/images/notification/image-4.png",
                        "/images/notification/image-3.png",
                        "/images/notification/image-2.png",
                    ].map((item, index) => (
                        <li
                            className={`flex w-6 h-6 border-2 border-[#2E2A41] rounded-full overflow-hidden ${
                                index !== 0 ? "-ml-2" : ""
                            }`}
                            key={index}
                        >
                            <Image
                                className="w-full"
                                src={item}
                                width={20}
                                height={20}
                                alt={item}
                            />
                        </li>
                    ))}
                </ul>
                <div className="body-2 text-[#6C7275]">1m ago</div>
            </div>
        </div>
    </div>
);

export default Notification;
