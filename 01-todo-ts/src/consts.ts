// podemos tipar diciendo que tiene que ser una de las opciones que esten dentro del objeto
export const TODO_FILTERS = {
	ALL: "all",
	ACTIVE: "active",
	COMPLETED: "completed",
} as const; // solo lectura

export const FILTERS_BUTTONS = {
	[TODO_FILTERS.ALL]: {
		literal: "Todos",
		href: `#/${TODO_FILTERS.ALL}`,
	},
	[TODO_FILTERS.ACTIVE]: {
		literal: "Activos",
		href: `#/${TODO_FILTERS.ACTIVE}`,
	},
	[TODO_FILTERS.COMPLETED]: {
		literal: "Completados",
		href: `#/${TODO_FILTERS.COMPLETED}`,
	},
} as const;

// utiliza una de las llaves del TODO_FILTERS
export type FilterValue = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS];
