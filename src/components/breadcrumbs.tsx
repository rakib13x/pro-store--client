import Link from "next/link";

interface Breadcrumbs {
	previousPath: string;
	currentPath: string;
}

const Breadcrumbs = ({ previousPath, currentPath }: Breadcrumbs) => {
	return (
		<div className="flex space-x-2">
			<h4 className="text-caption-2 lg:text-caption-1 space-x-2 text-secondary-50">
				<Link href="/" className="hover:text-primary-100 hover:underline">
					Home
				</Link>
				<span>/</span>
				<Link href="/menu" className="hover:text-primary-100 hover:underline">
					{previousPath}
				</Link>
			</h4>
			<h4 className="text-caption-2 lg:text-caption-1 w-2/5 truncate text-primary-100">
				/ {currentPath}
			</h4>
		</div>
	);
};

export default Breadcrumbs;
