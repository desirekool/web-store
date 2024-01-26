import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Navbar } from "../components";

function HomeLayout() {
  return (
    <>
      <Header />
      <Navbar />
      <section className="align-element py-20">
        <Outlet />    
      </section>
    </>
  )
}

export default HomeLayout