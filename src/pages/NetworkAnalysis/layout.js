/** Simple deterministic circular layout — no backend graph-layout service yet. */
export function circularLayout(nodes, radius = 280) {
  const center = { x: 400, y: 300 };
  if (nodes.length === 1) return [{ ...nodes[0], position: center }];
  return nodes.map((node, i) => {
    const angle = (2 * Math.PI * i) / nodes.length;
    return {
      ...node,
      position: {
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle),
      },
    };
  });
}
