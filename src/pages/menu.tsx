import CardMenu from "../components/menuCards";

function menu() {
  return (
    <div className="grid" style={{ maxWidth: `100%`, overflowX: "hidden" }}>
      <CardMenu />
    </div>
  );
}

export default menu;
