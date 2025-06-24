import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return(
    <>
      <div className="flex h-screen">
        <div className="flex-none w-14 bg-neutral-900 flex flex-col items-center py-4 space-y-4">
          <Link to="bank-statements" className="text-neutral-400 hover:text-lime-600 hover:bg-neutral-800 p-2 rounded transition-colors" title="Extrato">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-[24px] h-[24px] text-gray-800 dark:text-white" fill="currentColor" viewBox="0 0 16 16">
              <path  d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"/>
            </svg>          
          </Link>
          <Link to="activities" className="text-neutral-400 hover:text-lime-600 hover:bg-neutral-800 p-2 rounded transition-colors" title="Cadastro de Atividades">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-[24px] h-[24px] text-gray-800 dark:text-white" fill="currentColor" viewBox="0 0 16 16">
              <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
              <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z"/>
            </svg>          
          </Link>
        </div>
        <div className="flex-1 py-4 px-20 overflow-y-auto bg-neutral-800">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout;