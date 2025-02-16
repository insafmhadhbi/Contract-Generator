import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import FormSural from "./pages/Forms/FormSural.jsx";
import FormContratLocation from "./pages/Forms/FormContratLocation.jsx";
import FormSarl from "./pages/Forms/FormSarl.jsx";
import FormDeclarModifRNESociete from "./pages/Forms/Form_DeclarModifRNESociete.jsx";
import FormDeclarModifRNEPhysique from "./pages/Forms/Form_DeclarModifRNEPhysique.jsx";
import FormDeclarImmRNEPhysique from "./pages/Forms/Form_DeclarImmRNEPhysique.jsx";
import FormDeclarImmRNESociete from "./pages/Forms/Form_DeclarImmRNESociete.jsx";
import FormResLoc from "./pages/Forms/FormResLoc.jsx";
import FormPVAGOSural from "./pages/Forms/FormPVAGOSural.jsx";
import FormPVAGOSarl from "./pages/Forms/PVAGOSarl.jsx";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Auth/Login";
import Completed from "./pages/Completed.jsx";
import TaskDetails from "./pages/TaskDetails";
import Tasks from "./pages/Tasks";
import Trash from "./pages/Trash";
import Users from "./pages/Users";
import { setOpenSidebar } from "./redux/slices/authSlice";
// import Contracts from "./pages/FormesDesContraPage.jsx";
import Contracts from "./pages/Formulaire.jsx";
import FormContratPersonnePhy from "./pages/FormContratPersonnePhy.jsx";
import FormContratPersonneMorale from "./pages/FormContratPersonneMorale.jsx";
import FormSarlButton from "./pages/FormSarlButton.jsx";
import ResetPassword from "./pages/Auth/ResetPassword.jsx";
function Layout() {
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();

  return user ? (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-1/5 h-screen bg-white sticky top-0 hidden md:block">
        <Sidebar />
      </div>

      <MobileSidebar />

      <div className="flex-1 overflow-y-auto">
        <Navbar />

        <div className="p-4 2xl:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <>
      <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter="transition-opacity duration-700"
        enterFrom="opacity-x-10"
        enterTo="opacity-x-100"
        leave="transition-opacity duration-700"
        leaveFrom="opacity-x-100"
        leaveTo="opacity-x-0"
      >
        {(ref) => (
          <div
            ref={(node) => (mobileMenuRef.current = node)}
            className={clsx(
              "md:hidden w-full h-full bg-black/40 transition-all duration-700 transform ",
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            )}
            onClick={() => closeSidebar()}
          >
            <div className="bg-white w-3/4 h-full">
              <div className="w-full flex justify-end px-5 mt-5">
                <button
                  onClick={() => closeSidebar()}
                  className="flex justify-end items-end"
                >
                  <IoClose size={25} />
                </button>
              </div>

              <div className="-mt-10">
                <Sidebar />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};

function App() {
  return (
    <main className="w-full min-h-screen bg-[#f3f4f6] ">
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Navigate to="/tasks" />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/formSural" element={<FormSural />} />
          <Route path="/formSarl" element={<FormSarl />} />
          <Route path="/formResLoc" element={<FormResLoc />} />
          <Route path="/formPVAGOSural" element={<FormPVAGOSural />} />
          <Route path="/formPVAGOSarl" element={<FormPVAGOSarl />} />
          <Route
            path="/form_DeclarModifRNESociete"
            element={<FormDeclarModifRNESociete />}
          />
          <Route
            path="/form_DeclarModifRNEPhysique"
            element={<FormDeclarModifRNEPhysique />}
          />
          <Route
            path="/form_DeclarImmRNEPhysique"
            element={<FormDeclarImmRNEPhysique />}
          />
          <Route
            path="/form_DeclarImmRNESociete"
            element={<FormDeclarImmRNESociete />}
          />
          <Route
            path="/formContratLocation"
            element={<FormContratLocation />}
          />
          <Route path="/Contracts" element={<Contracts />} />
          <Route
            path="/Contracts/FormContratPersonnePhy"
            element={<FormContratPersonnePhy />}
          />
          <Route
            path="/Contracts/FormContratPersonneMorale"
            element={<FormContratPersonneMorale />}
          />
          <Route
            path="/Contracts/FormSarlButton"
            element={<FormSarlButton />}
          />

          <Route path="/Completed" element={<Completed />} />
          <Route path="/team" element={<Users />} />
          <Route path="/trashed" element={<Trash />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
      </Routes>

      <Toaster richColors />
    </main>
  );
}

export default App;
