import Image from "@/components/Image";

type CommentProps = {
    comment: any;
};

const Comment = ({ comment }: CommentProps) => (
    <div className="flex flex-col bg-n-8 border border-n-1/5 rounded-2xl">
        <div className="quote flex-1 px-5 py-10 md:px-10">{comment.text}</div>
        <div className="flex items-center px-5 py-6 bg-n-7 rounded-b-[0.9375rem] md:px-10">
            <div className="mr-5">
                <h6 className="h6">{comment.name}</h6>
                <div className="caption text-n-1/25">{comment.role}</div>
            </div>
            <div className="ml-auto">
                <Image
                    className="w-full rounded-full"
                    src={comment.avatarUrl}
                    width={60}
                    height={60}
                    alt={comment.name}
                />
            </div>
        </div>
    </div>
);

export default Comment;
