const MoveBox = (entities, { input }) => {
	//-- I'm choosing to update the game state (entities) directly for the sake of brevity and simplicity.
	//-- There's nothing stopping you from treating the game state as immutable and returning a copy..
	//-- Example: return { ...entities, t.id: { UPDATED COMPONENTS }};
	//-- That said, it's probably worth considering performance implications in either case.

	const { payload } = input.find(x => x.name === "onMouseDown") || {};

	if (payload) {
		const box1 = entities["box1"];
		console.log(payload)

		const pageX = payload?.pageX;
		const pageY = payload?.pageY;
		const offsetX = payload?.nativeEvent?.offsetX;
		const offsetY = payload?.nativeEvent?.offsetY;
		const screenX = payload?.screenX;
		const screenY = payload?.screenY;



		box1.x = payload?.nativeEvent?.layerX;
		box1.y = payload?.nativeEvent?.layerY;
		//		box1.y = payload.pageY;
		//		box1.x = payload.pageX;
	}

	return entities;
};

export { MoveBox };
