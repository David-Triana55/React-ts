import { FILTERS_BUTTONS, type FilterValue } from "../consts";

interface Props {
	filterSelected: FilterValue;
	onFilterChange: (filter: FilterValue) => void;
}

export const Filters: React.FC<Props> = ({
	filterSelected,
	onFilterChange,
}) => {
	return (
		<ul className="filters">
			{Object.entries(FILTERS_BUTTONS).map(([key, { literal, href }]) => {
				const isSelected = key === filterSelected;
				const className = isSelected ? "selected" : "";
				return (
					<li key={key}>
						<a
							className={className}
							href={href}
							onClick={(e) => {
								e.preventDefault();
								onFilterChange(key as FilterValue);
							}}
						>
							{literal}
						</a>
					</li>
				);
			})}
		</ul>
	);
};
