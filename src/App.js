import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Barranav from './components/layout/Barranav';

import Home from './components/pages/Home';

import Container from './components/layout/Container';

import Usuarios from './components/pages/Usuarios';

import Painelpac from './components/pages/PainelPac';

import Footer from './components/layout/Footer';

import Cadusuario from './components/pages/Cadusuario';

import Usuario from './components/pages/Usuario';

import TelaAtendimento from './components/pages/TelaAtendimento';

import StatusPac from './components/pages/StatusPac';

import TelaLogin from './components/pages/TelaLogin';

import { PrivateLogin, PrivateRoute } from './components/auth/PrivateRoute';

import { Authrapper } from './components/auth/Authrapper';

function App() {
  return (
    <Router>
      <Authrapper>
        <Barranav />
        <Routes>
          <Route path="/login" element={<PrivateLogin><Container customClass="min-height">
            <TelaLogin />
          </Container></PrivateLogin>} />
          <Route path="/" element={<Container customClass="min-height">
            <Home />
          </Container>} />
          <Route path="/usuarios" element={<PrivateRoute><Container customClass="min-height">
            <Usuarios />
          </Container></PrivateRoute>} />
          <Route path="/painelpac" element={<PrivateRoute><Container customClass="min-height">
            <Painelpac />
          </Container></PrivateRoute>} />
          <Route path="/cadusuario" element={<PrivateRoute><Container customClass="min-height">
            <Cadusuario />
          </Container></PrivateRoute>} /> 
          <Route path="/beneficiario/:id" element={<PrivateRoute><Container customClass="min-height">
            <Usuario tipo='beneficiarios' />
          </Container></PrivateRoute>} />
          <Route path="/empresa/:id" element={<PrivateRoute><Container customClass="min-height">
            <Usuario tipo='empresas' />
          </Container></PrivateRoute>} />
          <Route path="/prestador/:id" element={<PrivateRoute><Container customClass="min-height">
            <Usuario tipo='prestadores' />
          </Container></PrivateRoute>} />
          <Route path="/telaatendimento" element={<PrivateRoute><Container customClass="min-height">
            <TelaAtendimento />
          </Container></PrivateRoute>} /> 
          <Route path="/pacientes/:id" element={<PrivateRoute><Container customClass="min-height">
            <StatusPac />
          </Container></PrivateRoute>} />
        </Routes>
        <Footer />
      </Authrapper>
    </Router>
  );
}

export default App;
