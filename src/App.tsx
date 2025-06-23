import MainLayout from "./layout/MainLayout";
import AppRoutes from "./routes/AppRoutes";

function App() {
    return (
        <div>
            <MainLayout>
                <AppRoutes />
            </MainLayout>
        </div>
    )
}
export default App;