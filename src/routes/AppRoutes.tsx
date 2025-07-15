import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import PatientSearch from '../pages/PatientSearch';
import PatientDetail from '../pages/PatientDetail';
import AddResources from '../pages/AddResources';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/patientSearch' element={<PatientSearch/>}/>
            <Route path="/patientDetail/:id" element={<PatientDetail />} />
            <Route path='/addResources' element={<AddResources/>}/>
        </Routes>
    )

}