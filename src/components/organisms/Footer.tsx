export default function footer() {
  return (
    <nav className="w-full h-[80px] absolute bottom-0 flex flex-row items-center justify-between bg-amber-200">
      <p className="ml-[12px]">Mi cocina Pliplines</p>
      <p className="mr-[12px]">
        Esta Pagina esta desarollada por{" "}
        <a href="https://github.com/Cesar-Plyed" className="hover:underline">
          Cesar-Plyed
        </a>
      </p>
    </nav>
  );
}
