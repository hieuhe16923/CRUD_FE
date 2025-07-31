import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="min-w-[1000px]">
      <div className="flex bg-TK-background text-white h-[60px]">
        <div className="flex items-center m-4">
          <Link to={'/'}>
            <div className="flex pr-3 pl-3">
              <div className="mt-7 text-xs xl:text-sm font-bold">
                Input form
              </div>
            </div>
          </Link>
          <Link to={'/breed'}>
            <div className="flex pr-3 pl-3">
              <div className="mt-7 text-xs xl:text-sm font-bold">Breed</div>
            </div>
          </Link>
          {/* <Link to={'/watchstop'}>
            <div className="flex pr-3 pl-3">
              <div className="mt-7 text-xs xl:text-sm font-bold">watchstop</div>
            </div>
          </Link> */}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
