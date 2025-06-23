import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import PatientSearch from '../pages/PatientSearch';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/patientSearch' element={<PatientSearch/>}/>
        </Routes>
    )

}