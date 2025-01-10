interface Props {
	bgColor?: string;
	path: string;
	title: string;
}

const PageTitle = ({ bgColor = "bg-primary-10", path, title }: Props) => {
	return (
		<div className={`${bgColor} pb-20 pt-32 lg:pb-24 lg:pt-44`}>
			<div className="text-center">
				<h4 className="text-caption-2 lg:text-caption-1 text-secondary-50">
					Home <span className="text-primary-100">/ {path}</span>
				</h4>
				<h1 className="text-heading-3 lg:text-heading-1 text-secondary-100">
					{title}
				</h1>
			</div>
		</div>
	);
};

export default PageTitle;
