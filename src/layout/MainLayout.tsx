import Header from "../component/Header/Header";
const MainLayout = ({children}:{children:React.ReactNode}) => (
    <>
    <Header/>
    <main>{children}</main>
    </>
)
export default MainLayout;