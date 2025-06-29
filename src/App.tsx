import MainLayout from "./layout/MainLayout";
import AppRoutes from "./routes/AppRoutes";
import { Analytics } from "@vercel/analytics/react"

function App() {
    return (
        <div>
            <MainLayout>
                <AppRoutes />
               <Analytics />
            </MainLayout>
        </div>
    )
}
export default App;