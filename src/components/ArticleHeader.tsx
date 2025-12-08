interface ArticleHeaderProps {
    title: string;
    description: string;
}

export default function ArticleHeader({ title, description }: ArticleHeaderProps) {
    return (
        <div className="font-sans text-slate-900 dark:text-white mb-12">
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
                {title}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                {description}
            </p>
        </div>
    );
}
